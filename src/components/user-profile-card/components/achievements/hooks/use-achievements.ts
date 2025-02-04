import { useQuery } from '@tanstack/react-query'
import { fetchProfileBadges } from '#/api/profile/fetch-profile-badges'

interface UseAchievementsProps {
  address?: string
  list?: number | null
}

export const useAchievements = ({ address, list }: UseAchievementsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile-badges', address, list],
    queryFn: async () => (address ? await fetchProfileBadges(address, list) : []),
  })

  const ownedBadges = data?.filter((badge) => badge.collection !== null) || []

  return {
    ownedBadges,
    isLoading,
  }
}
