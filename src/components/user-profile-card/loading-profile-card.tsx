import { useTranslation } from 'react-i18next'
import LoadingCell from '../loading-cell'

const LoadingProfileCard = () => {
  const { t } = useTranslation('common', { keyPrefix: 'profile card' })

  return (
    <>
      <div className='pointer-events-none text-gray-500 absolute flex justify-end xl:justify-start px-2 w-full left-0 top-1 font-semibold'>
        <LoadingCell className='w-10 h-5 mt-1 rounded-lg' />
      </div>
      <div className='pointer-events-none flex w-full xl:items-center flex-col gap-5 sm:gap-6 md:gap-9 pt-2'>
        <div className='flex w-full flex-row xl:flex-col xl:justify-center items-center gap-5'>
          <LoadingCell className='w-[70px] sm:w-[75px] xl:w-[100px] h-[70px] sm:h-[75px] xl:h-[100px] rounded-full' />
          <div className='flex xl:w-full xl:items-center flex-col items-start gap-2 justify-center'>
            <LoadingCell className='w-48 sm:w-68 xl:w-3/4 h-7 rounded-lg' />
            {/* <LoadingCell width='75%' height='20px' /> */}
          </div>
        </div>
        <div className='flex w-full flex-wrap xl:justify-center items-center mx-auto gap-0 justify-between sm:justify-start sm:gap-y-10 sm:gap-x-16 text-center'>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell className='w-12 h-6 rounded-lg' />
            <div className='sm:text-lg font-bold text-gray-500'>{t('following')}</div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell className='w-12 h-6 rounded-lg' />
            <div className='sm:text-lg text-gray-500 font-bold'>{t('followers')}</div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <LoadingCell className='w-12 h-6 rounded-lg' />
            <div className='sm:text-lg font-bold text-gray-500'>{t('leaderboard')}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingProfileCard
