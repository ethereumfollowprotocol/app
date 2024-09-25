'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { ens_beautify } from '@adraffy/ens-normalize'
import { usePathname, useRouter } from 'next/navigation'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import { Avatar } from '#/components/avatar'
import { isValidEnsName } from '#/utils/ens'
import { tagRegex } from '#/lib/constants/regex'
import { useClickAway } from '@uidotdev/usehooks'
import { useCart } from '#/contexts/cart-context'
import { formatNumber } from '#/utils/formatNumber'
import { cn, truncateAddress } from '#/lib/utilities'
import LoadingCell from '../../../loaders/loading-cell'
import Plus from 'public/assets/icons/plus-squared.svg'
import useFollowerState from '#/hooks/use-follower-state'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { listOpAddTag, listOpRemoveTag } from '#/utils/list-ops'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  className?: string
  counts?: {
    followers: number
    following: number
  }
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
  showTags,
  isCart
}: { name?: string | null; address: Address; showTags?: boolean; isCart?: boolean }) {
  return (
    <Link href={`/${address}`} className={cn(!isCart && 'w-full')}>
      <p
        className={`font-bold sm:text-lg text-start hover:scale-110 ${
          showTags
            ? isCart
              ? 'truncate max-w-52'
              : 'truncate w-full'
            : 'w-fit max-w-full truncate'
        } hover:opacity-75 transition-all`}
      >
        {name && isValidEnsName(name) ? ens_beautify(name) : truncateAddress(address)}
      </p>
    </Link>
  )
}

const FollowListItemName: React.FC<FollowListItemNameProps> = ({
  name,
  tags,
  counts,
  address,
  showTags,
  avatarUrl,
  className = '',
  showFollowsYouBadges,
  canEditTags,
  isFollowers,
  isEnsProfileLoading,
  isBlockedList
}) => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [customTagInput, setCustomTagInput] = useState('')

  const tagInputRef = useRef<HTMLInputElement>(null)
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const isCart = pathname.includes('/cart')
  const { address: userAddress } = useAccount()
  const { followerTag } = useFollowerState({ address, showFollowerBadge: showFollowsYouBadges })

  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveTag,
    hasListOpRemoveRecord,
    getTagsFromCartByAddress
  } = useCart()
  const isBeingRemoved = hasListOpRemoveRecord(address)
  const { recentTags, addRecentTag, followers, followersIsLoading } = useEFPProfile()
  const isBeingUnrestricted =
    hasListOpRemoveTag({ address, tag: 'block' }) || hasListOpRemoveTag({ address, tag: 'mute' })
  const isBeingRestricted =
    hasListOpAddTag({ address, tag: 'block' }) || hasListOpAddTag({ address, tag: 'mute' })
  const isRestriction = isBeingUnrestricted || isBeingRestricted
  const isFollowersEmpty = !followersIsLoading && followers.length === 0

  const tagsFromCart = getTagsFromCartByAddress(address)
  const inintialdisplayedTags = () => {
    return [
      ...new Set(
        [...tags, ...(isFollowers || !canEditTags ? [] : tagsFromCart)].filter(tag =>
          isBlockedList ? ['block', 'mute'].includes(tag) : true
        )
      )
    ]
  }
  const [displayedTags, setDisplayedTags] = useState(inintialdisplayedTags)

  const addTag = (tag: string) => {
    if (!displayedTags.includes(tag)) {
      addRecentTag(tag)
      setDisplayedTags(prevTags => [...prevTags, tag])
      addCartItem({ listOp: listOpAddTag(address, tag) })
    }
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
      className={`flex gap-2 sm:gap-3 items-center p-0 ${className}`}
      style={{
        width: isBlockedList ? 'calc(100% - 132px)' : 'calc(100% - 110px)'
      }}
    >
      <div className={cn('flex gap-2 sm:gap-3 items-center p-0', counts ? 'w-2/3' : 'w-full')}>
        {isEnsProfileLoading ? (
          <LoadingCell className='h-[45px] w-[45px] min-w-[45px] md:h-[50px] md:w-[50px] md:min-w-[50px] rounded-full' />
        ) : (
          <Avatar
            name={name || address}
            avatarUrl={avatarUrl}
            size='h-[45px] w-[45px] md:h-[50px] cursor-pointer md:w-[50px] hover:opacity-80 transition-all hover:scale-110'
            onClick={() => router.push(`/${address || name}`)}
          />
        )}
        <div
          className={`flex flex-col md:flex-row ${
            counts ? 'w-4/5' : 'w-2/3 xxs:w-[calc(100% - 55px)]'
          } md:gap-3 xl:gap-2 2xl:gap-3 gap-[2px]`}
        >
          <div
            className={cn(
              'flex flex-col justify-center items-start tabular-nums relative',
              isCart
                ? 'md:w-52'
                : !isBlockedList && showTags
                  ? displayedTags.length > 0
                    ? 'xl:max-w-[55%] 2xl:max-w-[60%]'
                    : 'max-w-[70%] 3xs:max-w-[70%] xxs:max-w-[90%]'
                  : 'max-w-full'
            )}
          >
            {isEnsProfileLoading ? (
              <LoadingCell className='w-32 xl:w-32 h-7 rounded-lg' />
            ) : (
              <Name name={name} address={address} showTags={showTags} isCart={isCart} />
            )}
            {showFollowsYouBadges && !isEnsProfileLoading && (
              <div
                className={`rounded-full font-bold text-[10px] text-darkGrey bg-zinc-300 py-[3px] text-center px-2 w-fit max-w-full ${followerTag.className}`}
              >
                {t(followerTag.text)}
              </div>
            )}
          </div>

          {showTags && (!isBeingRemoved || isRestriction) && (
            <div
              className={cn(
                'relative min-h-8 flex max-w-full md:max-w-[50%] flex-wrap gap-2 items-center',
                isCart
                  ? 'xl:max-w-[55%] 2xl:max-w-[65%] 3xl:max-w-[75%]'
                  : 'xl:max-w-[45%] 2xl:max-w-[42.5%] 3xl:max-w-[47.5%]'
              )}
              ref={clickAwayTagDropwdownRef}
            >
              {canEditTags && !isRestriction && (
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
              {canEditTags && tagDropdownOpen && (
                <>
                  <div className='absolute z-[9999] flex flex-col w-60 gap-2 left-0 top-8 glass-card bg-white dark:bg-darkGrey p-2 border-[3px] border-zinc-200 dark:border-zinc-500 rounded-lg'>
                    <div className='w-full flex items-center gap-1.5 justify-between bg-zinc-300 dark:bg-zinc-400 rounded-lg font-bold p-1 text-left'>
                      <input
                        ref={tagInputRef}
                        placeholder={t('custom tag')}
                        value={customTagInput}
                        onChange={e => {
                          const validString = e.target.value.match(tagRegex)?.join('')
                          if (e.target.value.length === 0 || validString)
                            setCustomTagInput(e.target.value.trim().toLowerCase())
                        }}
                        maxLength={80}
                        onKeyDown={e => {
                          if (e.key === 'Enter') addCustomTag()
                        }}
                        className='p-1 pl-2 rounded-md lowercase dark:bg-darkGrey/60 w-full'
                      />
                      <button
                        className='flex items-center rounded-full hover:scale-110 transition-all hover:opacity-80 bg-white dark:bg-zinc-300 justify-center p-1.5'
                        onClick={e => {
                          e.stopPropagation()
                          addCustomTag()
                        }}
                      >
                        <Image src={Plus} alt='Add Tag' height={16} width={16} />
                      </button>
                    </div>
                    <div className='w-full flex max-w-full flex-wrap items-center gap-2'>
                      {recentTags.map(tag => (
                        <button
                          key={`${address} ${tag}`}
                          className='font-bold py-2 hover:scale-110 transition-all truncate px-3 hover:opacity-80 text-darkGrey bg-zinc-300 rounded-full'
                          onClick={e => {
                            e.stopPropagation()
                            addTag(tag)
                          }}
                        >
                          {tag}
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
                  <div
                    key={tag + i}
                    className={`relative ${tagDropdownOpen ? 'z-40' : 'z-10'} max-w-full ${
                      canEditTags ? 'hover:scale-110 transition-all' : ''
                    }`}
                  >
                    <button
                      className={`
                        font-bold py-1 px-2 sm:py-1.5 max-w-full w-fit sm:px-3 text-darkGrey truncate text-sm hover:opacity-80 rounded-full ${
                          !isFollowers && removingTag ? 'bg-deletion' : 'bg-zinc-300'
                        }
                      `}
                      onClick={e => {
                        e.stopPropagation()

                        if (!canEditTags || isBlockedList) return
                        removeTag(tag)
                      }}
                    >
                      {tag}
                    </button>
                    {(removingTag || addingTag) && canEditTags && !isFollowers && (
                      <div className='absolute h-4 w-4 rounded-full -top-1 -right-1 bg-green-400' />
                    )}
                  </div>
                )
              })}
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
          )}
        </div>
      </div>
      {counts && (
        <div
          className={cn(
            'items-center max-w-1/3 justify-end pr-6 sm:gap-8 gap-6 md:gap-16 lg:gap-16 xl:gap-10',
            userAddress ? 'hidden xs:flex lg:hidden 3xl:flex' : 'hidden xs:flex'
          )}
        >
          <div
            className={`flex-col items-center hover:scale-110 cursor-pointer transition-transform ${
              userAddress && !isFollowersEmpty ? 'lg:hidden 3xl:flex' : '2xl:flex'
            } hidden sm:flex`}
            onClick={() => router.push(`/${address}?tab=following`)}
          >
            <p className='font-bold text-lg'>{formatNumber(counts.following)}</p>
            <p className='font-bold text-sm text-center text-[#888] dark:text-[#aaa]'>
              {t('following')}
            </p>
          </div>
          <div
            className='flex flex-col items-center hover:scale-110 cursor-pointer transition-transform'
            onClick={() => router.push(`/${address}?tab=followers`)}
          >
            <p className='font-bold text-lg'>{formatNumber(counts.followers)}</p>
            <p className='font-bold text-sm text-center text-[#888] dark:text-[#aaa]'>
              {t('followers')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FollowListItemName
