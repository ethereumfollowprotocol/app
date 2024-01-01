import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * @see https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
 */

export async function GET(request: Request) {
  const url = new URL(request.url)
  const queryParameters = new URLSearchParams(url.search)
  const forwardedProto = request.headers.get('x-forwarded-proto')
  console.log(url.pathname, forwardedProto)
  draftMode().enable()
  return redirect('/')
}
