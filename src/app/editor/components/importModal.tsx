import type React from 'react'
import Image from 'next/image'

import LensIcon from 'public/assets/icons/lens.png'
import useImportModal from '../hooks/useImportModal'
import FarcasterIcon from 'public/assets/icons/farcaster.png'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass-white.svg'
import { Avatar } from '#/components/avatar'
import LoadingCell from '#/components/loading-cell'
import { truncateAddress } from '#/lib/utilities'
import { useTranslation } from 'react-i18next'

interface ImportModalprops {
  onClose: () => void
  platform: 'farcaster' | 'lens'
}

const ImportModal: React.FC<ImportModalprops> = ({ onClose, platform }) => {
  const { t } = useTranslation('editor', { keyPrefix: 'import' })
  const { inputAddress, setInputAddress, socialProfile, isSocialProfileLoading } =
    useImportModal(platform)

  return (
    <div
      className={`fixed z-50 overflow-y-auto top-0 px-4 left-0 flex ${
        window.innerHeight > 720 ? 'items-center' : 'py-8'
      } justify-center w-full h-full bg-black/50`}
      onClick={onClose}
    >
      <div
        className='glass-card w-[500px] flex flex-col gap-4 p-6 bg-white/60 rounded-xl'
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
            value={inputAddress}
            placeholder={'Enter address or ENS name'}
            onChange={e => setInputAddress(e.target.value)}
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
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <LoadingCell className='rounded-full h-[50px] w-[50px]' />
              <LoadingCell className='rounded-lg h-7 w-40' />
            </div>
          </div>
        ) : socialProfile ? (
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Avatar
                name={socialProfile.profileDisplayName}
                avatarUrl={socialProfile.profileImage}
                size='h-[50px] w-[50px]'
              />
              <p className='text-lg font-semibold'>
                {socialProfile.profileDisplayName ||
                  truncateAddress(socialProfile.userAssociatedAddresses?.[0])}
              </p>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <p>{socialProfile.followingCount}</p>
              <div className='text-lg font-bold text-gray-500'>{t('following')}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ImportModal
