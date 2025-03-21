import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import Modal from '../modal'
import CancelButton from '../buttons/cancel-button'
import PrimaryButton from '../buttons/primary-button'
import EarlyUserPoap2024 from 'public/assets/art/early-user-poap-2024.svg?url'
import EarlyUserPoap2025 from 'public/assets/art/early-user-poap-2025.svg?url'

interface ClaimPoapModalProps {
  onClose: () => void
  link: string
  isLoading: boolean
}

const ClaimPoapModal: React.FC<ClaimPoapModalProps> = ({ onClose, link, isLoading }) => {
  const { t } = useTranslation()
  const now = new Date().getTime()
  const is2025 = now > new Date('2025-01-01').getTime()

  return (
    <Modal onCancel={onClose} disableBackgroundClose={true}>
      <div className='flex flex-col items-center gap-6'>
        <h2 className='text-2xl font-bold'>You are now officially Early to EFP</h2>
        <p className='font-medium'>Congrats! 👏 Here&apos;s a limited edition &quot;Early to EFP&quot; POAP.</p>
        <div className='bg-neutral w-full rounded-sm p-6'>
          <Image
            src={is2025 ? EarlyUserPoap2025 : EarlyUserPoap2024}
            alt='Early user Poap'
            width={300}
            height={300}
            className='animate-spin-y mx-auto'
          />
        </div>
        {isLoading && <p className='loading-ellipsis font-semibold'>Loading your POAP link</p>}
        <div className='flex w-full items-center justify-between'>
          <CancelButton onClick={onClose} label={t('No thanks')} />
          <a href={link} target='_blank' rel='noreferrer'>
            <PrimaryButton onClick={onClose} disabled={!link} label={t('Claim')} />
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default ClaimPoapModal
