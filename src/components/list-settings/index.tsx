import Image from 'next/image'
import { useState } from 'react'
import { isAddress } from 'viem'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import Cross from 'public/assets/icons/cross.svg'
import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import SaveSettings from './components/save-settings'
import useListSettings from './hooks/use-list-settings'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import { PrimaryButton } from '#/components/primary-button'
import type { ProfileDetailsResponse } from '#/types/requests'

interface ListSettingsProps {
  showSingleList?: boolean
  selectedList: number
  lists?: number[]
  isSaving: boolean
  profile: ProfileDetailsResponse
  onClose: () => void
  setIsSaving: (state: boolean) => void
}

const ListSettings: React.FC<ListSettingsProps> = ({
  showSingleList,
  selectedList,
  isSaving,
  onClose,
  lists,
  setIsSaving,
  profile
}) => {
  const [currentList, setCurrentList] = useState(selectedList)
  const [chainDropdownOpen, setChainDropdownOpen] = useState(false)
  const chainDropdownRef = useClickAway<HTMLDivElement>(() => {
    setChainDropdownOpen(false)
  })

  const [listsDropdownOpen, setListsDropdownOpen] = useState(false)
  const listsDropdownRef = useClickAway<HTMLDivElement>(() => {
    setListsDropdownOpen(false)
  })

  const { address: connectedAddress } = useAccount()
  const listSettingsRef = useClickAway<HTMLDivElement>(onClose)
  const { t } = useTranslation('profile', { keyPrefix: 'list settings' })

  const {
    user,
    owner,
    chain,
    chains,
    setUser,
    manager,
    setChain,
    setOwner,
    setManager,
    fetchedUser,
    fetchedSlot,
    fetchedOwner,
    fetchedChain,
    changedValues,
    fetchedManager,
    setChangedValues,
    fetchedListRecordsContractAddress
  } = useListSettings({ profile, list: currentList })

  return isSaving ? (
    <SaveSettings
      selectedList={currentList}
      newChain={chain}
      chain={fetchedChain}
      changedValues={changedValues}
      profile={profile}
      manager={manager}
      owner={owner}
      user={user}
      slot={fetchedSlot}
      onCancel={() => setIsSaving(false)}
      onClose={onClose}
      listRecordsContractAddress={fetchedListRecordsContractAddress}
    />
  ) : (
    <div
      className={`fixed z-50 overflow-y-auto top-0 px-4 left-0 flex ${
        window.innerHeight > 720 ? 'items-center' : 'py-8'
      } justify-center w-full h-full bg-black/50`}
    >
      <div
        ref={listSettingsRef}
        className='glass-card h-fit bg-white/40 gap-5 sm:gap-8 flex flex-col rounded-xl p-6 py-8 sm:p-10 w-[554px]'
      >
        <div className='w-full flex items-center justify-between'>
          <div ref={listsDropdownRef} className='relative'>
            <div
              onClick={() => setListsDropdownOpen(!listsDropdownOpen)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <h3 className='text-4xl sm:text-5xl font-semibold'>
                {t('list')} #{currentList}
              </h3>
              {(lists?.length || 0) > 1 && !showSingleList && (
                <Image
                  src={ArrowDown}
                  alt='Open list storage location chains'
                  className={` ${listsDropdownOpen ? 'rotate-180' : ''} w-5 transition-transform`}
                />
              )}
            </div>
            {(lists?.length || 0) > 1 && listsDropdownOpen && !showSingleList && (
              <div className='absolute top-14 flex bg-white/90 flex-col rounded-xl w-full'>
                {lists?.map(item => (
                  <div
                    key={item}
                    onClick={() => {
                      setCurrentList(Number(item))
                      setListsDropdownOpen(false)
                    }}
                    className='w-full hover:bg-white cursor-pointer rounded-xl flex items-center gap-3 p-3'
                  >
                    <p className='text-lg font-semibold truncate'>
                      {t('list')} #{item}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        <div className='flex items-center justify-between gap-2'>
          <p className='font-semibold text-base sm:text-xl'>{t('location')}</p>
          <div className='relative' ref={chainDropdownRef}>
            <button
              className='w-[180px] sm:w-[190px] gap-1 flex items-center justify-between px-2 sm:px-3 h-12 bg-white/50 p-1 hover:bg-white/60 rounded-xl disabled:hover:bg-white/50 disabled:opacity-75 disabled:cursor-not-allowed'
              onClick={() => setChainDropdownOpen(!chainDropdownOpen)}
              disabled={connectedAddress?.toLowerCase() !== fetchedOwner?.toLowerCase()}
            >
              {chain && <ChainIcon chain={chain as ChainWithDetails} className={'h-6 w-6'} />}
              <p className='sm:text-lg font-semibold truncate'>{chain?.name}</p>
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
                    <ChainIcon
                      chain={item as ChainWithDetails}
                      className={'h-6 sm:h-7 w-6 sm:w-7'}
                    />
                    <p className='sm:text-lg font-semibold truncate'>{item?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=' flex flex-col gap-1'>
          <p className='font-semibold text-lg'>{t('owner')}</p>
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
            disabled={connectedAddress?.toLowerCase() !== fetchedOwner?.toLowerCase()}
            className='p-3 font-medium truncate rounded-lg w-full bg-white/70 disabled:text-gray-400 disabled:cursor-not-allowed'
          />
        </div>
        <div className=' flex flex-col gap-1'>
          <p className='font-semibold text-lg'>{t('manager')}</p>
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
            disabled={connectedAddress?.toLowerCase() !== fetchedManager?.toLowerCase()}
            className='p-3 font-medium truncate rounded-lg w-full bg-white/70 disabled:text-gray-400 disabled:cursor-not-allowed'
          />
        </div>
        <div className=' flex flex-col gap-1'>
          <p className='font-semibold text-lg'>{t('user')}</p>
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
            disabled={connectedAddress?.toLowerCase() !== fetchedManager?.toLowerCase()}
            className='p-3 font-medium truncate rounded-lg w-full bg-white/70 disabled:text-gray-400 disabled:cursor-not-allowed'
          />
        </div>
        <PrimaryButton
          label={t('save')}
          onClick={() => setIsSaving(true)}
          className='text-lg mt-4 w-full h-12'
          disabled={!Object.values(changedValues).includes(true)}
        />
      </div>
    </div>
  )
}

export default ListSettings
