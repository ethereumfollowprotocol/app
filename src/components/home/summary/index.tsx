'use client'

import { UserProfileCard } from '#/components/user-profile-card'
import LatestFollowers from './components/latest-followers'
import { Recommendations } from '#/components/recommendations'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useTranslation } from 'react-i18next'

const Summary = () => {
  const { t } = useTranslation('home')
  const { profile } = useEFPProfile()

  return (
    <div className='mt-36 md:mt-48 w-full lg:mt-52 xl:mt-60 px-4 lg:px-6 flex items-start lg:justify-between xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4 xl:gap-4'>
      {profile ? (
        <>
          <UserProfileCard
            profile={profile?.ens}
            stats={profile.stats}
            borderColor='border-[#FFDBD9]'
          />
          <LatestFollowers />
        </>
      ) : (
        <div className='glass-card border-2 flex items-center justify-center rounded-2xl border-gray-200 w-full lg:w-1/2 h-64 lg:h-[638px]'>
          <p className='italic text-xl font-semibold text-gray-400'>{t('connect wallet')}</p>
        </div>
      )}
      <Recommendations
        header={t('discover')}
        className='h-fit lg:h-[638px] w-full lg:w-[49%] xl:w-[40%] 2xl:w-[700px] p-6 glass-card border-2 border-[#0001] rounded-2xl'
      />
    </div>
  )
}

export default Summary
