import { Tag } from './tag'
import type { Address } from 'viem'
import DotsHorizontal from 'public/assets/icons/dots-horizontal.svg'
import Image from 'next/image'

interface TagsPopoverProps {
  address: Address
  isOpen: boolean
  onClose: () => void
  tags: string[]
}

export function TagsPopover({ address, tags }: TagsPopoverProps) {
  return (
    <div>
      <div>
        <div className='px-2 bg-white rounded-full cursor-pointer'>
          <Image src={DotsHorizontal} alt='dots' className='w-6' />
        </div>
      </div>
      <div className='bg-white rounded-xl p-2 flex gap-2 mt-2 flex-wrap text-[#464646] font-semibold'>
        <div className='flex flex-col gap-2'>
          {tags.map(tag => (
            <Tag address={address} key={tag} tag={tag} className='border-[1px] border-gray-300' />
          ))}
        </div>
      </div>
    </div>
  )
}
