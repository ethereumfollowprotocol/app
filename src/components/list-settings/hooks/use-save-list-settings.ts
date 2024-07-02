import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { isAddress, type Chain, type Address, encodePacked } from 'viem'
import { useChainId, useSwitchChain, useAccount, useWalletClient } from 'wagmi'

import { useCart } from '#/contexts/cart-context'
import { Step } from '#/components/checkout/types'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import { generateListStorageLocationSlot } from '#/app/efp/utilities'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'
import { DEFAULT_CHAIN } from '#/lib/constants/chain'

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
  }
  onClose: () => void
  onCancel: () => void
}

const useSaveListSettings = ({
  selectedList,
  profile,
  chain,
  newChain,
  slot,
  owner,
  manager,
  user,
  listRecordsContractAddress,
  changedValues,
  onClose,
  onCancel
}: SaveListSettingsParams) => {
  const [currentStep, setCurrentStep] = useState(Step.InitiateTransactions)
  const [completeTrabsactions, setCompleteTransactions] = useState({
    user: false,
    manager: false,
    owner: false,
    chain: false
  })

  const {
    refetchLists,
    refetchRoles,
    refetchProfile,
    refetchFollowing,
    refetchFollowers,
    setIsRefetchingProfile,
    setIsRefetchingFollowing
  } = useEFPProfile()
  const { resetCart } = useCart()
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { data: walletClient } = useWalletClient()
  const { address: userAddress } = useAccount()
  const { t } = useTranslation('profile', { keyPrefix: 'list settings' })
  const {
    addActions,
    actions,
    executeActionByIndex,
    resetActions,
    moveToNextAction,
    currentActionIndex
  } = useActions()

  const setListStorageLocationTx = useCallback(async () => {
    if (!newChain) return

    // const walletClient = await getWalletClient(config)
    const newSlot = generateListStorageLocationSlot()

    const listRecordsContractAddress = newChain
      ? (ListRecordContracts[newChain?.id] as Address)
      : coreEfpContracts.EFPListRecords

    const data = encodePacked(
      ['uint256', 'address', 'uint'],
      [BigInt(newChain.id), listRecordsContractAddress, newSlot]
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
  }, [profile, slot, newChain, walletClient])

  const setOwnerTx = useCallback(async () => {
    if (!(listRecordsContractAddress && isAddress(owner || '') && userAddress)) return

    // const walletClient = await getWalletClient(config)

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
  }, [owner, listRecordsContractAddress, walletClient])

  const setManagerTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(manager || ''))) return

    // const walletClient = await getWalletClient(config)

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

    // const walletClient = await getWalletClient(config)

    // initiate  'applyListOps' transaction
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
    const setListStorageLocation: Action = {
      id: EFPActionType.SetEFPListStorageLocation, // Unique identifier for the action
      type: EFPActionType.SetEFPListStorageLocation,
      label: t('set location'),
      chainId: chain.id,
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

    const actionsToExecute: Action[] = []
    if (!completeTrabsactions.user && changedValues.user) actionsToExecute.push(setListUser)
    if (!completeTrabsactions.manager && changedValues.manager)
      actionsToExecute.push(setListManager)
    if (!completeTrabsactions.owner && changedValues.owner) actionsToExecute.push(setListOwner)
    if (!completeTrabsactions.chain && changedValues.chain)
      actionsToExecute.push(setListStorageLocation)

    addActions(actionsToExecute)
  }, [
    addActions,
    setListStorageLocationTx,
    setOwnerTx,
    setManagerTx,
    setUserTx,
    changedValues,
    chain
  ])

  useEffect(() => {
    setActions()
  }, [setActions])

  const handleInitiateActions = useCallback(() => {
    if (!chain) return
    if (
      actions[0]?.type === EFPActionType.SetEFPListOwner
        ? currentChainId !== DEFAULT_CHAIN.id
        : currentChainId !== chain?.id
    ) {
      switchChain({
        chainId: actions[0]?.type === EFPActionType.SetEFPListOwner ? DEFAULT_CHAIN.id : chain.id
      })
      return
    }

    setCurrentStep(Step.TransactionStatus)
    executeActionByIndex(0)
  }, [executeActionByIndex, currentChainId])

  const handleNextAction = useCallback(async () => {
    if (!chain) return
    if (
      actions[currentActionIndex + 1]?.type === EFPActionType.SetEFPListOwner
        ? currentChainId !== DEFAULT_CHAIN.id
        : currentChainId !== chain?.id
    ) {
      switchChain(
        {
          chainId:
            actions[currentActionIndex + 1]?.type === EFPActionType.SetEFPListOwner
              ? DEFAULT_CHAIN.id
              : chain.id
        },
        {
          onSettled: () => {
            setCurrentStep(Step.InitiateTransactions)
            // const nextActionIndex = moveToNextAction()
            // executeActionByIndex(nextActionIndex)
          }
        }
      )
      return
    }

    const nextActionIndex = moveToNextAction()
    executeActionByIndex(nextActionIndex)
  }, [moveToNextAction, executeActionByIndex, currentChainId, currentActionIndex])

  const onFinish = useCallback(() => {
    setIsRefetchingProfile(true)
    setIsRefetchingFollowing(true)

    if (changedValues.manager) resetCart()

    // Refetch all related data
    refetchLists()
    refetchRoles()
    refetchProfile()
    refetchFollowing()
    refetchFollowers()

    resetActions()
    onCancel()
    onClose()
  }, [changedValues])

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
