import { getENSProfile } from '#lib/ens.ts'

type Runtime = 'node' | 'edge'

export const runtime = 'edge' satisfies Runtime

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
    })
  }

  const profile = await getENSProfile({ ensNameOrAddress: id })

  return new Response(JSON.stringify(profile), {
    status: 200,
  })
}
