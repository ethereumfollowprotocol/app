import Image from 'next/image'

import Modal from '../modal'
import CancelButton from '../buttons/cancel-button'
import { PrimaryButton } from '../buttons/primary-button'
import BetaTesterPoap from 'public/assets/art/beta-tester-poap.svg'
import { useTranslation } from 'react-i18next'

const POAP_MMINT_URLS = [
  'https://poap.xyz/mint/olge4s',
  'https://poap.xyz/mint/vzi402',
  'https://poap.xyz/mint/b3tsbm',
  'https://poap.xyz/mint/ot7j6d',
  'https://poap.xyz/mint/n2zhwp',
  'https://poap.xyz/mint/mdnkkv',
  'https://poap.xyz/mint/5eooys',
  'https://poap.xyz/mint/7z78k2',
  'https://poap.xyz/mint/126ucp',
  'https://poap.xyz/mint/y18obe'
]

interface ClaimPoapModalProps {
  onClose: () => void
}

const ClaimPoapModal: React.FC<ClaimPoapModalProps> = ({ onClose }) => {
  const { t } = useTranslation()
  return (
    <Modal onCancel={onClose}>
      <h2>You have got a chance to claim the Beta tester Poap</h2>
      <Image
        src={BetaTesterPoap}
        alt='Beta tester Poap'
        width={400}
        height={400}
        className='animate-spin-slow'
      />
      <div>
        <CancelButton onClick={onClose} label={t('no thanks')} />
        <a href={POAP_MMINT_URLS[Math.floor(Math.random() * 10)]} target='_blank' rel='noreferrer'>
          <PrimaryButton onClick={onClose} label={t('yes')} />
        </a>
      </div>
    </Modal>
  )
}

export default ClaimPoapModal
