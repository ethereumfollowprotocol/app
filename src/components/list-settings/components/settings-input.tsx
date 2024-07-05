import { useAccount } from 'wagmi'
import GraySpinner from '#/components/gray-spinner'

interface SettingsInputProps {
  option: string
  value: string
  resolvedAddress?: string
  disableValue: string
  placeholder: string
  isEditingSettings: boolean
  setValue: (value: string) => void
  isLoading?: boolean
}

const SettingsInput: React.FC<SettingsInputProps> = ({
  option,
  resolvedAddress,
  value,
  disableValue,
  placeholder,
  setValue,
  isEditingSettings,
  isLoading
}) => {
  const { address: connectedAddress } = useAccount()

  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold text-lg'>{option}</p>
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => {
          const input = e.target.value
          if (input.includes(' ')) return
          setValue(input)
        }}
        disabled={
          !isEditingSettings || connectedAddress?.toLowerCase() !== disableValue?.toLowerCase()
        }
        className='p-3 font-medium truncate rounded-lg w-full bg-white/70 disabled:text-gray-400 disabled:cursor-not-allowed'
      />
      {value.includes('.') && (
        <div
          className={`font-medium items-center flex gap-2 text-sm ${
            resolvedAddress && resolvedAddress?.length > 0 ? 'text-gray-400' : 'text-red-400'
          }`}
        >
          <p>Resolved:</p>
          {isLoading ? (
            <GraySpinner />
          ) : (
            <p>
              {resolvedAddress && resolvedAddress?.length > 0
                ? resolvedAddress
                : "Name doesn't resolve"}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SettingsInput
