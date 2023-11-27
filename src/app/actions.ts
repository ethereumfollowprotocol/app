'use server'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { revalidateTag, revalidatePath } from 'next/cache'

export const readCookie = (name: string) => cookies().get(name)

export const deleteCookie = (name: string) => cookies().delete(name)

export async function follow() {
  /**
   * TODO: follow logic
   */
  revalidateTag('follow-list')
}
