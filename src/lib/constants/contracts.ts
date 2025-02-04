import { base, mainnet, optimism } from 'viem/chains'
import { createPublicClient, getContract, http, type Address } from 'viem'

import { efpListRegistryAbi } from '../abi'
import { DEFAULT_CHAIN } from './chains'
import { rpcProviders } from './rpc-providers'

export const coreEfpContracts: {
  EFPAccountMetadata: Address
  EFPListRegistry: Address
  EFPListRecords: Address
  EFPListMinter: Address
} = {
  EFPAccountMetadata: process.env['NEXT_PUBLIC_EFP_ACCOUNT_METADATA'] as Address,
  EFPListRegistry: process.env['NEXT_PUBLIC_EFP_LIST_REGISTRY'] as Address,
  EFPListRecords: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS'] as Address,
  EFPListMinter: process.env['NEXT_PUBLIC_EFP_LIST_MINTER'] as Address,
}

export const ListRecordContracts: Record<number, Address> = {
  [base.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS'] as Address,
  [optimism.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS_OP'] as Address,
  [mainnet.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS_MAINNET'] as Address,
  // [baseSepolia.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS'] as Address,
  // [optimismSepolia.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS_OP_SEPOLIA'] as Address,
  // [sepolia.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS_SEPOLIA'] as Address
}

export const listRegistryContract = getContract({
  address: coreEfpContracts.EFPListRegistry,
  abi: efpListRegistryAbi,
  client: createPublicClient({
    chain: DEFAULT_CHAIN,
    transport: http(rpcProviders[DEFAULT_CHAIN.id]),
  }),
})
