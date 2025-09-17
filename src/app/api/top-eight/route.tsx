import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { isAddress } from 'viem'

import { truncateAddress } from '#/lib/utilities'
import { ens_beautify } from '@adraffy/ens-normalize'
import type { TopEightProfileType } from '#/components/top-eight/hooks/use-top-eight'
import { isLinkValid } from 'ethereum-identity-kit/utils'
import { fetchAccount } from '#/api/fetch-account'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(req: NextRequest) {
  const interSemiBold = await readFile(join(process.cwd(), '/public/fonts/Inter/Inter-SemiBold.ttf'))
  const interBold = await readFile(join(process.cwd(), '/public/fonts/Inter/Inter-Black.ttf'))

  try {
    const { searchParams } = new URL(req.url)
    const user = searchParams.get('user') as string
    const userIsList = !(isAddress(user) || Number.isNaN(Number(user)))

    if (!user) {
      return new Response('user parameter is required', { status: 400 })
    }

    // Fetch user account data and profiles data in parallel
    let userName: string = 'Unknown'
    let userAvatar: string | undefined
    let profiles: TopEightProfileType[] = []

    try {
      const [userAccountData, fetchedTopEight] = await Promise.all([
        fetchAccount(user, userIsList ? user : undefined),
        fetch(
          `${process.env.NEXT_PUBLIC_EFP_API_URL}/${userIsList ? 'lists' : 'users'}/${user}/following?include=ens&limit=8&tags=top8`
        ),
      ])

      // Process user account data
      if (userAccountData?.ens?.name) {
        userName = userAccountData.ens.name
      } else if (isAddress(user)) {
        userName = truncateAddress(user) || user
      } else {
        userName = user
      }
      userAvatar = isLinkValid(userAccountData?.ens?.avatar) ? userAccountData?.ens?.avatar : undefined

      // Process profiles data
      if (fetchedTopEight.ok) {
        const topEightData = (await fetchedTopEight.json()) as { following?: TopEightProfileType[] }
        profiles = topEightData.following || []
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${user}:`, error)

      // Fallback for user data
      if (isAddress(user)) {
        userName = truncateAddress(user) || user
      } else {
        userName = user
      }
      userAvatar = undefined
      profiles = []
    }

    // Ensure we have profiles to display
    if (profiles.length === 0) {
      return new Response('No Top 8 profiles found for this user', { status: 404 })
    }

    const response = new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, boxSizing: 'border-box' }}>
              {userAvatar && (
                <img
                  src={userAvatar}
                  alt='user avatar'
                  height={70}
                  width={70}
                  style={{ borderRadius: 35, marginBottom: 4, boxSizing: 'border-box' }}
                />
              )}
              <h1
                style={{
                  fontSize: 48,
                  color: '#333333',
                  margin: 0,
                  fontWeight: 400,
                  marginBottom: 16,
                }}
              >
                {userName}&apos;s&nbsp;<span style={{ fontWeight: 700 }}>Top 8</span>
              </h1>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg width='40' height='40' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect width='512' height='512' rx='40' fill='url(#paint0_linear_965_4162)' />
                <path d='M167.68 258.56L255.36 112.64L342.4 258.56L255.36 311.68L167.68 258.56Z' fill='#333333' />
                <path d='M255.36 327.68L167.68 274.56L255.36 398.08L342.4 274.56L255.36 327.68Z' fill='#333333' />
                <path
                  d='M367.36 341.76H342.4V378.88H307.84V401.92H342.4V440.32H367.36V401.92H401.28V378.88H367.36V341.76Z'
                  fill='#333333'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_965_4162'
                    x1='256'
                    y1='256'
                    x2='512'
                    y2='512'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#FFE067' />
                    <stop offset='1' stop-color='#FFF7D9' />
                  </linearGradient>
                </defs>
              </svg>
              <span
                style={{
                  fontSize: 24,
                  color: '#666666',
                  fontWeight: 400,
                }}
              >
                Ethereum Follow Protocol
              </span>
            </div>
          </div>

          {/* Grid Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              padding: '0px',
              background: 'transparent',
              borderRadius: 20,
              height: 580,
              width: 1100,
            }}
          >
            {/* Top Row */}
            <div
              style={{
                display: 'flex',
                gap: 16,
              }}
            >
              {profiles.slice(0, 4).map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
              ))}
            </div>

            {/* Bottom Row */}
            <div
              style={{
                display: 'flex',
                gap: 16,
              }}
            >
              {profiles.slice(4, 8).map((profile, index) => (
                <ProfileCard key={index + 4} profile={profile} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 40,
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18, color: '#666666' }}>Share your Top 8 at</span>
            <span style={{ fontSize: 20, color: '#333333', fontWeight: 700 }}>efp.app</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 900,
        fonts: [
          {
            name: 'Inter',
            data: interSemiBold,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    )

    // Add caching headers to improve performance
    response.headers.set('Cache-Control', 'public, max-age=100000, s-maxage=100000, stale-while-revalidate=86400')
    response.headers.set('CDN-Cache-Control', 'max-age=100000')
    response.headers.set('Vercel-CDN-Cache-Control', 'max-age=100000')

    return response
  } catch (error) {
    console.error('Error in /api/top-eight:', error)
    return new Response(
      JSON.stringify({
        error: 'Error generating image',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

function ProfileCard({ profile }: { profile: TopEightProfileType }) {
  const name = profile?.ens?.name
  const avatar = isLinkValid(profile?.ens?.avatar) ? profile?.ens?.avatar : undefined
  const header = isLinkValid(profile?.ens?.records?.header) ? profile?.ens?.records?.header : undefined
  const displayName = name ? ens_beautify(name) : truncateAddress(profile.address)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 260,
        height: 280,
        background: '#f8f9fa',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header Image */}
      {header ? (
        <img
          src={header}
          alt='header'
          height={280}
          width={260}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2,
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#F6F9FB',
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          gap: 15,
        }}
      >
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt='avatar'
            height={100}
            width={100}
            onLoad={(e) => {
              setTimeout(() => {
                if (e.currentTarget.loading) {
                  const element = document.createElement('div')
                  element.style.width = '100px'
                  element.style.height = '100px'
                  element.style.borderRadius = '50px'
                  element.style.background = 'linear-gradient(135deg, #FFE067 0%, #D3EAF4 100%)'
                  element.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
                  e.currentTarget.parentElement?.appendChild(element)

                  e.currentTarget.remove()
                }
              }, 1000)
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          />
        ) : (
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              background: 'linear-gradient(135deg, #FFE067 0%, #D3EAF4 100%)',
            }}
          />
        )}
        {/* <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            background: 'linear-gradient(135deg, #FFE067 0%, #D3EAF4 100%)',
          }}
        /> */}

        {/* Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 400,
              padding: 0,
              margin: 0,
              maxWidth: '250px',
              color: '#333333',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: 'sans-serif, serif',
            }}
          >
            {displayName}
          </p>
        </div>
      </div>
    </div>
  )
}
