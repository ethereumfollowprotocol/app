interface CancelbuttonProps {
  onClick?: () => void
}

const CancelButton: React.FC<CancelbuttonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className='w-32 h-12 bg-gray-300 rounded-full text-lg font-semibold'>
      Cancel
    </button>
  )
}

export default CancelButton
