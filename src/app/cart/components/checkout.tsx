import useCheckout from '#/app/cart/hooks/use-checkout'
import { Step } from '../../../components/checkout/types'
import ClaimPoapModal from '#/components/claim-poap-modal'
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
    poapLink,
    onFinish,
    poapLoading,
    currentStep,
    onNextAction,
    openPoapModal,
    selectedChain,
    setCurrentStep,
    handleChainClick,
    onInitiateActions,
    claimPoapModalOpen,
    setNewListAsPrimary,
    setClaimPoapModalOpen,
    setSetNewListAsPrimary,
    moveToInitiateTransactions
  } = useCheckout()

  const currentStepComponent = {
    [Step.SelectChain]: (
      <SelectChainCard
        chains={chains}
        isCreatingNewList={!hasCreatedEfpList}
        onCancel={() => setOpen(false)}
        handleChainClick={handleChainClick}
        selectedChain={selectedChain}
        handleNextStep={moveToInitiateTransactions}
        setNewListAsPrimary={setNewListAsPrimary}
        setSetNewListAsPrimary={setSetNewListAsPrimary}
      />
    ),
    [Step.InitiateTransactions]: (
      <InitiateActionsCard
        actions={actions}
        onCancel={() => setOpen(false)}
        setCurrentStep={setCurrentStep}
        handleInitiateActions={onInitiateActions}
      />
    ),
    [Step.TransactionStatus]: (
      <TransactionStatus
        onFinish={onFinish}
        openPoapModal={openPoapModal}
        setCurrentStep={setCurrentStep}
        handleNextAction={onNextAction}
        handleReInitiateActions={onInitiateActions}
      />
    )
  }[currentStep]

  return (
    <div>
      {claimPoapModalOpen && (
        <ClaimPoapModal
          onClose={() => setClaimPoapModalOpen(false)}
          link={poapLink}
          isLoading={poapLoading}
        />
      )}
      <div className='flex glass-card gap-5 bg-neutral/40 flex-col mt-28 mb-4 w-full sm:w-[552px] items-center border-[3px] border-grey text-center justify-between rounded-xl p-6 py-8 sm:p-14'>
        {currentStepComponent}
      </div>
    </div>
  )
}

export default Checkout
