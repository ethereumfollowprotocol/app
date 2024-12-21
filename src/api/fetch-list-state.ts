import type { FollowingResponse } from '#/types/requests'

export const fetchListState = async (list: number) => {
  try {
    const listStateReq = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/exportState/${list}`)
    const listStateRes = (await listStateReq.json()) as { following: FollowingResponse[] }
    return listStateRes.following as FollowingResponse[]
  } catch (error) {
    return []
  }
}
