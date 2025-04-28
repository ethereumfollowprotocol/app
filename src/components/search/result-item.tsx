import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ens_beautify } from '@adraffy/ens-normalize'

import { truncateAddress } from '#/lib/utilities'
import type { SearchENSNameDomain } from '#/types/requests'

export interface ResultItemProps {
  result: SearchENSNameDomain
  resetSearch: () => void
}

const ResultItem: React.FC<ResultItemProps> = ({ result, resetSearch }) => {
  const router = useRouter()

  const onClick = useCallback(() => {
    router.push(
      `/${result.resolvedAddress?.id || (result.name[0] === '#' ? result.name.slice(1) : result.name)}?ssr=false`
    )
    resetSearch()
  }, [result.name, result.resolvedAddress?.id, router, resetSearch])

  return (
    <div
      key={result.name}
      onClick={onClick}
      className='text-md flex max-w-full cursor-pointer items-center gap-1 truncate transition-opacity hover:opacity-75'
    >
      <p>{ens_beautify(result.name)}</p>
      {result.resolvedAddress?.id && (
        <p className='text-sm text-zinc-400'>- {truncateAddress(result.resolvedAddress.id as string)}</p>
      )}
    </div>
  )
}

export default ResultItem
