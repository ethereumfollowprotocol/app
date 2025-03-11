import type { AccountResponseType } from '#/types/requests'

export const fetchAccount = async (addressOrName: string, list?: number | null) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_EFP_API_URL}/${list !== undefined ? 'lists' : 'users'}/${list ?? addressOrName}/account`,
      {
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    const res = (await req.json()) as AccountResponseType
    return res
  } catch (err: unknown) {
    return null
  }
}
