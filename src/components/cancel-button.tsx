import { useTranslation } from 'react-i18next'

interface CancelbuttonProps {
  onClick?: () => void
  label?: string
}

const CancelButton: React.FC<CancelbuttonProps> = ({ onClick, label }) => {
  const { t } = useTranslation('transactions')

  return (
    <button
      onClick={onClick}
      className='w-32 h-12 hover:opacity-90 bg-gray-300 rounded-full text-lg font-semibold'
    >
      {label ?? t('cancel')}
    </button>
  )
}

export default CancelButton
