import { type Account, encodePacked } from 'viem'
import * as abi from '#/lib/abi.ts'
import { efpContracts } from '#/lib/constants/contracts.ts'
import type { Address } from '#/lib/types.ts'
import { raise } from '#/lib/utilities.ts'
import type { EVMClient } from '#/lib/viem.ts'
import { useWalletClient } from 'wagmi'

/**
 * The slot has to be the same as the slot used to mint the list record
 * https://docs.ethfollow.xyz/design/list-storage-location/#onchain-storage
 */

export const mint = async ({
  account,
  client,
  version,
  locationType,
  slot
}: {
  account: Address | Account
  client: EVMClient
  version: number
  locationType: number
  slot: bigint
}) => {
  const chainId = await client.getChainId()
  const { data: walletClient } = useWalletClient()

  const listStorageLocation = encodePacked(
    ['uint8', 'uint8', 'uint256', 'address', 'uint'],
    [version, locationType, BigInt(chainId), efpContracts.EFPListRecords, slot]
  )

  const hash = await walletClient?.writeContract({
    account,
    address: efpContracts.EFPListRegistry,
    abi: abi.efpListRegistryAbi,
    functionName: 'mint',
    args: [listStorageLocation],
    chain: client.chain
  })

  return hash
}

/**
 * Not required to call this
 */
export async function claimList({
  account,
  client,
  slot
}: {
  account: Address | Account
  client: EVMClient
  slot: bigint
}) {
  const { request } = await client.simulateContract({
    account,
    address: efpContracts.EFPListRecords,
    abi: abi.efpListRecordsAbi,
    functionName: 'claimListManager',
    args: [slot]
  })

  const hash = await client.writeContract(request)
  return hash
}

export async function follow({
  account,
  listClaimCompleted,
  client,
  address,
  slot
}: {
  account: Address | Account
  listClaimCompleted: boolean
  client: EVMClient
  address: Address
  slot: bigint
}) {
  if (!listClaimCompleted) raise('List claim must be completed before following')
  const { data: walletClient } = useWalletClient()

  const listRecordToFollow = encodePacked(['uint8', 'uint8', 'address'], [1, 1, address])
  const hash = await walletClient?.writeContract({
    account,
    address: efpContracts.EFPListRecords,
    abi: abi.efpListRecordsAbi,
    functionName: 'applyListOp',
    args: [slot, encodePacked(['uint8', 'uint8', 'bytes'], [1, 1, listRecordToFollow])]
  })

  return hash
}

export async function getMintState({ client }: { client: EVMClient }) {
  return await client.readContract({
    abi: abi.efpListRegistryAbi,
    functionName: 'getMintState',
    address: efpContracts.EFPListRegistry
  })
}

export async function setMintState({
  account,
  client,
  mintState
}: {
  account: Address | Account
  client: EVMClient
  mintState: 'disabled' | 'owner-only' | 'public-mint' | 'public-batch'
}) {
  const mintStateRecord = {
    disabled: 0,
    'owner-only': 1,
    'public-mint': 2,
    'public-batch': 3
  }

  const { request } = await client.simulateContract({
    account,
    abi: abi.efpListRegistryAbi,
    functionName: 'setMintState',
    address: efpContracts.EFPListRegistry,
    args: [mintStateRecord[mintState]]
  })

  const writeResult = await client.writeContract(request)
  return writeResult
}
