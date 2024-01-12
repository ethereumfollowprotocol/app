import { isHex } from 'viem'
import { evmClient } from '#/lib/viem.ts'
import { mint, claimList, follow } from '#/app/efp/actions.ts'
import { getTransactionReceipt } from 'viem/actions'
import { generateListStorageLocationSlot } from '#/app/efp/utilities'
import fs from 'node:fs'

const client = evmClient['31337']()
const nonce = generateListStorageLocationSlot()

console.log('NONCE', nonce)

const mintTransactionHash = await mint({
  account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  client,
  version: 1,
  locationType: 1,
  slot: 234n
})

console.log({ mintTransactionHash })
const mintTransactionReceipt = await client.waitForTransactionReceipt({
  hash: mintTransactionHash
})
console.log(JSON.stringify(mintTransactionReceipt, undefined, 2))

const claimListTransactionHash = await claimList({
  account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  client,
  slot: 234n
})

console.log({ claimListTransactionHash })
const claimListTransactionReceipt = await client.waitForTransactionReceipt({
  hash: claimListTransactionHash
})

console.log(JSON.stringify(claimListTransactionReceipt, undefined, 2))

const followTransactionHash = await follow({
  account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  client,
  slot: 234n,
  listClaimCompleted: isHex(claimListTransactionHash),
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})

console.log({ followTransactionHash })

const followTransactionReceipt = await client.waitForTransactionReceipt({
  hash: followTransactionHash
})

console.log(JSON.stringify(followTransactionReceipt, undefined, 2))
