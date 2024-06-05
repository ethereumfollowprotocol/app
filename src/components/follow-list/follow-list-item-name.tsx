'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import { Avatar } from '#/components/avatar'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'
import { useClickAway } from '@uidotdev/usehooks'
import { useCart } from '#/contexts/cart-context'
import { truncateAddress } from '#/lib/utilities'
import { DEFAULT_TAGS_TO_ADD } from '#/lib/constants'
import Plus from 'public/assets/icons/plus-squared.svg'
import { useFollowState } from '#/hooks/use-follow-state'
import { usePathname } from 'next/navigation'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  className?: string
  name?: string
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  canEditTags?: boolean
}

export function Name({
  name,
  address,
  showTags
}: { name?: string; address: Address; showTags?: boolean }) {
  return (
    <Link href={`/${name || address}`} className='w-full'>
      <p
        className={`font-bold sm:text-lg text-start  ${
          showTags ? 'w-full text-nowrap' : 'w-[90%] truncate'
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
  canEditTags
}: FollowListItemNameProps) {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [customTagInput, setCustomTagInput] = useState('')
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const pathname = usePathname()
  const isEditor = pathname.includes('/editor')

  const { t } = useTranslation()
  const { t: tEditor } = useTranslation('editor')
  const isFollower = useFollowState(address, 'followers') === 'follows'

  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
    getTagsFromCartByAddress
  } = useCart()
  const isBeingremoved = hasListOpRemoveRecord(address)

  const tagsFromCart = getTagsFromCartByAddress(address)
  const inintialDisplayedTags = () => {
    const seen: { [key: string]: boolean } = {}
    return [...tags, ...tagsFromCart].filter(tag => {
      if (Object.keys(seen).includes(tag)) return false
      seen[tag] = true
      return true
    })
  }
  const [displayedtags, setDisplayedTags] = useState(inintialDisplayedTags)

  const addTag = (tag: string) => {
    if (!displayedtags.includes(tag)) setDisplayedTags(prevTags => [...prevTags, tag])
    addCartItem({ listOp: listOpAddTag(address, tag) })
  }

  const removeTag = (tag: string) => {
    if (hasListOpAddTag({ address, tag })) {
      removeCartItem(listOpAddTag(address, tag))
      setDisplayedTags(prevTags => prevTags.filter(prevTag => prevTag !== tag))
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
    addTag(customTagInput)
    setCustomTagInput('')
  }

  useEffect(() => {
    tagsFromCart.map(tag => {
      removeTag(tag)
    })
  }, [isBeingremoved])

  return (
    <div
      className={`flex gap-2 sm:gap-3 items-center ${className}`}
      style={{
        width: 'calc(100% - 110px)'
      }}
    >
      <Avatar
        name={name || address}
        avatarUrl={avatarUrl}
        size='h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
      />
      <div className='flex w-full flex-col md:flex-row gap-[2px] md:gap-3'>
        <div
          className={`flex flex-col justify-center  ${
            isEditor ? 'md:w-52' : showTags ? 'w-fit' : 'w-full'
          } items-start tabular-nums relative`}
        >
          <Name name={name} address={address} showTags={showTags} />
          {showFollowsYouBadges && isFollower && (
            <div className='rounded-full font-bold text-[10px] mb-1 flex items-center justify-center bg-gray-300 h-5 w-20'>
              {t('profile card.follows you')}
            </div>
          )}
        </div>
        {showTags && !isBeingremoved && (
          <div
            className={`relative flex w-[190px] ${
              isEditor ? 'sm:w-full' : 'sm:w-2/3'
            } flex-wrap gap-2 items-center`}
            ref={clickAwayTagDropwdownRef}
          >
            {canEditTags && (
              <button
                className='h-5 w-5 flex items-center justify-center rounded-full hover:opacity-80 bg-gray-300'
                onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
              >
                <Image src={Plus} alt='Add Tag' height={10} width={10} />
              </button>
            )}
            {canEditTags && tagDropdownOpen && (
              <div className='absolute z-50 flex flex-col w-60 gap-2 left-0 top-8 glass-card bg-white/50 p-2 border-2 border-gray-200 rounded-lg'>
                <div className='w-full flex items-center gap-1.5 justify-between bg-gray-300 rounded-lg font-bold p-1 text-left'>
                  <input
                    placeholder={tEditor('custom tag')}
                    value={customTagInput}
                    onChange={e => setCustomTagInput(e.target.value)}
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
                <div className='w-full flex flex-wrap items-center gap-2'>
                  {DEFAULT_TAGS_TO_ADD.map(tag => (
                    <button
                      key={tag}
                      className='font-semibold py-2 px-3 hover:opacity-80 bg-gray-300 rounded-full'
                      onClick={() => addTag(tag)}
                    >
                      {tEditor(tag)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {displayedtags.map(tag => {
              const addingTag = hasListOpAddTag({ address, tag })
              const removingTag = hasListOpRemoveTag({ address, tag })

              return (
                <button
                  key={tag}
                  className={`
                    font-semibold py-1 px-2 sm:py-1.5 sm:px-3 text-sm hover:opacity-80 rounded-full ${
                      addingTag ? 'bg-addition' : removingTag ? 'bg-deletion' : 'bg-gray-300'
                    }
                  `}
                  onClick={() => {
                    if (!canEditTags) return
                    removeTag(tag)
                  }}
                >
                  {tEditor(tag)}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
