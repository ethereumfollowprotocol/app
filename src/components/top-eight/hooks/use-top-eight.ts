import { useState } from 'react'
import { isAddress, type Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import type { ENSProfile } from '#/types/requests'
import { fetchProfileFollowing } from '#/api/fetchProfileFollowing'

export type TopEightProfileType = {
  address: Address
  ens?: ENSProfile
}

export const useTopEight = (user: string | Address) => {
  const userIsList = !(isAddress(user) || (user.includes('.') && !Number.isNaN(Number(user))))
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [displayLimit, setDisplayLimit] = useState(window.innerWidth > 1024 ? 8 : 2)

  const {
    data: topEightFetched,
    isLoading: topEightIsLoading,
    isRefetching: topEightIsRefetching
  } = useQuery({
    queryKey: ['top8', user],
    queryFn: async () => {
      if (!user) return []

      const fetchedFollowing = await fetchProfileFollowing({
        addressOrName: user,
        list: userIsList ? user : undefined,
        limit: 100,
        pageParam: 0,
        tags: ['top8'],
        sort: 'latest first'
      })

      return fetchedFollowing.following
    },
    staleTime: 300000
  })

  const topEight =
    topEightFetched?.map(profile => ({ address: profile.data, ens: profile.ens })) || []

  return {
    topEight,
    displayLimit,
    editModalOpen,
    setDisplayLimit,
    setEditModalOpen,
    topEightIsLoading,
    topEightIsRefetching
  }
}
