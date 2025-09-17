import type { NextRequest } from 'next/server'
import { isAddress } from 'viem'
import puppeteer from 'puppeteer'

import { truncateAddress } from '#/lib/utilities'
import { ens_beautify } from '@adraffy/ens-normalize'
import type { TopEightProfileType } from '#/components/top-eight/hooks/use-top-eight'
import { isLinkValid } from 'ethereum-identity-kit/utils'
import { fetchAccount } from '#/api/fetch-account'

function generateHTML(userName: string, userAvatar: string | undefined, profiles: TopEightProfileType[]) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      width: 1200px;
      height: 900px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    .user-avatar {
      width: 70px;
      height: 70px;
      border-radius: 35px;
    }
    .title {
      font-size: 48px;
      color: #333333;
      font-weight: 400;
    }
    .title-bold {
      font-weight: 700;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: linear-gradient(135deg, #FFE067 0%, #FFF7D9 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 20px;
    }
    .brand-text {
      font-size: 24px;
      color: #666666;
    }
    .profiles-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 1100px;
      height: 580px;
    }
    .profiles-row {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    .profile-card {
      display: flex;
      flex-direction: column;
      width: 260px;
      height: 280px;
      background: #f8f9fa;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .profile-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.2;
      object-fit: cover;
    }
    .profile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;
      z-index: 10;
      gap: 15px;
    }
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .profile-avatar-fallback {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background: linear-gradient(135deg, #FFE067 0%, #D3EAF4 100%);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .profile-name {
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      text-align: center;
      max-width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
    }
    .follow-btn {
      background: #FFE067;
      border-radius: 10px;
      padding: 10px 32px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .footer {
      display: flex;
      align-items: center;
      margin-top: 40px;
      gap: 10px;
    }
    .footer-text {
      font-size: 18px;
      color: #666666;
    }
    .footer-brand {
      font-size: 20px;
      color: #333333;
      font-weight: 700;
    }
    .image-timeout {
      max-width: 100%;
      max-height: 100%;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="user-info">
      ${userAvatar ? `<img src="${userAvatar}" class="user-avatar image-timeout" />` : ''}
      <h1 class="title">${userName}'s <span class="title-bold">Top 8</span></h1>
    </div>
    <div class="brand">
      <div class="brand-icon">EFP</div>
      <span class="brand-text">Ethereum Follow Protocol</span>
    </div>
  </div>

  <div class="profiles-grid">
    <div class="profiles-row">
      ${profiles
        .slice(0, 4)
        .map((profile) => {
          const name = profile?.ens?.name
          const avatar = isLinkValid(profile?.ens?.avatar) ? profile?.ens?.avatar : undefined
          const header = isLinkValid(profile?.ens?.records?.header) ? profile?.ens?.records?.header : undefined
          const displayName = name ? ens_beautify(name) : truncateAddress(profile.address)

          return `
          <div class="profile-card">
            ${header ? `<img src="${header}" class="profile-header header-timeout" />` : ''}
            <div class="profile-content">
              ${
                avatar
                  ? `<img src="${avatar}" class="profile-avatar avatar-timeout" />`
                  : `<div class="profile-avatar-fallback"></div>`
              }
              <p class="profile-name">${displayName}</p>
              <div class="follow-btn">Follow</div>
            </div>
          </div>
        `
        })
        .join('')}
    </div>

    ${
      profiles.length > 4
        ? `
    <div class="profiles-row">
      ${profiles
        .slice(4, 8)
        .map((profile) => {
          const name = profile?.ens?.name
          const avatar = isLinkValid(profile?.ens?.avatar) ? profile?.ens?.avatar : undefined
          const header = isLinkValid(profile?.ens?.records?.header) ? profile?.ens?.records?.header : undefined
          const displayName = name ? ens_beautify(name) : truncateAddress(profile.address)

          return `
          <div class="profile-card">
            ${header ? `<img src="${header}" class="profile-header header-timeout" />` : ''}
            <div class="profile-content">
                  ${
                    avatar
                      ? `<img src="${avatar}" class="profile-avatar avatar-timeout" />`
                      : `<div class="profile-avatar-fallback"></div>`
                  }
                <p class="profile-name">${displayName}</p>
              <div class="follow-btn">Follow</div>
            </div>
          </div>
        `
        })
        .join('')}
    </div>
    `
        : ''
    }
  </div>

  <div class="footer">
    <span class="footer-text">Share your Top 8 at</span>
    <span class="footer-brand">efp.app</span>
  </div>

  <script>
    // Set timeout for all avatars
    document.querySelectorAll('.avatar-timeout').forEach(img => {
      const timeout = setTimeout(() => {
        if (!img.complete) {
          img.style.background = 'linear-gradient(135deg, #FFE067 0%, #D3EAF4 100%)';
        }
      }, 1000);

      img.onload = () => clearTimeout(timeout);
      img.onerror = () => {
        clearTimeout(timeout);
        img.style.display = 'none';
      };
    });

    // Set timeout for all headers
    document.querySelectorAll('.header-timeout').forEach(img => {
      const timeout = setTimeout(() => {
        if (!img.complete) {
          img.style.background = '#EFF9FD';
        }
      }, 1000);

      img.onload = () => clearTimeout(timeout);
      img.onerror = () => {
        clearTimeout(timeout);
        img.style.display = 'none';
      };
    });
  </script>
</body>
</html>`
}

export async function GET(req: NextRequest) {
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

    // Generate HTML for Puppeteer
    const html = generateHTML(userName, userAvatar, profiles)

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })

    const page = await browser.newPage()

    // Set viewport to match our image dimensions
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 })

    // Set content and wait for network to be idle (with timeout)
    await page.setContent(html, {
      waitUntil: ['domcontentloaded', 'networkidle2'],
      timeout: 5000, // 5 second timeout for entire page load
    })

    // Wait an additional 1 second for image timeouts to trigger
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 900 },
    })

    await browser.close()

    const response = new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
      },
    })

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
