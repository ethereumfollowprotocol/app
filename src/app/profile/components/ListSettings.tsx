import type { ProfileDetailsResponse } from '#/api/requests'
import CancelButton from '#/components/cancel-button'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import type { ChainWithDetails } from '#/lib/wagmi'
import { useTranslation } from 'react-i18next'
import { useChains } from 'wagmi'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPublicClient, fromHex, getContract, http, type Address, type Chain } from 'viem'
import { efpContracts } from '#/lib/constants/contracts'
import { efpListRegistryAbi } from '#/lib/abi'
import { optimismSepolia } from 'viem/chains'
import Cross from 'public/assets/icons/cross.svg'

interface ListSettingsProps {
  onClose: () => void
  profile: ProfileDetailsResponse
}

const ListSettings: React.FC<ListSettingsProps> = ({ onClose, profile }) => {
  const [chain, setChain] = useState<Chain | null>(null)
  const [owner, setOwner] = useState<string>()
  const [manager, setManager] = useState<string>()
  const [user, setUser] = useState<string>()
  const [changedValues, setChangedValues] = useState({
    owner: false,
    manager: false,
    user: false
  })
  const { t } = useTranslation('profile')
  const chains = useChains()

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

    const listStorageLocationChain = chains.find(item => item.id === listStorageLocationChainId)
    if (listStorageLocationChain) setChain(listStorageLocationChain)
    if (listOwner) setOwner(listOwner)
  }

  useEffect(() => {
    fetchListData()
  }, [profile])

  return (
    <div className='fixed z-50 top-0 flex items-center justify-center left-0 w-full h-full bg-black/50'>
      <div className='glass-card bg-white/40 gap-8 flex flex-col rounded-xl p-10 w-[554px]'>
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
          <button className='w-[190px] flex items-center justify-between px-3 h-12 bg-white/50 p-1 hover:bg-white/60 rounded-md'>
            {chain && <ChainIcon chain={chain as ChainWithDetails} className={'h-6 w-6'} />}
            <p className='text-lg font-semibold truncate'>{chain?.name}</p>
            <Image src={ArrowDown} alt='Open list storage location chains' className='w-5' />
          </button>
        </div>
        <div className=' flex flex-col gap-1'>
          <p className='font-semibold text-lg'>Owner</p>
          <input
            value={owner}
            placeholder='Address or ENS name'
            onChange={e => {
              if (e.target.value.includes(' ')) return
              setOwner(e.target.value)
            }}
            className='p-3 font-medium truncate rounded-lg w-full bg-white/70'
          />
        </div>
        <div className=' flex flex-col gap-1'>
          <p className='font-semibold text-lg'>Manager</p>
          <input
            value={owner}
            placeholder='Address or ENS name'
            onChange={e => {
              if (e.target.value.includes(' ')) return
              setOwner(e.target.value)
            }}
            className='p-3 font-medium truncate rounded-lg w-full bg-white/70'
          />
        </div>
        <div className=' flex flex-col gap-1'>
          <p className='font-semibold text-lg'>User</p>
          <input
            value={owner}
            placeholder='Address or ENS name'
            onChange={e => {
              if (e.target.value.includes(' ')) return
              setOwner(e.target.value)
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
      </div>
    </div>
  )
}

export default ListSettings
