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
import { parseEther } from 'viem'
import { useAccount, useChains } from 'wagmi'
import useSendEth from '#/hooks/use-send-eth'

interface CreateOrUpdateEFPListProps {
  setOpen?: (open: boolean) => void // setOpen prop for this component's parent modal, which is passed to TransactionStatusCard to finish the process
}

export function CreateOrUpdateEFPList({ setOpen }: CreateOrUpdateEFPListProps) {
  // Any chains specified in wagmi are valid
  const chains = useChains() as unknown as ChainWithDetails[] // TODO: Fix this type issue
  // Setup states and context hooks
  const hasCreatedEfpList = false // Placeholder
  const { totalCartItems } = useCart()
  const { addActions, executeActionByIndex, actions } = useActions()

  const [selectedChainId, setSelectedChainId] = useState<number>()
  const selectedChain = chains.find(chain => chain.id === selectedChainId)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  // TODO: Implement real tx
  // Sim tx instead of real tx for now
  const { address: account } = useAccount()
  const sendEth = useSendEth({
    to: account,
    value: parseEther('0.01'),
    chainId: selectedChain?.id
  })

  // Prepare action functions
  const { createEFPList } = useCreateEFPList({ chainId: selectedChain?.id })

  useEffect(() => {
    if (!selectedChainId) return

    // Prepare and set actions when selectedChain is updated and not null
    const cartItemAction: Action = {
      id: EFPActionType.UpdateEFPList, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: `${totalCartItems} edits to List Records`,
      chainId: selectedChainId,
      execute: sendEth,
      isPendingConfirmation: false
    }

    const createEFPListAction: Action = {
      id: EFPActionType.CreateEFPList, // Unique identifier for the action
      type: EFPActionType.CreateEFPList,
      label: 'Create new EFP List',
      chainId: selectedChainId,
      execute: sendEth,
      isPendingConfirmation: false
    }
    const actions = hasCreatedEfpList ? [cartItemAction] : [createEFPListAction, cartItemAction]
    addActions(actions)
  }, [selectedChainId, totalCartItems, addActions, sendEth])

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
    // Execute the first action
    executeActionByIndex(0)
  }, [executeActionByIndex])

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
      {currentStep === Step.TransactionStatus && <TransactionStatusCard setOpen={setOpen} />}
    </Box>
  )
}
