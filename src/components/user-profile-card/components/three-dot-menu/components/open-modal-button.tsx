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
      className="rounded-lg cursor-pointer hover:bg-text/5 transition-colors relative text-xs flex items-center gap-1 justify-center font-bold w-full p-3"
    >
      {icon}
      <p className="text-nowrap">{t(text)}</p>
    </button>
  )
}

export default OpenModalButton
