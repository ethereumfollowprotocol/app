'use client'

import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'

import { FollowList } from '#/components/follow-list'
import type { DiscoverItemType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { fetchRecommendations } from '#/api/fetchRecommendations'

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
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()
  const { data: profilesToRecommend, isLoading } = useQuery({
    queryKey: [endpoint, userAddress, selectedList],
    queryFn: async () => {
      const discoverAccounts = await fetchRecommendations(endpoint, userAddress, selectedList)

      return discoverAccounts.filter(
        account => account.address.toLowerCase() !== userAddress?.toLowerCase()
      )
    },
    refetchInterval: 600000,
    staleTime: 600000
  })

  const displayedProfiles = limit ? profilesToRecommend?.slice(0, limit) : profilesToRecommend

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <div className='px-2 pt-2'>
        <h2 className='text-center lg:text-start text-2xl sm:text-3xl font-bold'>{header}</h2>
        <p className='text-center text-xs text-gray-400 italic font-medium'>{description}</p>
      </div>
      <FollowList
        isLoading={isLoading}
        loadingRows={limit}
        listClassName='rounded-xl px-2 sm:px-0 gap-3'
        profiles={displayedProfiles?.map(account => ({
          address: account.address,
          tags: [] as string[],
          ens: {
            name: account.name || undefined,
            avatar: account.avatar || undefined
          },
          counts:
            endpoint === 'discover'
              ? {
                  followers: (account as DiscoverItemType).followers,
                  following: (account as DiscoverItemType).following
                }
              : undefined
        }))}
        showFollowsYouBadges={true}
        showTags={false}
      />
      {!isLoading && displayedProfiles?.length === 0 && (
        <div className='w-full h-28 mb-14 flex justify-center items-center font-semibold italic text-lg'>
          No results
        </div>
      )}
    </div>
  )
}

export default Recommendations
