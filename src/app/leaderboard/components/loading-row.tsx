import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'

interface LoadingRowProps {
  staticStats?: boolean
}

const LoadingRow: React.FC<LoadingRowProps> = ({ staticStats = true }) => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className='flex flex-col'>
      <div className='flex h-[75px] w-full items-center gap-4 rounded-sm p-2 sm:gap-6 sm:p-4 md:gap-8'>
        <div className='xxs:min-w-6 xxs:w-6 flex w-4 min-w-4 justify-center text-right tabular-nums sm:w-10'>
          <LoadingCell className='xxs:w-8 h-10 w-4 rounded-sm sm:h-12 sm:w-10' />
        </div>
        <div
          className={`3xs:w-[54%] xxs:w-[56%] xs:w-2/3 flex w-[51%] items-center gap-2 sm:w-1/2 md:w-2/5 ${
            isHome ? 'w-full md:w-1/2 lg:w-[55%] xl:w-1/2' : 'xl:w-1/3'
          }`}
          data-name='name-column'
        >
          <LoadingCell className='h-[45px] w-[45px] rounded-full md:h-[50px] md:w-[50px]' />
          <div className='xxs:max-w-32 flex w-2/3 max-w-20 flex-col items-start justify-center text-left'>
            <LoadingCell className='h-6 w-full rounded-sm' />
          </div>
        </div>
        <div
          className={`hidden items-center justify-between gap-1 sm:flex ${
            isHome ? 'sm:w-1/4 md:w-1/3 lg:w-2/3 xl:w-1/4 2xl:w-1/3' : 'sm:w-1/4 md:w-3/5'
          }`}
        >
          <div
            className={cn(
              'hidden w-full flex-col items-center gap-1 sm:flex md:w-1/2 lg:w-1/4',
              isHome ? 'w-full xl:w-full 2xl:w-1/2' : 'xl:w-1/4'
            )}
          >
            <LoadingCell className='h-6 w-10 rounded-sm' />
            {staticStats ? (
              <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('mutuals')}</p>
            ) : (
              <LoadingCell className='h-4 w-20 rounded-sm' />
            )}
          </div>
          <div
            className={cn(
              'hidden w-1/2 flex-col items-center gap-1 md:flex lg:w-1/4 xl:w-1/4',
              isHome && 'xl:hidden 2xl:flex 2xl:w-1/2'
            )}
          >
            <LoadingCell className='h-6 w-10 rounded-sm' />
            {staticStats ? (
              <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('followers')}</p>
            ) : (
              <LoadingCell className='h-4 w-20 rounded-sm' />
            )}
          </div>
          <div
            className={cn('hidden w-1/2 flex-col items-center gap-1 lg:flex lg:w-1/4 xl:w-1/4', isHome && 'xl:hidden')}
          >
            <LoadingCell className='h-6 w-10 rounded-sm' />
            {staticStats ? (
              <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('following')}</p>
            ) : (
              <LoadingCell className='h-4 w-20 rounded-sm' />
            )}
          </div>
          <div
            className={cn(
              'hidden w-1/2 flex-col items-center gap-1 lg:flex lg:w-1/4 xl:w-1/4',
              isHome && 'lg:flex xl:hidden'
            )}
          >
            <LoadingCell className='h-6 w-10 rounded-sm' />
            {staticStats ? (
              <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('top8')}</p>
            ) : (
              <LoadingCell className='h-4 w-20 rounded-sm' />
            )}
          </div>
          <div
            className={cn('w-1/2 flex-col items-center gap-1 lg:w-1/4 xl:w-1/4', isHome ? 'hidden' : 'hidden xl:flex')}
          >
            <LoadingCell className='h-6 w-10 rounded-sm' />
            {staticStats ? (
              <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('blocked')}</p>
            ) : (
              <LoadingCell className='h-4 w-20 rounded-sm' />
            )}
          </div>
        </div>
        <div className={cn('flex w-fit justify-end', isHome ? 'lg:w-[25%] 2xl:w-[20%]' : 'lg:w-[15%] 2xl:w-[10%]')}>
          <LoadingCell className='h-10 w-[120px] rounded-sm' />
        </div>
      </div>
      <div className={`flex w-full items-center justify-evenly sm:hidden`}>
        <div className='flex flex-col items-center gap-0.5'>
          <LoadingCell className='h-6 w-10 rounded-sm' />
          {staticStats ? (
            <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('mutuals')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-sm' />
          )}
        </div>
        <div className='flex flex-col items-center gap-0.5'>
          <LoadingCell className='h-6 w-10 rounded-sm' />
          {staticStats ? (
            <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('followers')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-sm' />
          )}
        </div>
        <div className='flex flex-col items-center gap-0.5'>
          <LoadingCell className='h-6 w-10 rounded-sm' />
          {staticStats ? (
            <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('following')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-sm' />
          )}
        </div>
        <div className='flex flex-col items-center gap-0.5'>
          <LoadingCell className='h-6 w-10 rounded-sm' />
          {staticStats ? (
            <p className='text-sm font-bold text-[#888] dark:text-[#aaa]'>{t('top8')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-sm' />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoadingRow
