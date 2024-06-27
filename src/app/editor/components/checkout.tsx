import useCheckout from '#/hooks/use-checkout'
import { Step } from '../../../components/checkout/types'
import TransactionStatus from '../../../components/checkout/transaction-status'
import { SelectChainCard } from '../../../components/checkout/select-chain-card'
import InitiateActionsCard from '../../../components/checkout/initiate-actions-card'

interface CheckoutProps {
  setOpen: (open: boolean) => void
  hasCreatedEfpList?: boolean
}

const Checkout: React.FC<CheckoutProps> = ({ setOpen, hasCreatedEfpList }) => {
  const {
    chains,
    actions,
    onFinish,
    currentStep,
    selectedChain,
    handleNextStep,
    setCurrentStep,
    handleChainClick,
    handleNextAction,
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
          onFinish={onFinish}
          setCurrentStep={setCurrentStep}
          handleNextAction={handleNextAction}
          handleReInitiateActions={handleInitiateActions}
        />
      )}
    </div>
  )
}

export default Checkout
