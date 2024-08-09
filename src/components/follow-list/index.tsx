import Image, { type StaticImageData } from 'next/image'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import LoadingRow from './loading-row'
import EFPLogo from 'public/assets/logo.svg'
import FollowListItem from './follow-list-item'
import type { ENSProfile } from '#/types/requests'
import { formatNumber } from '#/utils/formatNumber'
import type { ImportPlatformType } from '#/types/common'
import SocialTagDropdown from './components/socialTagDropdown'

export interface FollowListProfile {
  address: Address
  ens?: ENSProfile
  tags: string[]
  counts?: {
    followers: number
    following: number
  }
}

export interface SocialFollowListProfile {
  platform: string
  profiles: FollowListProfile[]
  icon: StaticImageData
}

interface FollowListProps {
  listClassName?: string
  listItemClassName?: string
  profiles?: FollowListProfile[]
  socialProfiles?: SocialFollowListProfile[]
  showFollowsYouBadges?: boolean // Prop to handle showing "Follows you" badges in the FollowList
  showTags?: boolean
  createListItem?: boolean
  loadingRows?: number
  isLoading: boolean
  isLoadingMore?: boolean
  canEditTags?: boolean
  isBlockedList?: boolean
  isBlockedBy?: boolean
  isFollowers?: boolean
}

export function FollowList({
  listClassName = '',
  listItemClassName = '',
  profiles,
  socialProfiles,
  showFollowsYouBadges,
  showTags,
  createListItem,
  loadingRows = 7,
  isLoading,
  isLoadingMore,
  canEditTags,
  isBlockedList,
  isBlockedBy,
  isFollowers
}: FollowListProps) {
  const { t } = useTranslation()

  return (
    <div className={`flex flex-col w-full ${listClassName}`}>
      {isLoading ? (
        new Array(loadingRows)
          .fill(1)
          .map((_, i) => <LoadingRow key={i} className={listItemClassName} showTags={showTags} />)
      ) : (
        <>
          {((profiles && profiles?.length > 0) ||
            socialProfiles?.map(profile => profile.profiles.length > 0).includes(true)) &&
            createListItem && (
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
          {socialProfiles?.map(
            social =>
              social.profiles.length > 0 && (
                <div
                  key={social.platform}
                  className='flex sm:w-full items-center gap-2 md:p-4 p-1.5 sm:p-2 sm:gap-3'
                >
                  <Image
                    src={social.icon}
                    alt={social.platform}
                    className='rounded-xl h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
                  />
                  <div className='flex flex-col items-start min-w-52 gap-px'>
                    <p className='text-lg font-semibold'>
                      {t('import title mobile')}{' '}
                      <span className='capitalize'>{social.platform}</span>
                    </p>
                    <p className='font-medium text-sm text-gray-500'>
                      Adding: {formatNumber(social.profiles.length)}
                    </p>
                  </div>
                  <SocialTagDropdown
                    profiles={social.profiles}
                    platform={social.platform as ImportPlatformType}
                  />
                </div>
              )
          )}
          {profiles?.map(({ address, tags, ens, counts }) => (
            <FollowListItem
              className={listItemClassName}
              key={address}
              address={address}
              ensProfile={ens}
              showFollowsYouBadges={showFollowsYouBadges}
              showTags={showTags}
              tags={tags}
              counts={counts}
              canEditTags={canEditTags}
              isBlockedList={isBlockedList}
              isBlockedBy={isBlockedBy}
              isFollowers={isFollowers}
            />
          ))}
          {isLoadingMore &&
            new Array(loadingRows)
              .fill(1)
              .map((_, i) => (
                <LoadingRow key={i} className={listItemClassName} showTags={showTags} />
              ))}
        </>
      )}
    </div>
  )
}
