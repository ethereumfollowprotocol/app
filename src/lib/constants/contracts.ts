import type { Address } from '#/lib/types.ts'
import { foundry, mainnet } from 'viem/chains'

export const efpContracts: {
  EFPAccountMetadata: Address
  EFPListRegistry: Address
  EFPListRecords: Address
  EFPListMinter: Address
} = {
  EFPAccountMetadata: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  EFPListRegistry: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  EFPListRecords: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  EFPListMinter: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
}

// The chain ID of the EFP List Registry contract
// This is the chain ID that the EFP List Registry contract is deployed on, assuming that during development it is deployed on the foundry chain
export const EFPListRegistryDeployChain =
  process.env.NODE_ENV === 'production' ? mainnet.id : foundry.id
