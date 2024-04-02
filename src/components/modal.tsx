import { Cross1Icon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { Dialog } from '@radix-ui/themes'
import { DialogTrigger } from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  triggerButton: ReactNode
  triggerButtonClassName?: string
}

export function Modal({ children, triggerButton }: ModalProps) {
  return (
    <Dialog.Root>
      <DialogTrigger asChild={true}>{triggerButton}</DialogTrigger>
      <Dialog.Content className='inset-0 m-auto flex flex-col items-center rounded-xl p-10 bg-white shadow-lg relative overflow-visible w-[522px] h-[724px]'>
        <Dialog.Close>
          <Box className='absolute top-[-12px] right-[-12px] text-gray-500 hover:text-gray-700 rounded-full bg-white p-2 shadow-lg hover:cursor-pointer'>
            <Cross1Icon className='h-5 w-5' />
          </Box>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}
