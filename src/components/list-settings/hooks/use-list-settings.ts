import {
  http,
  fromHex,
  isAddress,
  type Chain,
  getContract,
  type Address,
  createPublicClient
} from 'viem'
import { useEffect, useState } from 'react'
import { useAccount, useChains } from 'wagmi'
import { useQuery } from '@tanstack/react-query'

import { SECOND } from '#/lib/constants'
import { resolveEnsAddress } from '#/utils/ens'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import { rpcProviders } from '#/lib/constants/rpc-providers'
import { coreEfpContracts } from '#/lib/constants/contracts'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'

const useListSettings = ({ profile, list }: { profile: ProfileDetailsResponse; list: number }) => {
  const chains = useChains()
  const [chain, setChain] = useState<Chain>()
  const [fetchedChain, setFetchedChain] = useState<Chain>()

  const [isListSettingsLoading, setIsListSettingsLoading] = useState(false)
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

  const initialPrimaryListState = profile.primary_list
    ? Number(profile.primary_list) === list
    : false
  const [isPrimaryList, setIsPrimaryList] = useState(initialPrimaryListState)

  const [changedValues, setChangedValues] = useState({
    chain: false,
    owner: false,
    manager: false,
    user: false,
    setPrimary: false,
    resetSlot: false
  })

  const { address: connectedAddress } = useAccount()

  useEffect(() => {
    const updateValue = async () => {
      if (isAddress(currentUser) && currentUser.toLowerCase() !== fetchedUser?.toLowerCase()) {
        setUser(currentUser)
        setUserLoading(false)
        if (currentUser.toLowerCase() === connectedAddress?.toLowerCase()) setIsPrimaryList(false)
        return setChangedValues(currValues => ({
          ...currValues,
          user: true,
          setPrimary: false
        }))
      }

      if (currentUser.includes('.')) {
        const resolvedAddress = await resolveEnsAddress(currentUser)
        if (resolvedAddress) {
          setUser(resolvedAddress)
          setUserLoading(false)
          if (resolvedAddress.toLowerCase() !== fetchedUser?.toLowerCase()) {
            if (resolvedAddress.toLowerCase() === connectedAddress?.toLowerCase())
              setIsPrimaryList(false)
            setChangedValues(currValues => ({
              ...currValues,
              user: true,
              setPrimary: false
            }))
          }

          return
        }
      }

      if (changedValues.user) {
        setUser('')
        setChangedValues(currValues => ({
          ...currValues,
          user: false,
          setPrimary: isPrimaryList !== initialPrimaryListState
        }))
      }
      setUserLoading(false)
    }

    setUserLoading(true)
    const userTimeout = setTimeout(updateValue, 0.5 * SECOND)
    return () => clearTimeout(userTimeout)
  }, [currentUser])

  useEffect(() => {
    const updateValue = async () => {
      if (
        isAddress(currentManager) &&
        currentManager.toLowerCase() !== fetchedManager?.toLowerCase()
      ) {
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

          if (resolvedAddress.toLowerCase() !== fetchedManager?.toLowerCase())
            setChangedValues(currValues => ({
              ...currValues,
              manager: true
            }))

          return
        }

        setManager('')
      }

      if (changedValues.manager) {
        setManager('')
        setChangedValues(currValues => ({
          ...currValues,
          manager: false
        }))
      }
      setManagerLoading(false)
    }

    setManagerLoading(true)
    const managerTimeout = setTimeout(updateValue, 0.5 * SECOND)
    return () => clearTimeout(managerTimeout)
  }, [currentManager])

  useEffect(() => {
    const updateValue = async () => {
      if (isAddress(currentOwner) && currentOwner.toLowerCase() !== fetchedOwner?.toLowerCase()) {
        setOwner(currentOwner)
        setOwnerLoading(false)
        return setChangedValues(currValues => ({
          ...currValues,
          owner: true
        }))
      }

      if (currentOwner.includes('.')) {
        const resolvedAddress = await resolveEnsAddress(currentOwner)

        if (isAddress(resolvedAddress)) {
          setOwner(resolvedAddress)
          setOwnerLoading(false)

          if (resolvedAddress.toLowerCase() !== fetchedOwner?.toLowerCase())
            setChangedValues(currValues => ({
              ...currValues,
              owner: true
            }))

          return
        }
      }

      if (changedValues.owner) {
        setOwner('')
        setChangedValues(currValues => ({
          ...currValues,
          owner: false
        }))
      }

      setOwnerLoading(false)
    }

    setOwnerLoading(true)
    const ownerTimeout = setTimeout(updateValue, 0.5 * SECOND)
    return () => clearTimeout(ownerTimeout)
  }, [currentOwner])

  const { data: listState, isLoading: isListStateLoading } = useQuery({
    queryKey: ['list state', list],
    queryFn: async () => {
      const listStateReq = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/exportState/${list}`)
      const listStateRes = (await listStateReq.json()) as { following: FollowingResponse[] }
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

    setIsListSettingsLoading(false)
  }

  useEffect(() => {
    setIsListSettingsLoading(true)
    fetchListData()
    setChangedValues({
      chain: false,
      owner: false,
      manager: false,
      user: false,
      setPrimary: false,
      resetSlot: false
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
    isPrimaryList,
    setIsPrimaryList,
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
    ownerLoading,
    isListSettingsLoading
  }
}

export default useListSettings
