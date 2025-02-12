import Image from 'next/image'
import React, { type Ref, type RefObject } from 'react'

interface RestrictButtonProps {
  blockCoolMode: RefObject<HTMLButtonElement | HTMLDivElement | null>
  onClickOption: (option: 'block' | 'mute') => void
  text: string
  type: 'block' | 'mute'
}

const RestrictButton: React.FC<RestrictButtonProps> = ({ blockCoolMode, onClickOption, text, type }) => {
  return (
    <button
      ref={blockCoolMode as Ref<HTMLButtonElement>}
      onClick={() => onClickOption(type)}
      className='bg-deletion text-darkGrey relative flex h-[40px] w-[120px] cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-sm font-bold transition-all hover:scale-110 hover:bg-[#CF4C4C]'
    >
      <Image alt='mainnet logo' src='/assets/mainnet-black.svg' width={16} height={16} />
      <p
        className='max-w-20 text-wrap break-words'
        style={{
          lineHeight: '0.95rem',
        }}
      >
        {text}
      </p>
    </button>
  )
}

export default RestrictButton
