import React from 'react'
import type { ProfileDetailsResponse } from '#/types/requests'
import DwebIcon from 'public/assets/icons/socials/dweb.svg'
import Link from 'public/assets/icons/ui/link.svg'
interface LinksProps {
  profile: ProfileDetailsResponse
}

const Links: React.FC<LinksProps> = ({ profile }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      {profile.ens.records?.url && (
        <a
          href={`https://${profile.ens.records.url.replace('https://', '').replace('http://', '')}`}
          target='_blank'
          rel='noreferrer'
          className='mb-1 flex max-w-48 items-center gap-1 rounded-sm bg-zinc-100 px-2 py-0.5 text-sm transition-all hover:scale-110'
        >
          <p className='halloween:text-blue-400 max-w-[90%] truncate font-semibold text-blue-600 dark:text-blue-400'>
            {profile.ens.records?.url.slice(-1) === '/'
              ? profile.ens.records?.url.replace('https://', '').slice(0, -1)
              : profile.ens.records?.url.replace('https://', '')}
          </p>
          <Link className='h-auto w-4' />
        </a>
      )}
      {(profile.ens.contenthash || profile.ens.records?.contenthash) && (
        <a
          href={`https://${profile.ens.name}.limo`}
          target='_blank'
          rel='noreferrer'
          className='mb-1 flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 pr-0.5 text-sm transition-all hover:scale-110'
        >
          <p className='halloween:text-blue-400 font-semibold text-blue-600 dark:text-blue-400'>dweb</p>
          <DwebIcon className='rounded-full' />
        </a>
      )}
    </div>
  )
}

export default Links
