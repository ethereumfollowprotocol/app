import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import Modal from '../modal'
import CancelButton from '../buttons/cancel-button'
import { PrimaryButton } from '../buttons/primary-button'
import EarlyUserPoap from 'public/assets/art/early-user-poap.svg'

interface ClaimPoapModalProps {
  onClose: () => void
  link: string
  isLoading: boolean
}

const ClaimPoapModal: React.FC<ClaimPoapModalProps> = ({ onClose, link, isLoading }) => {
  const { t } = useTranslation()

  return (
    <Modal onCancel={onClose}>
      <div className='flex flex-col gap-6 items-center'>
        <h2 className='text-2xl font-bold'>You are now officially Early to EFP</h2>
        <p className='font-medium'>Congrats! 👏 Here's a limited edition "Early to EFP" POAP.</p>
        <div className='p-6 w-full bg-white dark:bg-darkGrey rounded-xl'>
          <Image
            src={EarlyUserPoap}
            alt='Early user Poap'
            width={300}
            height={300}
            className='animate-spin-y mx-auto'
          />
        </div>
        {isLoading && <p className='font-semibold loading-ellipsis'>Loading your POAP link...</p>}
        <div className='w-full flex items-center justify-between'>
          <CancelButton onClick={onClose} label={t('No thanks')} />
          <a href={link} target='_blank' rel='noreferrer'>
            <PrimaryButton onClick={onClose} disabled={link.length === 0} label={t('Claim')} />
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default ClaimPoapModal
