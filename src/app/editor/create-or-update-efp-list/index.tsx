import { useCart } from '#/contexts/cart-context'
import type { ChainWithDetails } from '#/lib/wagmi'
import { Box } from '@radix-ui/themes'
import { useMemo, useState } from 'react'
import { useChains } from 'wagmi'
import { SelectChainCard } from './select-chain-card'
import { Step, type Action, EFPActionType } from './types'
import { InitiateActionsCard } from './initiate-actions-card'
import { TransactionStatusCard } from './transaction-status-card'
import { useCreateEFPList } from '#/hooks/efp-actions/use-create-efp-list'

export function CreateOrUpdateEFPList() {
  const hasCreatedEfpList = false // TODO get this from context or fetch this
  const { totalCartItems } = useCart()

  const chains = useChains() as unknown as ChainWithDetails[] // TODO fix this cast as unknown
  const [selectedChain, setSelectedChain] = useState<ChainWithDetails | null>(null)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  const { createEFPList } = useCreateEFPList({ chainId: selectedChain?.id })
  const updateEFPList = () => console.log('update list')

  const cartItemActionLabel = `${totalCartItems} edit${
    totalCartItems > 1 ? 's' : ''
  } to List Records`

  // Cart item action
  const cartItemAction: Action = {
    type: EFPActionType.UpdateEFPList,
    label: cartItemActionLabel,
    chain: selectedChain,
    action: updateEFPList
  }

  // Create EFP List action
  const CREATE_EFP_LIST_ACTION: Action = {
    type: EFPActionType.CreateEFPList,
    label: 'Create new EFP List',
    chain: selectedChain,
    action: createEFPList
  }

  const actions = useMemo<Action[]>(
    () => (hasCreatedEfpList ? [cartItemAction] : [CREATE_EFP_LIST_ACTION, cartItemAction]),
    [cartItemAction, CREATE_EFP_LIST_ACTION]
  )

  const handleChainClick = (chain: ChainWithDetails) => {
    setSelectedChain(chain)
  }

  const handleNextStep = () => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }

  const handleInitiateActions = () => {
    setCurrentStep(Step.TransationStatus)
    for (const action of actions) {
      action.action()
    }
  }

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
          setCurrentStep={setCurrentStep}
          selectedChain={selectedChain}
          handleInitiateActions={handleInitiateActions}
          actions={actions}
        />
      )}
      {currentStep === Step.TransationStatus && <TransactionStatusCard actions={actions} />}
    </Box>
  )
}
