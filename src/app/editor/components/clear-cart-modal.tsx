import Image from 'next/image'

import Modal from '#/components/modal'
import { useCart } from '#/contexts/cart-context'
import Cross from 'public/assets/icons/cross.svg'
import CancelButton from '#/components/cancel-button'

interface ClearCartModalProps {
  closeModal: () => void
}

const ClearCartModal: React.FC<ClearCartModalProps> = ({ closeModal }) => {
  const { resetCart } = useCart()

  return (
    <Modal onCancel={closeModal}>
      <div className='flex flex-col p-2 sm:p-0 gap-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Clear Cart</h2>
          <button onClick={closeModal} className='hover:opacity-50'>
            <Image src={Cross} alt='Close clear cart modal' width={16} height={16} />
          </button>
        </div>
        <p className='text-lg font-medium px-4'>Are you sure you want to clear your cart?</p>
        <div className='flex pt-1 justify-between'>
          <CancelButton onClick={closeModal} className='bg-[#bbb]' />
          <button
            onClick={() => {
              resetCart()
              closeModal()
            }}
            className='rounded-full bg-red-500 hover:opacity-75 transition-opacity font-semibold text-white px-6 py-2 text-lg'
          >
            Clear Cart
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ClearCartModal
