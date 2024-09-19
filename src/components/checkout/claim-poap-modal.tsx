import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import Modal from '../modal'
import CancelButton from '../buttons/cancel-button'
import { PrimaryButton } from '../buttons/primary-button'
import BetaTesterPoap from 'public/assets/art/beta-tester-poap.svg'

interface ClaimPoapModalProps {
  onClose: () => void
  link: string
}

const ClaimPoapModal: React.FC<ClaimPoapModalProps> = ({ onClose, link }) => {
  const { t } = useTranslation()

  return (
    <Modal onCancel={onClose}>
      <div className='flex flex-col gap-6 items-center'>
        <h2 className='text-2xl font-bold'>You are now officially an EFP OG</h2>
        <p className='font-medium'>
          Thanks for your help! 🙏 Here's a limited edition EFP Beta Tester POAP.
        </p>
        <div className='p-6 w-full bg-white/95 dark:bg-darkGrey/90 rounded-xl'>
          <Image
            src={BetaTesterPoap}
            alt='Beta tester Poap'
            width={300}
            height={300}
            className='animate-spin-y mx-auto'
          />
        </div>
        <div className='w-full flex items-center justify-between'>
          <CancelButton onClick={onClose} label={t('No thanks')} />
          <a href={link} target='_blank' rel='noreferrer'>
            <PrimaryButton onClick={onClose} label={t('Claim')} />
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default ClaimPoapModal
