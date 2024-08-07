import type { Address } from 'viem'

export const fetchProfileAllFollowings = async (list: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/allFollowingAddresses`,
      {
        cache: 'default'
        // cache: "no-cache",
      }
    )

    const data = (await response.json()) as Address[]
    return data.map(addr => addr.toLowerCase()) as Address[]
  } catch (err: unknown) {
    return [] as Address[]
  }
}
