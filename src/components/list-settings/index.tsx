import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import LoadingCell from '../loading-cell'
import ProfileStats from '../profile-stats'
import Cross from 'public/assets/icons/cross.svg'
import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import SaveSettings from './components/save-settings'
import useListSettings from './hooks/use-list-settings'
import SettingsInput from './components/settings-input'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import { PrimaryButton } from '#/components/primary-button'
import type { ProfileDetailsResponse } from '#/types/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'

interface ListSettingsProps {
  selectedList: number
  isSaving: boolean
  profile: ProfileDetailsResponse
  onClose: () => void
  setIsSaving: (state: boolean) => void
}

const ListSettings: React.FC<ListSettingsProps> = ({
  selectedList,
  isSaving,
  onClose,
  setIsSaving,
  profile
}) => {
  const [isEditingSettings, setIsEditingSettings] = useState(false)
  const [chainDropdownOpen, setChainDropdownOpen] = useState(false)
  const chainDropdownRef = useClickAway<HTMLDivElement>(() => {
    setChainDropdownOpen(false)
  })

  const { roles } = useEFPProfile()
  const { address: connectedAddress } = useAccount()
  const listSettingsRef = useClickAway<HTMLDivElement>(onClose)
  const { t } = useTranslation('profile', { keyPrefix: 'list settings' })

  const {
    user,
    owner,
    chain,
    chains,
    setCurrentUser,
    manager,
    setChain,
    setCurrentOwner,
    listState,
    setCurrentManager,
    fetchedUser,
    currentUser,
    userLoading,
    fetchedSlot,
    fetchedOwner,
    currentOwner,
    fetchedChain,
    ownerLoading,
    changedValues,
    isPrimaryList,
    fetchedManager,
    managerLoading,
    currentManager,
    setIsPrimaryList,
    setChangedValues,
    isListStateLoading,
    isListSettingsLoading,
    fetchedListRecordsContractAddress
  } = useListSettings({ profile, list: selectedList })

  return isSaving ? (
    <SaveSettings
      selectedList={selectedList}
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
      listState={listState}
      isListStateLoading={isListStateLoading}
      isPrimaryList={isPrimaryList}
    />
  ) : (
    <div
      className={`fixed z-50 overflow-y-auto top-0 px-4 left-0 flex ${
        window.innerHeight > 720 ? 'items-center' : 'py-8'
      } justify-center w-full h-full bg-black/50`}
    >
      <div
        ref={listSettingsRef}
        className='glass-card h-fit bg-white/40 gap-5 sm:gap-7 flex flex-col rounded-xl p-6 py-8 sm:p-9 w-[554px]'
      >
        <div className='w-full flex items-center justify-between'>
          <div className='relative'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <h3 className='text-4xl sm:text-5xl font-semibold'>
                {t('list')} #{selectedList}
              </h3>
            </div>
          </div>
          <Image
            src={Cross}
            alt='Close list settings'
            className='w-6 cursor-pointer hover:opacity-60 transition-opacity'
            onClick={onClose}
          />
        </div>
        <ProfileStats stats={profile.stats} />
        <div className='flex items-center justify-between gap-2'>
          <p className='font-semibold text-base sm:text-xl'>{t('location')}</p>
          <div className='relative' ref={chainDropdownRef}>
            <button
              className='w-[180px] sm:w-[190px] gap-1 flex items-center justify-between px-2 sm:px-3 h-12 bg-white/50 p-1 hover:bg-white/60 rounded-xl disabled:hover:bg-white/50 disabled:opacity-75 disabled:cursor-not-allowed'
              onClick={() => setChainDropdownOpen(!chainDropdownOpen)}
              disabled={
                !isEditingSettings ||
                connectedAddress?.toLowerCase() !== fetchedOwner?.toLowerCase()
              }
            >
              {isListSettingsLoading ? (
                <LoadingCell className='h-8 w-full rounded-lg' />
              ) : (
                <>
                  {chain && (
                    <ChainIcon chain={chain as ChainWithDetails} className={'h-6 w-6 rounded-lg'} />
                  )}
                  <p className='sm:text-lg font-semibold truncate'>{chain?.name}</p>
                </>
              )}
              {isEditingSettings ? (
                <Image
                  src={ArrowDown}
                  alt='Open list storage location chains'
                  className={`w-5 ${chainDropdownOpen ? 'rotate-180' : ''} transition-transform`}
                />
              ) : (
                <div />
              )}
            </button>
            {chainDropdownOpen && (
              <div className='absolute top-14 z-10 flex bg-white/90 flex-col rounded-xl w-full'>
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
        {(user ? connectedAddress?.toLowerCase() === user.toLowerCase() : roles?.isUser) && (
          <div className='flex items-center w-full justify-between'>
            <p className='text-base sm:text-lg font-bold w-3/4 sm:w-fit'>
              Set selected List as Primary List
            </p>
            <input
              className='toggle disabled:opacity-40 disabled:cursor-not-allowed'
              type='checkbox'
              defaultChecked={isPrimaryList}
              onChange={e => {
                setIsPrimaryList(e.target.checked)
                setChangedValues(prev => ({
                  ...prev,
                  setPrimary:
                    user.toLowerCase() === connectedAddress?.toLowerCase()
                      ? e.target.checked
                      : e.target.checked !== (Number(profile.primary_list) === selectedList)
                }))
              }}
              disabled={!isEditingSettings}
            />
          </div>
        )}
        <SettingsInput
          option={t('owner')}
          value={currentOwner}
          resolvedAddress={owner}
          placeholder={fetchedOwner || 'Address or ENS name'}
          disableValue={fetchedOwner}
          setValue={setCurrentOwner}
          isEditingSettings={isEditingSettings}
          isLoading={ownerLoading}
          isSettingsLoading={isListSettingsLoading}
        />
        <SettingsInput
          option={t('manager')}
          value={currentManager}
          resolvedAddress={manager}
          placeholder={fetchedManager || 'Address or ENS name'}
          disableValue={fetchedManager}
          setValue={setCurrentManager}
          isEditingSettings={isEditingSettings}
          isLoading={managerLoading}
          isSettingsLoading={isListSettingsLoading}
        />
        <SettingsInput
          option={t('user')}
          value={currentUser}
          resolvedAddress={user}
          placeholder={fetchedUser || 'Address or ENS name'}
          disableValue={fetchedManager}
          setValue={setCurrentUser}
          isEditingSettings={isEditingSettings}
          isLoading={userLoading}
          isSettingsLoading={isListSettingsLoading}
        />
        {connectedAddress?.toLowerCase() !== fetchedManager?.toLowerCase() &&
        connectedAddress?.toLowerCase() !== fetchedOwner?.toLowerCase() &&
        connectedAddress?.toLowerCase() !==
          fetchedUser?.toLowerCase() ? null : isEditingSettings ? (
          <div className='w-full flex justify-between'>
            <button
              onClick={() => setIsEditingSettings(false)}
              className='text-lg mt-4 w-32 font-semibold hover:opacity-90 bg-[#a8a8a8] rounded-full h-12'
            >
              Cancel
            </button>
            <PrimaryButton
              label={t('save')}
              onClick={() => setIsSaving(true)}
              className='text-lg mt-4 w-32 h-12'
              disabled={!Object.values(changedValues).includes(true)}
            />
          </div>
        ) : (
          <button
            onClick={() => setIsEditingSettings(true)}
            className='text-lg mt-4 px-6 mx-auto font-semibold hover:opacity-90 bg-[#a8a8a8] rounded-full h-12'
          >
            Edit Settings
          </button>
        )}
      </div>
    </div>
  )
}

export default ListSettings
