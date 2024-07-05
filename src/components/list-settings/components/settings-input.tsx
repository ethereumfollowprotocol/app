import { useAccount } from 'wagmi'

interface SettingsInputProps {
  option: string
  value: string
  disableValue: string
  placeholder: string
  isEditingSettings: boolean
  setValue: (value: string) => void
  setChangedValues: (input: string) => void
}

const SettingsInput: React.FC<SettingsInputProps> = ({
  option,
  value,
  disableValue,
  placeholder,
  setValue,
  setChangedValues,
  isEditingSettings
}) => {
  const { address: connectedAddress } = useAccount()
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold text-lg'>{option}</p>
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => {
          const addr = e.target.value
          if (addr.includes(' ')) return
          setValue(addr)
          setChangedValues(addr)
        }}
        disabled={
          !isEditingSettings || connectedAddress?.toLowerCase() !== disableValue?.toLowerCase()
        }
        className='p-3 font-medium truncate rounded-lg w-full bg-white/70 disabled:text-gray-400 disabled:cursor-not-allowed'
      />
    </div>
  )
}

export default SettingsInput
