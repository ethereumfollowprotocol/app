import { truncateAddress } from '#/lib/utilities'
import type { SearchENSNameDomain } from '#/types/requests'
import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { ens_beautify } from '@adraffy/ens-normalize'

export interface ResultItemProps {
  result: SearchENSNameDomain
  resetSearch: () => void
}

const ResultItem: React.FC<ResultItemProps> = ({ result, resetSearch }) => {
  const [resolvedAddress, setResolvedAddress] = useState<Address | string | undefined>()

  useEffect(() => {
    const resolveAddress = async () => {
      if (typeof result.resolvedAddress?.id === 'function') {
        const address = await result.resolvedAddress.id()
        setResolvedAddress(address as string)
      } else {
        setResolvedAddress(result.resolvedAddress?.id)
      }
    }
    resolveAddress()
  }, [result])

  const router = useRouter()

  const onClick = useCallback(() => {
    router.push(`/${resolvedAddress || (result.name[0] === '#' ? result.name.slice(1) : result.name)}?ssr=false`)
    resetSearch()
  }, [resolvedAddress, result.name, router, resetSearch])

  return (
    <div
      key={result.name}
      onClick={onClick}
      className='text-md flex max-w-full cursor-pointer items-center gap-1 truncate transition-opacity hover:opacity-75'
    >
      <p>{ens_beautify(result.name)}</p>
      {resolvedAddress && <p className='text-sm text-zinc-400'>- {truncateAddress(resolvedAddress as string)}</p>}
    </div>
  )
}

export default ResultItem
