import Image from 'next/image'
import type { Address } from 'viem'

import EFPLogo from 'public/assets/logo.svg'
import { FollowListItem } from './follow-list-item'
import { useTranslation } from 'react-i18next'

interface FollowListProfile {
  address: Address
  tags: string[]
}

interface FollowTableProps {
  listClassName?: string
  listItemClassName?: string
  profiles: FollowListProfile[]
  showFollowsYouBadges?: boolean // Prop to handle showing "Follows you" badges in the FollowList
  showTags?: boolean
  isEditor?: boolean
  createListItem?: boolean
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profiles,
  showFollowsYouBadges,
  showTags,
  isEditor,
  createListItem
}: FollowTableProps) {
  const { t } = useTranslation('editor')

  return (
    <div className={`flex flex-col min-w-max ${listClassName}`}>
      {profiles.length > 0 && createListItem && (
        <div className='flex w-[350px] sm:w-full items-center gap-2 md:p-4 p-1.5 sm:p-2 sm:gap-3'>
          <Image
            src={EFPLogo}
            alt='EFP List'
            className='rounded-full h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
          />
          <div className='flex flex-col md:flex-row md:items-center'>
            <p className='text-lg font-semibold w-fit sm:w-56 text-left'>{t('mint name')}</p>
            <p className='font-semibold text-sm sm:text-base text-left italic text-grey'>
              {t('mint description')}
            </p>
          </div>
        </div>
      )}
      {profiles.map(({ address, tags }) => {
        return (
          <FollowListItem
            className={listItemClassName}
            key={address}
            profileAddress={address}
            showFollowsYouBadges={showFollowsYouBadges}
            showTags={showTags}
            tags={tags}
            isEditor={isEditor}
          />
        )
      })}
    </div>
  )
}
