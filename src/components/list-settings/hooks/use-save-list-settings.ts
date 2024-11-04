import {
  http,
  toHex,
  fromHex,
  isAddress,
  type Chain,
  getContract,
  type Address,
  encodePacked,
  createPublicClient
} from 'viem'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useChainId, useSwitchChain, useWalletClient } from 'wagmi'

import { listOpAddTag, listOpAddListRecord } from '#/utils/list-ops'
import { Step } from '#/components/checkout/types'
import { rpcProviders } from '#/lib/constants/rpc-providers'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useCart, type CartItem } from '#/contexts/cart-context'
import { DEFAULT_CHAIN, LIST_OP_LIMITS } from '#/lib/constants/chains'
import { generateListStorageLocationSlot } from '#/utils/generateSlot'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'
import { efpAccountMetadataAbi, efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'

const DEFAULT_CHAIN_LIST_ACTIONS = [
  EFPActionType.SetEFPListOwner,
  EFPActionType.SetEFPListStorageLocation,
  EFPActionType.SetPrimaryList
]

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
  // profile,
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
  isPrimaryList
}: SaveListSettingsParams) => {
  const [changedValuesState] = useState(changedValues)
  const [currentStep, setCurrentStep] = useState(Step.InitiateTransactions)
  const [completeTransactions, setCompleteTransactions] = useState({
    user: false,
    manager: false,
    owner: false,
    chain: false,
    setPrimary: false,
    resetSlot: false,
    claimSlot: false
  })

  const {
    actions,
    addActions,
    resetActions,
    moveToNextAction,
    currentActionIndex,
    executeActionByIndex
  } = useActions()
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
    setIsRefetchingFollowing
    // selectedList: selectedProfileList
  } = useEFPProfile()
  const { t } = useTranslation()
  const { resetCart } = useCart()
  const queryClient = useQueryClient()
  const { switchChain } = useSwitchChain()
  const initialCurrentChainId = useChainId()
  const { address: userAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const newSlot = useMemo(() => generateListStorageLocationSlot(), [])

  const [currentChainId, setCurrentChainId] = useState(initialCurrentChainId)
  const getCurrentChain = useCallback(async () => {
    if (!walletClient) return

    const chainId = await walletClient.getChainId()
    setCurrentChainId(chainId)
  }, [walletClient])

  useEffect(() => {
    getCurrentChain()
  }, [walletClient])

  const listRegistryContract = getContract({
    address: coreEfpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({
      chain: DEFAULT_CHAIN,
      transport: http(rpcProviders[DEFAULT_CHAIN.id])
    })
  })

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
      args: [BigInt(selectedList), data]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        chain: true
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [walletClient, newChain])

  const listOpTx = useCallback(
    async (items: CartItem[]) => {
      const listRecordsContract = newChain
        ? (ListRecordContracts[newChain?.id] as Address)
        : coreEfpContracts.EFPListRecords

      // format list operations
      const operations = items.map(item => {
        // append mandatory types and data
        const types = ['uint8', 'uint8', 'uint8', 'uint8', 'bytes']
        const data: (string | number)[] = [
          item.listOp.version,
          item.listOp.opcode,
          1,
          1,
          item.listOp.data
        ]

        // return encoded data into a single HEX string
        return encodePacked(types, data)
      })

      // initiate  'applyListOps' transaction
      const hash = await walletClient?.writeContract({
        address: listRecordsContract,
        abi: efpListRecordsAbi,
        functionName: 'setMetadataValuesAndApplyListOps',
        // @ts-ignore - diff data type handled
        args: [newSlot, [{ key: 'user', value: userAddress }], operations]
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
      args: [userAddress, owner as Address, BigInt(selectedList)]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        owner: true
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
      args: [userAddress, 'primary-list', `0x${listHex.padStart(64, '0')}`]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        setPrimary: true
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
      // @ts-ignore - diff data type handled
      args: [newSlot, [{ key: 'user', value: userAddress }], []]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        resetSlot: true
      }))
    }

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
        )
      ]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        claimSlot: true
      }))
    }

    return hash
  }, [])

  const setManagerTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(manager || ''))) return

    // initiate  'applyListOps' transaction
    const hash = await walletClient?.writeContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      functionName: 'setListManager',
      args: [slot, manager as Address]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        manager: true
      }))
    }

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [slot, listRecordsContractAddress, manager, walletClient])

  const setUserTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(user || ''))) return

    // initiate  'setListUser' transaction
    const hash = await walletClient?.writeContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      functionName: 'setListUser',
      args: [slot, user as Address]
    })

    if (hash) {
      setCompleteTransactions(prev => ({
        ...prev,
        user: true
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
      isPendingConfirmation: false
    }
    const claimNewSlotAction: Action = {
      id: EFPActionType.SetEFPListStorageLocation, // Unique identifier for the action
      type: EFPActionType.SetEFPListStorageLocation,
      label: t('claim slot'),
      chainId: DEFAULT_CHAIN.id,
      execute: claimNewSlotTx,
      isPendingConfirmation: false
    }
    const setListStorageLocation: Action = {
      id: EFPActionType.SetEFPListStorageLocation, // Unique identifier for the action
      type: EFPActionType.SetEFPListStorageLocation,
      label: t('set location'),
      chainId: DEFAULT_CHAIN.id,
      execute: setListStorageLocationTx,
      isPendingConfirmation: false
    }
    const setListOwner: Action = {
      id: EFPActionType.SetEFPListOwner, // Unique identifier for the action
      type: EFPActionType.SetEFPListOwner,
      label: t('set owner'),
      chainId: DEFAULT_CHAIN.id,
      execute: setOwnerTx,
      isPendingConfirmation: false
    }
    const setListManager: Action = {
      id: EFPActionType.SetEFPListManager, // Unique identifier for the action
      type: EFPActionType.SetEFPListManager,
      label: t('set manager'),
      chainId: chain.id,
      execute: setManagerTx,
      isPendingConfirmation: false
    }
    const setListUser: Action = {
      id: EFPActionType.SetEFPListUser, // Unique identifier for the action
      type: EFPActionType.SetEFPListUser,
      label: t('set user'),
      chainId: chain.id,
      execute: setUserTx,
      isPendingConfirmation: false
    }
    const setPrimaryList: Action = {
      id: EFPActionType.SetPrimaryList, // Unique identifier for the action
      type: EFPActionType.SetPrimaryList,
      label: t('set primary'),
      chainId: DEFAULT_CHAIN.id,
      execute: setPrimaryListTx,
      isPendingConfirmation: false
    }

    const actionsToExecute: Action[] = []
    if (!completeTransactions.resetSlot && changedValuesState.resetSlot)
      actionsToExecute.push(resetSlotAction)
    if (!completeTransactions.claimSlot && changedValuesState.resetSlot)
      actionsToExecute.push(claimNewSlotAction)

    if (!completeTransactions.user && changedValuesState.user) actionsToExecute.push(setListUser)
    if (!completeTransactions.manager && changedValuesState.manager)
      actionsToExecute.push(setListManager)

    if (!completeTransactions.setPrimary && changedValuesState.setPrimary)
      actionsToExecute.push(setPrimaryList)

    if (changedValuesState.chain && newChain) {
      if (listState) {
        const listOps = listState.flatMap(item => {
          const operations: CartItem[] = []
          operations.push({ listOp: listOpAddListRecord(item.address) })
          if (item.tags.length > 0)
            item.tags.map(tag => {
              operations.push({ listOp: listOpAddTag(item.address, tag) })
            })
          return operations
        })

        const splitListOps: CartItem[][] = []
        const splitSize = LIST_OP_LIMITS[newChain.id] || 500

        for (let i = 0; i < listOps.length; i += splitSize) {
          splitListOps.push(listOps.slice(i, i + splitSize))
        }

        const cartItemActions: Action[] = splitListOps.map((listOps, i) => ({
          id: `${EFPActionType.UpdateEFPList} ${i}`, // Unique identifier for the action
          type: EFPActionType.UpdateEFPList,
          label: `Transfer List State ${i + 1}/${splitListOps.length}`,
          chainId: newChain.id,
          execute: async () => await listOpTx(listOps),
          isPendingConfirmation: false
        }))

        if (completeTransactions.chain) actionsToExecute.push(...cartItemActions)
        else actionsToExecute.push(...[setListStorageLocation, ...cartItemActions])
      } else if (!completeTransactions.chain) {
        actionsToExecute.push(setListStorageLocation)
      }
    }

    if (!completeTransactions.owner && changedValuesState.owner) actionsToExecute.push(setListOwner)

    addActions(actionsToExecute)
  }, [
    listOpTx,
    setListStorageLocationTx,
    setOwnerTx,
    setManagerTx,
    setUserTx,
    changedValuesState,
    chain
  ])

  useEffect(() => {
    setActions()
  }, [setActions])

  const getRequiredChain = useCallback(
    async (index: number) =>
      DEFAULT_CHAIN_LIST_ACTIONS.includes(actions[index] ? actions[index]?.type : '')
        ? DEFAULT_CHAIN.id
        : selectedList
          ? fromHex(
              `0x${(
                await listRegistryContract.read.getListStorageLocation([BigInt(selectedList)])
              ).slice(64, 70)}`,
              'number'
            )
          : chain?.id,
    [actions, listRegistryContract, chain]
  )

  const handleInitiateActions = useCallback(async () => {
    const chainId = await getRequiredChain(0)
    if (!chainId) return
    if (currentChainId !== chainId)
      return switchChain({ chainId }, { onSuccess: () => setCurrentChainId(chainId) })

    setCurrentStep(Step.TransactionStatus)
    executeActionByIndex(0)
  }, [executeActionByIndex, currentChainId])

  const handleNextAction = useCallback(async () => {
    const chainId = await getRequiredChain(currentActionIndex + 1)
    if (!chainId) return
    if (currentChainId !== chainId)
      return switchChain(
        { chainId },
        {
          onSuccess: () => {
            setCurrentChainId(chainId)
            setCurrentStep(Step.InitiateTransactions)
          }
        }
      )

    const nextActionIndex = moveToNextAction()
    executeActionByIndex(nextActionIndex)
  }, [moveToNextAction, executeActionByIndex, currentChainId, currentActionIndex])

  const onFinish = useCallback(() => {
    setIsRefetchingProfile(true)
    setIsRefetchingFollowing(true)

    if (changedValuesState.manager) resetCart()

    // Refetch all related data
    if (fetchFreshLists) refetchLists()
    else setFetchFreshLists(true)

    if (changedValues.user || changedValues.setPrimary || changedValues.resetSlot) {
      localStorage.setItem('selected-list', selectedList.toString())

      if (fetchFreshProfile) refetchProfile()
      else setFetchFreshProfile(true)

      if (fetchFreshStats) refetchStats()
      else setFetchFreshStats(true)
    }

    if (changedValues.resetSlot) {
      queryClient.invalidateQueries({ queryKey: ['top8'] })
      queryClient.invalidateQueries({ queryKey: ['follow state'] })
      queryClient.invalidateQueries({ queryKey: ['list state'] })
    }

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
    handleNextAction,
    handleInitiateActions
  }
}

export default useSaveListSettings
