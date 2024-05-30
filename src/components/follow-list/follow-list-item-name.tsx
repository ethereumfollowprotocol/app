'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Address, GetEnsAvatarReturnType } from 'viem'

import { Avatar } from '#/components/avatar'
import { listOpAddTag } from '#/utils/list-ops'
import { useClickAway } from '@uidotdev/usehooks'
import { useCart } from '#/contexts/cart-context'
import { truncateAddress } from '#/lib/utilities'
import { DEFAULT_TAGS_TO_ADD } from '#/lib/constants'
import Plus from 'public/assets/icons/plus-squared.svg'
import { useFollowState } from '#/hooks/use-follow-state'

interface FollowListItemNameProps {
  address: Address
  avatarUrl?: string | GetEnsAvatarReturnType
  className?: string
  name?: string
  showFollowsYouBadges?: boolean
  isEditor?: boolean
}

export function Name({ name, address }: { name?: string; address: Address }) {
  return (
    <Link href={`/${name || address}`}>
      <p className='font-bold sm:text-lg  hover:opacity-75 transition-opacity'>
        {name || truncateAddress(address)}
      </p>
    </Link>
  )
}

export function FollowListItemName({
  name,
  address,
  isEditor,
  avatarUrl,
  className = '',
  showFollowsYouBadges
}: FollowListItemNameProps) {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [customTagInput, setCustomTagInput] = useState('')
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const { t } = useTranslation()
  const { t: tEditor } = useTranslation('editor')
  const isFollower = useFollowState(address, 'followers') === 'follows'
  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveRecord,
    getTagsFromCartByAddress
  } = useCart()
  const isBeingremoved = hasListOpRemoveRecord(address)

  const tags = getTagsFromCartByAddress(address)

  const addTag = (tag: string) => {
    addCartItem({ listOp: listOpAddTag(address, tag) })
  }

  const removeTag = (tag: string) => {
    removeCartItem(listOpAddTag(address, tag))
  }

  const addCustomTag = () => {
    addTag(customTagInput)
    setCustomTagInput('')
  }

  return (
    <div className={`flex gap-2 sm:gap-3 items-center ${className}`}>
      <Avatar
        name={name || address}
        avatarUrl={avatarUrl}
        size='h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
      />
      <div className='flex flex-col md:flex-row gap-[2px] w-3/4 sm:w-fit md:gap-3'>
        <div
          className={`flex flex-col justify-center w-fit ${
            isEditor ? 'md:w-52' : ''
          } items-start tabular-nums relative`}
        >
          <Name name={name} address={address} />
          {showFollowsYouBadges && isFollower && (
            <div className='font-bold text-[8px] self-start bg-grey text-darkGrey'>
              {t('profile card.follows you')}
            </div>
          )}
        </div>
        {isEditor && !isBeingremoved && (
          <div
            className='relative flex w-[190px] flex-wrap gap-2 items-center sm:w-fit'
            ref={clickAwayTagDropwdownRef}
          >
            <button
              className='h-5 w-5 flex items-center justify-center rounded-full hover:opacity-80 bg-gray-300'
              onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
            >
              <Image src={Plus} alt='Add Tag' height={10} width={10} />
            </button>
            {tagDropdownOpen && (
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
            {tags.map(tag => {
              const addingTag = hasListOpAddTag({ address, tag })

              return (
                <button
                  key={tag}
                  className={`
                    font-semibold py-1 px-2 sm:py-1.5 sm:px-3 text-sm hover:opacity-80 rounded-full ${
                      addingTag ? 'bg-addition' : 'bg-deletion'
                    }
                  `}
                  onClick={() => removeTag(tag)}
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
