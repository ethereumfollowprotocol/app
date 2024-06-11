import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChainIcon } from '#/components/chain-icon'
import { useWaitForTransactionReceipt } from 'wagmi'

import { Step } from '../types'
import useChain from '#/hooks/use-chain'
import CancelButton from '#/components/cancel-button'
import TransactionDetails from './transaction-details'
import { useActions } from '#/contexts/actions-context'
import { PrimaryButton } from '#/components/primary-button'

interface TransactionStatusProps {
  onFinish: () => void
  setCurrentStep: (step: Step) => void
  handleReInitiateActions: () => void
}

/**
 * @description Component for displaying the status of an onchain transaction
 * and the details of the action being executed
 *
 * The component also provides a button to move to the next action, using the actions-context
 */
const TransactionStatus: React.FC<TransactionStatusProps> = ({
  onFinish,
  setCurrentStep,
  handleReInitiateActions
}) => {
  const {
    actions,
    currentAction,
    moveToNextAction,
    currentActionIndex,
    executeActionByIndex,
    allActionsSuccessful
  } = useActions()
  const chain = useChain(currentAction?.chainId)
  const { isSuccess } = useWaitForTransactionReceipt({
    hash: currentAction?.txHash,
    chainId: currentAction?.chainId
  })

  const { t: tBtn } = useTranslation('transactions')
  const { t } = useTranslation('transactions', { keyPrefix: 'action' })

  const handleNextAction = useCallback(() => {
    const nextActionIndex = moveToNextAction()
    executeActionByIndex(nextActionIndex)
  }, [moveToNextAction, executeActionByIndex])

  // Disable the next button if the current action is not successful
  const nextButtonIsDisabled = !isSuccess
  // Disable the finish button if not all actions are successful
  const finishButtonIsDisabled = !allActionsSuccessful

  const showNextButton = !(currentAction?.isConfirmationError || allActionsSuccessful)
  const showFinishButton = !currentAction?.isConfirmationError && allActionsSuccessful

  if (!currentAction) return null

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl sm:text-3xl font-semibold'>{t('title')}</h1>

        <p className='text-lg font-bold'>
          {currentActionIndex + 1} {t('of')} {actions.length}
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-xl sm:text-2xl font-bold'>{t('action')}</p>
        <p className='text-lg sm:text-xl font-bold'>
          {currentAction.label === 'create list' ? t(currentAction.label) : currentAction.label}
        </p>
      </div>
      {chain && (
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-lg sm:text-xl'>{t('chain')}</p>
          <div className='flex items-center gap-2'>
            <ChainIcon chain={chain} className='w-[30px] h-[30px]' />
            <p className='font-bold text-lg'>{chain.name}</p>
          </div>
        </div>
      )}
      <TransactionDetails action={currentAction} />
      <div className='w-full sm:mt-10 mt-6 gap-8 flex justify-between items-center'>
        <CancelButton onClick={() => setCurrentStep(Step.InitiateTransactions)} />
        {currentAction.isConfirmationError && (
          <PrimaryButton
            label={tBtn('reinitiate')}
            onClick={handleReInitiateActions}
            className='text-lg w-fit px-4 min-w-32 h-12'
          />
        )}
        {showNextButton && (
          <PrimaryButton
            label={tBtn('next')}
            onClick={handleNextAction}
            className='text-lg w-32 h-12'
            disabled={nextButtonIsDisabled}
          />
        )}
        {showFinishButton && (
          <PrimaryButton
            label={tBtn('finish')}
            onClick={onFinish}
            className='text-lg w-32 h-12'
            disabled={finishButtonIsDisabled}
          />
        )}
      </div>
    </>
  )
}

export default TransactionStatus
