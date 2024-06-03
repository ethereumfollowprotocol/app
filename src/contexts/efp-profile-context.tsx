import { useAccount } from 'wagmi'
import { createContext, useContext, useEffect, useState } from 'react'

import { useCart } from './cart-context'
import type { ProfileTabType } from '#/types/common'
import { useQuery, type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query'
import fetchUserProfile from '#/api/fetchProfile'
import type { ProfileResponse } from '#/api/requests'

// Define the type for the profile context
type EFPProfileContextType = {
  profile?: ProfileResponse | null
  isLoading: boolean
  refetchProfile: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProfileResponse | null, Error>>
  followingTags: string[]
  followersTags: string[]
  followingSort: string | undefined
  followersSort: string | undefined
  toggleTag: (tab: ProfileTabType, tag: string) => void
  setFollowingSort: (option: string) => void
  setFollowersSort: (option: string) => void
  error: Error | null
}

type Props = {
  children: React.ReactNode
}

const EFPProfileContext = createContext<EFPProfileContextType | undefined>(undefined)

export const EFPProfileProvider: React.FC<Props> = ({ children }) => {
  const [followingTags, setFollowingTags] = useState<string[]>([])
  const [followersTags, setFollowersTags] = useState<string[]>([])
  const [followingSort, setFollowingSort] = useState<string>('follower count')
  const [followersSort, setFollowersSort] = useState<string>('follower count')

  const { resetCart } = useCart()
  const { address: userAddress } = useAccount()
  const {
    data: profile,
    isLoading,
    error,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ['profile', userAddress],
    queryFn: async () => {
      if (!userAddress) return null

      const fetchedProfile = await fetchUserProfile(userAddress)
      return fetchedProfile
    },
    staleTime: 20000
  })

  useEffect(() => {
    const cartAddress = localStorage.getItem('cart address')
    if (userAddress?.toLowerCase() === cartAddress?.toLowerCase() || !userAddress) return
    resetCart()
  }, [userAddress])

  const toggleTag = (tab: ProfileTabType, tag: string) => {
    if (tab === 'following') {
      if (followingTags.includes(tag)) {
        setFollowingTags(followingTags.filter(item => item !== tag))
      } else {
        setFollowingTags([...followingTags, tag])
      }
    }

    if (tab === 'followers') {
      if (followersTags.includes(tag)) {
        setFollowersTags(followersTags.filter(item => item !== tag))
      } else {
        setFollowersTags([...followersTags, tag])
      }
    }
  }

  return (
    <EFPProfileContext.Provider
      value={{
        profile,
        isLoading,
        refetchProfile,
        followingTags,
        followersTags,
        followingSort,
        followersSort,
        toggleTag,
        setFollowingSort: (option: string) => {
          setFollowingSort(option)
        },
        setFollowersSort: (option: string) => {
          setFollowersSort(option)
        },
        error
      }}
    >
      {children}
    </EFPProfileContext.Provider>
  )
}

export const useEFPProfile = (): EFPProfileContextType => {
  const context = useContext(EFPProfileContext)
  if (context === undefined) {
    throw new Error('useEFPProfile must be used within an EFPProfileProvider')
  }
  return context
}
