import { QueryClient } from '@tanstack/react-query'

export const resetFollowingRelatedQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['top8'] })
  queryClient.invalidateQueries({ queryKey: ['follow state'] })
  queryClient.invalidateQueries({ queryKey: ['list state'] })
}

export const refetchState = (
  state: boolean,
  setState: (state: boolean) => void,
  refetch: () => void
) => {
  if (state) refetch()
  else setState(true)
}
