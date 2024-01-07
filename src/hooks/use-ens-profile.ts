import { isAddress } from 'viem'
import { getEnsProfile } from '#/app/actions.ts'
import { useQuery } from '@tanstack/react-query'

export function useEnsProfile(addressOrName?: string) {
  return useQuery({
    queryKey: ['ens-profile', addressOrName],
    queryFn: async () => getEnsProfile(`${addressOrName}`),
    enabled: !!addressOrName && isAddress(addressOrName),
    refetchOnWindowFocus: false
  })
}
