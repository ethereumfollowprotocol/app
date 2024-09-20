import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { IoIosArrowDown } from 'react-icons/io'

import Modal from '../modal'
import LoadingCell from '../loaders/loading-cell'
import CancelButton from '../buttons/cancel-button'
import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import SaveSettings from './components/save-settings'
import useListSettings from './hooks/use-list-settings'
import SettingsInput from './components/settings-input'
import type { ProfileDetailsResponse } from '#/types/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { PrimaryButton } from '#/components/buttons/primary-button'

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
  const { t } = useTranslation()

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
    <Modal onCancel={onClose} className='items-start py-[5vh]'>
      <div className='gap-5 sm:gap-7 flex flex-col rounded-xl p-1 sm:p-3 max-w-full w-full sm:w-[554px]'>
        <div className='w-full flex items-center justify-between'>
          <div className='relative'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <h3 className='text-4xl sm:text-5xl font-bold'>
                {t('list')} #{selectedList}
              </h3>
            </div>
          </div>
        </div>
        <div className='flex items-center max-w-full justify-between gap-2'>
          <p className='font-bold text-base sm:text-xl'>{t('location')}</p>
          <div className='relative' ref={chainDropdownRef}>
            <button
              className='w-[170px] sm:w-[190px] gap-0.5 flex items-center justify-between px-2 sm:px-3 h-[42px] sm:h-12 dark:bg-darkGrey/50 dark:hover:bg-darkGrey bg-white/50 p-1 hover:bg-white/60 rounded-xl disabled:hover:bg-white/50 disabled:opacity-75 disabled:cursor-not-allowed'
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
                  <p className='sm:text-lg font-bold truncate'>{chain?.name}</p>
                </>
              )}
              {isEditingSettings ? (
                <IoIosArrowDown
                  className={`${
                    chainDropdownOpen ? 'rotate-180' : ''
                  } h-5 w-5 transition-transform`}
                />
              ) : (
                <div />
              )}
            </button>
            {chainDropdownOpen && (
              <div className='absolute top-12 sm:top-14 z-10 flex bg-white dark:bg-darkGrey flex-col rounded-xl w-full'>
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
                    className='w-full hover:bg-white dark:hover:bg-zinc-500/20 cursor-pointer rounded-xl flex items-center gap-3 p-3'
                  >
                    <ChainIcon
                      chain={item as ChainWithDetails}
                      className={'h-6 sm:h-7 w-6 sm:w-7'}
                    />
                    <p className='sm:text-lg font-bold truncate'>{item?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {(user ? connectedAddress?.toLowerCase() === user.toLowerCase() : roles?.isUser) && (
          <div className='flex items-center w-full justify-between'>
            <p className='text-base sm:text-lg font-bold w-3/4 sm:w-fit'>{t('set as primary')}</p>
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
          <div className='w-full flex items-center mt-4 justify-between'>
            <CancelButton onClick={() => setIsEditingSettings(false)} />
            <PrimaryButton
              label={t('save')}
              onClick={() => setIsSaving(true)}
              className='text-lg w-32'
              disabled={!Object.values(changedValues).includes(true)}
            />
          </div>
        ) : (
          <button
            onClick={() => setIsEditingSettings(true)}
            className='text-lg mt-4 px-6 h-14 mx-auto hover:scale-110 transition-all font-bold hover:opacity-90 bg-[#bbbbbb] text-darkGrey rounded-full'
          >
            {t('edit settings')}
          </button>
        )}
      </div>
    </Modal>
  )
}

export default ListSettings
