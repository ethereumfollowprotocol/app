import { fetchUserProfile, type ProfileResponse } from '#/api/requests'
import type { ProfileTabType } from '#/types/common'
import { resolveENSProfile } from '#/utils/resolveAddress'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

// Define the type for the profile context
type EFPProfileContextType = {
  profile: ProfileResponse | null
  isLoading: boolean
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [followingTags, setFollowingTags] = useState<string[]>([])
  const [followersTags, setFollowersTags] = useState<string[]>([])
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [followingSort, setFollowingSort] = useState<string>('follower count')
  const [followersSort, setFollowersSort] = useState<string>('follower count')

  const { address: userAddress } = useAccount()
  const { data: userProfileResponse } = useQuery({
    queryKey: ['profile', userAddress],
    queryFn: async () => {
      if (!userAddress) return { name: null, avatar: null }
      // const fetchedProfile = fetchUserProfile({ addressOrName })
      const data = await resolveENSProfile(userAddress)

      return data
    }
  })

  const fetchProfile = async (addressOrName: string) => {
    try {
      const fetchedProfile = await fetchUserProfile({ addressOrName })
      const transformedProfile: ProfileResponse = {
        ...fetchedProfile,
        address: addressOrName as Address,
        ens: {
          ...fetchedProfile.ens,
          address: addressOrName as Address
        }
      }
      setProfile(transformedProfile)
    } catch (err: unknown) {
      if (userProfileResponse?.name && userProfileResponse?.avatar)
        setProfile({
          address: addressOrName as Address,
          ens: { ...userProfileResponse, address: addressOrName as Address }
        })
      setError(err as Error | null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!userAddress) {
      setProfile(null)
      return
    }

    setIsLoading(true)
    fetchProfile(userAddress)
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
