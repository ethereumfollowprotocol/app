import { optimismSepolia } from 'viem/chains'
import { useCallback, useEffect, useState } from 'react'
import { useChainId, useSwitchChain, useWalletClient } from 'wagmi'
import {
  http,
  isAddress,
  getContract,
  type Address,
  encodePacked,
  createPublicClient,
  type Chain
} from 'viem'

import { Step } from '#/components/checkout/types'
import { efpContracts } from '#/lib/constants/contracts'
import type { ProfileDetailsResponse } from '#/api/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
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

  const { refetchProfile, refetchFollowing } = useEFPProfile()
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { data: walletClient } = useWalletClient()
  const { addActions, actions, executeActionByIndex, resetActions } = useActions()

  const listRegistryContract = getContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({ chain: optimismSepolia, transport: http() })
  })

  const setListStorageLocationTx = useCallback(async () => {
    if (!(newChain && slot && profile.primary_list)) return

    const data = encodePacked(
      ['uint256', 'address', 'uint'],
      [BigInt(newChain.id), efpContracts.EFPListRecords, slot]
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
      label: `Set list storage location`,
      chainId: chain.id,
      execute: setListStorageLocationTx,
      isPendingConfirmation: false
    }
    const setListOwner: Action = {
      id: EFPActionType.SetEFPListOwner, // Unique identifier for the action
      type: EFPActionType.SetEFPListOwner,
      label: `Set list owner`,
      chainId: chain.id,
      execute: setOwnerTx,
      isPendingConfirmation: false
    }
    const setListManager: Action = {
      id: EFPActionType.SetEFPListManager, // Unique identifier for the action
      type: EFPActionType.SetEFPListManager,
      label: `Set list manager`,
      chainId: chain.id,
      execute: setManagerTx,
      isPendingConfirmation: false
    }
    const setListUser: Action = {
      id: EFPActionType.SetEFPListUser, // Unique identifier for the action
      type: EFPActionType.SetEFPListUser,
      label: `Set list user`,
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

  const onFinish = useCallback(() => {
    resetActions()
    refetchProfile()
    refetchFollowing()
    onCancel()
    onClose()
  }, [])

  return {
    actions,
    onFinish,
    currentStep,
    setCurrentStep,
    handleInitiateActions
  }
}

export default useSaveListSettings
