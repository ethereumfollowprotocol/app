import { useChains } from 'wagmi'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  http,
  fromHex,
  getContract,
  createPublicClient,
  type Address,
  type Chain,
  isAddress
} from 'viem'

import { DEFAULT_CHAIN } from '#/lib/constants/chain'
import { rpcProviders } from '#/lib/constants/providers'
import { coreEfpContracts } from '#/lib/constants/contracts'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'
import { resolveEnsAddress } from '#/utils/ens'

const useListSettings = ({ profile, list }: { profile: ProfileDetailsResponse; list: number }) => {
  const chains = useChains()
  const [chain, setChain] = useState<Chain>()
  const [fetchedChain, setFetchedChain] = useState<Chain>()

  const [user, setUser] = useState<string>('')
  const [userLoading, setUserLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<string>('')
  const [fetchedUser, setFetchedUser] = useState<string>('')
  const [owner, setOwner] = useState<string>('')
  const [ownerLoading, setOwnerLoading] = useState(false)
  const [currentOwner, setCurrentOwner] = useState<string>('')
  const [fetchedOwner, setFetchedOwner] = useState<string>('')
  const [manager, setManager] = useState<string>('')
  const [managerLoading, setManagerLoading] = useState(false)
  const [currentManager, setCurrentManager] = useState<string>('')
  const [fetchedManager, setFetchedManager] = useState<string>('')
  const [changedValues, setChangedValues] = useState({
    chain: false,
    owner: false,
    manager: false,
    user: false
  })

  useEffect(() => {
    const updateValue = async () => {
      if (isAddress(currentUser)) {
        setUser(currentUser)
        setUserLoading(false)
        return setChangedValues(currValues => ({
          ...currValues,
          user: true
        }))
      }

      if (currentUser.includes('.')) {
        const resolvedAddress = await resolveEnsAddress(currentUser)
        if (resolvedAddress) {
          setUser(resolvedAddress)
          setUserLoading(false)
          return setChangedValues(currValues => ({
            ...currValues,
            user: true
          }))
        }
      }

      if (changedValues.user)
        setChangedValues(currValues => ({
          ...currValues,
          user: false
        }))

      setUserLoading(false)
    }

    setUserLoading(true)
    updateValue()
  }, [currentUser])

  useEffect(() => {
    const updateValue = async () => {
      if (isAddress(currentManager)) {
        setManager(currentManager)
        setManagerLoading(false)
        return setChangedValues(currValues => ({
          ...currValues,
          manager: true
        }))
      }

      if (currentManager.includes('.')) {
        const resolvedAddress = await resolveEnsAddress(currentManager)
        if (resolvedAddress) {
          setManager(resolvedAddress)
          setManagerLoading(false)
          return setChangedValues(currValues => ({
            ...currValues,
            manager: true
          }))
        }

        setManager('')
      }

      if (changedValues.manager)
        setChangedValues(currValues => ({
          ...currValues,
          manager: false
        }))

      setManagerLoading(false)
    }

    setManagerLoading(true)
    updateValue()
  }, [currentManager])

  useEffect(() => {
    const updateValue = async () => {
      if (isAddress(currentOwner)) {
        setOwner(currentOwner)
        setOwnerLoading(false)
        return setChangedValues(currValues => ({
          ...currValues,
          owner: true
        }))
      }

      if (currentOwner.includes('.')) {
        const resolvedAddress = await resolveEnsAddress(currentOwner)

        if (resolvedAddress) {
          setOwner(resolvedAddress)
          setOwnerLoading(false)
          return setChangedValues(currValues => ({
            ...currValues,
            owner: true
          }))
        }
      }

      if (changedValues.owner)
        setChangedValues(currValues => ({
          ...currValues,
          owner: false
        }))

      setOwnerLoading(false)
    }

    setOwnerLoading(true)
    updateValue()
  }, [currentOwner])

  const { data: listState, isLoading: isListStateLoading } = useQuery({
    queryKey: ['list state', list],
    queryFn: async () => {
      const listStateReq = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/exportState/${list}`)
      const listStateRes = await listStateReq.json()
      return listStateRes.following as FollowingResponse[]
    },
    staleTime: 180000
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
      setCurrentOwner(listOwner)
    }
    if (listManager) {
      setFetchedManager(listManager)
      setCurrentManager(listManager)
    }
    if (listUser) {
      setFetchedUser(listUser)
      setCurrentUser(listUser)
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
    owner,
    currentOwner,
    manager,
    currentManager,
    user,
    currentUser,
    fetchedSlot,
    fetchedListRecordsContractAddress,
    fetchedOwner,
    chains,
    setChangedValues,
    setCurrentOwner,
    setCurrentManager,
    setCurrentUser,
    setChain,
    fetchedManager,
    fetchedUser,
    listState,
    isListStateLoading,
    userLoading,
    managerLoading,
    ownerLoading
  }
}

export default useListSettings
