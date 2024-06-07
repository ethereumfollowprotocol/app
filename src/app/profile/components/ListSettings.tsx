import type { ProfileDetailsResponse } from '#/api/requests'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import type { ChainWithDetails } from '#/lib/wagmi'
import { useTranslation } from 'react-i18next'
import { useChains } from 'wagmi'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPublicClient, fromHex, getContract, http, isAddress, type Chain } from 'viem'
import { efpContracts } from '#/lib/constants/contracts'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import { optimismSepolia } from 'viem/chains'
import Cross from 'public/assets/icons/cross.svg'
import { useClickAway } from '@uidotdev/usehooks'

interface ListSettingsProps {
  onClose: () => void
  profile: ProfileDetailsResponse
}

const ListSettings: React.FC<ListSettingsProps> = ({ onClose, profile }) => {
  const [chainDropdownOpen, setChainDropdownOpen] = useState(false)
  const [fetchedChain, setFetchedChain] = useState<Chain | null>(null)
  const [chain, setChain] = useState<Chain | null>(null)
  const chainDropdownRef = useClickAway<HTMLDivElement>(() => {
    setChainDropdownOpen(false)
  })

  const [owner, setOwner] = useState<string>()
  const [manager, setManager] = useState<string>()
  const [user, setUser] = useState<string>()
  const [fetchedOwner, setFetchedOwner] = useState<string>()
  const [fetchedManager, setFetchedManager] = useState<string>()
  const [fetchedUser, setFetchedUser] = useState<string>()
  const [changedValues, setChangedValues] = useState({
    chain: false,
    owner: false,
    manager: false,
    user: false
  })

  const chains = useChains()
  const { t } = useTranslation('profile')
  const listSettingsRef = useClickAway<HTMLDivElement>(onClose)

  const listRegistryContract = getContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({ chain: optimismSepolia, transport: http() })
  })

  const fetchListData = async () => {
    if (!profile.primary_list) return

    const listOwner = await listRegistryContract.read.ownerOf([BigInt(profile?.primary_list)])
    const listStorageLocationChainId = fromHex(
      `0x${(
        await listRegistryContract.read.getListStorageLocation([BigInt(profile?.primary_list)])
      ).slice(64, 70)}`,
      'number'
    )

    const slot = BigInt(
      `0x${(
        await listRegistryContract.read.getListStorageLocation([BigInt(profile?.primary_list)])
      ).slice(-64)}`
    )

    const listStorageLocationChain = chains.find(item => item.id === listStorageLocationChainId)

    const listRecordsContract = getContract({
      address: efpContracts.EFPListRecords,
      abi: efpListRecordsAbi,
      client: createPublicClient({
        chain: listStorageLocationChain || optimismSepolia,
        transport: http()
      })
    })
    const listManager = await listRecordsContract.read.getListManager([slot])
    const listUser = await listRecordsContract.read.getListUser([slot])

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
  }, [profile])

  return (
    <div className='fixed z-50 top-0 flex items-center justify-center left-0 w-full h-full bg-black/50'>
      <div
        ref={listSettingsRef}
        className='glass-card bg-white/40 gap-8 flex flex-col rounded-xl p-10 w-[554px]'
      >
        {profile.primary_list ? (
          <>
            <div className='w-full flex items-center justify-between'>
              <h3 className='text-5xl font-semibold'>List #{profile.primary_list}</h3>
              <Image
                src={Cross}
                alt='Close list settings'
                className='w-6 cursor-pointer hover:opacity-60 transition-opacity'
                onClick={onClose}
              />
            </div>
            <div className='flex w-full items-center justify-between'>
              <div>
                <div className='text-xl text-center sm:text-2xl font-bold'>
                  {profile.stats === undefined ? '-' : profile.stats.following_count}
                </div>
                <div className='sm:text-lg font-bold text-gray-500'>{t('following')}</div>
              </div>
              <div>
                <div className='text-xl text-center sm:text-2xl font-bold'>
                  {profile.stats === undefined ? '-' : profile.stats.followers_count}
                </div>
                <div className='sm:text-lg text-gray-500 font-bold'>{t('followers')}</div>
              </div>
              <div>
                <div className='text-xl text-center sm:text-2xl font-bold'># -</div>
                <div className='sm:text-lg font-bold text-gray-500'>{t('leaderboard')}</div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-xl'>List storage location</p>
              <div className='relative' ref={chainDropdownRef}>
                <button
                  className='w-[190px] flex items-center justify-between px-3 h-12 bg-white/50 p-1 hover:bg-white/60 rounded-xl'
                  onClick={() => setChainDropdownOpen(!chainDropdownOpen)}
                >
                  {chain && <ChainIcon chain={chain as ChainWithDetails} className={'h-6 w-6'} />}
                  <p className='text-lg font-semibold truncate'>{chain?.name}</p>
                  <Image
                    src={ArrowDown}
                    alt='Open list storage location chains'
                    className={`w-5 ${chainDropdownOpen ? 'rotate-180' : ''} transition-transform`}
                  />
                </button>
                {chainDropdownOpen && (
                  <div className='absolute top-14 flex bg-white/90 flex-col rounded-xl w-full'>
                    {chains.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setChain(item)
                          setChainDropdownOpen(false)
                          setChangedValues({
                            ...changedValues,
                            chain: fetchedChain?.id !== item.id
                          })
                        }}
                        className='w-full hover:bg-white cursor-pointer rounded-xl flex items-center gap-3 p-3'
                      >
                        <ChainIcon chain={item as ChainWithDetails} className={'h-7 w-7'} />
                        <p className='text-lg font-semibold truncate'>{item?.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className=' flex flex-col gap-1'>
              <p className='font-semibold text-lg'>Owner</p>
              <input
                value={owner}
                placeholder={fetchedOwner || 'Address or ENS name'}
                onChange={e => {
                  const addr = e.target.value
                  if (addr.includes(' ')) return
                  setOwner(addr)
                  setChangedValues({
                    ...changedValues,
                    owner: isAddress(addr) && addr.toLowerCase() !== fetchedOwner?.toLowerCase()
                  })
                }}
                className='p-3 font-medium truncate rounded-lg w-full bg-white/70'
              />
            </div>
            <div className=' flex flex-col gap-1'>
              <p className='font-semibold text-lg'>Manager</p>
              <input
                value={manager}
                placeholder={fetchedManager || 'Address or ENS name'}
                onChange={e => {
                  const addr = e.target.value
                  if (addr.includes(' ')) return
                  setManager(addr)
                  setChangedValues({
                    ...changedValues,
                    manager: isAddress(addr) && addr.toLowerCase() !== fetchedManager?.toLowerCase()
                  })
                }}
                className='p-3 font-medium truncate rounded-lg w-full bg-white/70'
              />
            </div>
            <div className=' flex flex-col gap-1'>
              <p className='font-semibold text-lg'>User</p>
              <input
                value={user}
                placeholder={fetchedUser || 'Address or ENS name'}
                onChange={e => {
                  const addr = e.target.value
                  if (addr.includes(' ')) return
                  setUser(addr)
                  setChangedValues({
                    ...changedValues,
                    user: isAddress(addr) && addr.toLowerCase() !== fetchedUser?.toLowerCase()
                  })
                }}
                className='p-3 font-medium truncate rounded-lg w-full bg-white/70'
              />
            </div>
            <PrimaryButton
              label={'Save'}
              onClick={() => {}}
              className='text-lg mt-4 w-full h-12'
              disabled={!Object.values(changedValues).includes(true)}
            />
          </>
        ) : (
          <p>User doesn't have an EFP List</p>
        )}
      </div>
    </div>
  )
}

export default ListSettings
