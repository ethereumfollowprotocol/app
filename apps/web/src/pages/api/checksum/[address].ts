import { getAddress } from 'viem'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async context => {
  try {
    const { address } = context.params
    if (!address) throw new Error('Invalid address')
    const checksumAddress = getAddress(address)
    return new Response(checksumAddress, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
