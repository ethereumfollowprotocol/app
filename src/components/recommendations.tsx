'use client'

import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'

import fetchDiscover from '#/api/fetchDiscover'
import { FollowList } from '#/components/follow-list'

interface RecommendationsProps {
  header: string
  className?: string
  limit?: number
}

const Recommendations = ({ header, className, limit }: RecommendationsProps) => {
  const { data: profilesToRecommend, isLoading } = useQuery({
    queryKey: ['discover'],
    queryFn: async () => {
      const discoverAccounts = await fetchDiscover()
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
          ens: account.name
            ? {
                name: account.name,
                avatar: account.avatar
              }
            : undefined
        }))}
        showFollowsYouBadges={true}
        showTags={false}
      />
    </div>
  )
}

export default Recommendations
