import type { DiscoverResponseType } from '#/types/common'

const fetchDiscover = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/discover`, {
      cache: 'default'
    })

    const data = (await res.json()) as DiscoverResponseType
    return data.discover
  } catch (e) {
    return []
  }
}

export default fetchDiscover
