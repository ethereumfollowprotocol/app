import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { cn } from '#/lib/utilities'
import LoadingCell from '../../loaders/loading-cell'
import { profileCardSocials } from '#/lib/constants'

interface LoadingProfileCardProps {
  isResponsive?: boolean
  hideFollowButton?: boolean
  isStatic?: boolean
  className?: string
}

const LoadingProfileCard: React.FC<LoadingProfileCardProps> = ({
  isResponsive,
  hideFollowButton,
  isStatic,
  className,
}) => {
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()

  return (
    <div className={cn('border-grey rounded-sm border-[3px]', className)}>
      {isStatic && (
        <div className='absolute left-0 flex h-full w-full items-center justify-center rounded-[10px]'>
          <button
            className='connect-button w-60 cursor-pointer rounded-full border-[3px] p-4 text-xl font-bold shadow-lg'
            onClick={() => {
              if (openConnectModal) openConnectModal()
            }}
          >
            {t('connect wallet')}
          </button>
        </div>
      )}
      <div className='pointer-events-none absolute top-1 left-0 flex w-full justify-start px-2 font-bold text-zinc-500'>
        <LoadingCell isStatic={isStatic} className='mt-1 h-5 w-10 rounded-sm' />
      </div>
      <LoadingCell className='absolute top-0 left-0 -z-10 h-[120px] w-full rounded-t-lg' />

      <div
        className={`pointer-events-none flex w-full flex-col px-4 pt-8 pb-6 sm:p-6 sm:pt-9 xl:items-center ${
          isResponsive ? 'gap-5 sm:gap-6 md:gap-9 2xl:gap-10' : 'gap-5'
        }`}
      >
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <LoadingCell isStatic={isStatic} className='h-[100px] w-[100px] rounded-full' />
          <div
            className={`flex items-center ${isResponsive ? 'w-3/4 xl:w-full' : 'w-full'} flex-col justify-center gap-4`}
          >
            <div className='flex w-full flex-col items-center justify-center gap-2'>
              <LoadingCell isStatic={isStatic} className='h-7 w-48 rounded-sm sm:w-68 xl:w-3/4' />
              {!hideFollowButton && <LoadingCell isStatic={isStatic} className='h-10 w-[120px] rounded-sm' />}
            </div>
            <LoadingCell isStatic={isStatic} className='h-4 w-4/5 rounded-sm' />
            <div className='flex items-center gap-2'>
              {profileCardSocials.map((social) => (
                <LoadingCell key={social.name} isStatic={isStatic} className='h-8 w-8 rounded-full 2xl:h-9 2xl:w-9' />
              ))}
            </div>
          </div>
        </div>
        <div className='mx-auto flex w-full flex-wrap items-center justify-center gap-10 gap-y-6 text-center sm:gap-x-[50px] sm:gap-y-5 2xl:gap-x-[60px] 2xl:gap-y-6'>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='h-6 w-12 rounded-sm' />
            <div className='text-[16px] font-bold text-[#888] 2xl:text-lg dark:text-[#aaa]'>{t('following')}</div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='h-6 w-12 rounded-sm' />
            <div className='text-[16px] font-bold text-[#888] 2xl:text-lg dark:text-[#aaa]'>{t('followers')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingProfileCard
