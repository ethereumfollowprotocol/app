import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import LoadingCell from '../loading-cell'

interface LoadingProfileCardProps {
  isResponsive?: boolean
  hideFollowButton?: boolean
  isStatic?: boolean
}

const LoadingProfileCard: React.FC<LoadingProfileCardProps> = ({
  isResponsive,
  hideFollowButton,
  isStatic
}) => {
  const { openConnectModal } = useConnectModal()
  const { t } = useTranslation('common', { keyPrefix: 'profile card' })

  const ranks = ['mutuals_rank', 'followers_rank', 'following_rank', 'blocks_rank']

  return (
    <>
      {isStatic && (
        <div className='absolute w-full h-full left-0 rounded-[10px] flex items-center justify-center'>
          <button
            className='connect-button cursor-pointer font-bold text-xl w-60 p-4 rounded-full border-2 shadow-lg'
            onClick={() => {
              if (openConnectModal) openConnectModal()
            }}
          >
            {t('connect wallet')}
          </button>
        </div>
      )}
      <div className='pointer-events-none text-gray-500 absolute flex justify-start px-2 w-full left-0 top-1 font-semibold'>
        <LoadingCell isStatic={isStatic} className='w-10 h-5 mt-1 rounded-lg' />
      </div>
      <div
        className={`pointer-events-none flex w-full xl:items-center flex-col ${
          isResponsive ? 'gap-5 sm:gap-6 md:gap-10' : 'gap-[68px]'
        } pt-2`}
      >
        <div className='flex w-full flex-col justify-center items-center gap-5'>
          <LoadingCell isStatic={isStatic} className='h-[100px] w-[100px] rounded-full' />
          <div
            className={`flex items-center ${
              isResponsive ? 'w-3/4 xl:w-full' : 'w-full'
            } flex-col gap-2 justify-center`}
          >
            <LoadingCell isStatic={isStatic} className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
            {!hideFollowButton && (
              <LoadingCell isStatic={isStatic} className='w-[107px] h-9 rounded-lg' />
            )}
          </div>
        </div>
        <div className='flex w-full flex-wrap justify-center gap-10 gap-y-6 sm:gap-y-9 sm:gap-x-[60px] items-center mx-auto text-center'>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='w-12 h-6 rounded-lg' />
            <div className='text-lg font-bold text-gray-500'>{t('following')}</div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='w-12 h-6 rounded-lg' />
            <div className='text-lg font-bold text-gray-500'>{t('followers')}</div>
          </div>
          <div className='flex flex-col w-full items-center gap-3 xl:w-56'>
            <div className='text-lg font-bold text-darkGrey'>{t('leaderboard')}</div>
            <div className='flex xl:flex-col xl:w-full justify-center flex-wrap gap-3 xxs:gap-8 gap-y-3 xxs:gap-y-3 xl:gap-3'>
              {ranks.map((rank, i) => (
                <div
                  key={i}
                  className='flex xl:w-full gap-3 justify-between items-center font-semibold'
                >
                  <p className='text-[#888]'>{t(rank)}</p>
                  <LoadingCell className='h-5 w-10 rounded-md' isStatic={isStatic} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingProfileCard
