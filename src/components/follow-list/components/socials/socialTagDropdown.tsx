import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'

import type { FollowListProfile } from '../..'
import { tagRegex } from '#/lib/constants/regex'
import { useCart } from '#/contexts/cart-context'
import { yieldToMain } from '#/utils/yieldToMain'
import Plus from 'public/assets/icons/plus-squared.svg'
import type { ImportPlatformType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { extractAddressAndTag, isTagListOp, listOpAddTag } from '#/utils/list-ops'

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

  const { cartItems, setCartItems, hasListOpAddTag, hasListOpRemoveTag, getTagsFromCartByAddress } =
    useCart()
  const { t } = useTranslation()
  const { recentTags, addRecentTag } = useEFPProfile()

  const inintialDisplayedTags = () => {
    const address = profiles?.[0]?.address
    if (!address) return []

    const tagsFromCart = getTagsFromCartByAddress(address)
    return tagsFromCart
  }
  const [displayedTags, setDisplayedTags] = useState<string[]>(inintialDisplayedTags())

  const addTag = async (tag: string) => {
    if (!displayedTags.includes(tag)) {
      addRecentTag(tag)
      setDisplayedTags(prevTags => [...prevTags, tag])
      await yieldToMain()

      const newCartItems = profiles.map(({ address }) => ({
        listOp: listOpAddTag(address, tag),
        import: platform
      }))

      setCartItems([...cartItems, ...newCartItems])

      // const chunkSize = 200 // Adjust the chunk size as needed
      // for (let i = 0; i < profiles.length; i += chunkSize) {
      //   const chunk = profiles.slice(i, i + chunkSize)
      //   await Promise.all(
      //     chunk.map(({ address }) =>
      //       addCartItem({ listOp: listOpAddTag(address, tag), import: platform })
      //     )
      //   )
      //   await yieldToMain() // Yield to the main thread after processing each chunk
      // }
    }
  }

  const removeTag = async (tag: string) => {
    const address = profiles?.[0]?.address
    if (!address) return null

    const addresses = profiles.map(({ address }) => address.toLowerCase())

    setDisplayedTags(prevTags => prevTags.filter(prevTag => prevTag !== tag))
    await yieldToMain()

    const filteredCartItems = cartItems.filter(
      item =>
        !(isTagListOp(item.listOp)
          ? addresses.includes(extractAddressAndTag(item.listOp).address.toLowerCase()) &&
            extractAddressAndTag(item.listOp).tag === tag
          : false)
    )

    setCartItems(filteredCartItems)

    // if (hasListOpAddTag({ address, tag })) {
    //   setDisplayedTags(prevTags => prevTags.filter(prevTag => prevTag !== tag))
    //   await yieldToMain()

    //   const chunkSize = 200 // Adjust the chunk size as needed
    //   for (let i = 0; i < profiles.length; i += chunkSize) {
    //     const chunk = profiles.slice(i, i + chunkSize)
    //     await Promise.all(chunk.map(({ address }) => removeCartItem(listOpAddTag(address, tag))))
    //     await yieldToMain() // Yield to the main thread after processing each chunk
    //   }

    //   return
    // }
  }

  const addCustomTag = () => {
    if (customTagInput.length === 0) return

    setCustomTagInput('')
    addTag(customTagInput)
  }

  useEffect(() => {
    if (tagInputRef && tagDropdownOpen) tagInputRef.current?.focus()
  }, [tagDropdownOpen])

  return (
    <div
      className='relative min-h-8 flex w-3/4 xxs:w-4/5 sm:w-2/5 md:w-[49%] lg:w-[63%] xl:w-[54%] 2xl:w-[63.5%] 3xl:w-full flex-wrap gap-2 items-center'
      ref={clickAwayTagDropwdownRef}
    >
      <button
        className='p-1.5 rounded-full hover:opacity-80 hover:scale-110 transition-all bg-zinc-300'
        onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
      >
        <Image src={Plus} alt='Add Tag' width={12} />
      </button>
      {tagDropdownOpen && (
        <>
          <div className='absolute z-50 flex flex-col w-60 gap-2 left-0 top-8 glass-card bg-white/50 dark:bg-darkGrey/80 p-2 border-[3px] border-zinc-200 dark:border-zinc-500 rounded-lg'>
            <div className='w-full flex items-center gap-1.5 justify-between bg-zinc-300 dark:bg-zinc-500 rounded-lg font-bold p-1 text-left'>
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
                className='p-1 pl-2 rounded-md lowercase w-full dark:bg-darkGrey/50'
              />
              <button
                className='flex items-center rounded-full hover:opacity-80 bg-white hover:scale-110 transition-all justify-center p-2'
                onClick={() => addCustomTag()}
              >
                <Image src={Plus} alt='Add Tag' height={16} width={16} />
              </button>
            </div>
            <div className='w-full flex max-w-full flex-wrap items-center gap-2'>
              {recentTags.map(tag => (
                <button
                  key={tag}
                  className='font-bold py-2 truncate px-3 hover:opacity-80 hover:scale-110 transition-all bg-zinc-300 text-darkGrey rounded-full'
                  onClick={() => addTag(tag)}
                >
                  {tag}
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
            className={`relative ${
              tagDropdownOpen ? 'z-40' : 'z-0'
            } max-w-full transition-transform hover:scale-110`}
          >
            <button
              className={`font-bold py-1 px-2 sm:py-1.5 max-w-full text-darkGrey sm:px-3 truncate text-sm hover:opacity-80 rounded-full ${
                removingTag ? 'bg-deletion' : 'bg-zinc-300'
              }`}
              onClick={() => removeTag(tag)}
            >
              {tag}
            </button>
            {(removingTag || addingTag) && (
              <div className='absolute h-4 w-4 rounded-full -top-1 -right-1 bg-green-400' />
            )}
          </div>
        )
      })}
      {tagDropdownOpen && (
        <div
          className='fixed z-30 top-0 left-0 w-full h-full bg-transparent'
          onClick={() => setTagDropdownOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default SocialTagDropdown
