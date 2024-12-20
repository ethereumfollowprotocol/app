import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SECOND } from '#/lib/constants'
import { MdOutlineContentCopy } from 'react-icons/md'

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
      className="rounded-lg cursor-pointer hover:bg-text/5 transition-colors w-full relative text-xs flex items-center gap-1 justify-center font-bold p-3"
    >
      <MdOutlineContentCopy className="text-base" />
      <p className="text-nowrap">{t(hasBeenCopied ? 'copied' : text)}</p>
    </button>
  )
}

export default CopyValue
