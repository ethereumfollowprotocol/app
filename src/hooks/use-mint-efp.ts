import * as React from 'react'
import * as abi from 'src/lib/abi'
import { encodePacked } from 'viem'
import { generateNonce } from '#/app/efp/utilities.ts'
import { efpContracts } from '#/lib/constants/contracts'
import { useChainId, useSimulateContract, useWriteContract } from 'wagmi'

export function useMintEFP() {
  const chainId = useChainId()

  const {
    data: simulateMintData,
    error: simulateMintError,
    status: simulateMintStatus
  } = useSimulateContract({
    chainId: 31337,
    address: efpContracts['EFPListRegistry'],
    abi: abi.efpListRegistryAbi,
    functionName: 'mint',
    args: [
      encodePacked(
        ['uint8', 'uint8', 'uint256', 'address', 'uint'],
        [1, 1, BigInt(chainId), efpContracts['EFPListRegistry'], 76n]
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
