import { useCart } from '#/contexts/cart-context'
import type { ChainWithDetails } from '#/lib/wagmi'
import { Box } from '@radix-ui/themes'
import { useCallback, useEffect, useState } from 'react'
import { SelectChainCard } from './select-chain-card'
import { Step } from './types'
import { InitiateActionsCard } from './initiate-actions-card'
import { TransactionStatusCard } from './transaction-status-card'
import { useCreateEFPList } from '#/hooks/efp-actions/use-create-efp-list'
import { EFPActionType, type Action, useActions } from '#/contexts/actions-context'
import type { WriteContractReturnType } from 'viem'
import { useChains } from 'wagmi'

export function CreateOrUpdateEFPList() {
  // Any chains specified in wagmi are valid
  const chains = useChains() as unknown as ChainWithDetails[] // TODO: Fix this type issue
  // Setup states and context hooks
  const hasCreatedEfpList = false // Placeholder
  const { totalCartItems } = useCart()
  const { addActions, executeCurrentAction, actions } = useActions()

  const [selectedChainId, setSelectedChainId] = useState<number>()
  const selectedChain = chains.find(chain => chain.id === selectedChainId)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  // Prepare action functions
  const { createEFPList } = useCreateEFPList({ chainId: selectedChain?.id })
  const updateEFPList = useCallback(
    () =>
      Promise.resolve(
        console.log('Updating list logic here') as unknown as WriteContractReturnType
      ), // TODO placeholder
    []
  )

  useEffect(() => {
    if (!selectedChainId) return

    // Prepare and set actions when selectedChain is updated and not null
    const cartItemAction: Action = {
      id: EFPActionType.UpdateEFPList, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: `${totalCartItems} edits to List Records`,
      chainId: selectedChainId,
      execute: updateEFPList,
      isPendingConfirmation: false
    }

    const createEFPListAction: Action = {
      id: EFPActionType.CreateEFPList, // Unique identifier for the action
      type: EFPActionType.CreateEFPList,
      label: 'Create new EFP List',
      chainId: selectedChainId,
      execute: createEFPList,
      isPendingConfirmation: false
    }
    const actions = hasCreatedEfpList ? [cartItemAction] : [createEFPListAction, cartItemAction]
    addActions(actions)
  }, [selectedChainId, totalCartItems, addActions, createEFPList, updateEFPList])

  // Handle selecting a chain
  const handleChainClick = useCallback((chainId: number) => {
    setSelectedChainId(chainId)
  }, [])

  // Move to the next step
  const handleNextStep = useCallback(() => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }, [selectedChain])

  // Handle action initiation
  const handleInitiateActions = useCallback(() => {
    setCurrentStep(Step.TransactionStatus)
    executeCurrentAction()
  }, [executeCurrentAction])

  return (
    <Box className='flex flex-col items-center text-center justify-between h-full w-full'>
      {currentStep === Step.SelectChain && (
        <SelectChainCard
          chains={chains}
          handleChainClick={handleChainClick}
          selectedChain={selectedChain}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === Step.InitiateTransactions && (
        <InitiateActionsCard
          actions={actions}
          setCurrentStep={setCurrentStep}
          selectedChain={selectedChain}
          handleInitiateActions={handleInitiateActions}
        />
      )}
      {currentStep === Step.TransactionStatus && <TransactionStatusCard />}
    </Box>
  )
}
