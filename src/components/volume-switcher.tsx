import Image from 'next/image'
import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { RiVolumeDownFill, RiVolumeMuteFill } from 'react-icons/ri'

import { cn } from '#/lib/utilities'
import { useSounds } from '#/contexts/sounds-context'
import GreenCheck from 'public/assets/icons/check-green.svg'

export const volumeOptions = [
  // {
  //   label: 'sfx & music',
  //   icon: <RiVolumeUpFill />,
  //   muteBackgroundMusic: false,
  //   muteActionsSounds: false
  // },
  {
    label: 'sfx',
    icon: <RiVolumeDownFill />,
    muteBackgroundMusic: true,
    muteActionsSounds: false,
  },
  {
    label: 'no sounds',
    icon: <RiVolumeMuteFill />,
    muteBackgroundMusic: true,
    muteActionsSounds: true,
  },
]

interface VolumeSwitcherProps {
  closeMenu?: () => void
  setExternalVolumeMenuOpen?: (open: boolean) => void
}

const VolumeSwitcher: React.FC<VolumeSwitcherProps> = ({ closeMenu, setExternalVolumeMenuOpen }) => {
  const { setActionsSoundsMuted, setBackgroundSoundsMuted, selectedVolume, setSelectedVolume } = useSounds()
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false)

  const clickAwayVolumeRef = useClickAway<HTMLDivElement>(() => {
    setVolumeMenuOpen(false)
    setExternalVolumeMenuOpen?.(false)
  })

  const { t } = useTranslation()

  return (
    <div ref={clickAwayVolumeRef} className='cursor-pointer group relative w-full'>
      <div
        onClick={() => {
          setVolumeMenuOpen(!volumeMenuOpen)
          setExternalVolumeMenuOpen?.(!volumeMenuOpen)
        }}
        className={cn(
          'flex justify-between items-center rounded-md transition-opacity cursor-pointer',
          'group-hover:bg-navItem p-3 w-full'
        )}
      >
        <FiArrowLeft className='text-xl' />
        <div className='flex items-center justify-end gap-2'>
          <p className='text-2xl'>{volumeOptions.find(({ label }) => label === selectedVolume)?.icon}</p>
          <p className='capitalize font-bold'>{t(selectedVolume || 'system')}</p>
        </div>
      </div>
      <div
        className={cn(
          'absolute group-hover:block block h-[192px] lg:h-[118px] z-50 -right-[251px] lg:right-[97.2%] min-w-[246px] -top-[106px] lg:-top-[7px] lg:pr-5',
          volumeMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className='flex flex-col p-1 gap-2 w-full h-full border-[3px] rounded-lg bg-neutral border-grey shadow-md'>
          <div
            onClick={() => {
              setVolumeMenuOpen(false)
              setExternalVolumeMenuOpen?.(false)
            }}
            className='flex lg:hidden justify-between items-center w-full hover:bg-navItem p-3 rounded-md transition-opacity cursor-pointer'
          >
            <FiArrowLeft className='text-xl' />
            <p className='font-bold'>Back</p>
          </div>
          {volumeOptions.map(({ label, icon, muteBackgroundMusic, muteActionsSounds }) => (
            <div
              className='flex items-center relative p-3 pl-8 w-full gap-2 rounded-md hover:bg-navItem'
              key={label}
              onClick={() => {
                setSelectedVolume(label)
                setBackgroundSoundsMuted(muteBackgroundMusic)
                setActionsSoundsMuted(muteActionsSounds)
                setVolumeMenuOpen(false)
                setExternalVolumeMenuOpen?.(false)
                closeMenu?.()
              }}
            >
              {selectedVolume === label && (
                <Image src={GreenCheck} alt='List selected' width={16} className='absolute left-2 top-[19px]' />
              )}
              <p className='text-2xl'>{icon}</p>
              <p className='text-nowrap capitalize font-bold'>{t(label)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VolumeSwitcher
