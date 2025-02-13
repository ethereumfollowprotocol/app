import { useTranslation } from 'react-i18next'
import type { SpringValue } from '@react-spring/web'
import MainnetBlack from 'public/assets/mainnet-black.svg'

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
}

const SwipeButtons = ({
  userAddress,
  recommendedProfiles,
  isLoading,
  isFetchingNextPage,
  gone,
  onSwipeLeft,
  onSwipeRight,
}: SwipeButtonsProps) => {
  const { t } = useTranslation()

  return (
    <>
      <button
        className='glass-card border-text/70 absolute top-48 -left-1 z-30 flex h-14 w-14 items-center justify-center rounded-sm border-[3px] text-lg font-semibold transition-all hover:scale-110 sm:top-48 sm:left-auto sm:z-10 sm:mr-[475px]'
        disabled={
          !userAddress ||
          recommendedProfiles.length === 0 ||
          isLoading ||
          (isFetchingNextPage && gone.size === recommendedProfiles.length)
        }
        onClick={onSwipeLeft}
      >
        {t('meh')}
      </button>
      <button
        className='btn-grad absolute top-48 -right-1 z-30 flex h-14 w-14 items-center justify-center rounded-sm pt-1 pl-1.5 text-black transition-all hover:scale-110 sm:top-48 sm:right-auto sm:z-10 sm:ml-[445px]'
        disabled={
          !userAddress ||
          recommendedProfiles.length === 0 ||
          isLoading ||
          (isFetchingNextPage && gone.size === recommendedProfiles.length)
        }
        onClick={onSwipeRight}
      >
        <MainnetBlack width={24} height={24} />
      </button>
    </>
  )
}

export default SwipeButtons
