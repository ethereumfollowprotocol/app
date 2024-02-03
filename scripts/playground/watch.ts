#!/usr/bin/env bun
import { efpContracts } from '#/lib/constants/contracts.ts'
import fs from 'node:fs'
import * as abi from 'src/lib/abi'
import { evmClient } from 'src/lib/viem'
import { decodeEventLog } from 'viem'

console.info('\nWatching EFP events...\n')

watchEfpEvents().catch(error => {
  console.error(error)
  process.exit(1)
})

async function watchEfpEvents() {
  const client = evmClient['31337']()
  client.watchContractEvent({
    abi: abi.efpAccountMetadataAbi,
    address: efpContracts['EFPAccountMetadata'],
    // eventName: 'ValueSet',
    onError: error => {
      console.log('EFPAccountMetadataABI error:', error)
    },
    onLogs: logs => {
      console.log('\n--- EFPAccountMetadata ---\n')
      logs.map(({ data, topics }) => {
        const _topics = decodeEventLog({
          abi: abi.efpAccountMetadataAbi,
          data,
          topics
        })
        console.log('[EFPAccountMetadata] Decoded topics:', JSON.stringify(_topics, undefined, 2))
      })
    }
  })

  client.watchContractEvent({
    abi: abi.efpListRegistryAbi,
    address: efpContracts['EFPListRegistry'],
    // eventName: 'Transfer',
    onError: error => {
      console.log('EFPListRegistryABI error:', error)
    },
    onLogs: logs => {
      console.log('\n--- EFPListRegistry ---\n')
      logs.map(({ data, topics }) => {
        const _topics = decodeEventLog({
          abi: abi.efpListRegistryAbi,
          data,
          topics
        })
        console.log('[EFPListRegistry] Decoded topics:', JSON.stringify(_topics, undefined, 2))
      })
    }
  })

  client.watchContractEvent({
    abi: abi.efpListRecordsAbi,
    address: efpContracts['EFPListRecords'],
    // eventName: 'OwnershipTransferred',
    onError: error => {
      console.log('EFPListMetadataABI error:', error)
    },
    onLogs: logs => {
      console.log('\n--- EFPListMetadata ---\n')
      logs.map(({ data, topics }) => {
        const _topics = decodeEventLog({
          abi: abi.efpListRecordsAbi,
          data,
          topics
        })
        console.log('[EFPListMetadata] Decoded topics:', JSON.stringify(_topics, undefined, 2))
      })
    }
  })

  client.watchContractEvent({
    abi: abi.efpListMinterAbi,
    address: efpContracts['EFPListMinter'],
    // eventName: 'ListOperation',
    onError: error => {
      console.log('EFPListRecordsABI error:', error)
    },
    onLogs: logs => {
      console.log('\n--- EFPListRecords ---\n')
      logs.map(({ data, topics }) => {
        const _topics = decodeEventLog({
          abi: abi.efpListMinterAbi,
          data,
          topics
        })
        console.log('[EFPListRecords] Decoded topics:', JSON.stringify(_topics, undefined, 2))
      })
    }
  })

  client.watchContractEvent({
    abi: abi.efpListMinterAbi,
    address: efpContracts['EFPListMinter'],
    onError: error => {
      console.log('EFPListMinterABI error:', error)
    },
    onLogs: logs => {
      console.log('\n--- EFPListMinter ---\n')
      logs.map(({ data, topics }) => {
        const _topics = decodeEventLog({
          abi: abi.efpListMinterAbi,
          data,
          topics
        })
        console.log('[EFPListMinter] Decoded topics:', JSON.stringify(_topics, undefined, 2))
      })
    }
  })

  client.watchEvent({
    onLogs: logs => {
      fs.writeFileSync('logs.json', JSON.stringify(logs, undefined, 2), { encoding: 'utf8' })
    }
  })
}
