import type { NotificationsResponse } from '#/types/requests'

export const fetchNotifications = async (
  userAddress?: string,
  interval?: 'hour' | 'day' | 'week' | 'month' | 'all'
  // starting_after?: string
) => {
  if (!userAddress) return null

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${userAddress}/notifications?limit=1000&interval=${interval}`
  )
  const data = (await response.json()) as NotificationsResponse
  return data
}
