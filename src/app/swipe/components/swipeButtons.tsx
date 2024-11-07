import Image from 'next/image'
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
  onSwipeRight
}: SwipeButtonsProps) => {
  const { t } = useTranslation()

  return (
    <>
      <button
        className='absolute -left-1 sm:left-auto sm:mr-[475px] z-30 sm:z-10 top-48 sm:top-48 rounded-xl w-14 text-lg font-semibold h-14 flex items-center justify-center glass-card border-[3px] border-text/70 transition-all hover:scale-110'
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
        className='absolute -right-1 sm:right-auto sm:ml-[445px] z-30 sm:z-10 top-48 sm:top-48 rounded-xl w-14 h-14 flex items-center justify-center pl-1.5 pt-1 text-black btn-grad transition-all hover:scale-110'
        disabled={
          !userAddress ||
          recommendedProfiles.length === 0 ||
          isLoading ||
          (isFetchingNextPage && gone.size === recommendedProfiles.length)
        }
        onClick={onSwipeRight}
      >
        <Image src={MainnetBlack} alt='mainnet' width={24} height={24} />
      </button>
    </>
  )
}

export default SwipeButtons
