import { Step } from './types'
import useCheckout from '#/hooks/use-checkout'
import TransactionStatus from './transaction-status'
import { SelectChainCard } from './select-chain-card'
import { InitiateActionsCard } from './initiate-actions-card'

interface CheckoutProps {
  setOpen: (open: boolean) => void
  hasCreatedEfpList?: boolean
}

const Checkout: React.FC<CheckoutProps> = ({ setOpen, hasCreatedEfpList }) => {
  const {
    chains,
    actions,
    currentStep,
    setCurrentStep,
    selectedChain,
    handleChainClick,
    handleNextStep,
    handleInitiateActions
  } = useCheckout()

  return (
    <div className='flex glass-card gap-4 sm:gap-6 flex-col w-full sm:w-[552px] items-center border-2 border-gray-200 text-center justify-between rounded-xl p-6 py-8 sm:p-16'>
      {currentStep === Step.SelectChain && (
        <SelectChainCard
          chains={chains}
          isCreatingNewList={!hasCreatedEfpList}
          onCancel={() => setOpen(false)}
          handleChainClick={handleChainClick}
          selectedChain={selectedChain}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === Step.InitiateTransactions && (
        <InitiateActionsCard
          actions={actions}
          onCancel={() => setOpen(false)}
          setCurrentStep={setCurrentStep}
          handleInitiateActions={handleInitiateActions}
        />
      )}
      {currentStep === Step.TransactionStatus && (
        <TransactionStatus
          setOpen={setOpen}
          setCurrentStep={setCurrentStep}
          handleReInitiateActions={handleInitiateActions}
        />
      )}
    </div>
  )
}

export default Checkout
