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
        'w-32 h-14 hover:opacity-90 text-darkGrey bg-[#bbbbbb] hover:scale-110 disabled:hover:scale-100 rounded-full text-lg transition-all font-bold disabled:opacity-40',
        className
      )}
    >
      {label ?? t('cancel')}
    </button>
  )
}

export default CancelButton
