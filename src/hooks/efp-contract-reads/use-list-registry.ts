import { efpListRegistryAbi } from '#/lib/abi'
import { EFPListRegistryDeployChain, efpContracts } from '#/lib/constants/contracts'
import { useMemo } from 'react'
import { zeroAddress, type Address } from 'viem'
import { useReadContract } from 'wagmi'

interface UseListRegistryData {
  numTokens: bigint | undefined // the number of nft's for the specified address in the EFP List Registry
  tokenIds: readonly bigint[] | undefined // the token ids for the specified owner in the EFP List Registry
  tokenIdsIsLoading: boolean
  tokenIdsIsError: boolean
  primaryListTokenId: bigint | undefined // the primary list token id for the specified address in the EFP List Registry
  hasPrimaryListTokenId: boolean
}

/**
 * @description Get EFP List Registry contract data pertaining to the specified address
 * @param address The address to use
 * @returns
 */
const useListRegistry = (ownerAddress: Address | undefined) => {
  const { data: numTokens } = useReadContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    functionName: 'balanceOf',
    args: [ownerAddress || zeroAddress],
    chainId: EFPListRegistryDeployChain
  })

  const {
    data: tokenIds,
    isLoading: tokenIdsIsLoading,
    isError: tokenIdsIsError
  } = useReadContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    functionName: 'tokensOfOwner',
    args: [ownerAddress || zeroAddress]
  })

  // Get the primary list token id
  // TODO get the primary list token id from the EFPAccountMetadata contract; assuming the primary list token id is the first token id in the list for now
  const primaryListTokenId = tokenIds?.[0]

  return {
    numTokens,
    tokenIds,
    tokenIdsIsLoading,
    tokenIdsIsError,
    primaryListTokenId,
    hasPrimaryListTokenId: tokenIds?.[0] !== undefined
  } satisfies UseListRegistryData
}

export default useListRegistry
