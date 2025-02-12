import { useTranslation } from 'react-i18next'
import { cn } from '#/lib/utilities'

interface CancelbuttonProps {
  onClick?: () => void
  label?: string
  disabled?: boolean
  className?: string
}

const CancelButton: React.FC<CancelbuttonProps> = ({ onClick, label, disabled, className }) => {
  const { t } = useTranslation()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'text-darkGrey h-14 w-32 rounded-full bg-[#bbbbbb] text-lg font-bold transition-all hover:scale-110 hover:opacity-90 disabled:opacity-40 disabled:hover:scale-100',
        className
      )}
    >
      {label ?? t('cancel')}
    </button>
  )
}

export default CancelButton
