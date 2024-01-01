import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * @see https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
 */

export async function GET(request: Request) {
  const url = new URL(request.url)
  const queryParameters = new URLSearchParams(url.search)
  console.log(queryParameters)
  draftMode().disable()
  return new Response('Draft mode is disabled', { status: 200 })
}
