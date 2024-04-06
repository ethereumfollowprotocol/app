import type { ChainWithDetails } from '#/lib/wagmi'

export enum EFPActionType {
  CreateEFPList = 'CreateEFPList',
  UpdateEFPList = 'UpdateEFPList'
}

export enum Step {
  SelectChain = 'SelectChain',
  InitiateTransactions = 'InitiateTransactions',
  TransationStatus = 'TransationStatus'
}

export type Action = {
  type: EFPActionType
  /* The label of the action */
  label: string
  /* The chain associated with the action */
  chain: ChainWithDetails | null | undefined
  /* The transaction hash associated with the action */
  txHash?: `0x${string}`
  /* The action to be executed */
  action: () => void
}
