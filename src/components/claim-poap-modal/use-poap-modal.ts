import { useState } from 'react'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { fetchPoapLink } from '#/api/fetch-poap'

export const usePoapModal = (userAddress?: Address) => {
  const [claimPoapModalOpen, setClaimPoapModalOpen] = useState(false)

  const { data: link, isLoading: poapLoading } = useQuery({
    queryKey: ['poap-link', userAddress, claimPoapModalOpen],
    queryFn: async () => (claimPoapModalOpen && userAddress ? await fetchPoapLink(userAddress) : ''),
  })

  return {
    poapLink: link,
    poapLoading,
    claimPoapModalOpen,
    setClaimPoapModalOpen,
  }
}
