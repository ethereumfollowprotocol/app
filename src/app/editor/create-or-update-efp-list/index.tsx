import { useCart } from '#/contexts/cart-context'
import type { ChainWithDetails } from '#/lib/wagmi'
import { Box } from '@radix-ui/themes'
import { useMemo, useState } from 'react'
import { useChains } from 'wagmi'
import { SelectChainCard } from './select-chain-card'
import { Step, type Action } from './types'
import { InitiateTransactionsCard } from './initiate-transactions-card'
import { TransactionStatusCard } from './transaction-status-card'

export function CreateOrUpdateEFPList() {
  const hasCreatedEfpList = false // TODO get this from context or fetch this
  const { totalCartItems } = useCart()

  const chains = useChains() as unknown as ChainWithDetails[] // TODO fix this cast as unknown
  const [selectedChain, setSelectedChain] = useState<ChainWithDetails | null>(null)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  // Cart item action
  const cartItemActionLabel = `${totalCartItems} edit${
    totalCartItems > 1 ? 's' : ''
  } to List Records`
  const cartItemAction = { label: cartItemActionLabel, chain: selectedChain }

  // Create EFP List action
  const CREATE_EFP_LIST_ACTION = {
    label: 'Create new EFP List',
    chain: chains.find(chain => chain.id === 1) // Mainnet
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
        <InitiateTransactionsCard
          setCurrentStep={setCurrentStep}
          selectedChain={selectedChain}
          handleInitiateTransactions={() => setCurrentStep(Step.TransationStatus)}
          actions={actions}
        />
      )}
      {currentStep === Step.TransationStatus && <TransactionStatusCard actions={actions} />}
    </Box>
  )
}
