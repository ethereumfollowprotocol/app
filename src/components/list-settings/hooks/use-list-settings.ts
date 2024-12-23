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
import { efpListRecordsAbi } from '#/lib/abi'
import { resolveEnsAddress } from '#/utils/ens'
import type { ListSettingsKey } from '#/types/common'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import { fetchListState } from '#/api/fetch-list-state'
import { rpcProviders } from '#/lib/constants/rpc-providers'
import type { ProfileDetailsResponse } from '#/types/requests'
import { INITIAL_CHANGED_VALUES } from '#/lib/constants/list-settings'
import { coreEfpContracts, listRegistryContract } from '#/lib/constants/contracts'

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
  const [changedValues, setChangedValues] = useState(INITIAL_CHANGED_VALUES)

  const { address: connectedAddress } = useAccount()

  const updateValue = async ({
    currentValue,
    fetchedValue,
    setValue,
    setLoading,
    checkPrimaryList,
    onValueChange,
    key
  }: {
    currentValue: string
    fetchedValue: string
    checkPrimaryList: boolean
    setValue: (value: string) => void
    setLoading: (loading: boolean) => void
    onValueChange: () => void
    key: ListSettingsKey
  }) => {
    if (isAddress(currentValue) && currentValue.toLowerCase() !== fetchedValue?.toLowerCase()) {
      setValue(currentValue)
      setLoading(false)
      if (checkPrimaryList && currentValue.toLowerCase() === connectedAddress?.toLowerCase())
        setIsPrimaryList(false)
      return onValueChange()
    }

    if (currentValue.includes('.')) {
      const resolvedAddress = await resolveEnsAddress(currentValue)
      if (resolvedAddress) {
        setValue(resolvedAddress)
        setLoading(false)

        if (resolvedAddress.toLowerCase() !== fetchedValue?.toLowerCase()) {
          if (checkPrimaryList && resolvedAddress.toLowerCase() === connectedAddress?.toLowerCase())
            setIsPrimaryList(false)
          onValueChange()
        }
        return
      }
    }

    if (changedValues[key]) {
      setValue('')
      onValueChange()
    }

    setLoading(false)
  }

  useEffect(() => {
    const onValueChange = () => {
      if (changedValues.user)
        setChangedValues(currValues => ({
          ...currValues,
          user: false,
          setPrimary: isPrimaryList !== initialPrimaryListState
        }))
      else
        setChangedValues(currValues => ({
          ...currValues,
          user: true,
          setPrimary: false
        }))
    }

    setUserLoading(true)
    const userTimeout = setTimeout(
      () =>
        updateValue({
          currentValue: currentUser,
          fetchedValue: fetchedUser,
          setValue: setUser,
          setLoading: setUserLoading,
          checkPrimaryList: true,
          onValueChange,
          key: 'user'
        }),
      0.5 * SECOND
    )
    return () => clearTimeout(userTimeout)
  }, [currentUser])

  useEffect(() => {
    const onValueChange = () => {
      if (changedValues.manager)
        setChangedValues(currValues => ({
          ...currValues,
          manager: false
        }))
      else
        setChangedValues(currValues => ({
          ...currValues,
          manager: true
        }))
    }

    setManagerLoading(true)
    const managerTimeout = setTimeout(
      () =>
        updateValue({
          currentValue: currentManager,
          fetchedValue: fetchedManager,
          setValue: setManager,
          setLoading: setManagerLoading,
          checkPrimaryList: false,
          onValueChange,
          key: 'manager'
        }),
      0.5 * SECOND
    )
    return () => clearTimeout(managerTimeout)
  }, [currentManager])

  useEffect(() => {
    const onValueChange = () => {
      if (changedValues.owner)
        setChangedValues(currValues => ({
          ...currValues,
          owner: false
        }))
      else
        setChangedValues(currValues => ({
          ...currValues,
          owner: true
        }))
    }

    setOwnerLoading(true)
    const ownerTimeout = setTimeout(
      () =>
        updateValue({
          currentValue: currentOwner,
          fetchedValue: fetchedOwner,
          setValue: setOwner,
          setLoading: setOwnerLoading,
          checkPrimaryList: false,
          onValueChange,
          key: 'owner'
        }),
      0.5 * SECOND
    )
    return () => clearTimeout(ownerTimeout)
  }, [currentOwner])

  const { data: listState, isLoading: isListStateLoading } = useQuery({
    queryKey: ['list state', list],
    queryFn: async () => await fetchListState(list)
  })

  const [fetchedSlot, setFetchedSlot] = useState<bigint>()
  const [fetchedListRecordsContractAddress, setFetchedListRecordsContractAddress] =
    useState<Address>()

  const fetchListData = async () => {
    const listStorageLocation = await listRegistryContract.read.getListStorageLocation([
      BigInt(list)
    ])
    const listOwner = await listRegistryContract.read.ownerOf([BigInt(list)])

    const slot = BigInt(`0x${listStorageLocation.slice(-64)}`)
    const listStorageLocationChainId = fromHex(`0x${listStorageLocation.slice(64, 70)}`, 'number')
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
    setChangedValues(INITIAL_CHANGED_VALUES)
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
