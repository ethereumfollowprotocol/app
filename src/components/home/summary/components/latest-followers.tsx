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
    address: '0xEA10c294b01659495932bC69c4a68A6b62326ff2' as Address,
    tags: []
  },
  {
    address: '0xBc4ABa27fFc74455597477dE5CACBBb4F8D5659e' as Address,
    tags: []
  },
  {
    address: '0x6Aa5eC5990977feE7AA1A4181Baa76dF243070E4' as Address,
    tags: []
  },
  {
    address: '0xd4713Cca4068700Cf722f8C2b6c05f948B75321b' as Address,
    tags: []
  },
  {
    address: '0x871b4be6Ec08a847c94a86C41aD449eF9d507b34' as Address,
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
