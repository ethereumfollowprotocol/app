'use client'

import { UserProfileCard } from '#/components/user-profile-card'
import { useAccount } from 'wagmi'
import LatestFollowers from './components/latest-followers'
import { Recommendations } from '#/components/recommendations'

const Summary = () => {
  const { address: userAddress } = useAccount()

  if (!userAddress) return null

  return (
    <div className='mt-24 xl:mt-32 px-8 flex items-start lg:justify-between 2xl: justify-center flex-wrap 2xl:flex-nowrap gap-y-4 2xl:gap-6'>
      <UserProfileCard
        address={userAddress}
        stats={{ followers_count: 12, following_count: 8 }}
        borderColor='#FFDBD9'
      />
      <LatestFollowers />
      <Recommendations header='Discover' size='h-[638px] lg:w-[49%] xl:w-[65%] 2xl:w-[700px]' />
    </div>
  )
}

export default Summary
