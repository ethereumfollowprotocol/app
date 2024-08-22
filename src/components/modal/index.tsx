import Image from 'next/image'
import Cross from 'public/assets/icons/cross.svg'

interface ModalProps {
  onCancel: () => void
  children: React.ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ onCancel, children, className }) => {
  return (
    <div
      className={`fixed z-50 top-0 flex px-4 left-0 justify-center w-screen h-screen bg-black/40 py-12 overflow-scroll ${
        className ?? 'items-center'
      }`}
      onClick={onCancel}
    >
      <div className={`flex w-full sm:w-fit gap-2 flex-col items-end`}>
        <div
          onClick={onCancel}
          className='cursor-pointer translate-x-4 z-50 translate-y-8 hover:opacity-90 hover:scale-110 transition-all rounded-2xl bg-white/90 p-3'
        >
          <Image src={Cross} alt='close blocked and muted list' className='h-4 w-4' />
        </div>
        <div
          className='glass-card p-4 sm:p-6 w-full sm:w-fit rounded-xl bg-white/55'
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
