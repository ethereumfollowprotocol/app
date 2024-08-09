import type { Address } from 'viem'
import { useEffect, useMemo, useState } from 'react'
import { init, useQuery, useQueryWithPagination } from '@airstack/airstack-react'

import { useCart } from '#/contexts/cart-context'
import { listOpAddListRecord } from '#/utils/list-ops'
import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'

init('0366bbe276e04996af5f92ebb7899f19', { env: 'dev', cache: true })

const useImportModal = (platform: ImportPlatformType) => {
  const [handle, setHandle] = useState('')
  const [currHandle, setCurrHandle] = useState('')
  const [followings, setFollowings] = useState<Address[]>([])
  const [isFollowingsLoading, setIsFollowingsLoading] = useState(false)

  const { addCartItem } = useCart()
  const { allFollowingAddresses } = useEFPProfile()

  useEffect(() => {
    const inputTimeout = setTimeout(() => setHandle(currHandle), 500)
    return () => clearTimeout(inputTimeout)
  }, [currHandle])

  // TODO: if itproves that lens uses addresses and not other identities than switch to filter by userId for lens, as the lens uses profile addresses as user IDs
  const profileQuery = `
    query ProfileQuery ($platform: SocialDappName) {
      Socials(
        input: {filter: {dappName: {_eq: $platform}, profileName: {_eq: "${
          platform === 'lens' ? 'lens/@' : ''
        }${handle.replace('@', '')}"}}, blockchain: ethereum, limit: 1}
      ) {
        Social {
          profileImage
          profileHandle
          profileName
          userAddress
        }
      }
    }
  `

  const { data: fetchedProfile, loading: isSocialProfileLoading } = useQuery(profileQuery, {
    platform
  })
  const socialProfile =
    fetchedProfile && !!fetchedProfile?.Socials?.Social
      ? {
          ...fetchedProfile?.Socials?.Social?.[0],
          profileImage: fetchedProfile?.Socials?.Social?.[0]?.profileImage?.includes('ipfs://')
            ? `https://gateway.pinata.cloud/ipfs/${fetchedProfile?.Socials?.Social?.[0]?.profileImage.replace(
                'ipfs://',
                ''
              )}`
            : fetchedProfile?.Socials?.Social?.[0]?.profileImage
        }
      : null

  const followingsQuery = useMemo(
    () => `
  query FollowingsQuery ($platform: SocialDappName) {
    SocialFollowings(
      input: {filter: {dappName: {_eq: $platform}, identity: {_eq: "${socialProfile?.userAddress}"}}, blockchain: ALL, limit: 200}
    ) {
      Following {
        followingAddress {
          addresses
        }
      }
    }
}
`,
    [socialProfile]
  )

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
    followings
      .filter(addr => !allFollowingAddresses?.includes(addr.toLowerCase()))
      .map(followingAddress =>
        addCartItem({ listOp: listOpAddListRecord(followingAddress as Address), import: platform })
      )
  }

  const alreadyFollow = followings.filter(addr =>
    allFollowingAddresses?.includes(addr.toLowerCase())
  )

  // add query to fetch airstack profile and all following addresses, download AIrstack SDK
  return {
    currHandle,
    setCurrHandle,
    socialProfile,
    followings,
    isSocialProfileLoading,
    isFollowingsLoading: isFollowingsLoading || isFetchedFollowingsLoading,
    onAddFollowings,
    alreadyFollow
  }
}

export default useImportModal
