'use client'

import { UserProfileCard } from '#/components/user-profile-card'
import { useAccount } from 'wagmi'
import LatestFollowers from './components/latest-followers'
import { Recommendations } from '#/components/recommendations'

const Summary = () => {
  const { address: userAddress } = useAccount()

  if (!userAddress) return null

  return (
    <div className='mt-12 md:mt-16 lg:mt-24 xl:mt-32 px-4 md:px-6 lg:px-8 flex items-start lg:justify-between justify-center flex-wrap 2xl:flex-nowrap gap-y-4 2xl:gap-4'>
      <UserProfileCard
        address={userAddress}
        stats={{ followers_count: 12, following_count: 8 }}
        borderColor='border-[#FFDBD9]'
      />
      <LatestFollowers />
      <Recommendations
        header='Discover'
        size='h-fit lg:h-[638px] w-full lg:w-[49%] xl:w-[65%] 2xl:w-[700px]'
      />
    </div>
  )
}

export default Summary
