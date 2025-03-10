import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import type { ProfileStatsType } from '#/types/common'
import Link from 'next/link'

interface ProfileListItemCountsProps {
  counts?: ProfileStatsType
  isFollowersEmpty?: boolean
  address: Address
}

const ProfileListItemCounts: React.FC<ProfileListItemCountsProps> = ({ counts, isFollowersEmpty, address }) => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  if (!counts) {
    return null
  }

  return (
    <div
      className={cn(
        'max-w-1/3 items-center justify-end gap-6 pr-6 sm:gap-8 md:gap-16 lg:gap-16 xl:gap-10',
        userAddress ? 'xs:flex 3xl:flex hidden lg:hidden' : 'xs:flex hidden'
      )}
    >
      <Link
        href={`/${address}?tab=following`}
        className={`cursor-pointer flex-col items-center transition-transform hover:scale-110 ${
          userAddress && !isFollowersEmpty ? '3xl:flex lg:hidden' : '2xl:flex'
        } hidden sm:flex`}
      >
        <p className='text-lg font-bold'>{formatNumber(counts.following)}</p>
        <p className='text-text/60 text-center text-sm font-bold'>{t('following')}</p>
      </Link>
      <Link
        href={`/${address}?tab=followers`}
        className='flex cursor-pointer flex-col items-center transition-transform hover:scale-110'
      >
        <p className='text-lg font-bold'>{formatNumber(counts.followers)}</p>
        <p className='text-text/60 text-center text-sm font-bold'>{t('followers')}</p>
      </Link>
    </div>
  )
}

export default ProfileListItemCounts
