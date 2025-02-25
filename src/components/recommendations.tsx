'use client'

import { useAccount } from 'wagmi'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { cn } from '#/lib/utilities'
import ProfileList from '#/components/profile-list'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { fetchRecommendations } from '#/api/recommended/fetch-recommendations'
import PageSelector from '#/components/page-selector'

interface RecommendationsProps {
  header?: string
  className?: string
  limit?: number
  endpoint: 'discover' | 'recommended'
  isTopEight?: boolean
}

const Recommendations = ({ header, className, limit = 10, endpoint, isTopEight = false }: RecommendationsProps) => {
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
    data: profilesToRecommend,
  } = useInfiniteQuery({
    queryKey: [endpoint, userAddress, endpoint === 'recommended' ? selectedList : undefined, limit],
    queryFn: async ({ pageParam = 0 }) => {
      const discoverAccounts = await fetchRecommendations(
        endpoint,
        userAddress,
        selectedList,
        endpoint === 'discover' ? limit + 1 : limit,
        pageParam
      )

      return {
        results: discoverAccounts,
        nextPageParam: pageParam + 1,
        previousPageParam: pageParam > 0 ? pageParam - 1 : 0,
      }
    },
    refetchInterval: 600000,
    staleTime: 600000,
    initialPageParam: page - 1,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    getPreviousPageParam: (lastPage) => lastPage.previousPageParam,
  })

  const displayedProfiles = useMemo(() => {
    const pageIndex = profilesToRecommend?.pageParams.indexOf(page - 1) || 0
    return profilesToRecommend?.pages[pageIndex]?.results?.slice(0, limit)
  }, [profilesToRecommend, page])

  useEffect(() => {
    setPage(1)
  }, [userAddress, selectedList, limit])

  return (
    <div className={cn('bg-neutral shadow-medium flex flex-col gap-4 rounded-sm p-4 2xl:gap-6', className)}>
      <div className='w-full pt-2 sm:px-1'>
        <div className='flex w-full items-center justify-between'>
          <h2
            className={`pl-2 text-start text-2xl sm:pl-0 ${endpoint === 'recommended' ? '' : '2xl:text-3xl'} font-bold`}
          >
            {header}
          </h2>
          <Suspense>
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
          </Suspense>
        </div>
      </div>
      <ProfileList
        isLoading={isLoading || isFetchingNextPage || isFetchingPreviousPage}
        loadingRows={limit}
        profiles={displayedProfiles?.slice(0, limit).map((account) => ({
          address: account.address,
          tags: [] as string[],
          ens: {
            name: account.name || undefined,
            avatar: account.avatar || undefined,
          },
        }))}
        showFollowsYouBadges={true}
        showTags={false}
        isTopEight={isTopEight}
      />
      {!(isLoading || isFetchingNextPage || isFetchingPreviousPage) &&
        (displayedProfiles?.length === 0 || !displayedProfiles) && (
          <div className='mb-14 flex h-28 w-full items-center justify-center text-lg font-bold italic'>No results</div>
        )}
    </div>
  )
}

export default Recommendations
