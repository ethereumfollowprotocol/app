import { cn } from '#/lib/utilities'
import { IoClose } from 'react-icons/io5'

interface ModalProps {
  onCancel: () => void
  children: React.ReactNode
  className?: string
  disableBackgroundClose?: boolean
}

const Modal: React.FC<ModalProps> = ({ onCancel, children, className, disableBackgroundClose }) => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 flex h-screen w-screen justify-center overflow-scroll bg-black/40 px-4 py-12',
        className ?? 'items-center'
      )}
      onClick={() => !disableBackgroundClose && onCancel()}
    >
      <div className={`flex w-full flex-col items-end gap-2 sm:w-fit`}>
        <div
          onClick={onCancel}
          className='bg-grey/90 z-50 translate-x-4 translate-y-8 cursor-pointer rounded-2xl p-2 transition-all hover:scale-110 hover:opacity-90'
        >
          <IoClose className='text-2xl' />
        </div>
        <div
          className='glass-card bg-neutral/55 w-full rounded-xl p-4 sm:w-fit sm:p-6'
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
