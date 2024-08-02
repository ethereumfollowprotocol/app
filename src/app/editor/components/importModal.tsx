import type React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import LensIcon from 'public/assets/icons/lens.png'
import LoadingCell from '#/components/loading-cell'
import useImportModal from '../hooks/useImportModal'
import CancelButton from '#/components/cancel-button'
import type { ImportPlatformType } from '#/types/common'
import { PrimaryButton } from '#/components/primary-button'
import FarcasterIcon from 'public/assets/icons/farcaster.png'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass-white.svg'

interface ImportModalprops {
  onClose: () => void
  platform: ImportPlatformType
}

const ImportModal: React.FC<ImportModalprops> = ({ onClose, platform }) => {
  const { t } = useTranslation('editor', { keyPrefix: 'import' })
  const {
    currHandle,
    setCurrHandle,
    socialProfile,
    isSocialProfileLoading,
    isFollowingsLoading,
    onAddFollowings,
    followings,
    alreadyFollow
  } = useImportModal(platform)

  return (
    <div
      className={`fixed z-50 overflow-y-auto top-0 px-4 left-0 flex ${
        window.innerHeight > 720 ? 'items-center' : 'py-8'
      } justify-center w-full h-full bg-black/50`}
      onClick={onClose}
    >
      <div
        className='glass-card w-[500px] flex flex-col gap-6 p-6 bg-white/75 rounded-xl'
        onClick={e => e.stopPropagation()}
      >
        <div className='w-full flex justify-between items-center'>
          <p className='text-xl font-semibold'>
            {t('title')} <span className='capitalize'>{platform}</span>
          </p>
          <Image
            src={platform === 'lens' ? LensIcon : FarcasterIcon}
            alt='Import from Farcaster'
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
            placeholder={'Enter address or ENS name'}
            onChange={e => setCurrHandle(e.target.value)}
            // onKeyDown={e => {
            //   if (e.key === 'Enter') onSubmit()
            //   if (e.key === 'Escape') {
            //     searchBarRef.current?.blur()
            //     setDropdownMenuOpen(false)
            //   }
            // }}
            className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-2 border-gray-200 pl-4 sm:text-sm bg-white/70'
          />
          <div className='absolute w-8 rounded-lg right-2 top-2 h-8 flex justify-center items-center bg-gray-300'>
            <Image src={MagnifyingGlass} alt='Search Account' width={20} className='text-white' />
          </div>
        </div>
        {isSocialProfileLoading ? (
          <div className='flex flex-row justify-center gap-3 w-full items-center'>
            <LoadingCell className='rounded-full h-[50px] w-[50px]' />
            <div className='flex flex-col items-start gap-0.5'>
              <LoadingCell className='rounded-lg h-7 w-40' />
              <p className='text-gray-400 text-sm font-semibold'>Farcaster ID</p>
            </div>
          </div>
        ) : socialProfile ? (
          <div className='flex flex-col gap-6'>
            <div className='flex justify-center gap-3 items-center'>
              <Avatar
                name={socialProfile.profileName}
                avatarUrl={socialProfile.profileImage}
                size='h-[50px] w-[50px]'
              />
              <div className='flex flex-col items-start'>
                <p className='text-lg font-semibold'>
                  {socialProfile.profileName ||
                    truncateAddress(socialProfile.userAssociatedAddresses?.[0])}
                </p>
                <p className='font-medium text-gray-400'>Farcaster ID</p>
              </div>
            </div>
            <div className='bg-white/95 rounded-lg flex flex-col gap-4 p-4'>
              <div className='w-full flex justify-between items-center'>
                <p className='text-gray-400 text-sm font-medium'>You follow on Farcaster</p>
                {isFollowingsLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-gray-400 text-sm font-medium'>{followings.length} accounts</p>
                )}
              </div>
              <div className='w-full flex justify-between items-center'>
                <p className='text-gray-400 text-sm font-medium'>You already follow on EFP</p>
                {isFollowingsLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-gray-400 text-sm font-medium'>
                    -{alreadyFollow.length} accounts
                  </p>
                )}
              </div>
              <div className='w-full flex justify-between items-center'>
                <p className='text-gray-400 text-sm font-medium'>Total to add to cart</p>
                {isFollowingsLoading ? (
                  <LoadingCell className='h-5 w-24 rounded-md' />
                ) : (
                  <p className='text-gray-400 text-sm font-medium'>
                    {followings.length - alreadyFollow.length} accounts
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='h-[50px] w-full justify-center flex items-center font-semibold'>
            No profile
          </div>
        )}
        <div className='w-full flex items-center justify-between'>
          <CancelButton onClick={onClose} />
          <PrimaryButton
            label='Add'
            onClick={() => {
              onAddFollowings()
              onClose()
            }}
            className='py-3 w-32'
            disabled={
              isFollowingsLoading ||
              followings.length === 0 ||
              alreadyFollow.length === followings.length
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ImportModal
