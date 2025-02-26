import { useAccount, useWalletClient } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { toHex, isAddress, type Chain, encodePacked, type Address } from 'viem'

import { useCart } from '#/hooks/use-cart'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { generateListStorageLocationSlot } from '#/utils/generate-slot'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { resetFollowingRelatedQueries } from '#/utils/reset-queries'
import { listOpAddTag, listOpAddListRecord, splitListOps } from '#/utils/list-ops'
import { efpAccountMetadataAbi, efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import { EFPActionIds, formatListOpsTransaction, useTransactions, type ListOpType } from '@encrypteddegen/identity-kit'

type SaveListSettingsParams = {
  selectedList: number
  profile: ProfileDetailsResponse
  chain?: Chain
  newChain?: Chain
  slot?: bigint
  owner?: string
  manager?: string
  user?: string
  listRecordsContractAddress?: Address
  changedValues: {
    chain: boolean
    owner: boolean
    manager: boolean
    user: boolean
    setPrimary: boolean
    resetSlot: boolean
  }
  onClose: () => void
  listState?: FollowingResponse[]
  isPrimaryList: boolean
}

const useSaveListSettings = ({
  selectedList,
  chain,
  newChain,
  slot,
  owner,
  manager,
  user,
  listRecordsContractAddress,
  changedValues,
  onClose,
  listState,
  isPrimaryList,
}: SaveListSettingsParams) => {
  const {
    refetchRoles,
    refetchProfile,
    refetchFollowing,
    refetchFollowers,
    refetchFollowerTags,
    refetchFollowingTags,
  } = useEFPProfile()
  const { resetCart } = useCart()
  const queryClient = useQueryClient()
  const { address: userAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { addTransactions, setOnCheckoutFinish, setTxModalOpen } = useTransactions()

  const newSlot = useMemo(() => generateListStorageLocationSlot(), [])
  const setListStorageLocationTx = useCallback(() => {
    if (!newChain) return

    const listRecordsContractAddress = newChain
      ? (ListRecordContracts[newChain?.id] as Address)
      : coreEfpContracts.EFPListRecords

    const data = encodePacked(
      ['uint8', 'uint8', 'uint256', 'address', 'uint'],
      [1, 1, BigInt(newChain.id), listRecordsContractAddress, newSlot]
    )

    addTransactions([
      {
        title: 'list storage location',
        description: newChain.name,
        id: EFPActionIds.SetEFPListSettings,
        address: coreEfpContracts.EFPListRegistry,
        abi: efpListRegistryAbi,
        functionName: 'setListStorageLocation',
        chainId: DEFAULT_CHAIN.id,
        args: [BigInt(selectedList), data],
      },
    ])
  }, [walletClient, newChain])

  const listOpTx = useCallback(
    (items: ListOpType[], address: Address) => {
      const transaction = formatListOpsTransaction({
        listOps: items,
        nonce: newSlot,
        chainId: newChain?.id,
        connectedAddress: address,
      })

      return transaction
    },
    [walletClient, selectedList]
  )

  const setOwnerTx = useCallback(() => {
    if (!(isAddress(owner || '') && userAddress)) return

    addTransactions([
      {
        title: 'owner',
        description: owner,
        id: EFPActionIds.SetEFPListSettings,
        address: coreEfpContracts.EFPListRegistry,
        abi: efpListRegistryAbi,
        functionName: 'transferFrom',
        chainId: DEFAULT_CHAIN.id,
        args: [userAddress, owner as Address, BigInt(selectedList)],
      },
    ])
  }, [owner, walletClient])

  const setPrimaryListTx = useCallback(() => {
    if (!userAddress) return

    const listHex = toHex(selectedList).replace('0x', '')
    addTransactions([
      {
        title: 'primary list',
        description: isPrimaryList ? 'true' : 'false',
        id: EFPActionIds.SetEFPListSettings,
        address: coreEfpContracts.EFPAccountMetadata,
        abi: efpAccountMetadataAbi,
        functionName: 'setValueForAddress',
        chainId: DEFAULT_CHAIN.id,
        args: [userAddress, 'primary-list', isPrimaryList ? `0x${listHex.padStart(64, '0')}` : '0x'],
      },
    ])
  }, [selectedList, isPrimaryList, walletClient])

  const resetSlotTx = useCallback(() => {
    if (!(userAddress && chain)) return

    addTransactions([
      {
        title: 'reset slot',
        id: EFPActionIds.SetEFPListSettings,
        address: ListRecordContracts[chain?.id] as Address,
        abi: efpListRecordsAbi,
        functionName: 'setMetadataValuesAndApplyListOps',
        chainId: chain.id,
        args: [newSlot, [{ key: 'user', value: userAddress }], []],
      },
    ])
  }, [selectedList, isPrimaryList, walletClient])

  const claimNewSlotTx = useCallback(() => {
    if (!(userAddress && chain)) return

    addTransactions([
      {
        title: 'claim new slot',
        id: EFPActionIds.SetEFPListSettings,
        address: coreEfpContracts.EFPListRegistry,
        abi: efpListRegistryAbi,
        functionName: 'setListStorageLocation',
        chainId: DEFAULT_CHAIN.id,
        args: [
          BigInt(selectedList),
          encodePacked(
            ['uint8', 'uint8', 'uint256', 'address', 'uint'],
            [1, 1, BigInt(chain.id), ListRecordContracts[chain?.id] as Address, newSlot]
          ),
        ],
      },
    ])
  }, [])

  const setManagerTx = useCallback(() => {
    if (!(listRecordsContractAddress && slot && isAddress(manager || ''))) return

    addTransactions([
      {
        title: 'manager',
        description: manager,
        id: EFPActionIds.SetEFPListSettings,
        address: listRecordsContractAddress,
        abi: efpListRecordsAbi,
        functionName: 'setListManager',
        chainId: chain?.id,
        args: [slot, manager as Address],
      },
    ])
  }, [slot, listRecordsContractAddress, manager, walletClient])

  const setUserTx = useCallback(() => {
    if (!(listRecordsContractAddress && slot && isAddress(user || ''))) return

    addTransactions([
      {
        title: 'user',
        description: user,
        id: EFPActionIds.SetEFPListSettings,
        address: listRecordsContractAddress,
        abi: efpListRecordsAbi,
        functionName: 'setListUser',
        chainId: chain?.id,
        args: [slot, user as Address],
      },
    ])
  }, [slot, listRecordsContractAddress, user, walletClient])

  const onFinish = useCallback(() => {
    // setIsRefetchingProfile(true)
    // setIsRefetchingFollowing(true)
    // refetchState(fetchFreshLists, setFetchFreshLists, refetchLists)

    if (changedValues.manager) resetCart()
    if (changedValues.user || changedValues.setPrimary || changedValues.resetSlot) {
      localStorage.setItem('selected-list', selectedList.toString())

      // refetchState(fetchFreshProfile, setFetchFreshProfile, refetchProfile)
      // refetchState(fetchFreshStats, setFetchFreshStats, refetchStats)
    }
    if (changedValues.resetSlot) resetFollowingRelatedQueries(queryClient)

    refetchRoles()
    refetchProfile()
    refetchFollowing()
    refetchFollowers()
    refetchFollowerTags()
    refetchFollowingTags()
  }, [changedValues])

  const submitChanges = useCallback(() => {
    if (!chain) return

    const executableActions = [
      {
        action: resetSlotTx,
        condition: changedValues.resetSlot,
      },
      {
        action: claimNewSlotTx,
        condition: changedValues.resetSlot,
      },
      {
        action: setUserTx,
        condition: changedValues.user,
      },
      {
        action: setManagerTx,
        condition: changedValues.manager,
      },
      {
        action: setPrimaryListTx,
        condition: changedValues.setPrimary,
      },
      {
        action: setListStorageLocationTx,
        condition: changedValues.chain && newChain && !listState?.length,
      },
      {
        action: setOwnerTx,
        condition: changedValues.owner,
      },
    ]

    const actionsToExecute = executableActions.filter((action) => action.condition).map((action) => action.action)

    if (changedValues.chain && newChain && userAddress) {
      if (listState) {
        const listOps = listState.flatMap((item) => {
          const operations = []
          operations.push(listOpAddListRecord(item.address))
          if (item.tags.length > 0)
            item.tags.map((tag) => {
              operations.push(listOpAddTag(item.address, tag))
            })
          return operations
        })

        const splitCartItems = splitListOps(listOps, newChain.id)

        for (const listOps of splitCartItems) {
          listOpTx(listOps, userAddress)
        }
      }
    }

    for (const action of actionsToExecute) {
      action()
    }

    setOnCheckoutFinish(onFinish)
    setTxModalOpen(true)
    onClose()
  }, [listOpTx, setListStorageLocationTx, setOwnerTx, setManagerTx, setUserTx, changedValues, chain])

  return {
    onFinish,
    submitChanges,
  }
}

export default useSaveListSettings
