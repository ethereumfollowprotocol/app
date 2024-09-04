import { useState } from 'react'
import { isAddress, type Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { fetchProfileFollowing } from '#/api/fetchProfileFollowing'

export const useTopEight = (user: string | Address) => {
  const userIsList = !(isAddress(user) || (user.includes('.') && !Number.isNaN(Number(user))))

  const [editModalOpen, setEditModalOpen] = useState(false)

  const { data: topEight, isLoading: topEightIsLoading } = useQuery({
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

  return {
    topEight,
    topEightIsLoading,
    editModalOpen,
    setEditModalOpen
  }
}
