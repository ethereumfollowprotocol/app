import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { isAddress } from 'viem'

import { truncateAddress } from '#/lib/utilities'
import { ens_beautify } from '@adraffy/ens-normalize'
import type { TopEightProfileType } from '#/components/top-eight/hooks/use-top-eight'
import { isLinkValid } from 'ethereum-identity-kit/utils'
import { fetchAccount } from '#/api/fetch-account'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Cache fonts globally to avoid re-reading on each request
let cachedFonts: { interSemiBold: Buffer; interBold: Buffer } | null = null

async function getFonts() {
  if (!cachedFonts) {
    const [interSemiBold, interBold] = await Promise.all([
      readFile(join(process.cwd(), '/public/fonts/Inter/Inter-SemiBold.ttf')),
      readFile(join(process.cwd(), '/public/fonts/Inter/Inter-Black.ttf')),
    ])
    cachedFonts = { interSemiBold, interBold }
  }
  return cachedFonts
}

// Default images as data URLs for instant loading
const DEFAULT_AVATAR = 'https://efp.app/assets/art/default-avatar.svg'
const DEFAULT_HEADER = 'https://efp.app/assets/art/default-header.svg'

// Process profile data in parallel for better performance
function processProfileData(profiles: TopEightProfileType[]) {
  return profiles.map((profile) => {
    const name = profile?.ens?.name
    const displayName = name ? ens_beautify(name) : truncateAddress(profile.address) || profile.address

    // Use ENS avatar/header only if they are valid URLs, otherwise use data URL defaults
    const avatar = profile?.ens?.avatar && isLinkValid(profile?.ens?.avatar) ? profile.ens.avatar : DEFAULT_AVATAR
    const header =
      profile?.ens?.records?.header && isLinkValid(profile?.ens?.records?.header)
        ? profile.ens.records.header
        : DEFAULT_HEADER

    return {
      avatar,
      header,
      displayName,
      address: profile.address as string,
    }
  })
}

export async function GET(req: NextRequest) {
  const { interSemiBold, interBold } = await getFonts()

  try {
    const { searchParams } = new URL(req.url)
    const user = searchParams.get('user')

    if (!user) {
      return new Response('user parameter is required', { status: 400 })
    }

    // Fetch user account data and profiles data in parallel
    let userName: string = 'Unknown'
    let userAvatar: string | undefined
    let profiles: TopEightProfileType[] = []

    try {
      const [userAccountData, fetchedTopEight] = await Promise.all([
        fetchAccount(user),
        fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${user}/following?include=ens&offset=0&limit=8&tags=top8`),
      ])

      // Process user account data
      if (userAccountData?.ens?.name) {
        userName = userAccountData.ens.name
      } else if (isAddress(user)) {
        userName = truncateAddress(user) || user
      } else {
        userName = user
      }
      userAvatar = userAccountData?.ens?.avatar

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

    // Pre-process all profile data
    const processedProfiles = processProfileData(profiles)

    return new ImageResponse(
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
            }}
          >
            {/* Top Row */}
            <div
              style={{
                display: 'flex',
                gap: 16,
              }}
            >
              {processedProfiles.slice(0, 4).map((profile, index) => (
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
              {processedProfiles.slice(4, 8).map((profile, index) => (
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

function ProfileCard({
  profile,
}: {
  profile: { avatar: string; header: string; displayName: string; address: string }
}) {
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
      <img
        src={profile.header}
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

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          zIndex: '10',
          gap: 15,
        }}
      >
        {/* Avatar */}
        <img
          src={profile.avatar}
          alt='avatar'
          height={100}
          width={100}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        />

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
            {profile.displayName}
          </p>
        </div>

        {/* Follow Button */}
        <svg width='125' height='44' viewBox='0 0 125 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect x='0.5' y='0.5' width='124' height='42.2243' stroke='url(#paint0_radial_2827_6596)' />
          <rect x='0.5' y='0.5' width='124' height='42.2243' stroke='url(#paint1_radial_2827_6596)' />
          <rect width='125' height='43.2243' rx='10' fill='#FFE067' />
          <path
            d='M54.6804 15.3076V26.6826H52.3367V15.3076H54.6804ZM59.2117 20.167V21.9951H54.0398V20.167H59.2117ZM59.7586 15.3076V17.1436H54.0398V15.3076H59.7586ZM60.4461 22.542V22.3779C60.4461 21.7581 60.5346 21.1878 60.7117 20.667C60.8888 20.141 61.1466 19.6852 61.4851 19.2998C61.8237 18.9144 62.2403 18.6149 62.7351 18.4014C63.2299 18.1826 63.7976 18.0732 64.4382 18.0732C65.0789 18.0732 65.6492 18.1826 66.1492 18.4014C66.6492 18.6149 67.0684 18.9144 67.407 19.2998C67.7507 19.6852 68.0112 20.141 68.1882 20.667C68.3653 21.1878 68.4539 21.7581 68.4539 22.3779V22.542C68.4539 23.1566 68.3653 23.7269 68.1882 24.2529C68.0112 24.7738 67.7507 25.2295 67.407 25.6201C67.0684 26.0055 66.6518 26.305 66.157 26.5186C65.6622 26.7321 65.0945 26.8389 64.4539 26.8389C63.8132 26.8389 63.2429 26.7321 62.7429 26.5186C62.2481 26.305 61.8289 26.0055 61.4851 25.6201C61.1466 25.2295 60.8888 24.7738 60.7117 24.2529C60.5346 23.7269 60.4461 23.1566 60.4461 22.542ZM62.6961 22.3779V22.542C62.6961 22.8962 62.7273 23.2269 62.7898 23.5342C62.8523 23.8415 62.9513 24.1123 63.0867 24.3467C63.2273 24.5758 63.4096 24.7555 63.6336 24.8857C63.8575 25.016 64.1309 25.0811 64.4539 25.0811C64.7664 25.0811 65.0346 25.016 65.2586 24.8857C65.4825 24.7555 65.6622 24.5758 65.7976 24.3467C65.933 24.1123 66.032 23.8415 66.0945 23.5342C66.1622 23.2269 66.1961 22.8962 66.1961 22.542V22.3779C66.1961 22.0342 66.1622 21.7113 66.0945 21.4092C66.032 21.1019 65.9304 20.8311 65.7898 20.5967C65.6544 20.3571 65.4747 20.1696 65.2507 20.0342C65.0268 19.8988 64.7559 19.8311 64.4382 19.8311C64.1205 19.8311 63.8497 19.8988 63.6257 20.0342C63.407 20.1696 63.2273 20.3571 63.0867 20.5967C62.9513 20.8311 62.8523 21.1019 62.7898 21.4092C62.7273 21.7113 62.6961 22.0342 62.6961 22.3779ZM72.2117 14.6826V26.6826H69.9539V14.6826H72.2117ZM76.4461 14.6826V26.6826H74.1882V14.6826H76.4461ZM77.9461 22.542V22.3779C77.9461 21.7581 78.0346 21.1878 78.2117 20.667C78.3888 20.141 78.6466 19.6852 78.9851 19.2998C79.3237 18.9144 79.7403 18.6149 80.2351 18.4014C80.7299 18.1826 81.2976 18.0732 81.9382 18.0732C82.5789 18.0732 83.1492 18.1826 83.6492 18.4014C84.1492 18.6149 84.5684 18.9144 84.907 19.2998C85.2507 19.6852 85.5112 20.141 85.6882 20.667C85.8653 21.1878 85.9539 21.7581 85.9539 22.3779V22.542C85.9539 23.1566 85.8653 23.7269 85.6882 24.2529C85.5112 24.7738 85.2507 25.2295 84.907 25.6201C84.5684 26.0055 84.1518 26.305 83.657 26.5186C83.1622 26.7321 82.5945 26.8389 81.9539 26.8389C81.3132 26.8389 80.7429 26.7321 80.2429 26.5186C79.7481 26.305 79.3289 26.0055 78.9851 25.6201C78.6466 25.2295 78.3888 24.7738 78.2117 24.2529C78.0346 23.7269 77.9461 23.1566 77.9461 22.542ZM80.1961 22.3779V22.542C80.1961 22.8962 80.2273 23.2269 80.2898 23.5342C80.3523 23.8415 80.4513 24.1123 80.5867 24.3467C80.7273 24.5758 80.9096 24.7555 81.1336 24.8857C81.3575 25.016 81.6309 25.0811 81.9539 25.0811C82.2664 25.0811 82.5346 25.016 82.7586 24.8857C82.9825 24.7555 83.1622 24.5758 83.2976 24.3467C83.433 24.1123 83.532 23.8415 83.5945 23.5342C83.6622 23.2269 83.6961 22.8962 83.6961 22.542V22.3779C83.6961 22.0342 83.6622 21.7113 83.5945 21.4092C83.532 21.1019 83.4304 20.8311 83.2898 20.5967C83.1544 20.3571 82.9747 20.1696 82.7507 20.0342C82.5268 19.8988 82.2559 19.8311 81.9382 19.8311C81.6205 19.8311 81.3497 19.8988 81.1257 20.0342C80.907 20.1696 80.7273 20.3571 80.5867 20.5967C80.4513 20.8311 80.3523 21.1019 80.2898 21.4092C80.2273 21.7113 80.1961 22.0342 80.1961 22.3779ZM89.7507 24.4951L91.5086 18.2295H92.9382L92.4773 20.6904L90.7195 26.6826H89.5242L89.7507 24.4951ZM88.8601 18.2295L90.1179 24.4873L90.2351 26.6826H88.8289L86.6882 18.2295H88.8601ZM94.5476 24.3857L95.7742 18.2295H97.9539L95.8132 26.6826H94.4148L94.5476 24.3857ZM93.1336 18.2295L94.8836 24.4482L95.1257 26.6826H93.9226L92.1648 20.6982L91.7195 18.2295H93.1336Z'
            fill='#333333'
          />
          <path d='M24.5327 20.9182L30.7845 10.5137L36.9907 20.9182L30.7845 24.7058L24.5327 20.9182Z' fill='#333333' />
          <path d='M30.7845 25.8466L24.5327 22.059L30.7845 30.8663L36.9907 22.059L30.7845 25.8466Z' fill='#333333' />
          <path
            d='M38.7704 26.8506H36.9907V29.4973H34.5265V31.1401H36.9907V33.8782H38.7704V31.1401H41.189V29.4973H38.7704V26.8506Z'
            fill='#333333'
          />
          <defs>
            <radialGradient
              id='paint0_radial_2827_6596'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(-17.1936 -5.34445) rotate(29.753) scale(79.9929 172.743)'
            >
              <stop stop-color='#FAFAFA' stop-opacity='0.5' />
              <stop offset='1' stop-color='#F6F6F6' stop-opacity='0' />
            </radialGradient>
            <radialGradient
              id='paint1_radial_2827_6596'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(135.349 48.6625) rotate(-159.538) scale(104.913 125.981)'
            >
              <stop stop-opacity='0.05' />
              <stop offset='0.545' stop-color='#DDDDDD' stop-opacity='0' />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
