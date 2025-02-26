// import type { Address } from 'viem'
// import { useEffect, useMemo, useState } from 'react'
// import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

// import { SECOND } from '#/lib/constants'
// import { useCart } from '#/hooks/use-cart'
// import { listOpAddListRecord } from '#/utils/list-ops'
// import type { ImportPlatformType } from '#/types/common'
// import type { AirstackFollowings } from '#/types/requests'
// import { fetchAirstackProfile } from '#/api/airstack/profile'
// import { useEFPProfile } from '#/contexts/efp-profile-context'
// import { fetchAirstackFollowings } from '#/api/airstack/followings'

// export type ImportFollowingType = {
//   address: Address
//   primaryDomain: string
// }

// const useImportModal = (platform: ImportPlatformType) => {
//   const [handle, setHandle] = useState('')
//   const [currHandle, setCurrHandle] = useState('')

//   const [followings, setFollowings] = useState<ImportFollowingType[]>([])
//   const [allFollowings, setAllFollowings] = useState<ImportFollowingType[]>([])
//   const [onlyImportWithEns, setOnlyImportWithEns] = useState(true)
//   const [isFollowingsLoading, setIsFollowingsLoading] = useState(false)

//   const { allFollowingAddresses } = useEFPProfile()
//   const { cart, setCart, getAddressesFromCart } = useCart()

//   useEffect(() => {
//     const inputTimeout = setTimeout(() => {
//       setHandle(currHandle)
//       setFollowings([])
//       setAllFollowings([])
//     }, 0.5 * SECOND)
//     return () => clearTimeout(inputTimeout)
//   }, [currHandle])

//   const { data: fetchedProfile, isFetching: isSocialProfileLoading } = useQuery({
//     queryKey: ['profile', platform, handle],
//     queryFn: async () => await fetchAirstackProfile(platform, handle),
//     enabled: !!handle,
//   })

//   // replace ipfs with pinata gateway (pinata currently most stable for me https://ipfs.github.io/public-gateway-checker/)
//   const socialProfile = fetchedProfile
//     ? {
//         ...fetchedProfile,
//         profileImage: fetchedProfile?.profileImage?.includes('ipfs://')
//           ? `https://ipfs.io/ipfs/${fetchedProfile?.profileImage.replace('ipfs://', '')}`
//           : fetchedProfile?.profileImage,
//       }
//     : null

//   const {
//     data: fetchedFollowings,
//     isLoading: isFetchedFollowingsLoading,
//     hasNextPage: hasNextPageFollowings,
//     hasPreviousPage: hasPreviousPageFollowings,
//     fetchNextPage: fetchNextPageFollowings,
//   } = useInfiniteQuery({
//     queryKey: ['followings', platform, handle, socialProfile?.userAddress],
//     queryFn: async ({ pageParam }) => {
//       if (!socialProfile?.userAddress) return { followings: null, nextPageParam: undefined, hasNextPage: false }

//       return await fetchAirstackFollowings({
//         profileAddress: socialProfile.userAddress as Address,
//         platform,
//         pageParam,
//       })
//     },
//     initialPageParam: '',
//     getNextPageParam: (lastPage) => (lastPage?.hasNextPage ? lastPage?.nextPageParam : undefined),
//   })

//   const reducedFollowings = useMemo(
//     () =>
//       fetchedFollowings?.pages.reduce<AirstackFollowings[]>((acc, page) => {
//         if (page?.followings?.Following) acc.push(...page.followings.Following)
//         return acc
//       }, [] as AirstackFollowings[]),
//     [fetchedFollowings]
//   )

//   useEffect(() => {
//     if (currHandle !== handle || isFetchedFollowingsLoading) return
//     if (!hasPreviousPageFollowings) setFollowings([])

//     if (reducedFollowings && reducedFollowings.length > 0) {
//       if (hasNextPageFollowings) fetchNextPageFollowings()
//       setIsFollowingsLoading(true)

//       const followingAddresses = reducedFollowings.map((following: any) => ({
//         address: following.followingAddress.addresses?.[0],
//         primaryDomain: following.followingAddress?.primaryDomain?.name,
//       }))

//       const filteredFollowingAddresses = followingAddresses.filter((following: any) =>
//         onlyImportWithEns ? !!following.primaryDomain : true
//       )

//       if (!hasNextPageFollowings) {
//         setAllFollowings(followingAddresses)
//         setFollowings(filteredFollowingAddresses)
//       }
//     }

//     if (!hasNextPageFollowings) setIsFollowingsLoading(false)
//   }, [reducedFollowings])

//   useEffect(() => {
//     if (!allFollowings || allFollowings.length === 0) return

//     const newFollowingAddresses = allFollowings.filter((following: any) =>
//       onlyImportWithEns ? !!following.primaryDomain : true
//     )
//     setFollowings(newFollowingAddresses)
//   }, [onlyImportWithEns])

//   const onAddFollowings = () => {
//     const newCartItems = followings
//       .filter(
//         ({ address: addr }) =>
//           !(
//             allFollowingAddresses?.includes(addr.toLowerCase() as Address) ||
//             getAddressesFromCart().includes(addr.toLowerCase() as Address)
//           )
//       )
//       .map((followingAddress) => ({
//         listOp: listOpAddListRecord(followingAddress.address as Address),
//         import: platform,
//       }))

//     setCart([...cart, ...newCartItems])
//   }

//   const alreadyFollow = followings.filter(({ address: addr }) =>
//     allFollowingAddresses?.includes(addr.toLowerCase() as Address)
//   )

//   // add query to fetch airstack profile and all following addresses, download AIrstack SDK
//   return {
//     followings,
//     currHandle,
//     setCurrHandle,
//     socialProfile,
//     onlyImportWithEns,
//     setOnlyImportWithEns,
//     isSocialProfileLoading,
//     isFollowingsLoading: isFollowingsLoading || isFetchedFollowingsLoading,
//     onAddFollowings,
//     alreadyFollow,
//   }
// }

// export default useImportModal
