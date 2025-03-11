import React from 'react'
import type { Address } from 'viem'
import EditIndicator from '#/components/edit-indicator'
import { useTopEightAddButton } from '../hooks/use-top-eight-add-button'

interface TopEightAddButtonProps {
  address: Address
  tags: string[]
}

const TopEightAddButton: React.FC<TopEightAddButtonProps> = ({ address, tags }) => {
  const { isPendingTopEight, isPendingRemove, isInTopEight, handleAdd } = useTopEightAddButton(address, tags)

  const buttonText = isInTopEight || isPendingTopEight ? 'Remove' : 'Add'

  return (
    <button
      onClick={handleAdd}
      className='bg-primary text-dark-grey relative flex w-24 items-center justify-center rounded-sm py-2 font-semibold transition-all! hover:scale-110'
    >
      {buttonText}
      {(isPendingTopEight || isPendingRemove) && <EditIndicator />}
    </button>
  )
}

export default TopEightAddButton
