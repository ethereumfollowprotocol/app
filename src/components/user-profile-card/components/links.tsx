import React from 'react'
import type { ProfileDetailsResponse } from '#/types/requests'
import { FaLink } from 'react-icons/fa'
import DwebIcon from 'public/assets/icons/dweb.svg'

interface LinksProps {
  profile: ProfileDetailsResponse
}

const Links: React.FC<LinksProps> = ({ profile }) => {
  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-2'>
      {profile.ens.records?.url && (
        <a
          href={`https://${profile.ens.records.url.replace('https://', '').replace('http://', '')}`}
          target='_blank'
          rel='noreferrer'
          className='bg-grey mb-1 flex max-w-48 items-center gap-1 rounded-full px-2 py-0.5 text-sm transition-all hover:scale-110'
        >
          <p className='halloween:text-blue-400 max-w-[90%] truncate font-semibold text-blue-600 dark:text-blue-400'>
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
          className='bg-grey mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 pr-0.5 text-sm transition-all hover:scale-110'
        >
          <p className='halloween:text-blue-400 font-semibold text-blue-600 dark:text-blue-400'>dweb</p>
          <DwebIcon className='rounded-full' />
        </a>
      )}
    </div>
  )
}

export default Links
