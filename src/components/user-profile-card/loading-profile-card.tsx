import { useTranslation } from 'react-i18next'
import LoadingCell from '../loading-cell'

interface LoadingProfileCardProps {
  isResponsive?: boolean
  hideFollowButton?: boolean
}

const LoadingProfileCard: React.FC<LoadingProfileCardProps> = ({
  isResponsive,
  hideFollowButton
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'profile card' })

  return (
    <>
      <div className='pointer-events-none text-gray-500 absolute flex justify-start px-2 w-full left-0 top-1 font-semibold'>
        <LoadingCell className='w-10 h-5 mt-1 rounded-lg' />
      </div>
      <div className='pointer-events-none flex w-full xl:items-center flex-col gap-5 sm:gap-6 md:gap-10 pt-2'>
        <div
          className={`flex w-full ${
            isResponsive ? 'flex-row xl:flex-col xl:justify-center' : 'flex-col justify-center'
          } items-center gap-5`}
        >
          <LoadingCell
            className={
              isResponsive
                ? 'h-[70px] w-[70px] sm:h-[75px] sm:w-[75px] xl:h-[100px] xl:w-[100px] rounded-full'
                : 'h-[100px] w-[100px] rounded-full'
            }
          />
          <div
            className={`flex  ${
              isResponsive ? 'xl:items-center items-start w-3/4 xl:w-full' : 'items-center w-full'
            } flex-col gap-2 justify-center`}
          >
            <LoadingCell className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
            {!hideFollowButton && <LoadingCell className='w-[107px] h-[37px] rounded-xl' />}
          </div>
        </div>
        <div
          className={`flex w-full flex-wrap ${
            isResponsive
              ? 'justify-between sm:justify-start xl:justify-center gap-0 sm:gap-y-10 sm:gap-x-16'
              : 'gap-y-10 gap-x-16 justify-center'
          }  items-center mx-autotext-center`}
        >
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell className='w-12 h-6 rounded-lg' />
            <div className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-gray-500`}>
              {t('following')}
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell className='w-12 h-6 rounded-lg' />
            <div className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-gray-500`}>
              {t('followers')}
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell className='w-12 h-6 rounded-lg' />
            <div className={`${isResponsive ? 'sm:text-lg' : 'text-lg'} font-bold text-gray-500`}>
              {t('leaderboard')}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingProfileCard
