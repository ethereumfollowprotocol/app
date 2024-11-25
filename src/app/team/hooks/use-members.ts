import { useQuery } from 'node_modules/@tanstack/react-query/build/modern/useQuery'
import { TEAM_ADDRESSES, FOUNDATION_ADDRESSES } from '#/lib/constants/team'
import { fetchProfileDetails } from '#/api/profile/fetch-profile-details'
import { fetchProfileStats } from '#/api/profile/fetch-profile-stats'

export const useMembers = () => {
  const { data: teamProfiles, isLoading: teamIsLoading } = useQuery({
    queryKey: ['team', TEAM_ADDRESSES],
    queryFn: async () => {
      if (!TEAM_ADDRESSES) return []

      const data = await Promise.all(
        TEAM_ADDRESSES.map(async address => await fetchProfileDetails(address))
      )
      return data
    }
  })
  const { data: teamStats, isLoading: teamStatsIsLoading } = useQuery({
    queryKey: ['team', 'stats', TEAM_ADDRESSES],
    queryFn: async () => {
      if (!TEAM_ADDRESSES) return []

      const data = await Promise.all(
        TEAM_ADDRESSES.map(async address => await fetchProfileStats(address))
      )

      return data
    }
  })

  const { data: foundationProfiles, isLoading: foundationIsLoading } = useQuery({
    queryKey: ['follow protocol foundation', FOUNDATION_ADDRESSES],
    queryFn: async () => {
      if (!FOUNDATION_ADDRESSES) return []

      const data = await Promise.all(
        FOUNDATION_ADDRESSES.map(async address => await fetchProfileDetails(address))
      )
      return data
    }
  })
  const { data: foundationStats, isLoading: foundationStatsIsLoading } = useQuery({
    queryKey: ['follow protocol foundation', 'stats', FOUNDATION_ADDRESSES],
    queryFn: async () => {
      if (!FOUNDATION_ADDRESSES) return []

      const data = await Promise.all(
        FOUNDATION_ADDRESSES.map(async address => await fetchProfileStats(address))
      )

      return data
    }
  })

  return {
    teamProfiles,
    teamStats,
    foundationProfiles,
    foundationStats,
    teamIsLoading,
    teamStatsIsLoading,
    foundationIsLoading,
    foundationStatsIsLoading
  }
}
