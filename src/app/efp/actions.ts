import * as abi from '#/lib/abi.ts'
import { encodePacked, type Account } from 'viem'
import { raise } from '#/lib/utilities.ts'
import type { Address } from '#/lib/types.ts'
import { evmClient, type EVMClient } from '#/lib/viem.ts'
import { efpContracts } from '#/lib/constants/contracts.ts'

/**
 * The nonce has to be the same as the nonce used to mint the list record
 * https://docs.ethfollow.xyz/design/list-storage-location/#onchain-storage
 */

export async function mint({
  account,
  client,
  version,
  locationType,
  nonce
}: {
  account: Address | Account
  client: EVMClient
  version: number
  locationType: number
  nonce: bigint
}) {
  const chainId = await client.getChainId()
  const { request } = await client.simulateContract({
    account,
    address: efpContracts['EFPListRegistry'],
    abi: abi.efpListRegistryAbi,
    functionName: 'mint',
    args: [
      encodePacked(
        ['uint8', 'uint8', 'uint256', 'address', 'uint'],
        [version, locationType, BigInt(chainId), efpContracts['EFPListRecords'], nonce]
      )
    ]
  })
  const hash = await client.writeContract(request)
  return hash
}

/**
 * Not required to call this
 */
export async function claimList({
  account,
  client,
  nonce
}: {
  account: Address | Account
  client: EVMClient
  nonce: bigint
}) {
  const { request } = await client.simulateContract({
    account,
    address: efpContracts['EFPListRecords'],
    abi: abi.efpListRecordsAbi,
    functionName: 'claimListManager',
    args: [nonce]
  })

  const hash = await client.writeContract(request)
  return hash
}

export async function follow({
  account,
  listClaimCompleted,
  client,
  address,
  nonce
}: {
  account: Address | Account
  listClaimCompleted: boolean
  client: EVMClient
  address: Address
  nonce: bigint
}) {
  if (!listClaimCompleted) raise('List claim must be completed before following')

  const listRecordToFollow = encodePacked(['uint8', 'uint8', 'address'], [1, 1, address])
  const { request } = await client.simulateContract({
    account,
    address: efpContracts['EFPListRecords'],
    abi: abi.efpListRecordsAbi,
    functionName: 'applyListOp',
    args: [nonce, encodePacked(['uint8', 'uint8', 'bytes'], [1, 1, listRecordToFollow])]
  })
  const writeResult = await client.writeContract(request)
  return writeResult
}

export async function getMintState({ client }: { client: EVMClient }) {
  return await client.readContract({
    abi: abi.efpListRegistryAbi,
    functionName: 'getMintState',
    address: efpContracts['EFPListRegistry']
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
  const mintStateRecord = { disabled: 0, 'owner-only': 1, 'public-mint': 2, 'public-batch': 3 }
  const { request } = await client.simulateContract({
    account,
    abi: abi.efpListRegistryAbi,
    functionName: 'setMintState',
    address: efpContracts['EFPListRegistry'],
    args: [mintStateRecord[mintState]]
  })

  const writeResult = await client.writeContract(request)
  return writeResult
}

// getMintState({ client: evmClient['31337']() }).then(console.log)

// setMintState({
//   account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//   client: evmClient['31337'](),
//   mintState: 'public-mint'
// }).then(console.log)
