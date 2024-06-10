import { optimismSepolia } from 'viem/chains'
import { createPublicClient, fromHex, getContract, http, type Address } from 'viem'

import type { ProfileRoles } from './requests'
import { efpContracts } from '#/lib/constants/contracts'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import type { Config, UseChainsReturnType } from 'wagmi'

const fetchProfileRoles = async ({
  primary_list,
  userAddress,
  chains
}: {
  primary_list: number
  userAddress: Address
  chains: UseChainsReturnType<Config>
}) => {
  const listRegistryContract = getContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({ chain: optimismSepolia, transport: http() })
  })

  const listStorageLocation = await listRegistryContract.read.getListStorageLocation([
    BigInt(primary_list)
  ])

  const listStorageLocationChainId = fromHex(`0x${listStorageLocation.slice(64, 70)}`, 'number')

  const slot = BigInt(`0x${listStorageLocation.slice(-64)}`)
  const listStorageLocationChain = chains.find(item => item.id === listStorageLocationChainId)
  const listRecordsContractAddress = listStorageLocation
    ? (`0x${listStorageLocation.slice(70, 110)}` as Address)
    : efpContracts.EFPListRecords

  const listRecordsContract = getContract({
    address: listRecordsContractAddress,
    abi: efpListRecordsAbi,
    client: createPublicClient({
      chain: listStorageLocationChain || optimismSepolia,
      transport: http()
    })
  })

  const listOwner = await listRegistryContract.read.ownerOf([BigInt(primary_list)])
  const listManager = await listRecordsContract.read.getListManager([slot])
  const listUser = await listRecordsContract.read.getListUser([slot])

  return {
    isOwner: listOwner.toLowerCase() === userAddress?.toLowerCase(),
    isManager: listManager.toLowerCase() === userAddress?.toLowerCase(),
    isUser: listUser.toLowerCase() === userAddress?.toLowerCase()
  } as ProfileRoles
}

export default fetchProfileRoles
