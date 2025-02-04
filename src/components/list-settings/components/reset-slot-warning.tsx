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
      <div className="flex flex-col p-2 sm:p-0 gap-8 max-w-108">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('reset slot')}</h2>
        </div>
        <p className="text-lg font-medium px-4">{t('reset slot message')}</p>
        <div className="flex pt-1 justify-between">
          <CancelButton onClick={closeModal} />
          <button
            onClick={() => {
              onSubmit()
              closeModal()
            }}
            className="rounded-full bg-red-500 hover:opacity-75 hover:scale-110 transition-all font-bold text-white px-6 py-2 text-lg"
          >
            {t('reset slot')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ResetSlotWarning
