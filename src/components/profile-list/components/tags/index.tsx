import { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import TagsDropdown from './tags-dropdown'
import type { ProfileListProfile } from '../..'
import { useCart } from '#/hooks/use-cart'
import Plus from 'public/assets/icons/ui/plus-squared.svg'
import type { ImportPlatformType, TagsDropdownPositionType } from '#/types/common'

interface TagsProps {
  profiles: ProfileListProfile[]
  platform?: ImportPlatformType
  showTags?: boolean
  canEditTags?: boolean
  isBlockedList?: boolean
  dropdownPosition?: TagsDropdownPositionType
}

const Tags: React.FC<TagsProps> = ({ profiles, platform, showTags, canEditTags, isBlockedList, dropdownPosition }) => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const address = profiles?.[0]?.address
  const { hasListOpRemoveRecord, hasListOpRemoveTag, hasListOpAddTag } = useCart()

  // Hide tags if the profile is being removed or restricted/unrestricted
  const isBeingRemoved = address ? hasListOpRemoveRecord(address) : false
  const isBeingUnrestricted = address
    ? hasListOpRemoveTag(address, 'block') || hasListOpRemoveTag(address, 'mute')
    : false
  const isBeingRestricted = address ? hasListOpAddTag(address, 'block') || hasListOpAddTag(address, 'mute') : false
  const isRestriction = isBeingUnrestricted || isBeingRestricted

  const hideTags = !showTags || (canEditTags && (isBeingRemoved || isRestriction))

  return (
    <div
      className={cn('relative flex min-h-8 max-w-full flex-wrap items-center gap-2', hideTags && 'hidden')}
      ref={clickAwayTagDropwdownRef}
    >
      {canEditTags && (
        <button
          className='rounded-full bg-zinc-300 p-1.5 hover:scale-110 hover:opacity-80'
          onClick={(e) => {
            e.stopPropagation()
            setTagDropdownOpen(!tagDropdownOpen)
          }}
        >
          <Plus />
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
          className='fixed top-0 left-0 z-30 h-full w-full bg-transparent'
          onClick={(e) => {
            e.stopPropagation()
            setTagDropdownOpen(false)
          }}
        ></div>
      )}
    </div>
  )
}

export default Tags
