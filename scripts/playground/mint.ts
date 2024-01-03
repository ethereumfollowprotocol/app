import { isHex } from 'viem'
import { evmClient } from '#lib/viem.ts'
import { mint, claimList, follow } from '#app/efp/actions.ts'

const client = evmClient['31337']()

const mintTransactionHash = await mint({
  client,
  version: 1,
  locationType: 1,
  nonce: 234n
})

console.log({ mintTransactionHash })

const claimListTransactionHash = await claimList({
  client,
  nonce: 234n
})

console.log({ claimListTransactionHash })

const followTransactionHash = await follow({
  client,
  nonce: 234n,
  listClaimCompleted: isHex(claimListTransactionHash),
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})

console.log({ followTransactionHash })
