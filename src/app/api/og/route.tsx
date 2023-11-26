import { ImageResponse } from 'next/og'
import type { ExtractTypeFromUnion } from '#lib/types.ts'

export const runtime = 'edge'
export const contentType = 'image/png'

type ImageOptionsType = NonNullable<
  ExtractTypeFromUnion<ConstructorParameters<typeof ImageResponse>[1], ResponseInit>
>

type FontsType = ImageOptionsType['fonts']

export async function GET(request: Request) {
  const url = new URL(request.url)
  try {
    const name = url.searchParams.get('name')
    const followers = url.searchParams.get('followers')
    const following = url.searchParams.get('following')

    if (!name) throw new Error('Missing name query parameter')
    if (!followers) throw new Error('Missing followers query parameter')
    if (!following) throw new Error('Missing following query parameter')

    const fonts = await fetchFonts()

    return new ImageResponse(
      <div
        style={{
          fontSize: 52,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(180deg,#fef305 10%,#ff79c9 95%)'
        }}
      >
        <img
          src='https://metadata.ens.domains/mainnet/avatar/brantly.eth'
          width='225'
          height='225'
          alt='ens avatar'
          style={{ borderRadius: '50%', marginTop: '25px' }}
        />
        <p style={{ fontWeight: 'bolder' }}>{name}</p>
        <section
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <div
            style={{
              display: 'flex',
              fontWeight: '500',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <p style={{ padding: 0, margin: 0 }}>{followers}</p>
            <p style={{ marginTop: '10px' }}>followers</p>
          </div>
          <div
            style={{
              display: 'flex',
              fontWeight: '500',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <p style={{ padding: 0, margin: 0 }}>{following}</p>
            <p style={{ marginTop: '10px' }}>following</p>
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

async function fetchFonts(): Promise<FontsType> {
  const fontResponse = await fetch(
    new URL('../../assets/fonts/Inter-SemiBold.ttf', import.meta.url)
  )
  const font = await fontResponse.arrayBuffer()

  const fontBoldResponse = await fetch(
    new URL('../../assets/fonts/Inter-Bold.ttf', import.meta.url)
  )
  const fontBold = await fontBoldResponse.arrayBuffer()

  return [
    { name: 'IBM Plex Mono SemiBold', data: font, weight: 400, style: 'normal' },
    { name: 'IBM Plex Mono Bold', data: fontBold, weight: 700, style: 'normal' }
  ]
}
