export interface ListStorageLocationOption {
  chainId: number
  name: string
  label: string | undefined
  gasHint: string
  icon: `${string}.svg`
}

export const LIST_STORAGE_LOCATION_OPTIONS: ListStorageLocationOption[] = [
  {
    chainId: 10,
    name: 'Optimism',
    label: 'Ethereum L2',
    gasHint: 'Low gas fees',
    icon: '/assets/chains/optimism.svg'
  },
  {
    chainId: 1,
    name: 'Ethereum',
    label: undefined,
    gasHint: 'High gas fees',
    icon: '/assets/onboarding/ethereum.svg'
  }
] as const

export interface Step {
  title: string
  subtext: string
  leftButton: string
  rightButton: string
}

export const ONBOARDING_STEPS: Record<'0' | '1' | '2' | '3', Step> = {
  '0': {
    title: 'Where would you like to store your EFP List?',
    subtext: 'You can always change this later',
    leftButton: 'Cancel',
    rightButton: 'Next'
  },
  '1': {
    title: 'Onchain update',
    subtext: 'Summary',
    leftButton: 'Back',
    rightButton: 'Initiate'
  },
  '2': {
    title: 'Onchain update',
    subtext: '',
    leftButton: 'Cancel',
    rightButton: 'Retry'
  },
  '3': {
    title: 'Transaction pending',
    subtext: 'You can always change this later',
    leftButton: 'Back',
    rightButton: 'View on Etherscan'
  }
} satisfies Record<'0' | '1' | '2' | '3', Step>
