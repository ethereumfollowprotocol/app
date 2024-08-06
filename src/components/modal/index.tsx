interface ModalProps {
  onCancel: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onCancel, children }) => {
  return (
    <div
      className='fixed z-50 top-0 flex px-4 justify-center items-center left-0 w-screen h-screen bg-black/40'
      onClick={onCancel}
    >
      <div
        className='glass-card p-4 sm:p-6 w-full sm:w-fit rounded-xl bg-white/55'
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
