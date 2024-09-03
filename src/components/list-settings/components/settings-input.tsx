import { useAccount } from 'wagmi'
import { isAddress, type Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { cn } from '#/lib/utilities'
import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import LoadingCell, { LIGHT_LOADING_GRADIENT } from '#/components/loaders/loading-cell'

interface SettingsInputProps {
  option: string
  value: string
  resolvedAddress?: string
  disableValue: string
  placeholder: string
  isEditingSettings: boolean
  setValue: (value: string) => void
  isLoading?: boolean
  isSettingsLoading?: boolean
}

const SettingsInput: React.FC<SettingsInputProps> = ({
  option,
  resolvedAddress,
  value,
  disableValue,
  placeholder,
  setValue,
  isEditingSettings,
  isLoading,
  isSettingsLoading
}) => {
  const { t } = useTranslation()
  const { address: connectedAddress } = useAccount()

  const { data: resolvedProfile, isLoading: isNameLoading } = useQuery({
    queryKey: ['ens metadata', isAddress(value) ? value : resolvedAddress],
    queryFn: async () =>
      isAddress(value) || isAddress(resolvedAddress || '')
        ? await resolveEnsProfile((isAddress(value) ? value : resolvedAddress) as Address)
        : {
            name: null,
            avatar: null
          }
  })

  return (
    <div className='flex flex-col gap-1'>
      <p className='font-bold text-lg'>{option}</p>
      {isSettingsLoading ? (
        <div className='p-3 font-medium truncate rounded-lg w-full bg-white/70 disabled:text-zinc-400 disabled:cursor-not-allowed'>
          <LoadingCell className='w-full h-7 rounded-md' />
        </div>
      ) : (
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
          className='p-3 font-medium truncate rounded-lg w-full dark:bg-darkGrey/70 bg-white/70 disabled:text-zinc-400 disabled:cursor-not-allowed'
        />
      )}
      {(isSettingsLoading || value.includes('.') || resolvedProfile?.name) && (
        <div
          className={cn(
            'font-medium flex items-center gap-2 h-10 text-sm',
            (value.includes('.') && resolvedAddress && resolvedAddress?.length > 0) ||
              resolvedProfile?.name
              ? 'text-zinc-500 dark:text-zinc-200'
              : 'text-red-400'
          )}
        >
          {isSettingsLoading || isLoading || isNameLoading ? (
            <>
              <LoadingCell className='w-8 h-8 rounded-full' />
              <LoadingCell className='w-full h-5 rounded-md' gradient={LIGHT_LOADING_GRADIENT} />
            </>
          ) : (
            <>
              <Avatar
                name={resolvedProfile?.name || value}
                size='h-8 w-8 rounded-full'
                avatarUrl={resolvedProfile?.avatar}
              />
              <p className='font-bold truncate'>
                {value.includes('.')
                  ? resolvedAddress && resolvedAddress?.length > 0
                    ? resolvedAddress
                    : t('no resolution')
                  : resolvedProfile?.name}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SettingsInput
