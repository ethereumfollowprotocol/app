import Image from 'next/image'
import {
  ONBOARDING_STEPS,
  LIST_STORAGE_LOCATION_OPTION_ETHEREUM,
  type ListStorageLocationOption
} from './constants'

const STEP_ONE = '1'

interface Props {
  selectedListStorageLocationOption: ListStorageLocationOption | null
}

const OnboardingStep1OnchainUpdateSummary: React.FC<Props> = ({
  selectedListStorageLocationOption
}) => {
  return (
    <div>
      <div>
        <h2 className='text-2xl w-4/6 mx-auto text-center mb-1'>
          {ONBOARDING_STEPS[STEP_ONE].title}
        </h2>
        <h4 className='text-sm mx-auto text-center font-bold text-gray-400 mt-2'>
          {ONBOARDING_STEPS[STEP_ONE].subtext}
        </h4>
      </div>
      <div className='mb-auto mt-9'>
        <p className='font-bold text-2xl my-4'>Actions</p>
        <div className='flex flex-col gap-3'>
          <p>Create a new EFP List</p>
          <div className='flex items-center justify-center gap-2'>
            <p>TODO: N edits to List Records</p>
            <code className='font-bold'>{selectedListStorageLocationOption?.name}</code>
          </div>
        </div>
      </div>
      <div className='mb-auto mt-9'>
        <p className='font-bold text-2xl my-4'>Required Transactions</p>
        <div className='flex flex-col items-center gap-3'>
          <div className='flex items-center gap-2'>
            <p>1 tx</p>
            <Image
              width={24}
              height={24}
              alt={`${LIST_STORAGE_LOCATION_OPTION_ETHEREUM.name} location`}
              src={LIST_STORAGE_LOCATION_OPTION_ETHEREUM.icon || ''}
            />
            <code className='font-bold text-gray-500'>
              {LIST_STORAGE_LOCATION_OPTION_ETHEREUM.name}
            </code>
          </div>
          <div className='flex items-center gap-2'>
            <p>1 tx</p>
            <Image
              width={24}
              height={24}
              alt={`${selectedListStorageLocationOption?.name} location`}
              src={selectedListStorageLocationOption?.icon || ''}
            />
            <code className='font-bold text-gray-500'>
              {selectedListStorageLocationOption?.name}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingStep1OnchainUpdateSummary
