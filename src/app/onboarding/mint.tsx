'use client'

import * as React from 'react'
import * as abi from 'src/lib/abi'
import { encodePacked } from 'viem'
import { Box, Button, Flex } from '@radix-ui/themes'
import { useIsMounted } from 'src/hooks/use-is-mounted'
import { efpContracts } from 'src/lib/constants/contracts'
import { mint, claimList, follow } from '#/app/efp/actions.ts'
import { useAccount, useChainId, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { generateNonce } from '#/app/efp/utilities'

export function Mint() {
  const account = useAccount()
  const chainId = useChainId()
  const isMounted = useIsMounted()

  const {
    config: prepareMintConfig,
    error: prepareMintError,
    status: prepareMintStatus
  } = usePrepareContractWrite({
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
    write: writeMint,
    data: writeMintData,
    status: writeMintStatus,
    error: writeMintError
  } = useContractWrite(prepareMintConfig)

  const {
    config: followConfig,
    error: followError,
    status: followStatus
  } = usePrepareContractWrite({
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
    write: writeFollow,
    data: writeFollowData,
    status: writeFollowStatus,
    error: writeFollowError
  } = useContractWrite(followConfig)

  if (!isMounted) return null
  return (
    <Flex direction='column'>
      {chainId}
      <Button variant='classic' disabled={!writeMint} onClick={() => writeMint?.()}>
        Mint
      </Button>

      <Box>{writeMintStatus}</Box>
      <pre>{JSON.stringify(writeMintData)}</pre>
      <Box>{writeMintError && <Box>{writeMintError.message}</Box>}</Box>
      {prepareMintError && <Box>{prepareMintError.message}</Box>}

      <Button variant='classic' disabled={!writeFollow} onClick={() => writeFollow?.()}>
        Follow
      </Button>

      <Box>{writeFollowStatus}</Box>
      <pre>{JSON.stringify(writeFollowData)}</pre>
      <Box>{writeFollowError && <Box>{writeFollowError.message}</Box>}</Box>
      {followError && <Box>{followError.message}</Box>}
    </Flex>
  )
}
