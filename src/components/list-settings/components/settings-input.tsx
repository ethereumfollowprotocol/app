import { useAccount } from 'wagmi'
import { isAddress, type Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { cn } from '#/lib/utilities'
import { Avatar } from '#/components/avatar'
import { resolveEnsProfile } from '#/utils/ens'
import LoadingCell, { LIGHT_LOADING_GRADIENT } from '#/components/loaders/loading-cell'
import type React from 'react'

interface SettingsInputProps {
  option: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
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
  Icon,
  resolvedAddress,
  value,
  disableValue,
  placeholder,
  setValue,
  isEditingSettings,
  isLoading,
  isSettingsLoading,
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
            avatar: null,
          },
  })

  return (
    <div className='flex flex-col gap-1'>
      <div className='text-text/80 flex items-center gap-2 pl-3'>
        <p className='font-semibold'>{option}</p>
        {Icon && <Icon className='h-auto w-5' />}
      </div>
      {isSettingsLoading ? (
        <div className='bg-neutral/70 w-full truncate rounded-sm p-3 font-medium disabled:cursor-not-allowed disabled:text-zinc-400'>
          <LoadingCell className='h-7 w-full rounded-sm' />
        </div>
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const input = e.target.value
            if (input.includes(' ')) return
            setValue(input)
          }}
          disabled={!isEditingSettings || connectedAddress?.toLowerCase() !== disableValue?.toLowerCase()}
          className='bg-nav-item w-full truncate rounded-sm p-3 font-medium disabled:cursor-not-allowed disabled:opacity-50'
        />
      )}
      {(isSettingsLoading || value.includes('.') || resolvedProfile?.name) && (
        <div
          className={cn(
            'flex h-10 items-center gap-2 pl-3 text-sm font-medium',
            (value.includes('.') && resolvedAddress && resolvedAddress?.length > 0) || resolvedProfile?.name
              ? 'text-text/80'
              : 'text-red-400'
          )}
        >
          {isSettingsLoading || isLoading || isNameLoading ? (
            <>
              <LoadingCell className='h-8 w-8 rounded-full' />
              <LoadingCell className='h-5 w-full rounded-sm' gradient={LIGHT_LOADING_GRADIENT} />
            </>
          ) : (
            <>
              <Avatar
                name={resolvedProfile?.name || value}
                size='h-8 w-8 rounded-full'
                avatarUrl={resolvedProfile?.avatar}
              />
              <p className='truncate font-bold'>
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
