import type { Address } from '#/lib/types.ts'

export const efpContracts: {
  EFPAccountMetadata: Address
  EFPListRegistry: Address
  EFPListRecords: Address
  EFPListMinter: Address
} = {
  // EFPAccountMetadata: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  // EFPListRegistry: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  // EFPListRecords: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  // EFPListMinter: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
  // ------ Sepolia old ------
  // EFPAccountMetadata: "0xEAf99DFC1bfCC6DA27F88952220fF286Ef8d0b76",
  // EFPListRegistry: "0x09F508738E6413DbFeA4E95E2611d5512F323868",
  // EFPListRecords: "0xBd0e344ECCF11EC3d835ad10aeD73F0BF5e604e1",
  // EFPListMinter: "0xA87611B03963e0e137D8DCb18B2CcF82Aaff7104",
  EFPAccountMetadata: process.env['NEXT_PUBLIC_EFP_ACCOUNT_METADATA'] as Address,
  EFPListRegistry: process.env['NEXT_PUBLIC_EFP_LIST_REGISTRY'] as Address,
  EFPListRecords: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS'] as Address,
  EFPListMinter: process.env['NEXT_PUBLIC_EFP_LIST_MINTER'] as Address
}
