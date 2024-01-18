
import { getEnsProfile } from '#/app/actions.ts'
import { useQuery } from '@tanstack/react-query'
import { checkAddressOrEnsValid } from '#/lib/utilities.ts'

export function useEnsProfile(addressOrName?: string) {
  return useQuery({
    queryKey: ['ens-profile', addressOrName],
    queryFn: async () => getEnsProfile(`${addressOrName}`),
    enabled: !!addressOrName && checkAddressOrEnsValid(addressOrName),
    refetchOnWindowFocus: false
  })
}
