'use client'

import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'

import { FollowList } from '#/components/follow-list'
import { fetchRecommendations } from '#/api/fetchRecommendations'
import type { DiscoverItemType } from '#/types/common'

interface RecommendationsProps {
  header?: string
  description?: string
  className?: string
  limit?: number
  endpoint: 'discover' | 'recommended'
}

const Recommendations = ({
  header,
  description,
  className,
  limit,
  endpoint
}: RecommendationsProps) => {
  const { address: userAddress } = useAccount()
  const { data: profilesToRecommend, isLoading } = useQuery({
    queryKey: [endpoint, userAddress],
    queryFn: async () => {
      const discoverAccounts = await fetchRecommendations(endpoint, userAddress)

      return discoverAccounts.filter(
        account => account.address.toLowerCase() !== userAddress?.toLowerCase()
      )
    }
  })

  const displayedProfiles = limit ? profilesToRecommend?.slice(0, limit) : profilesToRecommend

  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <div>
        <h2 className='text-center lg:text-start text-3xl font-bold'>{header}</h2>
        <p className='text-center text-xs text-gray-400 italic font-medium'>{description}</p>
      </div>
      <FollowList
        isLoading={isLoading}
        loadingRows={limit}
        listClassName='rounded-xl px-1 sm:px-0 gap-7'
        profiles={displayedProfiles?.map(account => ({
          address: account.address,
          tags: [] as string[],
          ens: undefined,
          counts:
            endpoint === 'discover'
              ? {
                  followers: (account as DiscoverItemType).followersCount,
                  following: (account as DiscoverItemType).followingCount
                }
              : undefined
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
