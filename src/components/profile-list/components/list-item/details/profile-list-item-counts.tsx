import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import type { ProfileStatsType } from '#/types/common'

interface ProfileListItemCountsProps {
  counts?: ProfileStatsType
  isFollowersEmpty?: boolean
  address: Address
}

const ProfileListItemCounts: React.FC<ProfileListItemCountsProps> = ({
  counts,
  isFollowersEmpty,
  address
}) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  if (!counts) {
    return null
  }

  return (
    <div
      className={cn(
        'items-center max-w-1/3 justify-end pr-6 sm:gap-8 gap-6 md:gap-16 lg:gap-16 xl:gap-10',
        userAddress ? 'hidden xs:flex lg:hidden 3xl:flex' : 'hidden xs:flex'
      )}
    >
      <div
        className={`flex-col items-center hover:scale-110 cursor-pointer transition-transform ${
          userAddress && !isFollowersEmpty ? 'lg:hidden 3xl:flex' : '2xl:flex'
        } hidden sm:flex`}
        onClick={() => router.push(`/${address}?tab=following`)}
      >
        <p className='font-bold text-lg'>{formatNumber(counts.following)}</p>
        <p className='font-bold text-sm text-center text-text/60'>{t('following')}</p>
      </div>
      <div
        className='flex flex-col items-center hover:scale-110 cursor-pointer transition-transform'
        onClick={() => router.push(`/${address}?tab=followers`)}
      >
        <p className='font-bold text-lg'>{formatNumber(counts.followers)}</p>
        <p className='font-bold text-sm text-center text-text/60'>{t('followers')}</p>
      </div>
    </div>
  )
}

export default ProfileListItemCounts
