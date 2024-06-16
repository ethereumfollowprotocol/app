import {
  http,
  isAddress,
  type Chain,
  getContract,
  type Address,
  encodePacked,
  createPublicClient
} from 'viem'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { useChainId, useSwitchChain, useWalletClient } from 'wagmi'

import { useCart } from '#/contexts/cart-context'
import { Step } from '#/components/checkout/types'
import { DEFAULT_CHAIN } from '#/lib/constants/chain'
import type { ProfileDetailsResponse } from '#/api/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'

type SaveListSettingsParams = {
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

  const { resetCart } = useCart()
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { data: walletClient } = useWalletClient()
  const { t } = useTranslation('profile', { keyPrefix: 'list settings' })
  const { refetchProfile, refetchFollowing, refetchRoles } = useEFPProfile()
  const { addActions, actions, executeActionByIndex, resetActions, moveToNextAction } = useActions()

  const listRegistryContract = getContract({
    address: coreEfpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({ chain: DEFAULT_CHAIN, transport: http() })
  })

  const setListStorageLocationTx = useCallback(async () => {
    if (!(newChain && slot && profile.primary_list)) return

    const listRecordsContractAddress = newChain
      ? (ListRecordContracts[newChain?.id] as Address)
      : coreEfpContracts.EFPListRecords

    const data = encodePacked(
      ['uint256', 'address', 'uint'],
      [BigInt(newChain.id), listRecordsContractAddress, slot]
    )
    const hash = await listRegistryContract.write.setListStorageLocation(
      [BigInt(profile.primary_list), data],
      {
        account: profile.address
      }
    )
    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [profile, walletClient, slot, newChain])

  const setOwnerTx = useCallback(async () => {
    if (!(listRecordsContractAddress && isAddress(owner || ''))) return

    const hash = await listRegistryContract.write.transferOwnership([owner as Address], {
      account: profile.address
    })

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [walletClient, owner, listRecordsContractAddress])

  const setManagerTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(manager || ''))) return

    // initiate  'applyListOps' transaction
    const hash = await walletClient?.writeContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      functionName: 'setListManager',
      args: [slot, manager as Address]
    })

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [walletClient, slot, listRecordsContractAddress, manager])

  const setUserTx = useCallback(async () => {
    if (!(listRecordsContractAddress && slot && isAddress(user || ''))) return

    // initiate  'applyListOps' transaction
    const hash = await walletClient?.writeContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      functionName: 'setListUser',
      args: [slot, user as Address]
    })

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [walletClient, slot, listRecordsContractAddress, user])

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
      chainId: chain.id,
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
    if (changedValues.user) actionsToExecute.push(setListUser)
    if (changedValues.manager) actionsToExecute.push(setListManager)
    if (changedValues.owner) actionsToExecute.push(setListOwner)
    if (changedValues.chain) actionsToExecute.push(setListStorageLocation)

    addActions(actionsToExecute)
  }, [
    addActions,
    setListStorageLocationTx,
    setOwnerTx,
    setManagerTx,
    setUserTx,
    walletClient,
    changedValues,
    chain
  ])

  useEffect(() => {
    setActions()
  }, [setActions])

  const handleInitiateActions = useCallback(() => {
    if (!chain) return
    if (currentChainId !== chain?.id) {
      switchChain({ chainId: chain.id })
      return
    }

    setCurrentStep(Step.TransactionStatus)
    executeActionByIndex(0)
  }, [executeActionByIndex, currentChainId])

  const handleNextAction = useCallback(async () => {
    if (!chain) return
    if (currentChainId !== chain.id) {
      switchChain(
        { chainId: chain.id },
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
  }, [moveToNextAction, executeActionByIndex, currentChainId])

  const onFinish = useCallback(() => {
    if (changedValues.manager) resetCart()

    resetActions()
    refetchRoles()
    refetchProfile()
    refetchFollowing()
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
