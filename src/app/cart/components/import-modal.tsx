import type React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import { formatNumber } from '#/utils/formatNumber'
import LensIcon from 'public/assets/icons/lens.svg'
import LoadingCell from '#/components/loading-cell'
import useImportModal from '../hooks/useImportModal'
import CancelButton from '#/components/cancel-button'
import type { ImportPlatformType } from '#/types/common'
import { PrimaryButton } from '#/components/primary-button'
import FarcasterIcon from 'public/assets/icons/farcaster.svg'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass-white.svg'

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
    isFollowingsLoading,
    isSocialProfileLoading
  } = useImportModal(platform)
  const { t } = useTranslation()

  return (
    <Modal onCancel={onClose}>
      <div className='w-full sm:w-[500px] sm:p-0 p-2 flex flex-col gap-6'>
        <div className='w-full gap-2 flex justify-between items-center'>
          <p className='text-xl font-semibold'>
            <span className='hidden sm:inline'>{t('import title desktop')}</span>
            <span className='inline sm:hidden'>{t('import title mobile')}</span>{' '}
            <span className='capitalize'>{platform}</span>
          </p>
          <Image
            src={platform === 'lens' ? LensIcon : FarcasterIcon}
            alt='Import from Farcaster'
            className='rounded-lg'
            width={30}
          />
        </div>
        <div className='relative w-full'>
          <input
            type='text'
            id='search'
            name='search'
            spellCheck={false}
            autoComplete='off'
            value={currHandle}
            placeholder={`${t('enter')} ${platform} ID`}
            onChange={e => setCurrHandle(e.target.value)}
            className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-2 border-gray-200 pl-4 sm:text-sm bg-white/70'
          />
          <div className='absolute w-8 rounded-lg right-2 top-2 h-8 flex justify-center items-center bg-gray-300'>
            <Image src={MagnifyingGlass} alt='Search Account' width={20} className='text-white' />
          </div>
        </div>
        {socialProfile || (isSocialProfileLoading && currHandle.length > 0) ? (
          <div className='flex flex-col gap-6'>
            <div className='flex justify-center gap-3 items-center'>
              {isSocialProfileLoading ? (
                <LoadingCell className='rounded-full h-[50px] w-[50px]' />
              ) : (
                <Avatar
                  name={socialProfile.profileName}
                  avatarUrl={socialProfile.profileImage}
                  size='h-[50px] w-[50px]'
                />
              )}
              <div className='flex flex-col items-start'>
                {isSocialProfileLoading ? (
                  <LoadingCell className='rounded-lg h-7 w-40' />
                ) : (
                  <p className='text-lg font-semibold'>
                    @
                    {socialProfile.profileName?.replace('lens/@', '') ||
                      truncateAddress(socialProfile.userAssociatedAddresses?.[0])}
                  </p>
                )}
                <p className='font-medium text-gray-400 capitalize'>{platform} ID</p>
              </div>
            </div>
            <div className='bg-white/95 rounded-lg flex flex-col gap-4 p-4'>
              <div className='w-full flex justify-between items-center'>
                <p className='text-gray-400 text-xs xxs:text-sm font-medium'>
                  {t('follow on')} <span className='capitalize'>{platform}</span>
                </p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-gray-400 text-xs xxs:text-sm font-medium'>
                    {formatNumber(followings.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='w-full flex justify-between items-center'>
                <p className='text-gray-400 text-xs xxs:text-sm font-medium'>
                  {t('follow on efp')}
                </p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-gray-400 text-xs xxs:text-sm font-medium'>
                    -{formatNumber(alreadyFollow.length)} {t('accounts')}
                  </p>
                )}
              </div>
              <div className='w-full flex justify-between items-center'>
                <p className='text-darkGrey text-sm xxs:text-base sm:text-lg font-semibold'>
                  {t('to add')}
                </p>
                {isFollowingsLoading || isSocialProfileLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-darkGrey text-sm xxs:text-base sm:text-lg font-bold'>
                    {formatNumber(followings.length - alreadyFollow.length)} {t('accounts')}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='h-[208px] w-full justify-center flex items-center font-semibold'>
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
            disabled={
              isFollowingsLoading ||
              followings.length === 0 ||
              alreadyFollow.length === followings.length
            }
          />
        </div>
      </div>
    </Modal>
  )
}

export default ImportModal
