import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { isAddress, type Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { useEFPProfile } from '#/contexts/efp-profile-context'
import { fetchProfileFollowing } from '#/api/fetchProfileFollowing'
import type { ENSProfile, FollowingResponse } from '#/types/requests'

export type TopEightProfileType = {
  address: Address
  ens?: ENSProfile
}

export const useTopEight = (user: string | Address) => {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [displayLimit, setDisplayLimit] = useState(2)

  useEffect(() => {
    if (window.innerWidth > 1024) setDisplayLimit(8)
  }, [])

  const { address: userAddress } = useAccount()
  const {
    selectedList,
    topEight: topEightProfile,
    topEightIsLoading: topEightProfileLoading,
    topEightIsRefetching: topEightProfileRefetching
  } = useEFPProfile()

  const userIsList = !(isAddress(user) || user.includes('.') || Number.isNaN(Number(user)))
  const listNum = userIsList ? Number(user) : undefined
  const isValidUser =
    isAddress(user) ||
    (userIsList && listNum && listNum > 0 && listNum < 1000000000) ||
    user.includes('.')

  const isConnectedUser = userIsList
    ? Number(user) === selectedList
    : user.toLowerCase() === userAddress?.toLowerCase()

  const {
    data: topEightFetched,
    isLoading: topEightIsLoading,
    isRefetching: topEightIsRefetching
  } = useQuery({
    queryKey: ['top8', user],
    queryFn: async () => {
      if (isConnectedUser) return topEightProfile || []
      if (!isValidUser) return []

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

  const topEight = isConnectedUser
    ? topEightProfile
    : topEightFetched?.map(profile => ({
        address: (profile as FollowingResponse).address,
        ens: profile.ens
      })) || []
  const isLoading = isConnectedUser ? topEightProfileLoading : topEightIsLoading
  const isRefetching = isConnectedUser ? topEightProfileRefetching : topEightIsRefetching

  return {
    topEight,
    displayLimit,
    editModalOpen,
    setDisplayLimit,
    setEditModalOpen,
    topEightIsLoading: isLoading,
    topEightIsRefetching: isRefetching
  }
}
