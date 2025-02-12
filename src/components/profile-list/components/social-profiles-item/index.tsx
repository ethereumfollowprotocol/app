import type React from 'react'
import { useTranslation } from 'react-i18next'
import Image, { type StaticImageData } from 'next/image'

import Tags from '../tags'
import { formatNumber } from '#/utils/format/format-number'
import SocialFollowButton from './social-follow-button'
import type { ImportPlatformType } from '#/types/common'
import type { ProfileListProfile } from '#/app/cart/components/cart-items/cart-items-list'

export interface SocialProfileListProfile {
  platform: string
  profiles: ProfileListProfile[]
  icon: StaticImageData
}

const SocialProfilesItem: React.FC<SocialProfileListProfile> = ({ platform, profiles, icon }) => {
  const { t } = useTranslation()

  if (profiles.length === 0) return null

  return (
    <div
      key={platform}
      className='hover:bg-list flex items-center justify-between rounded-xl px-1.5 py-2 sm:w-full sm:px-2 sm:py-6'
    >
      <div
        className='flex items-center gap-2 sm:gap-3'
        style={{
          width: 'calc(100% - 120px)',
        }}
      >
        <Image src={icon} alt={platform} className='h-[45px] w-[45px] rounded-xl 2xl:h-[50px] 2xl:w-[50px]' />
        <div className='flex w-full flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2 2xl:gap-4'>
          <div className='flex max-w-52 min-w-52 flex-col items-start gap-px'>
            <p className='text-lg font-bold'>
              {t('import from')} <span className='capitalize'>{platform}</span>
            </p>
            <p className='text-text/80 text-sm font-medium'>
              {t('adding')}: {formatNumber(profiles.length)}
            </p>
          </div>
          <Tags
            profiles={profiles}
            platform={platform as ImportPlatformType}
            showTags={true}
            canEditTags={true}
            isBlockedList={false}
          />
        </div>
      </div>
      <SocialFollowButton profiles={profiles} />
    </div>
  )
}

export default SocialProfilesItem
