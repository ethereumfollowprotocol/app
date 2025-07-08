import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import { SECOND } from '#/lib/constants'
import { useGlassTheme } from '#/hooks/use-glass-theme'
import Copy from 'public/assets/icons/ui/copy.svg'
interface CopyValueProps {
  value: string
  text: string
}

const CopyValue: React.FC<CopyValueProps> = ({ value, text }) => {
  const [hasBeenCopied, setHasBeenCopied] = useState(false)
  const { t } = useTranslation()
  const { getGlassClass } = useGlassTheme()

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setHasBeenCopied(true)
        setTimeout(() => setHasBeenCopied(false), 3 * SECOND)
      }}
      className={cn(
        getGlassClass('glass-hover-item', 'hover:bg-text/5'),
        'relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-4 text-xs font-bold transition-colors'
      )}
    >
      <Copy className='h-auto w-4' />
      <p className='text-nowrap'>{t(hasBeenCopied ? 'copied' : text)}</p>
    </button>
  )
}

export default CopyValue
