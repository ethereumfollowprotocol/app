import React from 'react'
import type { ProfileDetailsResponse } from '#/types/requests'
import Image from 'next/image'
import { FaLink } from 'react-icons/fa'

interface LinksProps {
  profile: ProfileDetailsResponse
}

const Links: React.FC<LinksProps> = ({ profile }) => {
  return (
    <div className='w-full flex justify-center gap-2 flex-wrap items-center'>
      {profile.ens.records?.url && (
        <a
          href={`https://${profile.ens.records.url.replace('https://', '').replace('http://', '')}`}
          target='_blank'
          rel='noreferrer'
          className='flex max-w-48 items-center text-sm gap-1 mb-1 bg-grey rounded-full py-0.5 px-2 hover:scale-110 transition-all'
        >
          <p className='dark:text-blue-400 halloween:text-blue-400 text-blue-600 max-w-[90%] truncate font-semibold'>
            {profile.ens.records?.url.slice(-1) === '/'
              ? profile.ens.records?.url.replace('https://', '').slice(0, -1)
              : profile.ens.records?.url.replace('https://', '')}
          </p>
          <FaLink />
        </a>
      )}
      {(profile.ens.contenthash || profile.ens.records?.contenthash) && (
        <a
          href={`https://${profile.ens.name}.limo`}
          target='_blank'
          rel='noreferrer'
          className='flex items-center text-sm gap-1 mb-1 bg-grey rounded-full py-0.5 px-2 pr-0.5 hover:scale-110 transition-all'
        >
          <p className='dark:text-blue-400 halloween:text-blue-400 text-blue-600 font-semibold'>
            dweb
          </p>
          <Image
            src='/assets/icons/dweb.svg'
            alt='dweb'
            width={20}
            height={20}
            className='rounded-full'
          />
        </a>
      )}
    </div>
  )
}

export default Links
