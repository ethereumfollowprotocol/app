import React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { useGlassTheme } from '#/hooks/use-glass-theme'

interface OpenModalButtonProps {
  onClick: () => void
  icon?: React.ReactNode
  text: string
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onClick, icon, text }) => {
  const { t } = useTranslation()
  const { getGlassClass } = useGlassTheme()

  return (
    <button
      onClick={onClick}
      className={cn(
        getGlassClass('glass-hover-item', 'hover:bg-text/5'),
        'relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-4 text-xs font-bold transition-colors'
      )}
    >
      {icon}
      <p className='text-nowrap'>{t(text)}</p>
    </button>
  )
}

export default OpenModalButton
