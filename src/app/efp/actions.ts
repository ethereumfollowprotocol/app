import { encodePacked } from 'viem'
import { raise } from '#lib/utilities.ts'
import * as abi from 'src/lib/abi'
import type { Address } from '#lib/types.ts'
import type { EVMClient } from '#lib/viem.ts'
import { efpContracts } from '#lib/constants/contracts.ts'

export async function mint({
  client,
  version,
  locationType,
  nonce
}: {
  client: EVMClient
  version: number
  locationType: number
  nonce: bigint
}) {
  const chainId = await client.getChainId()
  const { request } = await client.simulateContract({
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

export async function claimList({ client, nonce }: { client: EVMClient; nonce: bigint }) {
  const { request } = await client.simulateContract({
    address: efpContracts['EFPListRecords'],
    abi: abi.efpListRecordsAbi,
    functionName: 'claimListManager',
    args: [nonce]
  })

  const hash = await client.writeContract(request)
  return hash
}

export async function follow({
  listClaimCompleted,
  client,
  address,
  nonce
}: {
  listClaimCompleted: boolean
  client: EVMClient
  address: Address
  nonce: bigint
}) {
  if (!listClaimCompleted) raise('List claim must be completed before following')

  const listRecordToFollow = encodePacked(['uint8', 'uint8', 'address'], [1, 1, address])
  const { request } = await client.simulateContract({
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
  client,
  mintState
}: {
  client: EVMClient
  mintState: 'disabled' | 'owner-only' | 'public-mint' | 'public-batch'
}) {
  const mintStateRecord = { disabled: 0, 'owner-only': 1, 'public-mint': 2, 'public-batch': 3 }
  const { request } = await client.simulateContract({
    abi: abi.efpListRegistryAbi,
    functionName: 'setMintState',
    address: efpContracts['EFPListRegistry'],
    args: [mintStateRecord[mintState]]
  })

  const writeResult = await client.writeContract(request)
  return writeResult
}
