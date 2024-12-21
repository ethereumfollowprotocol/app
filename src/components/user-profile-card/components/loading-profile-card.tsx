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
  className
}) => {
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()

  return (
    <div className={cn('border-[3px] border-grey rounded-xl', className)}>
      {isStatic && (
        <div className='absolute w-full h-full left-0 rounded-[10px] flex items-center justify-center'>
          <button
            className='connect-button cursor-pointer font-bold text-xl w-60 p-4 rounded-full border-[3px] shadow-lg'
            onClick={() => {
              if (openConnectModal) openConnectModal()
            }}
          >
            {t('connect wallet')}
          </button>
        </div>
      )}
      <div className='pointer-events-none text-zinc-500 absolute flex justify-start px-2 w-full left-0 top-1 font-bold'>
        <LoadingCell isStatic={isStatic} className='w-10 h-5 mt-1 rounded-lg' />
      </div>
      <LoadingCell className='w-full h-[120px] absolute top-0 rounded-t-lg left-0 -z-10' />

      <div
        className={`pointer-events-none flex w-full xl:items-center flex-col pt-8 px-4 sm:p-6 sm:pt-9 pb-6 ${
          isResponsive ? 'gap-5 sm:gap-6 md:gap-9 2xl:gap-10' : 'gap-5'
        }`}
      >
        <div className='flex w-full flex-col justify-center items-center gap-4'>
          <LoadingCell isStatic={isStatic} className='h-[100px] w-[100px] rounded-full' />
          <div
            className={`flex items-center ${
              isResponsive ? 'w-3/4 xl:w-full' : 'w-full'
            } flex-col gap-4 justify-center`}
          >
            <div className='flex flex-col items-center justify-center gap-2 w-full'>
              <LoadingCell isStatic={isStatic} className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
              {!hideFollowButton && (
                <LoadingCell isStatic={isStatic} className='w-[120px] h-10 rounded-lg' />
              )}
            </div>
            <LoadingCell isStatic={isStatic} className='w-4/5 h-4 rounded-lg' />
            <div className='flex gap-2 items-center'>
              {profileCardSocials.map(social => (
                <LoadingCell
                  key={social.name}
                  isStatic={isStatic}
                  className='w-8 h-8 2xl:w-9 2xl:h-9 rounded-full'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='flex w-full flex-wrap justify-center gap-10 gap-y-6 sm:gap-y-5 2xl:gap-y-6 sm:gap-x-[50px] 2xl:gap-x-[60px] items-center mx-auto text-center'>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='w-12 h-6 rounded-lg' />
            <div className='text-[16px] 2xl:text-lg font-bold text-[#888] dark:text-[#aaa]'>
              {t('following')}
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='w-12 h-6 rounded-lg' />
            <div className='text-[16px] 2xl:text-lg font-bold text-[#888] dark:text-[#aaa]'>
              {t('followers')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingProfileCard
