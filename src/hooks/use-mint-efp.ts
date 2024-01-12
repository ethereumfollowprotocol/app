import { efpContracts } from '#/lib/constants/contracts'
import * as abi from 'src/lib/abi'
import { encodePacked } from 'viem'
import { useChainId, useSimulateContract, useWriteContract } from 'wagmi'

export function useMintEFP() {
  const chainId = useChainId()
  const nonce = React.useMemo(() => generateNonce(), [])
  console.log(nonce)

  const {
    data: simulateMintData,
    error: simulateMintError,
    status: simulateMintStatus
  } = useSimulateContract({
    chainId,
    address: efpContracts['EFPListRegistry'],
    abi: abi.efpListRegistryAbi,
    functionName: 'mint',
    args: [
      encodePacked(
        ['uint8', 'uint8', 'uint256', 'address', 'uint'],
        [1, 1, BigInt(chainId), efpContracts['EFPListRecords'], nonce]
      )
    ]
  })

  const {
    writeContract: writeMint,
    writeContractAsync: writeMintAsync,
    data: writeMintData,
    status: writeMintStatus,
    error: writeMintError
  } = useWriteContract()

  return {
    simulateMintData,
    simulateMintError,
    simulateMintStatus,
    writeMint,
    writeMintAsync,
    writeMintData,
    writeMintStatus,
    writeMintError
  }
}
