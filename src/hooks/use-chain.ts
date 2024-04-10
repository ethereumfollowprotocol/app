import type { ChainWithDetails } from '#/lib/wagmi'
import { useChains } from 'wagmi'

const useChain = (chainId: number | undefined) => {
  const chains = useChains() as unknown as ChainWithDetails[] // TODO: Fix this type issue
  return chains.find(chain => chain.id === chainId)
}

export default useChain
