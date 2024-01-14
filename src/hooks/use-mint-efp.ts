import * as React from 'react'
import { encodePacked } from 'viem'
import * as abi from 'src/lib/abi.ts'
import { efpContracts } from '#/lib/constants/contracts.ts'
import { generateListStorageLocationSlot } from '#/app/efp/utilities.ts'
import { useChainId, useSimulateContract, useWriteContract } from 'wagmi'

export function useMintEFP() {
  const chainId = useChainId()
  const nonce = React.useMemo(() => generateListStorageLocationSlot(), [])
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
