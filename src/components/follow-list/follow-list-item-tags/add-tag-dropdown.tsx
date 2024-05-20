import Image from 'next/image'
import type { Address } from 'viem'
import { useCallback, useState } from 'react'

import Plus from 'public/assets/icons/plus.svg'
import { useCart } from '#/contexts/cart-context'
import useSuggestedTags from '#/hooks/use-suggested-tags'

export function AddTagDropdown({
  address,
  tags: initialTags = []
}: {
  address: Address
  tags?: string[] // Optional initial tags to use in the dropdown
}) {
  const [open, setOpen] = useState(false)
  const [customTagValue, setCustomTagValue] = useState('')
  const [isEditingCustomTag, setIsEditingCustomTag] = useState(false)

  const { addAddTagToCart } = useCart()
  const suggestedTags = useSuggestedTags(address)
  const tags = [...initialTags, ...suggestedTags]

  const handleAddTag = useCallback(
    (tag: string) => {
      addAddTagToCart({ address, tag })
    },
    [address, addAddTagToCart]
  )

  const handleCustomTagClick = () => {
    setIsEditingCustomTag(true)
  }

  const handleCustomTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTagValue(event.target.value)
  }

  const handleCustomTagSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const trimmedValue = customTagValue.trim()
      if (trimmedValue === '') return

      handleAddTag(trimmedValue)
      setIsEditingCustomTag(false)
      setCustomTagValue('')
    }
  }

  return (
    <div>
      <div
        onClick={() => {
          setOpen(true)
          setIsEditingCustomTag(false)
        }}
      >
        <Image
          src={Plus}
          alt='Add tag'
          className='flex items-center w-5 h-5 text-black bg-grey rounded-full font-bold p-1'
        />
      </div>
      <div
        className='bg-white rounded-xl p-2 flex gap-2 mt-2 flex-wrap text-[#464646] font-semibold'
        style={{
          display: open ? 'flex' : 'none'
        }}
      >
        {isEditingCustomTag ? (
          <input
            // biome-ignore lint/a11y/noAutofocus: user is intentionally clicking to get to the input
            autoFocus={true}
            type='text'
            value={customTagValue}
            onChange={handleCustomTagInputChange}
            onKeyDown={handleCustomTagSubmit}
            className='bg-grey rounded-xl p-2 focus:outline-none'
            placeholder='Enter custom tag'
          />
        ) : (
          <div
            onClick={handleCustomTagClick}
            className='bg-grey rounded-xl flex gap-1 items-center p-2 cursor-pointer hover:ring-gray-500 hover:ring-[1px]'
          >
            <Image src={Plus} alt='Add tag' />
            <p>Custom Tag</p>
          </div>
        )}
        {tags.map(tag => (
          <div
            key={address + tag}
            className='bg-grey rounded-full p-1 cursor-pointer hover:ring-gray-500 hover:ring-[1px]'
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
