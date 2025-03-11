import React from 'react'

import Modal from './modal'
import LoadingCell from './loaders/loading-cell'

interface QRCodeModalProps {
  onClose: () => void
  qrCode?: string | null
  isLoading: boolean
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose, qrCode, isLoading }) => {
  return (
    <Modal onCancel={onClose}>
      {isLoading ? (
        <div className='flex h-auto w-full max-w-[436px] items-center justify-center rounded-sm sm:h-[492px] sm:w-[436px]'>
          <LoadingCell className='h-[100vw] w-full sm:h-full' />
        </div>
      ) : qrCode ? (
        <>
          <div
            className='flex h-auto w-full items-center justify-center rounded-sm text-center sm:h-[492px] sm:w-[436px]'
            dangerouslySetInnerHTML={{ __html: qrCode }}
          />
        </>
      ) : (
        <div className='flex h-auto w-full max-w-[436px] items-center justify-center rounded-sm sm:h-[492px] sm:w-[436px]'>
          <p>Failed to load QR code.</p>
        </div>
      )}
    </Modal>
  )
}

export default QRCodeModal
