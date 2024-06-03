import { Avatar } from './avatar'
import type { ChainWithDetails } from '#/lib/wagmi'

export function ChainIcon({ chain, className }: { chain: ChainWithDetails; className?: string }) {
  return (
    <Avatar
      name={chain.name || 'Ethereum'}
      avatarUrl={chain.iconUrl || '/assets/chains/ethereum.svg'}
      size={className}
    />
  )
}
