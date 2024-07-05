import { useChains } from 'wagmi'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { http, fromHex, getContract, createPublicClient, type Address, type Chain } from 'viem'

import { DEFAULT_CHAIN } from '#/lib/constants/chain'
import { rpcProviders } from '#/lib/constants/providers'
import { coreEfpContracts } from '#/lib/constants/contracts'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'

const useListSettings = ({ profile, list }: { profile: ProfileDetailsResponse; list: number }) => {
  const chains = useChains()
  const [chain, setChain] = useState<Chain>()
  const [fetchedChain, setFetchedChain] = useState<Chain>()

  const [user, setUser] = useState<string>('')
  const [fetchedUser, setFetchedUser] = useState<string>('')
  const [owner, setOwner] = useState<string>('')
  const [fetchedOwner, setFetchedOwner] = useState<string>('')
  const [manager, setManager] = useState<string>('')
  const [fetchedManager, setFetchedManager] = useState<string>('')
  const [changedValues, setChangedValues] = useState({
    chain: false,
    owner: false,
    manager: false,
    user: false
  })

  const { data: listState, isLoading: isListStateLoading } = useQuery({
    queryKey: ['list state', list],
    queryFn: async () => {
      const listStateReq = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/exportState/${list}`)
      const listStateRes = await listStateReq.json()
      return listStateRes.following as FollowingResponse[]
    }
  })

  const [fetchedSlot, setFetchedSlot] = useState<bigint>()
  const [fetchedListRecordsContractAddress, setFetchedListRecordsContractAddress] =
    useState<Address>()

  const listRegistryContract = getContract({
    address: coreEfpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({
      chain: DEFAULT_CHAIN,
      transport: http(rpcProviders[DEFAULT_CHAIN.id])
    })
  })

  const fetchListData = async () => {
    const listStorageLocation = await listRegistryContract.read.getListStorageLocation([
      BigInt(list)
    ])
    const listOwner = await listRegistryContract.read.ownerOf([BigInt(list)])
    const listStorageLocationChainId = fromHex(`0x${listStorageLocation.slice(64, 70)}`, 'number')

    const slot = BigInt(`0x${listStorageLocation.slice(-64)}`)

    const listStorageLocationChain = chains.find(item => item.id === listStorageLocationChainId)
    const listRecordsContractAddress = listStorageLocation
      ? (`0x${listStorageLocation.slice(70, 110)}` as Address)
      : coreEfpContracts.EFPListRecords

    const listRecordsContract = getContract({
      address: listRecordsContractAddress,
      abi: efpListRecordsAbi,
      client: createPublicClient({
        chain: listStorageLocationChain || DEFAULT_CHAIN,
        transport: http(rpcProviders[listStorageLocationChain?.id || DEFAULT_CHAIN.id])
      })
    })

    const listManager = await listRecordsContract.read.getListManager([slot])
    const listUser = await listRecordsContract.read.getListUser([slot])

    setFetchedSlot(slot)
    setFetchedListRecordsContractAddress(listRecordsContractAddress)

    if (listStorageLocationChain) {
      setChain(listStorageLocationChain)
      setFetchedChain(listStorageLocationChain)
    }
    if (listOwner) {
      setFetchedOwner(listOwner)
      setOwner(listOwner)
    }
    if (listManager) {
      setFetchedManager(listManager)
      setManager(listManager)
    }
    if (listUser) {
      setFetchedUser(listUser)
      setUser(listUser)
    }
  }

  useEffect(() => {
    fetchListData()
    setChangedValues({
      chain: false,
      owner: false,
      manager: false,
      user: false
    })
  }, [profile, list])

  return {
    chain,
    fetchedChain,
    changedValues,
    manager,
    owner,
    user,
    fetchedSlot,
    fetchedListRecordsContractAddress,
    fetchedOwner,
    chains,
    setChangedValues,
    setUser,
    setManager,
    setOwner,
    setChain,
    fetchedManager,
    fetchedUser,
    listState,
    isListStateLoading
  }
}

export default useListSettings
