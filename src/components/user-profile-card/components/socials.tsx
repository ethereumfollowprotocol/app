import { profileCardSocials } from '#/lib/constants'
import type { ProfileDetailsResponse } from '#/types/requests'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'

interface SocialsProps {
  profile: ProfileDetailsResponse
}

const Socials: React.FC<SocialsProps> = ({ profile }) => {
  const { resolvedTheme } = useTheme()

  return (
    <div className='flex items-center gap-2'>
      {profileCardSocials.map((social) => (
        <a
          key={social.name}
          href={social.url(social.name === 'etherscan' ? profile.address : profile.ens?.records?.[social.name] || '')}
          target='_blank'
          rel='noreferrer'
          className={
            profile.ens?.records?.[social.name] || social.name === 'etherscan'
              ? 'opacity-100 transition-all hover:scale-110 hover:opacity-80'
              : 'pointer-events-none opacity-30'
          }
        >
          <Image
            src={social.icon(resolvedTheme || '')}
            alt={social.name}
            width={52}
            height={52}
            className='h-auto w-8 rounded-full 2xl:w-10'
          />
        </a>
      ))}
    </div>
  )
}

export default Socials
