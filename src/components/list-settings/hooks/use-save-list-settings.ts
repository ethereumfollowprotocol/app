import { useTranslation } from 'react-i18next'
import { useAccount, useWalletClient } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toHex, isAddress, type Chain, encodePacked, type Address } from 'viem'

import { Step } from '#/components/checkout/types'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import { useCart, type CartItemType } from '#/hooks/use-cart'
import { useListOps } from '#/hooks/efp-actions/use-list-ops'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { generateListStorageLocationSlot } from '#/utils/generate-slot'
import { INITIAL_COMPLETE_TRANSACTIONS } from '#/lib/constants/list-settings'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { refetchState, resetFollowingRelatedQueries } from '#/utils/reset-queries'
import { listOpAddTag, listOpAddListRecord, splitListOps } from '#/utils/list-ops'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'
import { efpAccountMetadataAbi, efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'

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
  onCancel: () => void
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
  onCancel,
  listState,
  isPrimaryList,
}: SaveListSettingsParams) => {
  const [changedValuesState] = useState(changedValues)
  const [currentStep, setCurrentStep] = useState(Step.InitiateTransactions)
  const [completeTransactions, setCompleteTransactions] = useState(INITIAL_COMPLETE_TRANSACTIONS)

  const {
    refetchLists,
    refetchRoles,
    refetchStats,
    refetchProfile,
    fetchFreshStats,
    fetchFreshLists,
    refetchFollowing,
    refetchFollowers,
    fetchFreshProfile,
    setFetchFreshLists,
    setFetchFreshStats,
    refetchFollowerTags,
    setFetchFreshProfile,
    refetchFollowingTags,
    setIsRefetchingProfile,
    setIsRefetchingFollowing,
  } = useEFPProfile()
  const { t } = useTranslation()
  const { resetCart } = useCart()
  const queryClient = useQueryClient()
  const { address: userAddress } = useAccount()
  const { getListOpsTransaction } = useListOps()
  const { data: walletClient } = useWalletClient()
  const { actions, addActions, resetActions, handleNextAction, handleInitiateActions } = useActions()

  const newSlot = useMemo(() => generateListStorageLocationSlot(userAddress), [])
  const setListStorageLocationTx = useCallback(async () => {
    if (!newChain) return

    const listRecordsContractAddress = newChain
      ? (ListRecordContracts[newChain?.id] as Address)
      : coreEfpContracts.EFPListRecords

    const data = encodePacked(
      ['uint8', 'uint8', 'uint256', 'address', 'uint'],
      [1, 1, BigInt(newChain.id), listRecordsContractAddress, newSlot]
    )

    const hash = await walletClient?.writeContract({
      address: coreEfpContracts.EFPListRegistry,
      abi: efpListRegistryAbi,
      functionName: 'setListStorageLocation',
      args: [BigInt(selectedList), data],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        chain: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [walletClient, newChain])

  const listOpTx = useCallback(
    async (items: CartItemType[]) => {
      const listRecordsContract = newChain
        ? (ListRecordContracts[newChain?.id] as Address)
        : coreEfpContracts.EFPListRecords

      const hash = await getListOpsTransaction({
        items,
        nonce: newSlot,
        listRecordsContract,
      })

      // return transaction hash to enable following transaction status in transaction details component
      return hash
    },
    [walletClient, selectedList]
  )

  const setOwnerTx = useCallback(async () => {
    if (!(isAddress(owner || '') && userAddress)) return

    const hash = await walletClient?.writeContract({
      address: coreEfpContracts.EFPListRegistry,
      abi: efpListRegistryAbi,
      functionName: 'transferFrom',
      args: [userAddress, owner as Address, BigInt(selectedList)],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        owner: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [owner, walletClient])

  const setPrimaryListTx = useCallback(async () => {
    if (!userAddress) return

    const listHex = toHex(selectedList).replace('0x', '')
    const hash = await walletClient?.writeContract({
      address: coreEfpContracts.EFPAccountMetadata,
      abi: efpAccountMetadataAbi,
      functionName: 'setValueForAddress',
      args: [userAddress, 'primary-list', isPrimaryList ? `0x${listHex.padStart(64, '0')}` : '0x'],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        setPrimary: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [selectedList, isPrimaryList, walletClient])

  const resetSlotTx = useCallback(async () => {
    if (!(userAddress && chain)) return

    const hash = await walletClient?.writeContract({
      address: ListRecordContracts[chain?.id] as Address,
      abi: efpListRecordsAbi,
      functionName: 'setMetadataValuesAndApplyListOps',
      args: [newSlot, [{ key: 'user', value: userAddress }], []],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        resetSlot: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [selectedList, isPrimaryList, walletClient])

  const claimNewSlotTx = useCallback(async () => {
    if (!(userAddress && chain)) return

    const hash = await walletClient?.writeContract({
      address: coreEfpContracts.EFPListRegistry,
      abi: efpListRegistryAbi,
      functionName: 'setListStorageLocation',
      args: [
        BigInt(selectedList),
        encodePacked(
          ['uint8', 'uint8', 'uint256', 'address', 'uint'],
          [1, 1, BigInt(chain.id), ListRecordContracts[chain?.id] as Address, newSlot]
        ),
      ],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        claimSlot: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [])

  const setManagerTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(manager || ''))) return

    const hash = await walletClient?.writeContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      functionName: 'setListManager',
      args: [slot, manager as Address],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        manager: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [slot, listRecordsContractAddress, manager, walletClient])

  const setUserTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(user || ''))) return

    const hash = await walletClient?.writeContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      functionName: 'setListUser',
      args: [slot, user as Address],
    })

    if (hash) {
      setCompleteTransactions((prev) => ({
        ...prev,
        user: true,
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [slot, listRecordsContractAddress, user, walletClient])

  const setActions = useCallback(() => {
    if (!chain) return

    // Prepare and set actions when selectedChain is updated and not null
    const resetSlotAction: Action = {
      id: EFPActionType.ResetSlot, // Unique identifier for the action
      type: EFPActionType.ResetSlot,
      label: t('reset slot'),
      chainId: chain.id,
      execute: resetSlotTx,
      isPendingConfirmation: false,
    }
    const claimNewSlotAction: Action = {
      id: EFPActionType.SetEFPListStorageLocation, // Unique identifier for the action
      type: EFPActionType.SetEFPListStorageLocation,
      label: t('claim slot'),
      chainId: DEFAULT_CHAIN.id,
      execute: claimNewSlotTx,
      isPendingConfirmation: false,
    }
    const setListStorageLocation: Action = {
      id: EFPActionType.SetEFPListStorageLocation, // Unique identifier for the action
      type: EFPActionType.SetEFPListStorageLocation,
      label: t('set location'),
      chainId: DEFAULT_CHAIN.id,
      execute: setListStorageLocationTx,
      isPendingConfirmation: false,
    }
    const setListOwner: Action = {
      id: EFPActionType.SetEFPListOwner, // Unique identifier for the action
      type: EFPActionType.SetEFPListOwner,
      label: t('set owner'),
      chainId: DEFAULT_CHAIN.id,
      execute: setOwnerTx,
      isPendingConfirmation: false,
    }
    const setListManager: Action = {
      id: EFPActionType.SetEFPListManager, // Unique identifier for the action
      type: EFPActionType.SetEFPListManager,
      label: t('set manager'),
      chainId: chain.id,
      execute: setManagerTx,
      isPendingConfirmation: false,
    }
    const setListUser: Action = {
      id: EFPActionType.SetEFPListUser, // Unique identifier for the action
      type: EFPActionType.SetEFPListUser,
      label: t('set user'),
      chainId: chain.id,
      execute: setUserTx,
      isPendingConfirmation: false,
    }
    const setPrimaryList: Action = {
      id: EFPActionType.SetPrimaryList, // Unique identifier for the action
      type: EFPActionType.SetPrimaryList,
      label: t('set primary'),
      chainId: DEFAULT_CHAIN.id,
      execute: setPrimaryListTx,
      isPendingConfirmation: false,
    }

    const executableActions = [
      {
        action: resetSlotAction,
        condition: !completeTransactions.resetSlot && changedValuesState.resetSlot,
      },
      {
        action: claimNewSlotAction,
        condition: !completeTransactions.claimSlot && changedValuesState.resetSlot,
      },
      {
        action: setListUser,
        condition: !completeTransactions.user && changedValuesState.user,
      },
      {
        action: setListManager,
        condition: !completeTransactions.manager && changedValuesState.manager,
      },
      {
        action: setPrimaryList,
        condition: !completeTransactions.setPrimary && changedValuesState.setPrimary,
      },
      {
        action: setListStorageLocation,
        condition: !completeTransactions.chain && changedValuesState.chain && newChain && !listState?.length,
      },
      {
        action: setListOwner,
        condition: !completeTransactions.owner && changedValuesState.owner,
      },
    ]
    const actionsToExecute: Action[] = executableActions
      .filter((action) => action.condition)
      .map((action) => action.action)

    if (changedValuesState.chain && newChain) {
      if (listState) {
        const listOps = listState.flatMap((item) => {
          const operations: CartItemType[] = []
          operations.push({ listOp: listOpAddListRecord(item.address) })
          if (item.tags.length > 0)
            item.tags.map((tag) => {
              operations.push({ listOp: listOpAddTag(item.address, tag) })
            })
          return operations
        })

        const splitCartItems = splitListOps(listOps, newChain.id)
        const cartItemActions: Action[] = splitCartItems.map((listOps, i) => ({
          id: `${EFPActionType.UpdateEFPList} ${i}`, // Unique identifier for the action
          type: EFPActionType.UpdateEFPList,
          label: `Transfer List State ${i + 1}/${splitCartItems.length}`,
          chainId: newChain.id,
          execute: async () => await listOpTx(listOps),
          isPendingConfirmation: false,
        }))

        if (completeTransactions.chain) actionsToExecute.push(...cartItemActions)
        else actionsToExecute.push(...[setListStorageLocation, ...cartItemActions])
      }
    }

    addActions(actionsToExecute)
  }, [listOpTx, setListStorageLocationTx, setOwnerTx, setManagerTx, setUserTx, changedValuesState, chain])

  useEffect(() => {
    setActions()
  }, [setActions])

  const onInitiateActions = () => handleInitiateActions(() => setCurrentStep(Step.TransactionStatus))
  const onNextAction = () => handleNextAction(() => setCurrentStep(Step.InitiateTransactions))

  const onFinish = useCallback(() => {
    setIsRefetchingProfile(true)
    setIsRefetchingFollowing(true)
    refetchState(fetchFreshLists, setFetchFreshLists, refetchLists)

    if (changedValuesState.manager) resetCart()
    if (changedValues.user || changedValues.setPrimary || changedValues.resetSlot) {
      localStorage.setItem('selected-list', selectedList.toString())

      refetchState(fetchFreshProfile, setFetchFreshProfile, refetchProfile)
      refetchState(fetchFreshStats, setFetchFreshStats, refetchStats)
    }
    if (changedValues.resetSlot) resetFollowingRelatedQueries(queryClient)

    refetchRoles()
    refetchProfile()
    refetchFollowing()
    refetchFollowers()
    refetchFollowerTags()
    refetchFollowingTags()

    resetActions()
    onCancel()
    onClose()
  }, [changedValuesState])

  return {
    actions,
    onFinish,
    currentStep,
    setCurrentStep,
    onNextAction,
    onInitiateActions,
  }
}

export default useSaveListSettings
