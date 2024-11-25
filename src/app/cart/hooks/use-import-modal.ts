import type { Address } from 'viem'
import { useEffect, useMemo, useState } from 'react'
import { init, useQuery, useQueryWithPagination } from '@airstack/airstack-react'

import { SECOND } from '#/lib/constants'
import { useCart } from '#/contexts/cart-context'
import { listOpAddListRecord } from '#/utils/list-ops'
import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'

init('0366bbe276e04996af5f92ebb7899f19', { env: 'dev', cache: true })

export type importFollowingType = {
  address: Address
  domains: { name: string }[]
}

const useImportModal = (platform: ImportPlatformType) => {
  const [handle, setHandle] = useState('')
  const [currHandle, setCurrHandle] = useState('')

  const [followings, setFollowings] = useState<importFollowingType[]>([])
  const [allFollowings, setAllFollowings] = useState<importFollowingType[]>([])
  const [onlyImportWithEns, setOnlyImportWithEns] = useState(true)
  const [isFollowingsLoading, setIsFollowingsLoading] = useState(false)

  const { allFollowingAddresses } = useEFPProfile()
  const { cartItems, setCartItems, getAddressesFromCart } = useCart()

  useEffect(() => {
    const inputTimeout = setTimeout(() => {
      setHandle(currHandle)
      setFollowings([])
      setAllFollowings([])
    }, 0.5 * SECOND)
    return () => clearTimeout(inputTimeout)
  }, [currHandle])

  // Fetch profile from Airstack
  const profileQuery = `
    query ProfileQuery ($platform: SocialDappName) {
      Socials(
        input: {filter: {dappName: {_eq: $platform}, profileName: {_eq: "${handle.replace('@', '')}"}}, blockchain: ethereum, limit: 1}
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

  // Fetch followings from Airstack
  const followingsQuery = useMemo(
    () => `
  query FollowingsQuery ($platform: SocialDappName) {
    SocialFollowings(
      input: {filter: {dappName: {_eq: $platform}, identity: {_eq: "${socialProfile?.userAddress}"}}, blockchain: ALL, limit: 200}
    ) {
      Following {
        followingAddress {
          addresses
          primaryDomain {
          name
        }
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
    if (currHandle !== handle) return
    if (!hasPrevPage) setFollowings([])
    if (hasNextPage) getNextPage()

    if (
      fetchedFollowings?.SocialFollowings?.Following &&
      fetchedFollowings?.SocialFollowings?.Following.length > 0
    ) {
      setIsFollowingsLoading(true)

      const newFollowingAddresses = fetchedFollowings?.SocialFollowings?.Following.map(
        (following: any) => ({
          address: following.followingAddress.addresses?.[0],
          primaryDomain: following.followingAddress?.primaryDomain?.name
        })
      )

      const filteredNewFollowingAddresses = newFollowingAddresses.filter((following: any) =>
        onlyImportWithEns ? !!following.primaryDomain : true
      )

      setAllFollowings(currFollowings => [
        ...new Set([...currFollowings, ...newFollowingAddresses])
      ])
      setFollowings(currFollowings => [
        ...new Set([...currFollowings, ...filteredNewFollowingAddresses])
      ])
    }
    if (!hasNextPage) setIsFollowingsLoading(false)
  }, [fetchedFollowings])

  useEffect(() => {
    if (!allFollowings || allFollowings.length === 0) return

    const newFollowingAddresses = allFollowings.filter((following: any) =>
      onlyImportWithEns ? !!following.primaryDomain : true
    )
    setFollowings(newFollowingAddresses)
  }, [onlyImportWithEns])

  const onAddFollowings = () => {
    const newCartItems = followings
      .filter(
        ({ address: addr }) =>
          !(
            allFollowingAddresses?.includes(addr.toLowerCase() as Address) ||
            getAddressesFromCart().includes(addr.toLowerCase() as Address)
          )
      )
      .map(followingAddress => ({
        listOp: listOpAddListRecord(followingAddress.address as Address),
        import: platform
      }))

    setCartItems([...cartItems, ...newCartItems])
  }

  const alreadyFollow = followings.filter(({ address: addr }) =>
    allFollowingAddresses?.includes(addr.toLowerCase() as Address)
  )

  // add query to fetch airstack profile and all following addresses, download AIrstack SDK
  return {
    followings,
    currHandle,
    setCurrHandle,
    socialProfile,
    onlyImportWithEns,
    setOnlyImportWithEns,
    isSocialProfileLoading,
    isFollowingsLoading: isFollowingsLoading || isFetchedFollowingsLoading,
    onAddFollowings,
    alreadyFollow
  }
}

export default useImportModal
