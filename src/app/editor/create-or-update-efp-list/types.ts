import type { ChainWithDetails } from '#/lib/wagmi'

export enum Step {
  SelectChain = 'SelectChain',
  InitiateTransactions = 'InitiateTransactions',
  TransationStatus = 'TransationStatus'
}

export type Action = {
  label: string
  chain: ChainWithDetails | null | undefined
}
