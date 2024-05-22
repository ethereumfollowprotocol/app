'use client'

import { UserProfileCard } from '#/components/user-profile-card'
import { useAccount } from 'wagmi'
import LatestFollowers from './components/latest-followers'
import { Recommendations } from '#/components/recommendations'

const Summary = () => {
  const { address: userAddress } = useAccount()

  return (
    <div className='mt-12 md:mt-16 w-full lg:mt-24 xl:mt-32 px-4 md:px-6 flex items-start lg:justify-between xl:justify-center justify-center flex-wrap xl:flex-nowrap gap-y-4 xl:gap-4'>
      {userAddress ? (
        <>
          <UserProfileCard
            address={userAddress}
            stats={{ followers_count: 12, following_count: 8 }}
            borderColor='border-[#FFDBD9]'
          />
          <LatestFollowers />
        </>
      ) : (
        <div className='glass-card border-2 flex items-center justify-center rounded-2xl border-gray-200 w-full lg:w-1/2 h-64 lg:h-[638px]'>
          <p className='italic text-xl font-semibold text-gray-400'>Connect your wallet to view</p>
        </div>
      )}
      <Recommendations
        header='Discover'
        size='h-fit lg:h-[638px] w-full lg:w-[49%] xl:w-[40%] 2xl:w-[700px]'
      />
    </div>
  )
}

export default Summary
