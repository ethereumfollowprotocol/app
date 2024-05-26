import { FollowList } from '#/components/follow-list'
import { useTranslation } from 'react-i18next'
import type { Address } from 'viem'

const MOCK_PROFILES_DATA = [
  {
    address: '0x2425124064f82bf68c6844fec4515b071d4b821a' as Address,
    tags: []
  },
  {
    address: '0x983110309620D911731Ac0932219af06091b6744' as Address,
    tags: []
  },
  {
    address: '0x2425124064f82bf68c6844fec4515b071d4b821a' as Address,
    tags: []
  },
  {
    address: '0x983110309620D911731Ac0932219af06091b6744' as Address,
    tags: []
  },
  {
    address: '0x2425124064f82bf68c6844fec4515b071d4b821a' as Address,
    tags: []
  },
  {
    address: '0x983110309620D911731Ac0932219af06091b6744' as Address,
    tags: []
  },
  {
    address: '0x2425124064f82bf68c6844fec4515b071d4b821a' as Address,
    tags: []
  }
]

const LatestFollowers = () => {
  const { t } = useTranslation('home')

  return (
    <div className='glass-card w-full lg:w-[49%] xl:w-[30%] 2xl:w-108 p-6 flex flex-col gap-8 rounded-2xl border-2 border-gray-200'>
      <h2 className='text-2xl sm:text-3xl w-full text-center lg:text-left font-bold'>
        {t('latest followers')}
      </h2>
      <FollowList profiles={MOCK_PROFILES_DATA} showFollowsYouBadges={true} listClassName='gap-7' />
    </div>
  )
}

export default LatestFollowers
