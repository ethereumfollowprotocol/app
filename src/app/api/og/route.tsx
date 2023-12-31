import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { cacheHeader } from 'pretty-cache-header'
import type { ExtractTypeFromUnion, Pretty, Flatten } from '#/lib/types.ts'

export const runtime = 'edge'

const VERCEL_BLOB_STORE_ID = process.env.VERCEL_BLOB_STORE_ID
const VERCEL_STORAGE_URL = `https://${VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com`

/**
 * this typescript gymnastics is to extract the ImageOptions type from the ImageResponse constructor
 * If `next/og` exposed the types of the underlying library `@vercel/og` or the under-underlying library `satori`,
 * then we would have been able to import `ImageResposeOptions` which is a super set of `ImageOptions`
 */
type ImageOptionsType = NonNullable<
  ExtractTypeFromUnion<ConstructorParameters<typeof ImageResponse>[1], ResponseInit>
>

type Font = Pretty<Flatten<NonNullable<ImageOptionsType['fonts']>>>

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  try {
    const name = url.searchParams.get('name')
    const followers = url.searchParams.get('followers')
    const following = url.searchParams.get('following')

    if (!name) throw new Error('Missing name query parameter')
    if (!followers) throw new Error('Missing followers query parameter')
    if (!following) throw new Error('Missing following query parameter')

    const fonts = await Promise.all([
      fetchFont({
        name: 'Inter SemiBold',
        url: `${VERCEL_STORAGE_URL}/fonts/Inter-SemiBold-X6pEYu4El8UegrVwtw999muAJqhTkJ.ttf`,
        weight: 400
      }),
      fetchFont({
        name: 'Inter Bold',

        url: `${VERCEL_STORAGE_URL}/fonts/Inter-Bold-R79VslsfzAtaEUfBWkAW6Xc8AuAaZb.ttf`,
        weight: 700
      })
    ])

    return new ImageResponse(
      <div
        style={{
          fontSize: 54,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(119deg, #FEF305 32.34%, #FF79C9 100%)'
        }}
      >
        <img
          src='https://ens.ethfollow.xyz/i/brantly.eth'
          width='225'
          height='225'
          alt='ens avatar'
          style={{ borderRadius: '50%', marginTop: '35px' }}
        />
        <p style={{ fontSize: '62', fontWeight: '900', marginTop: '16px' }}>{name}</p>
        <section
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 120
          }}
        >
          <div
            style={{
              gap: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <p style={{ padding: 0, margin: 0, fontWeight: '700' }}>{following}</p>
            <p style={{ marginTop: '10px', fontWeight: '400' }}>following</p>
          </div>
          <div
            style={{
              gap: 1,
              display: 'flex',
              fontWeight: '500',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <p style={{ padding: 0, margin: 0, fontWeight: '700' }}>{followers}</p>
            <p style={{ marginTop: '10px' }}>followers</p>
          </div>
        </section>
      </div>,
      {
        fonts,
        status: 200,
        width: 1200,
        height: 630,
        debug: false
      }
    )
  } catch (error) {
    console.error(error)
    const errorMessages = error instanceof Error ? error.message : 'Unknown error'
    return new ImageResponse(
      <h1>
        {errorMessages} - {url.href}
      </h1>,
      {
        status: 500,
        width: 1200,
        height: 628,
        debug: process.env.NODE_ENV === 'development'
      }
    )
  }
}

async function fetchFont({
  url,
  name,
  weight = 400,
  style = 'normal'
}: {
  url: string
  name: string
} & Partial<Pick<Font, 'weight' | 'style'>>): Promise<Font> {
  const fontResponse = await fetch(url, {
    headers: {
      'Content-Type': 'font/ttf',
      'Cache-Control': cacheHeader({
        maxAge: '1y',
        staleWhileRevalidate: '1d'
      })
    }
  })
  const font = await fontResponse.arrayBuffer()
  return { name, data: font, weight, style }
}
