import clsx from 'clsx'
import { useCallback, useEffect, useMemo } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'

import useChain from '#/hooks/use-chain'
import type { Action } from '#/contexts/actions-context'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useTranslation } from 'react-i18next'

const TransactionDetails = ({ action }: { action: Action }) => {
  const chain = useChain(action.chainId)

  const { refetchProfile, refetchFollowing } = useEFPProfile()
  const { t } = useTranslation('transactions', { keyPrefix: 'status' })
  const { isPending, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: action.txHash,
    chainId: action.chainId
  })

  useEffect(() => {
    if (!isSuccess) return
    setTimeout(() => {
      refetchProfile()
      refetchFollowing()
    }, 1000)
  }, [isSuccess])

  const statusDescription = useMemo(() => {
    if (action.isPendingConfirmation) return t('approve')
    if (action.isConfirmationError) return `${t('error')}: ${t('confirmation error')}`
    if (isPending) return t('pending')
    if (isSuccess) return t('successful')
    if (isError) return `${t('error')} ${error}`
  }, [action.isPendingConfirmation, action.isConfirmationError, isPending, isSuccess, isError])

  const getStatusColor = useCallback(() => {
    if (action.isPendingConfirmation) return 'text-salmon-500'
    if (action.isConfirmationError) return 'text-salmon-500'
    if (isPending) return 'text-kournikova-600'
    if (isSuccess) return 'text-lime-600'
    if (isError) return 'text-red-600'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const shouldShowComponent = isPending || isSuccess || isError || action.isPendingConfirmation

  const explorerUrl = `${chain?.blockExplorers?.default.url}/tx/${action.txHash}`

  return shouldShowComponent ? (
    <div className='flex gap-1 sm:gap-2 flex-col'>
      <p className='text-xl sm:text-2xl font-bold'>{t('title')}</p>
      <p className={clsx(getStatusColor(), 'text-lg font-bold')}>{statusDescription}</p>
      {action.isPendingConfirmation ? (
        <p className='text-lg text-gray-400 italic font-bold'>{t('check wallet')}</p>
      ) : (
        <a
          href={explorerUrl}
          target='_blank'
          rel='noreferrer'
          className='text-sm font-bold text-blue-600'
        >
          {t('block explorer')}
        </a>
      )}
    </div>
  ) : null
}

export default TransactionDetails
