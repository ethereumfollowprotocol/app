import Image from 'next/image'
import { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import TagsDropdown from './tags-dropdown'
import type { ProfileListProfile } from '../..'
import { useCart } from '#/contexts/cart-context'
import Plus from 'public/assets/icons/plus-squared.svg'
import type { ImportPlatformType, TagsDropdownPositionType } from '#/types/common'

interface TagsProps {
  profiles: ProfileListProfile[]
  platform?: ImportPlatformType
  showTags?: boolean
  canEditTags?: boolean
  isBlockedList?: boolean
  dropdownPosition?: TagsDropdownPositionType
}

const Tags: React.FC<TagsProps> = ({
  profiles,
  platform,
  showTags,
  canEditTags,
  isBlockedList,
  dropdownPosition
}) => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const address = profiles?.[0]?.address
  const { hasListOpRemoveRecord, hasListOpRemoveTag, hasListOpAddTag } = useCart()

  // Hide tags if the profile is being removed or restricted/unrestricted
  const isBeingRemoved = address ? hasListOpRemoveRecord(address) : false
  const isBeingUnrestricted = address
    ? hasListOpRemoveTag({ address, tag: 'block' }) || hasListOpRemoveTag({ address, tag: 'mute' })
    : false
  const isBeingRestricted = address
    ? hasListOpAddTag({ address, tag: 'block' }) || hasListOpAddTag({ address, tag: 'mute' })
    : false
  const isRestriction = isBeingUnrestricted || isBeingRestricted

  const hideTags = !showTags || (canEditTags && (isBeingRemoved || isRestriction))

  if (platform) console.log(showTags, canEditTags, isBeingRemoved, isRestriction)
  return (
    <div
      className={cn(
        'relative min-h-8 flex max-w-full flex-wrap gap-2 items-center',
        hideTags && 'hidden'
      )}
      ref={clickAwayTagDropwdownRef}
    >
      {canEditTags && (
        <button
          className='p-1.5 rounded-full hover:opacity-80 hover:scale-110 bg-zinc-300'
          onClick={e => {
            e.stopPropagation()
            setTagDropdownOpen(!tagDropdownOpen)
          }}
        >
          <Image src={Plus} alt='Add Tag' width={12} />
        </button>
      )}
      <TagsDropdown
        profiles={profiles}
        platform={platform}
        open={tagDropdownOpen}
        canEditTags={canEditTags}
        isBlockedList={isBlockedList}
        position={dropdownPosition}
      />
      {canEditTags && tagDropdownOpen && (
        <div
          className='fixed z-30 top-0 left-0 w-full h-full bg-transparent'
          onClick={e => {
            e.stopPropagation()
            setTagDropdownOpen(false)
          }}
        ></div>
      )}
    </div>
  )
}

export default Tags
