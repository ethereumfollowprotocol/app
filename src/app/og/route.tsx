// @ts-nocheck
import { isAddress } from 'viem'
import { ImageResponse } from 'next/og'
import { truncateAddress } from '#/lib/utilities'
import type { AccountResponseType } from '#/types/common'

export async function GET(req) {
  const user = req.url.split('user=')[1]
  const isList = !(isAddress(user) || user.includes('.') || Number.isNaN(Number(user)))

  const response = (await fetch(
    `${process.env.NEXT_PUBLIC_EFP_API_URL}/${isList ? 'lists' : 'users'}/${user}/account`
  ).then(res => res.json())) as AccountResponseType

  const fetchedUser = response.address
    ? response.ens.name || truncateAddress(response.address)
    : isAddress(user)
      ? truncateAddress(user)
      : user
  const fetchedAvatar = response.ens?.avatar

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: 58,
        color: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundImage: 'linear-gradient(to bottom, #fffcc0, #ffddf1)',
        textAlign: 'center',
        fontWeight: 700
      }}
    >
      <div
        className='glass-card'
        style={{
          display: isList && response.primary_list !== user ? 'none' : 'flex',
          minWidth: 274,
          maxWidth: 340,
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px solid #FFDBD9',
          borderRadius: 16,
          padding: 32,
          background:
            'linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6))'
        }}
      >
        <img
          alt='avatar'
          width='100'
          height='100'
          src={`${fetchedAvatar || 'https://ethfollow.xyz/assets/gradient-circle.svg'}`}
          style={{
            borderRadius: 50,
            margin: 0
          }}
        />
        <p
          style={{
            maxWidth: 310,
            textShadow: '1px 0 1px #333333',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: 30,
            paddingBottom: 8
          }}
        >
          {fetchedUser}
        </p>
        <svg
          width='125'
          height='44'
          viewBox='0 0 125 44'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='0.5'
            y='0.5'
            width='124'
            height='42.2243'
            stroke='url(#paint0_radial_2827_6596)'
          />
          <rect
            x='0.5'
            y='0.5'
            width='124'
            height='42.2243'
            stroke='url(#paint1_radial_2827_6596)'
          />
          <rect width='125' height='43.2243' rx='10' fill='#FFE067' />
          <path
            d='M54.6804 15.3076V26.6826H52.3367V15.3076H54.6804ZM59.2117 20.167V21.9951H54.0398V20.167H59.2117ZM59.7586 15.3076V17.1436H54.0398V15.3076H59.7586ZM60.4461 22.542V22.3779C60.4461 21.7581 60.5346 21.1878 60.7117 20.667C60.8888 20.141 61.1466 19.6852 61.4851 19.2998C61.8237 18.9144 62.2403 18.6149 62.7351 18.4014C63.2299 18.1826 63.7976 18.0732 64.4382 18.0732C65.0789 18.0732 65.6492 18.1826 66.1492 18.4014C66.6492 18.6149 67.0684 18.9144 67.407 19.2998C67.7507 19.6852 68.0112 20.141 68.1882 20.667C68.3653 21.1878 68.4539 21.7581 68.4539 22.3779V22.542C68.4539 23.1566 68.3653 23.7269 68.1882 24.2529C68.0112 24.7738 67.7507 25.2295 67.407 25.6201C67.0684 26.0055 66.6518 26.305 66.157 26.5186C65.6622 26.7321 65.0945 26.8389 64.4539 26.8389C63.8132 26.8389 63.2429 26.7321 62.7429 26.5186C62.2481 26.305 61.8289 26.0055 61.4851 25.6201C61.1466 25.2295 60.8888 24.7738 60.7117 24.2529C60.5346 23.7269 60.4461 23.1566 60.4461 22.542ZM62.6961 22.3779V22.542C62.6961 22.8962 62.7273 23.2269 62.7898 23.5342C62.8523 23.8415 62.9513 24.1123 63.0867 24.3467C63.2273 24.5758 63.4096 24.7555 63.6336 24.8857C63.8575 25.016 64.1309 25.0811 64.4539 25.0811C64.7664 25.0811 65.0346 25.016 65.2586 24.8857C65.4825 24.7555 65.6622 24.5758 65.7976 24.3467C65.933 24.1123 66.032 23.8415 66.0945 23.5342C66.1622 23.2269 66.1961 22.8962 66.1961 22.542V22.3779C66.1961 22.0342 66.1622 21.7113 66.0945 21.4092C66.032 21.1019 65.9304 20.8311 65.7898 20.5967C65.6544 20.3571 65.4747 20.1696 65.2507 20.0342C65.0268 19.8988 64.7559 19.8311 64.4382 19.8311C64.1205 19.8311 63.8497 19.8988 63.6257 20.0342C63.407 20.1696 63.2273 20.3571 63.0867 20.5967C62.9513 20.8311 62.8523 21.1019 62.7898 21.4092C62.7273 21.7113 62.6961 22.0342 62.6961 22.3779ZM72.2117 14.6826V26.6826H69.9539V14.6826H72.2117ZM76.4461 14.6826V26.6826H74.1882V14.6826H76.4461ZM77.9461 22.542V22.3779C77.9461 21.7581 78.0346 21.1878 78.2117 20.667C78.3888 20.141 78.6466 19.6852 78.9851 19.2998C79.3237 18.9144 79.7403 18.6149 80.2351 18.4014C80.7299 18.1826 81.2976 18.0732 81.9382 18.0732C82.5789 18.0732 83.1492 18.1826 83.6492 18.4014C84.1492 18.6149 84.5684 18.9144 84.907 19.2998C85.2507 19.6852 85.5112 20.141 85.6882 20.667C85.8653 21.1878 85.9539 21.7581 85.9539 22.3779V22.542C85.9539 23.1566 85.8653 23.7269 85.6882 24.2529C85.5112 24.7738 85.2507 25.2295 84.907 25.6201C84.5684 26.0055 84.1518 26.305 83.657 26.5186C83.1622 26.7321 82.5945 26.8389 81.9539 26.8389C81.3132 26.8389 80.7429 26.7321 80.2429 26.5186C79.7481 26.305 79.3289 26.0055 78.9851 25.6201C78.6466 25.2295 78.3888 24.7738 78.2117 24.2529C78.0346 23.7269 77.9461 23.1566 77.9461 22.542ZM80.1961 22.3779V22.542C80.1961 22.8962 80.2273 23.2269 80.2898 23.5342C80.3523 23.8415 80.4513 24.1123 80.5867 24.3467C80.7273 24.5758 80.9096 24.7555 81.1336 24.8857C81.3575 25.016 81.6309 25.0811 81.9539 25.0811C82.2664 25.0811 82.5346 25.016 82.7586 24.8857C82.9825 24.7555 83.1622 24.5758 83.2976 24.3467C83.433 24.1123 83.532 23.8415 83.5945 23.5342C83.6622 23.2269 83.6961 22.8962 83.6961 22.542V22.3779C83.6961 22.0342 83.6622 21.7113 83.5945 21.4092C83.532 21.1019 83.4304 20.8311 83.2898 20.5967C83.1544 20.3571 82.9747 20.1696 82.7507 20.0342C82.5268 19.8988 82.2559 19.8311 81.9382 19.8311C81.6205 19.8311 81.3497 19.8988 81.1257 20.0342C80.907 20.1696 80.7273 20.3571 80.5867 20.5967C80.4513 20.8311 80.3523 21.1019 80.2898 21.4092C80.2273 21.7113 80.1961 22.0342 80.1961 22.3779ZM89.7507 24.4951L91.5086 18.2295H92.9382L92.4773 20.6904L90.7195 26.6826H89.5242L89.7507 24.4951ZM88.8601 18.2295L90.1179 24.4873L90.2351 26.6826H88.8289L86.6882 18.2295H88.8601ZM94.5476 24.3857L95.7742 18.2295H97.9539L95.8132 26.6826H94.4148L94.5476 24.3857ZM93.1336 18.2295L94.8836 24.4482L95.1257 26.6826H93.9226L92.1648 20.6982L91.7195 18.2295H93.1336Z'
            fill='#333333'
          />
          <path
            d='M24.5327 20.9182L30.7845 10.5137L36.9907 20.9182L30.7845 24.7058L24.5327 20.9182Z'
            fill='#333333'
          />
          <path
            d='M30.7845 25.8466L24.5327 22.059L30.7845 30.8663L36.9907 22.059L30.7845 25.8466Z'
            fill='#333333'
          />
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
      <p
        style={{
          display: isList && response.primary_list !== user ? 'block' : 'none',
          fontSize: 48,
          paddingLeft: 48,
          textShadow: '1px 0 1px #333333'
        }}
      >
        List #{user}
      </p>
      <div
        style={{
          height: 80,
          width: 3,
          background: '#333333',
          borderRadius: 80
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 76,
          gap: 10
        }}
      >
        <p
          style={{
            fontSize: 60,
            fontWeight: 700,
            textShadow: '1px 0 1px #333333'
          }}
        >
          Profile
        </p>
        <img alt='avatar' width='150' src='https://ethfollow.xyz/assets/logo-full.svg' />
      </div>
    </div>,
    {
      width: 800,
      height: 418
    }
  )
}
