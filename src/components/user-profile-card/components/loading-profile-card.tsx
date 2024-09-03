import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import LoadingCell from '../../loaders/loading-cell'
import { profileCardSocials } from '#/lib/constants'
import Image from 'next/image'

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
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()

  const ranks = ['mutuals_rank', 'followers_rank', 'following_rank', 'blocks_rank']

  return (
    <>
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
      <div
        className={`pointer-events-none flex w-full xl:items-center flex-col pt-8 px-4 sm:p-6 sm:pt-9 pb-6 ${
          isResponsive ? 'gap-5 sm:gap-6 md:gap-10' : 'gap-[68px]'
        }`}
      >
        <div className='flex w-full flex-col justify-center items-center gap-5'>
          <LoadingCell isStatic={isStatic} className='h-[100px] w-[100px] rounded-full' />
          <div
            className={`flex items-center ${
              isResponsive ? 'w-3/4 xl:w-full' : 'w-full'
            } flex-col gap-4 justify-center`}
          >
            <div className='flex flex-col items-center justify-center gap-2 w-full'>
              <LoadingCell isStatic={isStatic} className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
              {!hideFollowButton && (
                <LoadingCell isStatic={isStatic} className='w-[107px] h-9 rounded-lg' />
              )}
            </div>
            <div className='flex gap-2 items-center opacity-20'>
              {profileCardSocials.map(social => (
                <Image
                  key={social.name}
                  src={social.icon}
                  alt={social.name}
                  width={37}
                  height={37}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='flex w-full flex-wrap justify-center gap-10 gap-y-6 sm:gap-y-9 sm:gap-x-[60px] items-center mx-auto text-center'>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='w-12 h-6 rounded-lg' />
            <div className='text-lg font-bold text-[#888] dark:text-[#aaa]'>{t('following')}</div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell isStatic={isStatic} className='w-12 h-6 rounded-lg' />
            <div className='text-lg font-bold text-[#888] dark:text-[#aaa]'>{t('followers')}</div>
          </div>
          <div className='flex flex-col w-full items-center gap-3 xl:w-56'>
            <div className='text-lg font-bold'>{t('leaderboard')}</div>
            <div className='flex xl:flex-col xl:w-full justify-center flex-wrap gap-3 xxs:gap-8 gap-y-3 xxs:gap-y-3 xl:gap-3'>
              {ranks.map((rank, i) => (
                <div
                  key={i}
                  className='flex xl:w-full gap-3 justify-between items-center font-bold'
                >
                  <p className='text-[#888] dark:text-[#aaa]'>{t(rank)}</p>
                  <LoadingCell className='h-5 w-10 rounded-md' isStatic={isStatic} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {!hideFollowButton && (
        <div className='w-full flex items-center mx-auto max-w-108 justify-center gap-2 p-4 pt-0'>
          <div className='flex items-center'>
            <LoadingCell isStatic={isStatic} className='w-9 h-9 rounded-full z-0 ' />
            <LoadingCell isStatic={isStatic} className='w-9 h-9 rounded-full z-10 -ml-[18px]' />
            <LoadingCell isStatic={isStatic} className='w-9 h-9 rounded-full z-20 -ml-[18px]' />
          </div>
          <LoadingCell
            isStatic={isStatic}
            className='h-10 rounded-xl'
            style={{ width: 'calc(100% - 80px)' }}
          />
        </div>
      )}
    </>
  )
}

export default LoadingProfileCard
