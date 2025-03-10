import { useTranslation } from 'react-i18next'

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
  // const { openConnectModal } = useConnectModal()

  return (
    <div className={cn('relative overflow-hidden rounded-sm', className)}>
      {/* {isStatic && (
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
      )} */}
      <div className='pointer-events-none absolute top-2 left-0 z-10 flex w-full justify-between px-4 font-bold text-zinc-500'>
        <LoadingCell isStatic={isStatic} className='mt-1 h-6 w-10 rounded-sm' />
        <LoadingCell isStatic={isStatic} className='mt-1 h-6 w-10 rounded-sm' />
      </div>
      <LoadingCell className='absolute top-0 left-0 z-0 h-[110px] w-full' />
      <div className='pointer-events-none z-10 flex w-full flex-col items-start px-4 pt-14'>
        <div className='flex w-full flex-col gap-4'>
          <div className='flex w-full items-end justify-between gap-2'>
            <LoadingCell isStatic={isStatic} className='h-[100px] w-[100px] rounded-full' />
            {hideFollowButton && <LoadingCell isStatic={isStatic} className='h-[39px] w-[110px] rounded-sm' />}
          </div>
          <div className='flex w-full flex-col justify-center gap-3'>
            <LoadingCell isStatic={isStatic} className='h-6 w-40 rounded-sm sm:w-68 xl:w-3/4' />
            <div className='mx-auto flex w-full flex-wrap gap-6 text-center sm:gap-x-[50px] sm:gap-y-5 2xl:gap-x-[60px] 2xl:gap-y-6'>
              <div className='flex items-center gap-1'>
                <LoadingCell isStatic={isStatic} className='h-6 w-12 rounded-sm' />
                <div className='text-sm font-bold text-[#888] 2xl:text-lg dark:text-[#aaa]'>{t('following')}</div>
              </div>
              <div className='flex items-center gap-1'>
                <LoadingCell isStatic={isStatic} className='h-6 w-12 rounded-sm' />
                <div className='text-sm font-bold text-[#888] 2xl:text-lg dark:text-[#aaa]'>{t('followers')}</div>
              </div>
            </div>
            <div className='flex w-full flex-col gap-2'>
              <LoadingCell isStatic={isStatic} className='h-4 w-68 rounded-sm xl:w-full' />
              <LoadingCell isStatic={isStatic} className='h-4 w-40 rounded-sm xl:w-2/3' />
            </div>
            <div className='flex items-center gap-2'>
              {profileCardSocials.map((social) => (
                <LoadingCell key={social.name} isStatic={isStatic} className='h-8 w-8 rounded-full 2xl:h-10 2xl:w-10' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingProfileCard
