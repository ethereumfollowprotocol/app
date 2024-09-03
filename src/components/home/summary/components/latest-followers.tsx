import { useTranslation } from 'react-i18next'
import { FollowList, type FollowListProfile } from '#/components/follow-list'

interface LatestFollowersProps {
  profiles?: FollowListProfile[]
  isLoading: boolean
}

const LatestFollowers: React.FC<LatestFollowersProps> = ({ profiles, isLoading }) => {
  const { t } = useTranslation()

  return (
    <div className='glass-card lg:max-h-[638px] w-full lg:w-[49%] xl:w-[450px] 2xl:w-108 px-2 py-4 sm:p-4 flex flex-col gap-4 rounded-2xl border-[3px] border-zinc-200 dark:border-zinc-500'>
      <h2 className='text-2xl sm:text-3xl w-full text-center lg:text-left p-2 font-bold'>
        {t('latest followers')}
      </h2>
      <FollowList
        profiles={profiles}
        showFollowsYouBadges={true}
        isLoading={isLoading}
        loadingRows={7}
        listClassName='gap-3'
      />
      {!isLoading && profiles?.length === 0 && (
        <div className='w-full lg:h-[638px] flex justify-center items-center font-bold italic text-lg'>
          {t('no followers')}
        </div>
      )}
    </div>
  )
}

export default LatestFollowers
