import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import type { FollowListProfile } from '..'
import { tagRegex } from '#/lib/constants/regex'
import { useCart } from '#/contexts/cart-context'
import Plus from 'public/assets/icons/plus-squared.svg'
import type { ImportPlatformType } from '#/types/common'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { listOpAddListRecord, listOpAddTag } from '#/utils/list-ops'

interface SocialTagDropdownProps {
  profiles: FollowListProfile[]
  platform: ImportPlatformType
}

const SocialTagDropdown: React.FC<SocialTagDropdownProps> = ({ profiles, platform }) => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [customTagInput, setCustomTagInput] = useState('')

  const tagInputRef = useRef<HTMLInputElement>(null)
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false)
  })

  const {
    addCartItem,
    removeCartItem,
    hasListOpAddTag,
    hasListOpRemoveTag,
    getTagsFromCartByAddress
  } = useCart()
  const { t: tEditor } = useTranslation('editor')
  const { recentTags, addRecentTag } = useEFPProfile()

  const inintialDisplayedTags = () => {
    const address = profiles?.[0]?.address
    if (!address) return []

    const tagsFromCart = getTagsFromCartByAddress(address)
    return tagsFromCart
  }
  const [displayedTags, setDisplayedTags] = useState<string[]>(inintialDisplayedTags())

  const addTag = (tag: string) => {
    if (!displayedTags.includes(tag)) {
      addRecentTag(tag)
      setDisplayedTags(prevTags => [...prevTags, tag])
      profiles.map(({ address }) =>
        addCartItem({ listOp: listOpAddTag(address, tag), import: platform })
      )
    }
  }

  const removeTag = (tag: string) => {
    const address = profiles?.[0]?.address
    if (!address) return null

    if (hasListOpAddTag({ address, tag })) {
      profiles.map(({ address }) => removeCartItem(listOpAddTag(address, tag)))
      setDisplayedTags(prevTags => prevTags.filter(prevTag => prevTag !== tag))
      return
    }
    // addCartItem({ listOp: listOpRemoveTag(address, tag), import: platform })
  }

  const addCustomTag = () => {
    if (customTagInput.length === 0) return
    addTag(customTagInput)
    setCustomTagInput('')
  }

  useEffect(() => {
    if (tagInputRef && tagDropdownOpen) tagInputRef.current?.focus()
  }, [tagDropdownOpen])

  return (
    <div className='w-full flex gap-2 justify-between'>
      <div
        className='relative min-h-8 flex w-full flex-wrap gap-2 items-center'
        ref={clickAwayTagDropwdownRef}
      >
        <button
          className='p-1.5 rounded-full hover:opacity-80 bg-gray-300'
          onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
        >
          <Image src={Plus} alt='Add Tag' width={12} />
        </button>
        {tagDropdownOpen && (
          <>
            <div className='absolute z-50 flex flex-col w-60 gap-2 left-0 top-8 glass-card bg-white/50 p-2 border-2 border-gray-200 rounded-lg'>
              <div className='w-full flex items-center gap-1.5 justify-between bg-gray-300 rounded-lg font-bold p-1 text-left'>
                <input
                  ref={tagInputRef}
                  placeholder={tEditor('custom tag')}
                  value={customTagInput}
                  onChange={e => {
                    const validString = e.target.value.match(tagRegex)?.join('')
                    if (e.target.value.length === 0 || validString)
                      setCustomTagInput(e.target.value.trim().toLowerCase())
                  }}
                  maxLength={68}
                  onKeyDown={e => {
                    if (e.key === 'Enter') addCustomTag()
                  }}
                  className='p-1 pl-2 rounded-md lowercase w-full'
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
          const address = profiles?.[0]?.address
          if (!address) return null

          const addingTag = hasListOpAddTag({ address, tag })
          const removingTag = hasListOpRemoveTag({ address, tag })

          return (
            <div
              key={tag + i}
              className={`relative ${tagDropdownOpen ? 'z-40' : 'z-10'} max-w-full`}
            >
              <button
                className={`
                        font-semibold py-1 px-2 sm:py-1.5 max-w-full w-fit sm:px-3 truncate text-sm hover:opacity-80 rounded-full ${
                          removingTag ? 'bg-deletion' : 'bg-gray-300'
                        }
                      `}
                onClick={() => removeTag(tag)}
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
      <button
        onClick={() => {
          profiles.map(({ address }) => {
            displayedTags.map(tag => removeCartItem(listOpAddTag(address, tag)))
            removeCartItem(listOpAddListRecord(address))
          })
        }}
        className='min-w-[107px] bg-white text-gray-900 border-2 border-gray-200 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400 rounded-xl relative text-sm flex items-center gap-1.5 justify-center font-bold h-[37px] px-2 py-1.5'
      >
        <Image alt='mainnet logo' src={MainnetBlack} width={16} />
        Following
      </button>
    </div>
  )
}

export default SocialTagDropdown
