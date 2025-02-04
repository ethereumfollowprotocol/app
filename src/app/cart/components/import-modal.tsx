import type React from 'react'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import useImportModal from '../hooks/use-import-modal'
import type { ImportPlatformType } from '#/types/common'
import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'
import FarcasterIcon from 'public/assets/icons/farcaster.svg'
import CancelButton from '#/components/buttons/cancel-button'
import PrimaryButton from '#/components/buttons/primary-button'

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
      <div className='w-full sm:w-[540px] sm:p-0 p-2 flex flex-col gap-6'>
        <div className='w-full gap-2 flex justify-between items-center'>
          <p className='text-xl font-bold'>
            {t('import title')}&nbsp;
            <span className='capitalize'>{platform}</span>
          </p>
          <Image src={FarcasterIcon} alt='Import from Farcaster' className='rounded-lg' width={30} />
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
            className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-[3px] border-grey pl-4 sm:text-sm bg-neutral/60'
          />
          <div className='absolute w-8 rounded-lg right-2 top-2 h-8 flex justify-center items-center bg-grey'>
            <FiSearch />
          </div>
        </div>
        {socialProfile || (isSocialProfileLoading && currHandle.length > 0) ? (
          <div className='flex flex-col gap-6'>
            <div className='flex justify-center gap-3 items-center'>
              {isSocialProfileLoading ? (
                <LoadingCell className='rounded-full h-[50px] w-[50px]' />
              ) : (
                <Avatar
                  name={socialProfile?.profileName || socialProfile?.userAddress || ''}
                  avatarUrl={socialProfile?.profileImage}
                  size='h-[50px] w-[50px]'
                />
              )}
              <div className='flex flex-col items-start'>
                {isSocialProfileLoading ? (
                  <LoadingCell className='rounded-lg h-7 w-40' />
                ) : (
                  <p className='text-lg font-bold'>
                    @{socialProfile?.profileName || truncateAddress(socialProfile?.userAddress)}
                  </p>
                )}
                <p className='font-medium text-text/70 capitalize'>{platform} Name</p>
              </div>
            </div>
            <div className='bg-neutral/90 rounded-lg text-text/70 flex flex-col gap-4 p-4'>
              <div className='w-full flex justify-between items-center'>
                <p className=' text-xs xxs:text-sm font-medium'>
                  {t('follow on')} <span className='capitalize'>{platform}</span>
                </p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-xs xxs:text-sm font-medium'>
                    {formatNumber(followings.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='w-full flex justify-between items-center'>
                <p className='text-xs xxs:text-sm font-medium'>{t('follow on efp')}</p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-xs xxs:text-sm font-medium'>
                    -{formatNumber(alreadyFollow.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='w-full flex justify-between items-center text-text/90'>
                <p className='text-sm xxs:text-base sm:text-lg font-bold'>{t('to add')}</p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-sm xxs:text-base sm:text-lg font-bold'>
                    {formatNumber(followings.length - alreadyFollow.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='flex items-center w-full justify-between gap-3 sm:gap-5'>
                <p className='text-lg font-bold text-start max-w-[75%]'>{t('Only import accounts with an ENS name')}</p>
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
          <div className='h-[274px] sm:h-[256px] w-full justify-center flex items-center font-bold'>
            {t('no profile')}
          </div>
        )}
        <div className='w-full flex items-center justify-between'>
          <CancelButton onClick={onClose} />
          <PrimaryButton
            label={t('add')}
            onClick={() => {
              onAddFollowings()
              onClose()
            }}
            className='py-[10px] w-32'
            disabled={isFollowingsLoading || followings.length === 0 || alreadyFollow.length === followings.length}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ImportModal
