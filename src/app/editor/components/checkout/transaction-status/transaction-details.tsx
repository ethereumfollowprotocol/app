import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'

import useChain from '#/hooks/use-chain'
import type { Action } from '#/contexts/actions-context'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useTranslation } from 'react-i18next'

const TransactionDetails = ({ action }: { action: Action }) => {
  const chain = useChain(action.chainId)

  const { refetchProfile } = useEFPProfile()
  const { t } = useTranslation('transactions', { keyPrefix: 'status' })
  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: action.txHash,
    chainId: action.chainId
  })

  useEffect(() => {
    setTimeout(() => refetchProfile(), 1000)
  }, [isSuccess])

  const getStatusDescription = useCallback(() => {
    if (action.isPendingConfirmation) return t('approve')
    if (isPending) return t('pending')
    if (isSuccess) return t('successful')
    if (isError) return t('error')
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const getStatusColor = useCallback(() => {
    if (action.isPendingConfirmation) return 'text-salmon-500'
    if (isPending) return 'text-kournikova-600'
    if (isSuccess) return 'text-lime-600'
    if (isError) return 'text-red-600'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const shouldShowComponent = isPending || isSuccess || isError || action.isPendingConfirmation

  const explorerUrl = `${chain?.blockExplorers?.default.url}/tx/${action.txHash}`

  return shouldShowComponent ? (
    <div className='flex gap-1 sm:gap-2 flex-col'>
      <p className='text-xl sm:text-2xl font-bold'>{t('title')}</p>
      <p className={clsx(getStatusColor(), 'text-lg font-bold')}>{getStatusDescription()}</p>
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
