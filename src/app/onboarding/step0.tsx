import clsx from 'clsx'
import Image from 'next/image'
import { ONBOARDING_STEPS, type ListStorageLocationOption } from './constants'

const STEP_ZERO = '0'

interface Props {
  onLocationSelect: (chainId: number) => void
  selectedListStorageLocationChainId: number | null
  listStorageLocationOptions: ListStorageLocationOption[]
}

const OnboardingStep0SelectStorageLocation: React.FC<Props> = ({
  onLocationSelect,
  selectedListStorageLocationChainId,
  listStorageLocationOptions
}) => {
  return (
    <>
      <div>
        <h2 className='text-2xl w-4/6 mx-auto text-center mb-1'>
          {ONBOARDING_STEPS[STEP_ZERO].title}
        </h2>
        <h4 className='text-sm mx-auto text-center font-bold text-gray-400 mt-2'>
          {ONBOARDING_STEPS[STEP_ZERO].subtext}
        </h4>
      </div>
      <div className='mb-auto mt-6'>
        <p className='font-bold text-2xl mt-4'>Select one</p>

        <ul className='mx-auto space-y-2 py-4 text-left'>
          {listStorageLocationOptions.map((listStorageLocationOption, index) => (
            <li
              key={`store-location-${listStorageLocationOption.name}`}
              className={clsx([
                'rounded-2xl border-2 border-transparent px-2 py-1.5 hover:border-lime-200 mx-auto self-center',
                selectedListStorageLocationChainId === listStorageLocationOption.chainId
                  ? 'bg-lime-100'
                  : 'bg-transparent'
              ])}
            >
              <button
                onClick={_event => onLocationSelect(listStorageLocationOption.chainId)}
                className={clsx([
                  'flex items-center space-x-4 rounded-xl px-4 text-left text-black hover:bg-transparent mx-auto'
                ])}
              >
                <Image
                  width={62}
                  height={62}
                  alt={`${listStorageLocationOption.name} location`}
                  src={listStorageLocationOption.icon}
                />
                <div className='ml-3 my-auto mb-3'>
                  <span className='text-md'>{listStorageLocationOption.label}</span>
                  <p className='text-2xl font-bold capitalize'>{listStorageLocationOption.name}</p>
                  <span
                    className={clsx([
                      'text-xs',
                      listStorageLocationOption.gasHint === 'Low gas fees'
                        ? 'text-lime-500'
                        : 'text-salmon-500'
                    ])}
                  >
                    {listStorageLocationOption.gasHint}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default OnboardingStep0SelectStorageLocation
