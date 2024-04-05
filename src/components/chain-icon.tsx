import type { ChainWithDetails } from '#/lib/wagmi'
import { Avatar } from '@radix-ui/themes'
import clsx from 'clsx'

export function ChainIcon({ chain, className }: { chain: ChainWithDetails; className?: string }) {
  return (
    <Avatar
      src={chain.iconUrl}
      fallback={'/assets/chains/ethereum.svg'}
      radius='full'
      className={clsx(chain.iconBackground, className)}
    />
  )
}
