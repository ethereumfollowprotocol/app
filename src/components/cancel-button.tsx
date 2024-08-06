import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

interface CancelbuttonProps {
  onClick?: () => void
  label?: string
  disabled?: boolean
  className?: string
}

const CancelButton: React.FC<CancelbuttonProps> = ({ onClick, label, disabled, className }) => {
  const { t } = useTranslation('transactions')

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-32 h-12 hover:opacity-90 bg-gray-300 rounded-full text-lg font-semibold disabled:opacity-70',
        className
      )}
    >
      {label ?? t('cancel')}
    </button>
  )
}

export default CancelButton
