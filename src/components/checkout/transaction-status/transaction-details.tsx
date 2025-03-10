import { useTranslation } from 'react-i18next'
import { useWaitForTransactionReceipt } from 'wagmi'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { cn } from '#/lib/utilities'
import useChain from '#/hooks/use-chain'
import { SECOND } from '#/lib/constants'
import { useCart } from '#/hooks/use-cart'
import { useActions, type Action } from '#/contexts/actions-context'

const TransactionDetails = ({ action, isLastAction }: { action: Action; isLastAction?: boolean }) => {
  const { getChain } = useChain()
  const { currentChainId } = useChain()
  const chain = getChain(action.chainId)
  const { setIsCorrectChain, actions, currentActionIndex } = useActions()

  const { t } = useTranslation()
  const { cart } = useCart()
  const totalCartItems = cart.length
  const { isPending, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: action.txHash,
    chainId: action.chainId,
  })

  const [isLastActionSuccessful, setIsLastActionSuccessful] = useState(false)
  useEffect(() => {
    if (isSuccess)
      if (isLastAction) setTimeout(() => setIsLastActionSuccessful(true), (5 + totalCartItems / 100) * SECOND)
      else setIsCorrectChain(actions[currentActionIndex + 1]?.chainId === currentChainId)
  }, [isSuccess])

  const statusDescription = useMemo(() => {
    if (action.isPendingConfirmation) return 'approve'
    if (action.isConfirmationError) return `${t('error')}: ${t('confirmation error')}`
    if (isPending) return 'pending'
    if (isSuccess) return 'successful'
    if (isError) return `${t('error')} ${error}`
  }, [
    action.isPendingConfirmation,
    action.isConfirmationError,
    isPending,
    isSuccess,
    isError,
    isLastAction,
    isLastActionSuccessful,
  ])

  const getStatusColor = useCallback(() => {
    if (action.isPendingConfirmation) return 'text-blue-500'
    if (action.isConfirmationError) return 'text-red-500'
    if (isPending) return 'text-amber-400 loading-ellipsis'
    if (isSuccess) return 'text-green-500'
    if (isError) return 'text-red-600'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError, isLastAction, isLastActionSuccessful])

  const shouldShowComponent = isPending || isSuccess || isError || action.isPendingConfirmation

  const explorerUrl = `${
    chain?.blockExplorers?.blockscout?.url || chain?.blockExplorers?.default?.url
  }/tx/${action.txHash}`

  return shouldShowComponent ? (
    <div className='flex gap-1 flex-col'>
      <p className='text-xl sm:text-2xl font-bold'>{t('status title')}</p>
      <div className='flex flex-col gap-1'>
        <p className={cn(getStatusColor(), 'text-lg sm:text-xl font-bold')}>{t(statusDescription || '')}</p>
        {isLastAction && isSuccess && (
          <p
            className={cn(
              isLastActionSuccessful ? 'text-green-500' : 'text-amber-400 loading-ellipsis',
              'font-bold text-lg sm:text-xl'
            )}
          >
            {isLastActionSuccessful ? t('finished') : t('finishing')}
          </p>
        )}
      </div>
      {action.isPendingConfirmation ? (
        <p className='text-lg text-zinc-400 italic font-bold'>{t('check wallet')}</p>
      ) : (
        <a href={explorerUrl} target='_blank' rel='noreferrer' className='text-sm font-bold text-blue-600'>
          {t('block explorer')}
        </a>
      )}
    </div>
  ) : null
}

export default TransactionDetails
