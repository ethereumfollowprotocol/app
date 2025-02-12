import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChainIcon } from '#/components/chain-icon'
import { useWaitForTransactionReceipt } from 'wagmi'

import { Step } from '../types'
import { SECOND } from '#/lib/constants'
import useChain from '#/hooks/use-chain'
import { useCart } from '#/hooks/use-cart'
import TransactionDetails from './transaction-details'
import { useActions } from '#/contexts/actions-context'
import CancelButton from '#/components/buttons/cancel-button'
import PrimaryButton from '#/components/buttons/primary-button'

interface TransactionStatusProps {
  onFinish: () => void
  setCurrentStep: (step: Step) => void
  handleReInitiateActions: () => void
  handleNextAction: () => void
  openPoapModal?: () => void
}

/**
 * @description Component for displaying the status of an onchain transaction
 * and the details of the action being executed
 */
const TransactionStatus: React.FC<TransactionStatusProps> = ({
  onFinish,
  setCurrentStep,
  handleReInitiateActions,
  handleNextAction,
  openPoapModal,
}) => {
  const { actions, currentAction, currentActionIndex, allActionsSuccessful, isCorrectChain } = useActions()
  const { getChain } = useChain()
  const chain = getChain(currentAction?.chainId)
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash: currentAction?.txHash,
    chainId: currentAction?.chainId,
  })

  const { t } = useTranslation()
  const { cart } = useCart()
  const totalCartItems = cart.length
  // Add separate transaction finished state for custom delay to wait for backend to update after finishing the llast transaction
  const [transactionsAreFinished, setTransactionsAreFinished] = useState(false)
  useEffect(() => {
    if (allActionsSuccessful) {
      openPoapModal?.()
      setTimeout(() => setTransactionsAreFinished(true), (5 + totalCartItems / 100) * SECOND)
    }
  }, [allActionsSuccessful])

  const isLastAction = currentActionIndex + 1 === actions.length
  // Disable the next button if the current action is not successful
  const nextButtonIsDisabled = isLastAction ? !transactionsAreFinished : !isSuccess
  // Disable the finish button if not all actions are successful
  const finishButtonIsDisabled = !transactionsAreFinished
  const showNextButton = !(isLastAction || currentAction?.isConfirmationError)
  const showFinishButton = isLastAction && !currentAction?.isConfirmationError

  if (!currentAction) return null

  return (
    <>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold'>{t('status title')}</h1>
        <p className='text-lg font-bold'>
          {currentActionIndex + 1} {t('of')} {actions.length}
        </p>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-xl font-bold'>{t('action')}</p>
        <p className='text-lg font-bold'>
          {currentAction.label === 'create list' ? t(currentAction.label) : currentAction.label}
        </p>
      </div>
      {chain && (
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-bold sm:text-xl'>{t('chain')}</p>
          <div className='flex items-center gap-2'>
            <ChainIcon chain={chain} className='h-[30px] w-[30px]' />
            <p className='text-lg font-bold'>{chain.name}</p>
          </div>
        </div>
      )}
      <TransactionDetails action={currentAction} isLastAction={isLastAction} />
      <div className='mt-6 flex w-full items-center justify-between gap-8'>
        <CancelButton
          label={t('back')}
          onClick={() => setCurrentStep(Step.InitiateTransactions)}
          disabled={isSuccess || isLoading}
          className='bg-[#cccccc]'
        />
        {currentAction.isConfirmationError && (
          <PrimaryButton
            label={t(isCorrectChain ? 'reinitiate' : 'switch chain')}
            onClick={handleReInitiateActions}
            className='w-fit min-w-32 px-4 text-lg'
          />
        )}
        {showNextButton && (
          <PrimaryButton
            label={t(isCorrectChain ? 'next' : 'switch chain')}
            onClick={handleNextAction}
            className='w-32 text-lg'
            disabled={nextButtonIsDisabled}
          />
        )}
        {showFinishButton && (
          <PrimaryButton
            label={t('finish')}
            onClick={() => onFinish()}
            className='w-32 text-lg'
            disabled={finishButtonIsDisabled}
          />
        )}
      </div>
    </>
  )
}

export default TransactionStatus
