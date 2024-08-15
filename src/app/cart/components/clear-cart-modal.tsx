import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import { useCart } from '#/contexts/cart-context'
import Cross from 'public/assets/icons/cross.svg'
import CancelButton from '#/components/cancel-button'

interface ClearCartModalProps {
  closeModal: () => void
}

const ClearCartModal: React.FC<ClearCartModalProps> = ({ closeModal }) => {
  const { resetCart } = useCart()
  const { t } = useTranslation()

  return (
    <Modal onCancel={closeModal}>
      <div className='flex flex-col p-2 sm:p-0 gap-8 max-w-108'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>{t('clear cart')}</h2>
          <button onClick={closeModal} className='hover:opacity-50'>
            <Image src={Cross} alt='Close clear cart modal' width={16} height={16} />
          </button>
        </div>
        <p className='text-lg font-medium px-4'>{t('clear cart message')}</p>
        <div className='flex pt-1 justify-between'>
          <CancelButton onClick={closeModal} />
          <button
            onClick={() => {
              resetCart()
              closeModal()
            }}
            className='rounded-full bg-red-500 hover:opacity-75 transition-opacity font-semibold text-white px-6 py-2 text-lg'
          >
            {t('clear cart')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ClearCartModal
