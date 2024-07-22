'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import LoadingCell from '../loading-cell'
import { Avatar } from '#/components/avatar'
import { tagRegex } from '#/lib/constants/regex'
import { useClickAway } from '@uidotdev/usehooks'
import { useCart } from '#/contexts/cart-context'
import { truncateAddress } from '#/lib/utilities'
import useFollowState from '#/hooks/use-follow-state'
import Plus from 'public/assets/icons/plus-squared.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  className?: string
  name?: string | null
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  isFollowers?: boolean
  canEditTags?: boolean
  isEnsProfileLoading?: boolean
  isBlockedList?: boolean
}

export function Name({
  name,
  address,
  showTags
}: { name?: string | null; address: Address; showTags?: boolean }) {
  return (
    <Link href={`/${address || name}`} className='w-full'>
      <p
        className={`font-bold sm:text-lg text-start  ${
          showTags ? 'w-full truncate' : 'w-fit max-w-full truncate'
        } hover:opacity-75 transition-opacity`}
      >
        {name || truncateAddress(address)}
      </p>
    </Link>
  )
}

export function FollowListItemName({
  name,
  tags,
  address,
  showTags,
  avatarUrl,
  className = '',
  showFollowsYouBadges,
  canEditTags,
  isFollowers,
  isEnsProfileLoading,
  isBlockedList
}: FollowListItemNameProps) {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [customTagInput, setCustomTagInput] = useState('')

  const tagInputRef = useRef<HTMLInputElement>(null)
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { t: tEditor } = useTranslation('editor')
  const isEditor = pathname.includes('/editor')
  const { followerTag } = useFollowState({
    address,
    type: 'follower'
  })

  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
    getTagsFromCartByAddress
  } = useCart()
  const { recentTags, addRecentTag } = useEFPProfile()
  const isBeingRemoved = hasListOpRemoveRecord(address)
  const isBeingUnrestricted =
    hasListOpRemoveTag({ address, tag: 'block' }) || hasListOpRemoveTag({ address, tag: 'mute' })
  const isBeingRestricted =
    hasListOpAddTag({ address, tag: 'block' }) || hasListOpAddTag({ address, tag: 'mute' })
  const isRestriction = isBeingUnrestricted || isBeingRestricted

  const tagsFromCart = getTagsFromCartByAddress(address)
  const inintialdisplayedTags = () => {
    const seen: { [key: string]: boolean } = {}
    return [...tags, ...(isFollowers ? [] : tagsFromCart)]
      .filter(tag => {
        if (Object.keys(seen).includes(tag)) return false
        seen[tag] = true
        return true
      })
      .filter(tag => (isBlockedList ? ['block', 'mute'].includes(tag) : true))
  }
  const [displayedTags, setdisplayedTags] = useState(inintialdisplayedTags)

  const addTag = (tag: string) => {
    if (!displayedTags.includes(tag)) setdisplayedTags(prevTags => [...prevTags, tag])
    addCartItem({ listOp: listOpAddTag(address, tag) })
  }

  const removeTag = (tag: string) => {
    if (hasListOpAddTag({ address, tag })) {
      removeCartItem(listOpAddTag(address, tag))
      setdisplayedTags(prevTags => prevTags.filter(prevTag => prevTag !== tag))
      return
    }

    if (hasListOpRemoveTag({ address, tag })) {
      removeCartItem(listOpRemoveTag(address, tag))
      return
    }

    addCartItem({ listOp: listOpRemoveTag(address, tag) })
  }

  const addCustomTag = () => {
    if (customTagInput.length === 0) return
    addRecentTag(customTagInput)
    addTag(customTagInput)
    setCustomTagInput('')
  }

  useEffect(() => {
    if (tagInputRef && tagDropdownOpen) tagInputRef.current?.focus()
  }, [tagDropdownOpen])

  useEffect(() => {
    if (!isBeingRemoved || isBeingUnrestricted) return

    tagsFromCart.map(tag => {
      removeTag(tag)
    })
  }, [isBeingRemoved])

  return (
    <div
      className={`flex gap-2 sm:gap-3 w-[calc(100% - 125px)] items-center p-0 ${className}`}
      style={{
        width: 'calc(100% - 110px)'
      }}
    >
      {isEnsProfileLoading ? (
        <LoadingCell className='h-[45px] w-[45px] min-w-[45px] md:h-[50px] md:w-[50px] md:min-w-[50px] rounded-full' />
      ) : (
        <Avatar
          name={name || address}
          avatarUrl={avatarUrl}
          onClick={() => router.push(`/${address || name}`)}
          size='h-[45px] w-[45px] md:h-[50px] cursor-pointer md:w-[50px]'
        />
      )}
      <div className='flex flex-col md:flex-row w-full md:gap-3 xl:gap-2 2xl:gap-3 gap-[2px]'>
        <div
          className={`flex flex-col justify-center  ${
            isEditor
              ? 'md:w-52'
              : !isBlockedList && showTags
                ? displayedTags.length > 0
                  ? 'xl:max-w-[40%] 2xl:max-w-[45%]'
                  : 'max-w-[70%] 3xs:max-w-[70%] xxs:max-w-[75%]'
                : 'max-w-[80%] 3xs:max-w-[90%] xxs:max-w-[95%]'
          }  items-start tabular-nums relative`}
        >
          {isEnsProfileLoading ? (
            <LoadingCell className='w-32 xl:w-32 h-7 rounded-lg' />
          ) : (
            <Name name={name} address={address} showTags={showTags} />
          )}
          {showFollowsYouBadges && !isEnsProfileLoading && (
            <div
              className={`rounded-full font-bold text-[10px] flex items-center justify-center bg-gray-300 h-5 w-20 ${followerTag.className}`}
            >
              {t(`profile card.${followerTag.text}`)}
            </div>
          )}
        </div>
        {showTags && (!isBeingRemoved || isRestriction) && (
          <div
            className={`relative min-h-8 flex max-w-[70%] 3xs:max-w-[75%] xxs:max-w-[80%] md:max-w-[50%] ${
              isEditor
                ? 'xl:max-w-[55%] 2xl:max-w-[65%] 3xl:max-w-[75%]'
                : 'xl:max-w-[45%] 2xl:max-w-[42.5%] 3xl:max-w-[47.5%]'
            } flex-wrap gap-2 items-center`}
            ref={clickAwayTagDropwdownRef}
          >
            {canEditTags && !isRestriction && (
              <button
                className='p-[5px] rounded-full hover:opacity-80 bg-gray-300'
                onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
              >
                <Image src={Plus} alt='Add Tag' width={10} />
              </button>
            )}
            {canEditTags && tagDropdownOpen && (
              <>
                <div
                  className='fixed z-40 top-0 left-0 w-full h-full bg-transparent'
                  onClick={() => setTagDropdownOpen(false)}
                ></div>
                <div className='absolute z-50 flex flex-col w-60 gap-2 left-0 top-8 glass-card bg-white/50 p-2 border-2 border-gray-200 rounded-lg'>
                  <div className='w-full flex items-center gap-1.5 justify-between bg-gray-300 rounded-lg font-bold p-1 text-left'>
                    <input
                      ref={tagInputRef}
                      placeholder={tEditor('custom tag')}
                      value={customTagInput}
                      onChange={e => {
                        const validString = e.target.value.match(tagRegex)?.join('')
                        if (e.target.value.length === 0 || validString)
                          setCustomTagInput(e.target.value.trim())
                      }}
                      maxLength={68}
                      onKeyDown={e => {
                        if (e.key === 'Enter') addCustomTag()
                      }}
                      className='p-1 pl-2 rounded-md w-full'
                    />
                    <button
                      className='flex items-center rounded-full hover:opacity-80 bg-white justify-center h-[26px] w-[29px]'
                      onClick={() => addCustomTag()}
                    >
                      <Image src={Plus} alt='Add Tag' height={12} width={12} />
                    </button>
                  </div>
                  <div className='w-full flex max-w-full flex-wrap items-center gap-2'>
                    {recentTags.map(tag => (
                      <button
                        key={tag}
                        className='font-semibold py-2 truncate px-3 hover:opacity-80 bg-gray-300 rounded-full'
                        onClick={() => addTag(tag)}
                      >
                        {tEditor(tag)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            {displayedTags.map((tag, i) => {
              const addingTag = hasListOpAddTag({ address, tag })
              const removingTag = hasListOpRemoveTag({ address, tag })

              return (
                <div key={tag + i} className='relative max-w-full'>
                  <button
                    className={`
                      font-semibold py-1 px-2 sm:py-1.5 max-w-full w-fit sm:px-3 truncate text-sm hover:opacity-80 rounded-full ${
                        removingTag ? 'bg-deletion' : 'bg-gray-300'
                      }
                    `}
                    onClick={() => {
                      if (!canEditTags || isBlockedList) return
                      removeTag(tag)
                    }}
                  >
                    {tEditor(tag)}
                  </button>
                  {(removingTag || addingTag) && (
                    <div className='absolute h-4 w-4 rounded-full -top-1 -right-1 bg-green-400' />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
