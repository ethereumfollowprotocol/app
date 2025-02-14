import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SECOND } from '#/lib/constants'
import Copy from 'public/assets/icons/ui/copy.svg'
interface CopyValueProps {
  value: string
  text: string
}

const CopyValue: React.FC<CopyValueProps> = ({ value, text }) => {
  const [hasBeenCopied, setHasBeenCopied] = useState(false)
  const { t } = useTranslation()

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setHasBeenCopied(true)
        setTimeout(() => setHasBeenCopied(false), 3 * SECOND)
      }}
      className='hover:bg-text/5 relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-3 text-xs font-bold transition-colors'
    >
      <Copy />
      <p className='text-nowrap'>{t(hasBeenCopied ? 'copied' : text)}</p>
    </button>
  )
}

export default CopyValue
