import type { ChainWithDetails } from '#/lib/wagmi'
import { Avatar } from './avatar'

export function ChainIcon({ chain, className }: { chain: ChainWithDetails; className?: string }) {
  return (
    <Avatar
      name={chain.name || 'Ethereum'}
      avatarUrl={chain.iconUrl || '/assets/chains/ethereum.svg'}
    />
  )
}
