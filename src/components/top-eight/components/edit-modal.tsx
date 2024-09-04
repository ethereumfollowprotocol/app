import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import TopEightProfile from './top-eight-profile'
import type { FollowingResponse } from '#/types/requests'

interface EditModalProps {
  profiles: FollowingResponse[]
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ profiles, onClose }) => {
  const { t } = useTranslation()

  return (
    <Modal onCancel={onClose}>
      <div className='max-w-[580px] p-2 flex items-center flex-col gap-6'>
        <h2 className='text-2xl font-bold'>{t('top eight title')}</h2>
        <div className='flex items-center justify-center flex-wrap w-full gap-2'>
          {profiles.map((profile, index) => (
            <TopEightProfile profile={profile} isEditing={true} key={index} />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default EditModal
