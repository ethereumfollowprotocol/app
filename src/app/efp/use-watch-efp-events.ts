import * as abi from '#/lib/abi.ts'
import { useWatchContractEvent } from 'wagmi'
import { coreEfpContracts } from '#/lib/constants/contracts'

type Props = {
  accountMetadata?: boolean
  listRegistry?: boolean
  listRecords?: boolean
  all?: boolean
}
export function useWatchEfpEvents({ accountMetadata, listRegistry, listRecords, all }: Props) {
  useWatchContractEvent({
    enabled: listRegistry || all,
    address: coreEfpContracts['EFPListRegistry'],
    abi: abi.efpListRegistryAbi,
    syncConnectedChain: true,
    onLogs: logs => {
      // console.log('[EFPListRegistry] - LOGS')
      // console.log(logs)
    },
    onError: error => {
      // console.log('[EFPListRegistry] - ERROR')
      // console.error(error)
      throw new Error(error.message)
    }
  })
  useWatchContractEvent({
    enabled: listRecords || all,
    address: coreEfpContracts['EFPListRecords'],
    abi: abi.efpListRecordsAbi,
    syncConnectedChain: true,
    onLogs: logs => {
      // console.log('[EFPListRecords] - LOGS')
      // console.log(logs)
    },
    onError: error => {
      // console.log('[EFPListRecords] - ERROR')
      // console.error(error)
      throw new Error(error.message)
    }
  })
  useWatchContractEvent({
    enabled: accountMetadata || all,
    address: coreEfpContracts['EFPAccountMetadata'],
    abi: abi.efpAccountMetadataAbi,
    syncConnectedChain: true,
    onLogs: logs => {
      // console.log('[EFPAccountMetadata] - LOGS')
      // console.log(logs)
    },
    onError: error => {
      // console.log('[EFPAccountMetadata] - ERROR')
      // console.error(error)
      throw new Error(error.message)
    }
  })
}
