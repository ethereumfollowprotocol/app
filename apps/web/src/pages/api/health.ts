import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = async _ =>
  new Response(JSON.stringify({ health: 'OK' }), {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  })
