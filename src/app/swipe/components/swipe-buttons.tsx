import { useTranslation } from 'react-i18next'
import type { SpringValue } from '@react-spring/web'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import ArrowUturnDown from 'public/assets/icons/ui/arrow-uturn-down.svg'

interface SwipeButtonsProps {
  userAddress?: string
  recommendedProfiles: {
    x: SpringValue<number>
    rot: SpringValue<number>
    scale: SpringValue<number>
    y: SpringValue<number>
  }[]
  isLoading: boolean
  isFetchingNextPage: boolean
  gone: Set<number>
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSwipeBack: () => void
  didSwipeBack: boolean
}

const SwipeButtons = ({
  userAddress,
  recommendedProfiles,
  isLoading,
  isFetchingNextPage,
  gone,
  onSwipeLeft,
  onSwipeRight,
  onSwipeBack,
  didSwipeBack,
}: SwipeButtonsProps) => {
  const { t } = useTranslation()

  return (
    <>
      <button
        className='bg-text/20 hover:bg-text/40 absolute top-0 -left-5 z-30 flex h-[450px] w-10 items-center justify-center rounded-sm text-lg font-semibold transition-colors sm:left-auto sm:z-10 sm:mr-[498px] sm:w-24 md:mr-[512px]'
        disabled={
          !userAddress ||
          recommendedProfiles.length === 0 ||
          isLoading ||
          (isFetchingNextPage && gone.size === recommendedProfiles.length)
        }
        onClick={onSwipeLeft}
      >
        <p className='rotate-90 text-sm sm:rotate-0'> {t('nope')}</p>
      </button>
      <button
        className='bg-primary/20 hover:bg-primary/40 absolute top-0 -right-5 z-30 flex h-[450px] w-10 items-center justify-center rounded-sm transition-colors sm:right-auto sm:z-10 sm:ml-[466px] sm:w-24 md:ml-[480px]'
        disabled={
          !userAddress ||
          recommendedProfiles.length === 0 ||
          isLoading ||
          (isFetchingNextPage && gone.size === recommendedProfiles.length)
        }
        onClick={onSwipeRight}
      >
        <div className='flex -rotate-90 flex-row items-center sm:rotate-0'>
          <MainnetBlack width={24} height={24} />
          <p className='text-sm font-semibold'>{t('follow')}</p>
        </div>
      </button>
      <button
        className='bg-text/20 hover:bg-text/40 fixed bottom-10 z-40 hidden cursor-pointer flex-row-reverse items-center gap-2 rounded-sm px-3 py-2 text-xl transition-all hover:scale-110 disabled:hidden sm:flex'
        onClick={onSwipeBack}
        disabled={didSwipeBack || gone.size === 0}
      >
        <p className='text-sm font-semibold'>{t('undo')}</p> <ArrowUturnDown className='h-auto w-4' />
      </button>
    </>
  )
}

export default SwipeButtons
