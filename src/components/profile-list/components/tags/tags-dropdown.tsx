import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import type { ProfileListProfile } from '../..'
import { tagRegex } from '#/lib/constants/regex'
import { useCart } from '#/hooks/use-cart'
import Plus from 'public/assets/icons/ui/plus-squared.svg'
import { useTagsDropdown } from '../../hooks/use-tags-dropdown'
import type { ImportPlatformType, TagsDropdownPositionType } from '#/types/common'

interface TagsDropdownProps {
  open: boolean
  canEditTags?: boolean
  profiles: ProfileListProfile[]
  platform?: ImportPlatformType
  isBlockedList?: boolean
  position?: TagsDropdownPositionType
}

const TagsDropdown: React.FC<TagsDropdownProps> = ({
  profiles,
  platform,
  open,
  canEditTags,
  isBlockedList,
  position = 'bottom',
}) => {
  const { t } = useTranslation()
  const { hasListOpAddTag, hasListOpRemoveTag } = useCart()
  const { addTag, removeTag, recentTags, tagInputRef, addCustomTag, displayedTags, customTagInput, setCustomTagInput } =
    useTagsDropdown(profiles, platform, canEditTags, isBlockedList)

  useEffect(() => {
    if (tagInputRef.current) tagInputRef.current.focus()
  }, [])

  return (
    <>
      {open && (
        <div
          className={cn(
            'glass-card bg-neutral border-grey absolute left-0 z-[9999] flex w-56 flex-col gap-2 rounded-sm border-[3px] p-2 sm:w-64',
            position === 'bottom' ? 'top-10' : 'bottom-8'
          )}
        >
          <div className='flex w-full items-center justify-between gap-1.5 rounded-sm bg-zinc-300 p-1 text-left font-bold dark:bg-zinc-400'>
            <input
              ref={tagInputRef}
              placeholder={t('custom tag')}
              value={customTagInput}
              onChange={(e) => {
                const validString = e.target.value.match(tagRegex)?.join('')
                if (e.target.value.length === 0 || validString) setCustomTagInput(e.target.value.trim().toLowerCase())
              }}
              maxLength={80}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addCustomTag()
              }}
              className='bg-neutral/70 w-full rounded-sm p-1 pl-2 lowercase'
            />
            <button
              className='flex items-center justify-center rounded-full bg-white p-1.5 transition-all hover:scale-110 hover:opacity-80 dark:bg-zinc-300'
              onClick={(e) => {
                e.stopPropagation()
                addCustomTag()
              }}
            >
              <Plus />
            </button>
          </div>
          <div className='flex w-full max-w-full flex-wrap items-center gap-2'>
            {recentTags.map((tag, i) => (
              <button
                key={`${profiles?.[0]?.address} ${tag} ${i}`}
                className='text-darkGrey truncate rounded-full bg-zinc-300 px-3 py-1.5 text-sm font-bold transition-all hover:scale-110 hover:opacity-80'
                onClick={(e) => {
                  e.stopPropagation()
                  addTag(tag)
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      {displayedTags.map((tag, i) => {
        const address = profiles?.[0]?.address
        if (!address) return null

        const addingTag = hasListOpAddTag(address, tag)
        const removingTag = hasListOpRemoveTag(address, tag)

        return (
          <div key={tag + i} className={`max-w-full ${canEditTags ? 'transition-all hover:scale-110' : ''}`}>
            <button
              className={`w-fit max-w-full truncate rounded-sm px-2 py-1 text-xs font-bold ${
                canEditTags && removingTag ? 'bg-deletion' : 'bg-nav-item'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                if (canEditTags || !isBlockedList) removeTag(tag)
              }}
            >
              {tag}
            </button>
            {(removingTag || addingTag) && canEditTags && (
              <div className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-400' />
            )}
          </div>
        )
      })}
    </>
  )
}

export default TagsDropdown
