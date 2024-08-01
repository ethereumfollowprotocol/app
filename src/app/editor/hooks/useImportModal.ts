import { useEffect, useState } from 'react'
import { init, useQuery, useQueryWithPagination } from '@airstack/airstack-react'

import { useCart } from '#/contexts/cart-context'
import type { ImportPlatformType } from '#/types/common'
import { listOpAddListRecord } from '#/utils/list-ops'
import type { Address } from 'viem'

init('0366bbe276e04996af5f92ebb7899f19', { env: 'dev', cache: true })

const useImportModal = (platform: ImportPlatformType) => {
  const [inputAddress, setInputAddress] = useState('')
  const [currInputAddress, setCurrInputAddress] = useState('')
  const [followings, setFollowings] = useState<Address[]>([])
  const [isFollowingsLoading, setIsFollowingsLoading] = useState(false)

  const { addCartItem } = useCart()

  useEffect(() => {
    const inputTimeout = setTimeout(() => setInputAddress(currInputAddress), 500)
    return () => clearTimeout(inputTimeout)
  }, [currInputAddress])

  const profileQuery = `
    query ProfileQuery ($platform: SocialDappName) {
      Socials(
        input: {filter: {dappName: {_eq: $platform}, identity: {_eq: "${inputAddress}"}}, blockchain: ethereum, limit: 1}
      ) {
        Social {
          userAssociatedAddresses
          followerCount
          followingCount
          profileImage
          profileHandle
          profileDisplayName
        }
      }
    }
  `
  const followingsQuery = `
    query FollowingsQuery ($platform: SocialDappName) {
      SocialFollowings(
        input: {filter: {dappName: {_eq: $platform}, identity: {_eq: "${inputAddress}"}}, blockchain: ALL, limit: 200}
      ) {
        Following {
          followingAddress {
            addresses
          }
        }
      }
    }
  `

  const { data: fetchedProfile, loading: isSocialProfileLoading } = useQuery(profileQuery, {
    platform
  })
  const socialProfile = fetchedProfile?.Socials?.Social?.[0]

  const {
    data: fetchedFollowings,
    loading: isFetchedFollowingsLoading,
    pagination: { hasNextPage, getNextPage, hasPrevPage }
  } = useQueryWithPagination(followingsQuery, { platform })

  useEffect(() => {
    if (!hasPrevPage) setFollowings([])
    if (hasNextPage) getNextPage()
    if (
      fetchedFollowings?.SocialFollowings?.Following &&
      fetchedFollowings?.SocialFollowings?.Following.length > 0
    ) {
      setIsFollowingsLoading(true)
      const newFollowingAddresses = fetchedFollowings?.SocialFollowings?.Following.map(
        (following: any) => following.followingAddress.addresses?.[0]
      )
      setFollowings(currFollowings => [...currFollowings, ...newFollowingAddresses])
    }
    if (!hasNextPage) setIsFollowingsLoading(false)
  }, [fetchedFollowings])

  const onAddFollowings = () => {
    followings.map(followingAddress =>
      addCartItem({ listOp: listOpAddListRecord(followingAddress as Address) })
    )
  }

  // add query to fetch airstack profile and all following addresses, download AIrstack SDK
  return {
    currInputAddress,
    setCurrInputAddress,
    socialProfile,
    followings,
    isSocialProfileLoading,
    isFollowingsLoading: isFollowingsLoading || isFetchedFollowingsLoading,
    onAddFollowings
  }
}

export default useImportModal
