import type { Address } from 'viem'
import type { DiscoverItemType, DiscoverResponseType } from '#/types/common'

export const fetchRecommendations = async (
  endpoint: 'discover' | 'recommended',
  addressOrName?: string | Address
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/${
        endpoint === 'recommended'
          ? addressOrName
            ? `users/${addressOrName}/recommended`
            : 'discover?include=counts'
          : `${endpoint}?include=counts`
      }`,
      {
        cache: 'default'
      }
    )

    const data = (await res.json()) as DiscoverResponseType

    const formattedData =
      endpoint === 'recommended'
        ? data.recommended.map(addr => ({ address: addr }))
        : (data.discover as DiscoverItemType[])

    return formattedData
  } catch (err: unknown) {
    return []
  }
}
