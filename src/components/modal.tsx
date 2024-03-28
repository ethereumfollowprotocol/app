import { Cross1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { Dialog } from '@radix-ui/themes'
import { DialogTrigger } from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  triggerButton: ReactNode
}

export function Modal({ children, triggerButton }: ModalProps) {
  return (
    <Dialog.Root>
      <DialogTrigger>{triggerButton}</DialogTrigger>
      <Dialog.Content className='inset-0 m-auto flex flex-col items-center rounded-xl p-10 bg-white shadow-lg relative overflow-visible w-[522px] h-[724px]'>
        <Dialog.Close>
          <IconButton className='absolute top-[-12px] right-[-12px] text-gray-500 hover:text-gray-700 rounded-full bg-white p-1 shadow-lg'>
            <Cross1Icon />
          </IconButton>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}
