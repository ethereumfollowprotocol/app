import { useTranslation } from 'react-i18next'
import { FollowList, type FollowListProfile } from '#/components/follow-list'

interface LatestFollowersProps {
  profiles?: FollowListProfile[]
}

const LatestFollowers: React.FC<LatestFollowersProps> = ({ profiles }) => {
  const { t } = useTranslation('home')

  return (
    <div className='glass-card w-full lg:w-[49%] xl:w-[30%] 2xl:w-108 p-6 flex flex-col gap-8 rounded-2xl border-2 border-gray-200'>
      <h2 className='text-2xl sm:text-3xl w-full text-center lg:text-left font-bold'>
        {t('latest followers')}
      </h2>
      {profiles && (
        <FollowList profiles={profiles} showFollowsYouBadges={true} listClassName='gap-7' />
      )}
    </div>
  )
}

export default LatestFollowers
