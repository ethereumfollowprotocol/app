import type { FollowingTagsResponse } from '#/types/requests'

export const nullFollowerTags = {
  token_id: 0,
  tags: [],
  tagCounts: [],
  taggedAddresses: []
}

export const fetchFollowerTags = async (addressOrName: string, list?: number | string) => {
  try {
    const url =
      list !== undefined
        ? `${process.env.NEXT_PUBLIC_EFP_API_URL}/lists/${list}/taggedAs`
        : `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/taggedAs`
    const response = await fetch(url, {
      cache: 'default'
      // cache: "no-cache",
    })

    const data = (await response.json()) as FollowingTagsResponse
    return data
  } catch (err: unknown) {
    return nullFollowerTags
  }
}
