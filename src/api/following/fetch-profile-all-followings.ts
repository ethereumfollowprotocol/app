import type { Address } from 'viem'

export const fetchProfileAllFollowings = async (list: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/allFollowingAddresses`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as Address[]
    return data.map((addr) => addr.toLowerCase()) as Address[]
  } catch (error) {
    console.error('Error fetching profile all followings:', error)
    return [] as Address[]
  }
}
