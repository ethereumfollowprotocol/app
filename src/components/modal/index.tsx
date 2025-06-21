import { cn } from '#/lib/utilities'
import Cross from 'public/assets/icons/ui/cross.svg'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useGlassTheme } from '#/hooks/use-glass-theme'
interface ModalProps {
  onCancel: () => void
  children: React.ReactNode
  className?: string
  disableBackgroundClose?: boolean
  closeButtonClassName?: string
}

const Modal = ({ onCancel, children, className, disableBackgroundClose, closeButtonClassName }: ModalProps) => {
  const { getGlassClass } = useGlassTheme()

  return createPortal(
    <div
      className={cn(
        'fixed top-0 left-0 z-[100] flex h-screen w-screen justify-center overflow-scroll bg-black/40 px-2 py-12 sm:px-4',
        className ?? 'items-center'
      )}
      onClick={() => !disableBackgroundClose && onCancel()}
    >
      <div
        className={`${getGlassClass('liquid-glass-modal', 'bg-neutral')} relative w-full rounded-sm p-3 sm:w-fit sm:p-4`}
      >
        <button
          onClick={onCancel}
          className={cn('absolute top-2 right-2 transition-all hover:scale-110', closeButtonClassName)}
        >
          <Cross className='h-auto w-7' />
        </button>
        <div className='w-full' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  ) as ReactNode
}

export default Modal
