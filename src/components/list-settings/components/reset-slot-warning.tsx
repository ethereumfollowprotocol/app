import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import CancelButton from '#/components/buttons/cancel-button'

interface ResetSlotWarningProps {
  closeModal: () => void
  onSubmit: () => void
}

const ResetSlotWarning: React.FC<ResetSlotWarningProps> = ({ closeModal, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Modal onCancel={closeModal}>
      <div className='flex max-w-108 flex-col gap-8 p-2 sm:p-0'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>{t('reset slot')}</h2>
        </div>
        <p className='px-4 text-lg font-medium'>{t('reset slot message')}</p>
        <div className='pt- flex justify-between gap-2'>
          <CancelButton onClick={closeModal} className='w-1/2' />
          <button
            onClick={() => {
              onSubmit()
              closeModal()
            }}
            className='w-1/2 rounded-sm bg-red-500 px-6 py-2 text-lg font-bold text-nowrap text-white transition-all hover:scale-105 hover:opacity-75'
          >
            {t('reset slot')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ResetSlotWarning
