import type React from 'react'
import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import useImportModal from '../hooks/use-import-modal'
import type { ImportPlatformType } from '#/types/common'
import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'
import FarcasterIcon from 'public/assets/icons/socials/farcaster.svg'
import CancelButton from '#/components/buttons/cancel-button'
import PrimaryButton from '#/components/buttons/primary-button'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'

interface ImportModalprops {
  onClose: () => void
  platform: ImportPlatformType
}

const ImportModal: React.FC<ImportModalprops> = ({ onClose, platform }) => {
  const {
    followings,
    currHandle,
    setCurrHandle,
    socialProfile,
    alreadyFollow,
    onAddFollowings,
    onlyImportWithEns,
    isFollowingsLoading,
    setOnlyImportWithEns,
    isSocialProfileLoading,
  } = useImportModal(platform)
  const { t } = useTranslation()

  return (
    <Modal onCancel={onClose}>
      <div className='flex w-full flex-col gap-6 p-2 sm:w-[540px] sm:p-0'>
        <div className='flex w-full items-center justify-between gap-2'>
          <p className='text-xl font-bold'>
            {t('import title')}&nbsp;
            <span className='capitalize'>{platform}</span>
          </p>
          <FarcasterIcon className='rounded-sm' width={30} />
        </div>
        <div className='relative w-full'>
          <input
            type='text'
            id='search'
            name='search'
            spellCheck={false}
            autoComplete='off'
            value={currHandle}
            placeholder={`${t('enter')} ${platform[0]?.toUpperCase()}${platform.slice(1)} Name`}
            onChange={(e) => setCurrHandle(e.target.value)}
            className='border-grey bg-neutral/60 block h-12 w-full truncate rounded-sm border-[3px] pr-12 pl-4 font-medium sm:text-sm'
          />
          <div className='bg-grey absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-sm'>
            <MagnifyingGlass />
          </div>
        </div>
        {socialProfile || (isSocialProfileLoading && currHandle.length > 0) ? (
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center gap-3'>
              {isSocialProfileLoading ? (
                <LoadingCell className='h-[50px] w-[50px] rounded-full' />
              ) : (
                <Avatar
                  name={socialProfile?.profileName || socialProfile?.userAddress || ''}
                  avatarUrl={socialProfile?.profileImage}
                  size='h-[50px] w-[50px]'
                />
              )}
              <div className='flex flex-col items-start'>
                {isSocialProfileLoading ? (
                  <LoadingCell className='h-7 w-40 rounded-sm' />
                ) : (
                  <p className='text-lg font-bold'>
                    @{socialProfile?.profileName || truncateAddress(socialProfile?.userAddress)}
                  </p>
                )}
                <p className='text-text/70 font-medium capitalize'>{platform} Name</p>
              </div>
            </div>
            <div className='bg-neutral/90 text-text/70 flex flex-col gap-4 rounded-sm p-4'>
              <div className='flex w-full items-center justify-between'>
                <p className='xxs:text-sm text-xs font-medium'>
                  {t('follow on')} <span className='capitalize'>{platform}</span>
                </p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-sm' />
                ) : (
                  <p className='xxs:text-sm text-xs font-medium'>
                    {formatNumber(followings.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='flex w-full items-center justify-between'>
                <p className='xxs:text-sm text-xs font-medium'>{t('follow on efp')}</p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-sm' />
                ) : (
                  <p className='xxs:text-sm text-xs font-medium'>
                    -{formatNumber(alreadyFollow.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='text-text/90 flex w-full items-center justify-between'>
                <p className='xxs:text-base text-sm font-bold sm:text-lg'>{t('to add')}</p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-sm' />
                ) : (
                  <p className='xxs:text-base text-sm font-bold sm:text-lg'>
                    {formatNumber(followings.length - alreadyFollow.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='flex w-full items-center justify-between gap-3 sm:gap-5'>
                <p className='max-w-[75%] text-start text-lg font-bold'>{t('Only import accounts with an ENS name')}</p>
                <input
                  className='toggle'
                  type='checkbox'
                  defaultChecked={onlyImportWithEns}
                  onChange={(e) => setOnlyImportWithEns(e.target.checked)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex h-[274px] w-full items-center justify-center font-bold sm:h-[256px]'>
            {t('no profile')}
          </div>
        )}
        <div className='flex w-full items-center justify-between'>
          <CancelButton onClick={onClose} />
          <PrimaryButton
            label={t('add')}
            onClick={() => {
              onAddFollowings()
              onClose()
            }}
            className='w-32 py-[10px]'
            disabled={isFollowingsLoading || followings.length === 0 || alreadyFollow.length === followings.length}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ImportModal
