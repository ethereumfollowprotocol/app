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
        <div className='text-xl text-center sm:text-2xl font-bold'>
          {stats === undefined ? '-' : stats.following_count}
        </div>
        <div className='sm:text-lg font-bold text-zinc-500'>{t('following')}</div>
      </div>
      <div>
        <div className='text-xl text-center sm:text-2xl font-bold'>
          {stats === undefined ? '-' : stats.followers_count}
        </div>
        <div className='sm:text-lg text-zinc-500 font-bold'>{t('followers')}</div>
      </div>
      <div>
        <div className='text-xl text-center sm:text-2xl font-bold'># -</div>
        <div className='sm:text-lg font-bold text-zinc-500'>{t('leaderboard')}</div>
      </div>
    </div>
  )
}

export default ProfileStats
