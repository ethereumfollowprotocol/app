import { useTranslation } from 'react-i18next'

interface CancelbuttonProps {
  onClick?: () => void
}

const CancelButton: React.FC<CancelbuttonProps> = ({ onClick }) => {
  const { t } = useTranslation('transactions')

  return (
    <button
      onClick={onClick}
      className='w-32 h-12 hover:opacity-90 bg-gray-300 rounded-full text-lg font-semibold'
    >
      {t('cancel')}
    </button>
  )
}

export default CancelButton
