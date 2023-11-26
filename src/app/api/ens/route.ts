import { getENSProfile } from '#lib/ens.ts'
import { cacheHeader } from 'pretty-cache-header'

type Runtime = 'node' | 'edge'

export const runtime = 'edge' satisfies Runtime

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400
    })
  }

  const profile = await getENSProfile({ ensNameOrAddress: id })

  return Response.json(profile, {
    status: 200,
    headers: {
      'Cache-Control': cacheHeader({
        maxAge: '7d',
        sMaxage: '7d',
        staleWhileRevalidate: '1h'
      })
    }
  })
}
