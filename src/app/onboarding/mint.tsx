'use client'

import * as React from 'react'
import * as abi from 'src/lib/abi'
import { encodePacked } from 'viem'
import { Box, Button, Flex } from '@radix-ui/themes'
import { useIsMounted } from 'src/hooks/use-is-mounted'
import { efpContracts } from 'src/lib/constants/contracts'
import { mint, claimList, follow } from '#/app/efp/actions.ts'
import { useAccount, useChainId, useContractWrite, usePrepareContractWrite } from 'wagmi'

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
        [1, 1, BigInt(chainId), efpContracts['EFPListRecords'], 123n]
      )
    ]
  })

  const {
    write,
    data: writeMintData,
    status: writeMintStatus,
    error: writeMintError
  } = useContractWrite(prepareMintConfig)

  if (!isMounted) return null
  return (
    <Flex direction='column'>
      {chainId}
      <Button variant='classic' disabled={!write} onClick={() => write?.()}>
        Mint
      </Button>

      <Box>{writeMintStatus}</Box>
      <pre>{JSON.stringify(writeMintData)}</pre>
      <Box>{writeMintError && <Box>{writeMintError.message}</Box>}</Box>
      {prepareMintError && <Box>{prepareMintError.message}</Box>}

      <Button variant='soft'></Button>
    </Flex>
  )
}
