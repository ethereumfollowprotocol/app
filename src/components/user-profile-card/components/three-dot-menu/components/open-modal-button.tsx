import React from 'react'
import { useTranslation } from 'react-i18next'

interface OpenModalButtonProps {
  onClick: () => void
  icon?: React.ReactNode
  text: string
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onClick, icon, text }) => {
  const { t } = useTranslation()
  return (
    <button
      onClick={onClick}
      className='hover:bg-text/5 relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-3 text-xs font-bold transition-colors'
    >
      {icon}
      <p className='text-nowrap'>{t(text)}</p>
    </button>
  )
}

export default OpenModalButton
