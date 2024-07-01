'use client'

import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'

import fetchRecommendations from '#/api/fetchRecommendations'
import { FollowList } from '#/components/follow-list'
import { useAccount } from 'wagmi'

interface RecommendationsProps {
  header: string
  className?: string
  limit?: number
  endpoint: 'discover' | 'recommended'
}

const Recommendations = ({ header, className, limit, endpoint }: RecommendationsProps) => {
  const { address: userAddress } = useAccount()
  const { data: profilesToRecommend, isLoading } = useQuery({
    queryKey: [endpoint, userAddress],
    queryFn: async () => {
      const discoverAccounts = await fetchRecommendations(endpoint, userAddress)
      return discoverAccounts
    }
  })

  const displayedProfiles = limit ? profilesToRecommend?.slice(0, limit) : profilesToRecommend

  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <h2 className='text-center lg:text-start text-3xl font-bold'>{header}</h2>
      <FollowList
        isLoading={isLoading}
        loadingRows={limit}
        listClassName='rounded-xl px-1 sm:px-0 gap-7'
        profiles={displayedProfiles?.map(account => ({
          address: account.address,
          tags: [] as string[],
          ens: undefined
        }))}
        showFollowsYouBadges={true}
        showTags={false}
      />
      {!isLoading && displayedProfiles?.length === 0 && (
        <div className='w-full h-3/4 flex justify-center items-center font-semibold italic text-lg'>
          No results
        </div>
      )}
    </div>
  )
}

export default Recommendations
