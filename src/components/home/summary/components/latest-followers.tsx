import { useTranslation } from 'react-i18next'
import { FollowList, type FollowListProfile } from '#/components/follow-list'

interface LatestFollowersProps {
  profiles?: FollowListProfile[]
  isLoading: boolean
}

const LatestFollowers: React.FC<LatestFollowersProps> = ({ profiles, isLoading }) => {
  const { t } = useTranslation('home')

  return (
    <div className='glass-card w-full lg:w-[49%] xl:w-[450px] 2xl:w-108 px-2 py-4 sm:p-6 flex flex-col gap-8 rounded-2xl border-2 border-gray-200'>
      <h2 className='text-2xl sm:text-3xl w-full text-center lg:text-left font-bold'>
        {t('latest followers')}
      </h2>

      <FollowList
        profiles={profiles}
        showFollowsYouBadges={true}
        isLoading={isLoading}
        loadingRows={7}
        listClassName='gap-7 px-1 sm:px-0'
      />
    </div>
  )
}

export default LatestFollowers
