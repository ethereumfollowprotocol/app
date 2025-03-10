import React, { type Ref, type RefObject } from 'react'
import MainnetBlack from 'public/assets/mainnet-black.svg'

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
      className='bg-deletion text-dark-grey relative flex h-[40px] w-[120px] cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-sm font-bold transition-all hover:scale-110 hover:bg-[#CF4C4C]'
    >
      <MainnetBlack />
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
