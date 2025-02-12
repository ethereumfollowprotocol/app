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
    moveToInitiateTransactions,
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
    ),
  }[currentStep]

  return (
    <div>
      {claimPoapModalOpen && poapLink && (
        <ClaimPoapModal onClose={() => setClaimPoapModalOpen(false)} link={poapLink} isLoading={poapLoading} />
      )}
      <div className='glass-card bg-neutral/40 border-grey mt-28 mb-4 flex w-full flex-col items-center justify-between gap-5 rounded-xl border-[3px] p-6 py-8 text-center sm:w-[552px] sm:p-14'>
        {currentStepComponent}
      </div>
    </div>
  )
}

export default Checkout
