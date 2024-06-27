'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import LoadingCell from '../loading-cell'
import { Avatar } from '#/components/avatar'
import { useClickAway } from '@uidotdev/usehooks'
import { useCart } from '#/contexts/cart-context'
import { truncateAddress } from '#/lib/utilities'
import useFollowState from '#/hooks/use-follow-state'
import { DEFAULT_TAGS_TO_ADD } from '#/lib/constants'
import Plus from 'public/assets/icons/plus-squared.svg'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  className?: string
  name?: string | null
  showFollowsYouBadges?: boolean
  showTags?: boolean
  tags: string[]
  canEditTags?: boolean
  isEnsProfileLoading?: boolean
}

export function Name({
  name,
  address,
  showTags
}: { name?: string | null; address: Address; showTags?: boolean }) {
  return (
    <Link href={`/${name || address}`} className='w-full'>
      <p
        className={`font-bold sm:text-lg text-start  ${
          showTags ? 'w-full truncate' : 'w-[90%] truncate'
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
  isEnsProfileLoading
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
  const { followState } = useFollowState({
    address,
    type: 'followers'
  })
  const isFollower = followState === 'follows'

  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
    getTagsFromCartByAddress
  } = useCart()
  const isBeingRemoved = hasListOpRemoveRecord(address)
  const isBeingUnrestricted =
    hasListOpRemoveTag({ address, tag: 'block' }) || hasListOpRemoveTag({ address, tag: 'mute' })

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
    if (!isBeingRemoved || isBeingUnrestricted) return

    tagsFromCart.map(tag => {
      removeTag(tag)
    })
  }, [isBeingRemoved])

  return (
    <div
      className={`flex gap-2 sm:gap-3 items-center ${className}`}
      style={{
        width: 'calc(100% - 110px)'
      }}
    >
      {isEnsProfileLoading ? (
        <LoadingCell className='h-[45px] w-[45px] md:h-[50px] md:w-[50px] rounded-full' />
      ) : (
        <Avatar
          name={name || address}
          avatarUrl={avatarUrl}
          size='h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
        />
      )}
      <div
        className={`flex flex-col w-3/4 ${
          isEditor ? 'md:flex-row md:gap-3' : 'md:flex-row md:gap-3'
        } gap-[2px]`}
      >
        <div
          className={`flex flex-col justify-center  ${
            isEditor ? 'md:w-52' : showTags ? 'w-fit' : 'w-full'
          } items-start tabular-nums relative`}
        >
          {isEnsProfileLoading ? (
            <LoadingCell className='w-40 xl:w-32 h-7 rounded-lg' />
          ) : (
            <Name name={name} address={address} showTags={showTags} />
          )}
          {showFollowsYouBadges && isFollower && (
            <div className='rounded-full font-bold text-[10px] mb-1 flex items-center justify-center bg-gray-300 h-5 w-20'>
              {t('profile card.follows you')}
            </div>
          )}
        </div>
        {showTags && !isBeingRemoved && !isBeingUnrestricted && (
          <div
            className={`relative flex ${
              isEditor
                ? 'max-w-[165px] xxs:max-w-[220px] xs:max-w-[270px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[490px] w-fit xl:max-w-[370px] 2xl:max-w-[700px]'
                : 'max-w-[165px] xxs:max-w-[200px] xs:max-w-[270px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[530px] w-fit xl:max-w-[200px] 2xl:max-w-[210px]'
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
                    onChange={e => {
                      setCustomTagInput(e.target.value.replaceAll(' ', ''))
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
            {displayedtags
              .filter(tag => !['block', 'mute'].includes(tag))
              .map(tag => {
                const addingTag = hasListOpAddTag({ address, tag })
                const removingTag = hasListOpRemoveTag({ address, tag })

                return (
                  <button
                    key={tag}
                    className={`
                    font-semibold py-1 px-2 max-w-[80%] sm:max-w-full sm:py-1.5 sm:px-3 truncate text-sm hover:opacity-80 rounded-full ${
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
