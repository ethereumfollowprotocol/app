import { efpListRegistryAbi } from '#/lib/abi'
import { EFPListRegistryDeployChain, efpContracts } from '#/lib/constants/contracts'
import { zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

/**
 * @description Gets the EFP list storage location for the fetched token ID
 */
const useListStorageLocation = () => {
  const { address: account } = useAccount()

  // Fetch the tokenId associated with this account
  const { data: nftData } = useReadContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    functionName: 'balanceOf',
    args: [account || zeroAddress],
    chainId: EFPListRegistryDeployChain
  })

  const tokenId = BigInt(0)
  console.log('🦄 ~ useListStorageLocation ~ nftData:', nftData)

  const { data, isLoading, isError } = useReadContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    functionName: 'getListStorageLocation',
    args: [tokenId],
    chainId: EFPListRegistryDeployChain
  })

  return { data, isLoading, isError }
}

export default useListStorageLocation
