import type { FollowingTagsResponse } from '#/types/requests'

export const nullFollowingTags = {
  token_id: 0,
  tags: [],
  tagCounts: [],
  taggedAddresses: []
}

export const fetchFollowingTags = async (
  addressOrName: string,
  list?: number | string,
  fresh?: boolean
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/tags${fresh ? '?cache=fresh' : ''}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as FollowingTagsResponse
    return data
  } catch (err: unknown) {
    return nullFollowingTags
  }
}
