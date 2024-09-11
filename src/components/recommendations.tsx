'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { cn } from '#/lib/utilities'
import { FollowList } from '#/components/follow-list'
import type { DiscoverItemType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { fetchRecommendations } from '#/api/fetchRecommendations'
import PageSelector from '#/app/leaderboard/components/page-selector'

interface RecommendationsProps {
  header?: string
  className?: string
  limit?: number
  endpoint: 'discover' | 'recommended'
}

const Recommendations = ({ header, className, limit = 10, endpoint }: RecommendationsProps) => {
  const [page, setPage] = useState(1)
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data: profilesToRecommend
  } = useInfiniteQuery({
    queryKey: [endpoint, userAddress, selectedList, limit],
    queryFn: async ({ pageParam = 0 }) => {
      const discoverAccounts = await fetchRecommendations(
        endpoint,
        userAddress,
        selectedList,
        limit,
        pageParam
      )

      return {
        results: discoverAccounts.filter(
          account => account.address.toLowerCase() !== userAddress?.toLowerCase()
        ),
        nextPageParam: pageParam + 1,
        previousPageParam: pageParam > 0 ? pageParam - 1 : 0
      }
    },
    refetchInterval: 600000,
    staleTime: 600000,
    initialPageParam: page - 1,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    getPreviousPageParam: lastPage => lastPage.previousPageParam
  })

  const displayedProfiles = useMemo(() => {
    const pageIndex = profilesToRecommend?.pageParams.indexOf(page - 1) || 0
    return profilesToRecommend?.pages[pageIndex]?.results.slice(0, limit)
  }, [profilesToRecommend, page])

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className='px-2 pt-2 w-full'>
        <div className='w-full flex items-center justify-between'>
          <h2
            className={`text-center pl-2 sm:pl-0 lg:text-start text-2xl ${
              endpoint === 'recommended' ? '' : 'sm:text-3xl'
            } font-bold`}
          >
            {header}
          </h2>
          <PageSelector
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage && !(isFetchingNextPage || isLoading) && page <= 10}
            hasSkipToFirst={false}
            adjustUrl={false}
            displayPageNumber={false}
            fetchNext={fetchNextPage}
            fetchPrevious={fetchPreviousPage}
          />
        </div>
      </div>
      <FollowList
        isLoading={isLoading || isFetchingNextPage || isFetchingPreviousPage}
        loadingRows={endpoint === 'discover' ? 7 : limit}
        listClassName='rounded-xl px-2 sm:px-0 gap-3'
        profiles={displayedProfiles?.slice(0, endpoint === 'discover' ? 7 : limit).map(account => ({
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
      {!(isLoading || isFetchingNextPage || isFetchingPreviousPage) &&
        displayedProfiles?.length === 0 && (
          <div className='w-full h-28 mb-14 flex justify-center items-center font-bold italic text-lg'>
            No results
          </div>
        )}
      {endpoint === 'recommended' && (
        <div className='px-3 sm:px-2 pb-2'>
          <PageSelector
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage && !(isFetchingNextPage || isLoading) && page <= 10}
            hasSkipToFirst={false}
            adjustUrl={false}
            displayPageNumber={false}
            fetchNext={fetchNextPage}
            fetchPrevious={fetchPreviousPage}
          />
        </div>
      )}
    </div>
  )
}

export default Recommendations
