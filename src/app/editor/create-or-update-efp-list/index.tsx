import { useCart } from '#/contexts/cart-context'
import type { ChainWithDetails } from '#/lib/wagmi'
import { Box } from '@radix-ui/themes'
import { useState } from 'react'
import { SelectChainCard } from './select-chain-card'
import { Step } from './types'
import { InitiateActionsCard } from './initiate-actions-card'
import { TransactionStatusCard } from './transaction-status-card'
import { useCreateEFPList } from '#/hooks/efp-actions/use-create-efp-list'
import { EFPActionType, type Action, useActions } from '#/contexts/actions-context'
import type { WriteContractReturnType } from 'viem'

export function CreateOrUpdateEFPList() {
  // Setup states and context hooks
  const hasCreatedEfpList = false // Placeholder
  const { totalCartItems } = useCart()
  const { addOrUpdateAction, executeAction } = useActions()
  const [selectedChain, setSelectedChain] = useState<ChainWithDetails | null>(null)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  // Prepare action functions
  const { createEFPList } = useCreateEFPList({ chainId: selectedChain?.id })
  const updateEFPList = () =>
    Promise.resolve(console.log('Updating list logic here') as unknown as WriteContractReturnType) // TODO placeholder

  // Define actions
  const cartItemActionLabel = `${totalCartItems} edits to List Records`
  const cartItemAction: Action = {
    id: EFPActionType.UpdateEFPList, // Unique identifier for the action
    type: EFPActionType.UpdateEFPList,
    label: cartItemActionLabel,
    chain: selectedChain,
    execute: updateEFPList,
    isPendingConfirmation: false
  }

  const createEFPListAction: Action = {
    id: EFPActionType.CreateEFPList, // Unique identifier for the action
    type: EFPActionType.CreateEFPList,
    label: 'Create new EFP List',
    chain: selectedChain,
    execute: createEFPList,
    isPendingConfirmation: false
  }

  const actions = hasCreatedEfpList ? [cartItemAction] : [createEFPListAction, cartItemAction]

  // Handle selecting a chain
  const handleChainClick = (chain: ChainWithDetails) => {
    setSelectedChain(chain)
  }

  // Move to the next step
  const handleNextStep = () => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }

  // Handle action initiation
  const handleInitiateActions = () => {
    setCurrentStep(Step.TransactionStatus)

    for (const action of actions) {
      // Add the action in the actions context
      addOrUpdateAction({ ...action, isPendingConfirmation: true })

      // Use executeAction from the actions context to handle user rejections
      executeAction(action.id)
    }
  }

  return (
    <Box className='flex flex-col items-center text-center justify-between h-full w-full'>
      {currentStep === Step.SelectChain && (
        <SelectChainCard
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
