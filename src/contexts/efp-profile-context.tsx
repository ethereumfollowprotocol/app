import { fetchUserProfile, type ProfileResponse } from '#/api/requests'
import type { ProfileTabType } from '#/types/common'
import { resolveENSProfile } from '#/utils/resolveAddress'
import { useQuery, type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useCart } from './cart-context'

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

      try {
        const fetchedProfile = await fetchUserProfile({ addressOrName: userAddress })
        const transformedProfile: ProfileResponse = {
          ...fetchedProfile,
          address: userAddress as Address,
          ens: {
            ...fetchedProfile.ens,
            address: userAddress as Address
          }
        }

        return transformedProfile
      } catch (err: unknown) {
        const data = await resolveENSProfile(userAddress)
        if (data?.name && data?.avatar)
          return {
            address: userAddress as Address,
            ens: { ...data, address: userAddress as Address }
          }

        return {
          address: userAddress as Address,
          ens: { address: userAddress as Address }
        }
      }
    }
  })

  useEffect(() => {
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
