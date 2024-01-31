export const runtime = 'edge'

export async function GET() {
  return new Response('ok', { status: 200 })
}
