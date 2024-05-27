import Image from 'next/image'
import type { ReactNode } from 'react'
import Cross from 'public/assets/icons/cross.svg'

interface ModalProps {
  open?: boolean
  children: ReactNode
  triggerButton: ReactNode
  triggerButtonClassName?: string
  setOpen?: (open: boolean) => void
}

export function Modal({ children, triggerButton, open, setOpen }: ModalProps) {
  return (
    <div>
      {open ? (
        <div className='inset-0 m-auto flex flex-col items-center rounded-xl p-10 bg-white shadow-lg relative overflow-visible w-[522px] h-[724px]'>
          <div className='absolute top-[-12px] right-[-12px] text-gray-500 hover:text-gray-700 rounded-full bg-white p-2 shadow-lg hover:cursor-pointer'>
            <Image
              src={Cross}
              alt='Cross'
              height={20}
              width={20}
              className='h-5 w-5'
              onClick={() => (setOpen ? setOpen(false) : null)}
            />
          </div>
          {children}
        </div>
      ) : (
        <div
          onClick={() => {
            if (setOpen) setOpen(true)
          }}
        >
          {triggerButton}
        </div>
      )}
    </div>
  )
}
