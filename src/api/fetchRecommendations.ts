import type { DiscoverResponseType } from '#/types/common'
import type { Address } from 'viem'

const fetchRecommendations = async (
  endpoint: 'discover' | 'recommended',
  addressOrName?: string | Address
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/${
        endpoint === 'recommended'
          ? addressOrName
            ? `users/${addressOrName}/recommended`
            : 'discover'
          : endpoint
      }`,
      {
        cache: 'default'
      }
    )

    const data = (await res.json()) as DiscoverResponseType
    const formattedData =
      endpoint === 'recommended' ? data.recommended.map(addr => ({ address: addr })) : data.discover

    return formattedData
  } catch (e) {
    return []
  }
}

export default fetchRecommendations
