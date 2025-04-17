import type { Address } from 'viem'

export const fetchPoapLink = async (userAddress: Address) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${userAddress}/poap`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = (await res.json()) as { link: string }
    return data.link
  } catch (err: unknown) {
    return
  }
}
