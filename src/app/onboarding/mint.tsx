'use client'

import { Box, Button, Flex } from '@radix-ui/themes'
import { useIsMounted } from 'src/hooks/use-is-mounted'
import * as abi from 'src/lib/abi'
import { efpContracts } from 'src/lib/constants/contracts'
import { encodePacked } from 'viem'
import { useAccount, useChainId, useSimulateContract, useWriteContract } from 'wagmi'

export function Mint() {
  const account = useAccount()
  const chainId = useChainId()
  const isMounted = useIsMounted()

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
        [1, 1, BigInt(chainId), efpContracts['EFPListRegistry'], 123n]
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

  const {
    data: simulateFollowData,
    error: simulateFollowError,
    status: simulateFollowStatus
  } = useSimulateContract({
    chainId: 31337,
    address: efpContracts['EFPListRecords'],
    abi: abi.efpListRecordsAbi,
    functionName: 'applyListOp',
    args: [
      22n,
      encodePacked(
        ['uint8', 'uint8', 'bytes'],
        [
          1,
          1,
          encodePacked(
            ['uint8', 'uint8', 'address'],
            [1, 1, '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266']
          )
        ]
      )
    ]
  })

  const {
    data: writeFollowData,
    writeContract: writeFollow,
    writeContractAsync: writeFollowAsync,
    context: writeFollowContext,
    failureCount: writeFollowFailureCount,
    status: writeFollowStatus,
    error: writeFollowError
  } = useWriteContract()

  if (!isMounted) return null
  return (
    <Flex direction='column'>
      {chainId}
      <Button
        variant='classic'
        disabled={!simulateMintData?.request}
        onClick={() => {
          if (!simulateMintData?.request) return
          return writeMint(simulateMintData?.request)
        }}
      >
        Mint
      </Button>

      <Box>{writeMintStatus}</Box>
      <pre>{JSON.stringify(writeMintData)}</pre>
      <Box>{writeMintError && <Box>{writeMintError.message}</Box>}</Box>
      {simulateMintStatus === 'error' && <Box>{simulateMintError.message}</Box>}

      <Button
        variant='classic'
        disabled={!simulateFollowData?.request}
        onClick={() => {
          if (!simulateFollowData?.request) return
          return writeFollow(simulateFollowData?.request)
        }}
      >
        Follow
      </Button>

      <Box>{writeFollowStatus}</Box>
      <pre>{JSON.stringify(writeFollowData)}</pre>
      <Box>{writeFollowError && <Box>{writeFollowError.message}</Box>}</Box>
      {writeFollowError && <Box>{writeFollowError.message}</Box>}
    </Flex>
  )
}
