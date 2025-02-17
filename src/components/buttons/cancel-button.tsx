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
        'bg-nav-item hover:bg-text/10 h-11 w-full rounded-sm text-lg font-bold transition-all disabled:opacity-50',
        className
      )}
    >
      {label ?? t('cancel')}
    </button>
  )
}

export default CancelButton
