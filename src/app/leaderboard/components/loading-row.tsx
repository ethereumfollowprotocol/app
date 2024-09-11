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
    <div className='flex items-center w-full gap-4 p-2 sm:p-4 rounded-xl sm:gap-6 md:gap-8 h-[75px]'>
      <div className='tabular-nums min-w-4 w-4 xxs:min-w-6 xxs:w-6 sm:w-10 flex justify-center text-right'>
        <LoadingCell className='h-10 sm:h-12 w-4 xxs:w-8 sm:w-10 rounded-lg' />
      </div>
      <div
        className={cn(
          'flex gap-2 items-center w-[51%] 3xs:w-[54%] xxs:w-[56%] xs:w-2/3 sm:w-1/2 md:w-[40%]',
          isHome ? 'sm:w-full md:w-1/2 lg:w-[55%] xl:w-1/2' : 'xl:w-1/3'
        )}
        data-name='name-column'
      >
        <LoadingCell className='h-[45px] w-[45px] md:h-[50px] md:w-[50px] rounded-full' />
        <div className='flex flex-col w-2/3 max-w-20 xxs:max-w-32 items-start justify-center text-left'>
          <LoadingCell className='rounded-lg h-6 w-full' />
        </div>
      </div>
      <div
        className={cn(
          'items-center justify-between hidden sm:flex sm:w-1/5 md:w-[55%]',
          isHome && 'sm:w-fit md:w-2/5 lg:w-3/5 xl:w-1/4'
        )}
      >
        <div className='flex-col items-center w-1/2 lg:w-1/3 xl:w-1/4 hidden lg:flex gap-1'>
          <LoadingCell className='w-10 h-6 rounded-lg' />
          {staticStats ? (
            <p className='font-bold text-sm text-[#888] dark:text-[#aaa]'>{t('mutuals')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-md' />
          )}
        </div>
        <div className='hidden sm:flex flex-col items-center w-1/2 lg:w-1/3 xl:w-1/4 gap-1'>
          <LoadingCell className='w-10 h-6 rounded-lg' />
          {staticStats ? (
            <p className='font-bold text-sm text-[#888] dark:text-[#aaa]'>{t('followers')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-md' />
          )}
        </div>
        <div
          className={cn(
            'hidden md:flex flex-col items-center w-1/2 lg:w-1/3 xl:w-1/4 gap-1',
            isHome && 'xl:hidden'
          )}
        >
          <LoadingCell className='w-10 h-6 rounded-lg' />
          {staticStats ? (
            <p className='font-bold text-sm text-[#888] dark:text-[#aaa]'>{t('following')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-md' />
          )}
        </div>
        <div
          className={cn(
            'flex-col items-center w-1/2 lg:w-1/3 xl:w-1/4 gap-1 hidden xl:flex',
            isHome && 'lg:flex xl:hidden'
          )}
        >
          <LoadingCell className='w-10 h-6 rounded-lg' />
          {staticStats ? (
            <p className='font-bold text-sm text-[#888] dark:text-[#aaa]'>{t('blocked')}</p>
          ) : (
            <LoadingCell className='h-4 w-20 rounded-md' />
          )}
        </div>
      </div>
      <div
        className={cn(
          'w-fit flex justify-end',
          isHome ? 'lg:w-[25%] 2xl:w-[20%]' : 'lg:w-[15%] 2xl:w-[10%]'
        )}
      >
        <LoadingCell className='h-9 w-[107px] rounded-lg' />
      </div>
    </div>
  )
}

export default LoadingRow
