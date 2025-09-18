import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { ens_beautify } from '@adraffy/ens-normalize'

import { truncateAddress } from '#/lib/utilities'
import type { SearchENSNameDomain } from '#/types/requests'
import { isAddress } from '@encrypteddegen/eik-testnet'

export interface ResultItemProps {
  result: SearchENSNameDomain
  resetSearch: () => void
}

const ResultItem: React.FC<ResultItemProps> = ({ result, resetSearch }) => {
  const router = useRouter()
  const beautifiedName = useMemo(() => {
    try {
      return ens_beautify(result.name)
    } catch (error) {
      return result.name
    }
  }, [result.name])

  const onClick = useCallback(() => {
    router.push(`/${result.resolvedAddress?.id || result.name}?ssr=false`)

    resetSearch()
  }, [result.name, result.resolvedAddress?.id, router, resetSearch])

  return (
    <div
      key={result.name}
      onClick={onClick}
      className='text-md flex max-w-full cursor-pointer items-center gap-1 truncate transition-opacity hover:opacity-75'
    >
      <p>{beautifiedName}</p>
      {result.resolvedAddress?.id && (
        <p className='text-sm text-zinc-400'>
          -{' '}
          {isAddress(result.resolvedAddress.id)
            ? truncateAddress(result.resolvedAddress.id as string)
            : result.resolvedAddress.id}
        </p>
      )}
    </div>
  )
}

export default ResultItem
