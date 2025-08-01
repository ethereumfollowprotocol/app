import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import Modal from '../modal'
import { cn } from '#/lib/utilities'
import LoadingCell from '../loaders/loading-cell'
import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import useListSettings from './hooks/use-list-settings'
import SettingsInput from './components/settings-input'
import ResetSlotWarning from './components/reset-slot-warning'
import type { ProfileDetailsResponse } from '#/types/requests'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import PrimaryButton from '#/components/buttons/primary-button'
import List from 'public/assets/icons/ui/list.svg'
import Owner from 'public/assets/icons/ui/key.svg'
import User from 'public/assets/icons/ui/person.svg'
import Manager from 'public/assets/icons/ui/edit.svg'
import Refresh from 'public/assets/icons/ui/refresh.svg'
import Location from 'public/assets/icons/ui/location.svg'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'
import useSaveListSettings from './hooks/use-save-list-settings'

interface ListSettingsProps {
  selectedList: number
  profile: ProfileDetailsResponse
  onClose: () => void
}

const ListSettings: React.FC<ListSettingsProps> = ({ selectedList, onClose, profile }) => {
  const [isResetSlotWarningOpen, setIsResetSlotWarningOpen] = useState(false)
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
    isListSettingsLoading,
    fetchedListRecordsContractAddress,
  } = useListSettings({ profile, list: selectedList })

  const { submitChanges } = useSaveListSettings({
    slot: fetchedSlot,
    user,
    owner,
    chain,
    profile,
    manager,
    onClose,
    newChain: chain,
    listState,
    selectedList,
    changedValues,
    isPrimaryList,
    listRecordsContractAddress: fetchedListRecordsContractAddress,
  })

  const isOwner = connectedAddress?.toLowerCase() === fetchedOwner?.toLowerCase()
  const isManager = connectedAddress?.toLowerCase() === fetchedManager?.toLowerCase()
  const isUser = connectedAddress?.toLowerCase() === fetchedUser?.toLowerCase()

  return (
    <>
      <Modal onCancel={onClose} className='items-start py-[5vh]'>
        <div className='flex w-full max-w-full flex-col gap-5 rounded-sm p-2 pt-6 sm:w-[554px]'>
          <div className='flex w-full items-center justify-between px-3'>
            <div className='flex cursor-pointer items-center gap-2'>
              <h3 className='text-4xl font-bold'>
                {t('list')} #{selectedList}
              </h3>
            </div>
            {roles?.isOwner && isOwner && (
              <button
                className={cn(
                  'hover text-text flex items-center gap-2 rounded-sm bg-red-400 p-2.5 font-semibold transition-all',
                  isEditingSettings
                    ? 'cursor-pointer hover:bg-red-400 hover:opacity-80'
                    : 'cursor-not-allowed opacity-60'
                )}
                onClick={() => {
                  if (isEditingSettings) setIsResetSlotWarningOpen(true)
                }}
              >
                <p>{t('listSettings.resetList')}</p>
                <Refresh className='h-auto w-4' />
              </button>
            )}
          </div>
          {(user ? connectedAddress?.toLowerCase() === user.toLowerCase() : roles?.isUser) && (
            <div className='flex w-full items-center justify-between px-3'>
              <div className='flex items-center gap-2'>
                <p className='text-lg font-bold'>{t('set as primary')}</p>
                <List className='h-auto w-4' />
              </div>
              <input
                className='toggle disabled:cursor-not-allowed disabled:opacity-40'
                type='checkbox'
                defaultChecked={isPrimaryList}
                onChange={(e) => {
                  setIsPrimaryList(e.target.checked)
                  setChangedValues((prev) => ({
                    ...prev,
                    setPrimary:
                      user.toLowerCase() === connectedAddress?.toLowerCase()
                        ? e.target.checked
                        : e.target.checked !== (Number(profile.primary_list) === selectedList),
                  }))
                }}
                disabled={!isEditingSettings}
              />
            </div>
          )}
          <div className='flex w-full flex-col gap-2'>
            <div className='flex items-center gap-2 pl-3'>
              <p className='font-bold'>{t('listSettings.listStorageLocation')}</p>
              <Location className='h-auto w-4' />
            </div>
            <div className='relative w-full' ref={chainDropdownRef}>
              <button
                className='bg-nav-item hover:bg-nav-item/80 flex h-[42px] w-full items-center justify-between gap-0.5 rounded-sm p-1 px-2 disabled:cursor-not-allowed disabled:opacity-75 sm:h-12 sm:px-3'
                onClick={() => setChainDropdownOpen(!chainDropdownOpen)}
                disabled={!isEditingSettings || connectedAddress?.toLowerCase() !== fetchedOwner?.toLowerCase()}
              >
                {isListSettingsLoading ? (
                  <LoadingCell className='h-8 w-full rounded-sm' />
                ) : (
                  <div className='flex items-center gap-2'>
                    {chain && <ChainIcon chain={chain as ChainWithDetails} className={'h-6 w-6 rounded-sm'} />}
                    <p className='truncate font-bold sm:text-lg'>{chain?.name}</p>
                  </div>
                )}
                {isEditingSettings ? (
                  <ArrowDown className={`${chainDropdownOpen ? 'rotate-180' : ''} h-5 w-5 transition-transform`} />
                ) : (
                  <div />
                )}
              </button>
              {chainDropdownOpen && (
                <div className='bg-nav-item shadow-small absolute top-12 z-10 flex w-full flex-col rounded-sm sm:top-14'>
                  {chains.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setChain(item)
                        setChainDropdownOpen(false)
                        setChangedValues({
                          ...changedValues,
                          chain: fetchedChain?.id !== item.id,
                        })
                      }}
                      className='hover:bg-neutral/20 flex w-full cursor-pointer items-center gap-3 rounded-sm p-3'
                    >
                      <ChainIcon chain={item as ChainWithDetails} className={'h-6 w-6 sm:h-7 sm:w-7'} />
                      <p className='truncate font-bold sm:text-lg'>{item?.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <SettingsInput
            option={t('listSettings.owner')}
            Icon={Owner}
            value={currentOwner}
            resolvedAddress={owner}
            placeholder={fetchedOwner}
            disableValue={fetchedOwner}
            setValue={setCurrentOwner}
            isEditingSettings={isEditingSettings}
            isLoading={ownerLoading}
            isSettingsLoading={isListSettingsLoading}
          />
          <SettingsInput
            option={t('listSettings.manager')}
            Icon={Manager}
            value={currentManager}
            resolvedAddress={manager}
            placeholder={fetchedManager}
            disableValue={fetchedManager}
            setValue={setCurrentManager}
            isEditingSettings={isEditingSettings}
            isLoading={managerLoading}
            isSettingsLoading={isListSettingsLoading}
          />
          <SettingsInput
            option={t('listSettings.user')}
            Icon={User}
            value={currentUser}
            resolvedAddress={user}
            placeholder={fetchedUser}
            disableValue={fetchedManager}
            setValue={setCurrentUser}
            isEditingSettings={isEditingSettings}
            isLoading={userLoading}
            isSettingsLoading={isListSettingsLoading}
          />
          {isOwner || isManager || isUser ? (
            isEditingSettings ? (
              <div className='mt-4 flex w-full items-center justify-between'>
                {/* <CancelButton onClick={() => setIsEditingSettings(false)} /> */}
                <PrimaryButton
                  label={t('save')}
                  onClick={() => submitChanges()}
                  disabled={!Object.values(changedValues).includes(true)}
                />
              </div>
            ) : (
              <button
                onClick={() => setIsEditingSettings(true)}
                className='bg-nav-item hover:bg-text/10 w-full rounded-sm px-6 py-3 text-lg font-bold transition-all'
              >
                {t('edit settings')}
              </button>
            )
          ) : null}
        </div>
      </Modal>
      {roles?.isOwner && isOwner && isResetSlotWarningOpen && (
        <ResetSlotWarning
          closeModal={() => setIsResetSlotWarningOpen(false)}
          onSubmit={() => {
            const updatedValues = {
              chain: false,
              owner: false,
              manager: false,
              user: false,
              setPrimary: false,
              resetSlot: true,
            }

            setChangedValues(updatedValues)
            submitChanges(updatedValues)
          }}
        />
      )}
    </>
  )
}

export default ListSettings
