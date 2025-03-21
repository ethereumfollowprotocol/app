'use client'

import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { resolveEnsProfile } from '#/utils/ens'
import useFollowerState from '#/hooks/use-follower-state'
import useFollowingState from '#/hooks/use-following-state'
import type { ProfileDetailsResponse } from '#/types/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'

export const useProfileCard = (profile?: ProfileDetailsResponse | null) => {
  const { data: fetchedEnsProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['ens metadata', profile],
    queryFn: async () => {
      if (!profile) return null
      return await resolveEnsProfile(profile?.address)
    },
  })

  const profileName = fetchedEnsProfile?.name
  const profileAvatar = fetchedEnsProfile?.avatar

  const router = useRouter()
  const pathname = usePathname()
  const { selectedList } = useEFPProfile()
  const { address: connectedAddress } = useAccount()

  const searchParams = useSearchParams()
  const searchURLParam = searchParams.get('search')
  const hasSearchedDifferentName =
    searchURLParam && searchURLParam.length > 0 && searchURLParam !== profileName && !Number(searchURLParam)

  const isConnectedUserCard =
    pathname === '/' ||
    (pathname?.toLowerCase() === `/${connectedAddress?.toLowerCase()}` &&
      (profile?.primary_list && selectedList ? selectedList === Number(profile?.primary_list) : true)) ||
    pathname === `/${selectedList?.toString() ?? connectedAddress}`

  const { followingState: followState } = useFollowingState({ address: profile?.address })
  const { followerTag } = useFollowerState({
    address: profile?.address,
    showFollowerBadge: !isConnectedUserCard,
  })

  const isProfileValid = !(
    Object.keys(profile || {}).includes('response') || Object.keys(profile || {}).includes('message')
  )

  const onProfileStatClick = (stat: string) => {
    if (pathname === '/recommended' || !profile) return

    if (pathname === '/' || pathname === '/team') {
      if (isConnectedUserCard) {
        return router.push(
          `/${selectedList === Number(profile.primary_list) ? profile.address : selectedList}?tab=${stat}&ssr=false`
        )
      }

      return router.push(`/${profile.address}?tab=${stat}&ssr=false`)
    }

    router.push(`/${pathname.slice(1)}?tab=${stat}&ssr=false`)
  }

  return {
    profileName,
    profileAvatar,
    isConnectedUserCard,
    followState,
    followerTag,
    isProfileValid,
    isProfileLoading,
    searchURLParam,
    onProfileStatClick,
    hasSearchedDifferentName,
  }
}
