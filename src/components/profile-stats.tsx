import { useTranslation } from 'react-i18next'
import type { StatsResponse } from '#/types/requests'

interface ProfileStatsProps {
  stats?: StatsResponse
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const { t } = useTranslation()

  return (
    <div className='flex w-full items-center justify-between'>
      <div>
        <div className='text-center text-xl font-bold sm:text-2xl'>
          {stats === undefined ? '-' : stats.following_count}
        </div>
        <div className='font-bold text-zinc-500 sm:text-lg'>{t('following')}</div>
      </div>
      <div>
        <div className='text-center text-xl font-bold sm:text-2xl'>
          {stats === undefined ? '-' : stats.followers_count}
        </div>
        <div className='font-bold text-zinc-500 sm:text-lg'>{t('followers')}</div>
      </div>
      <div>
        <div className='text-center text-xl font-bold sm:text-2xl'># -</div>
        <div className='font-bold text-zinc-500 sm:text-lg'>{t('leaderboard')}</div>
      </div>
    </div>
  )
}

export default ProfileStats
