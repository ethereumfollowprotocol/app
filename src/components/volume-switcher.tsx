import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { RiVolumeDownFill, RiVolumeMuteFill } from 'react-icons/ri'

import { cn } from '#/lib/utilities'
import { useSounds } from '#/contexts/sounds-context'
import Check from 'public/assets/icons/ui/check.svg'

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
    <div ref={clickAwayVolumeRef} className='group relative w-full cursor-pointer'>
      <div
        onClick={() => {
          setVolumeMenuOpen(!volumeMenuOpen)
          setExternalVolumeMenuOpen?.(!volumeMenuOpen)
        }}
        className={cn(
          'flex cursor-pointer items-center justify-between rounded-md transition-opacity',
          'group-hover:bg-navItem w-full p-3'
        )}
      >
        <FiArrowLeft className='text-xl' />
        <div className='flex items-center justify-end gap-2'>
          <p className='text-2xl'>{volumeOptions.find(({ label }) => label === selectedVolume)?.icon}</p>
          <p className='font-bold capitalize'>{t(selectedVolume || 'system')}</p>
        </div>
      </div>
      <div
        className={cn(
          'absolute -top-[106px] -right-[251px] z-50 block h-[192px] min-w-[246px] group-hover:block lg:-top-[7px] lg:left-[97.2%] lg:h-[118px] lg:pr-5',
          volumeMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className='bg-neutral border-grey flex h-full w-full flex-col gap-2 rounded-sm border-[3px] p-1 shadow-md'>
          <div
            onClick={() => {
              setVolumeMenuOpen(false)
              setExternalVolumeMenuOpen?.(false)
            }}
            className='hover:bg-navItem flex w-full cursor-pointer items-center justify-between rounded-md p-3 transition-opacity lg:hidden'
          >
            <FiArrowLeft className='text-xl' />
            <p className='font-bold'>Back</p>
          </div>
          {volumeOptions.map(({ label, icon, muteBackgroundMusic, muteActionsSounds }) => (
            <div
              className='hover:bg-navItem relative flex w-full items-center gap-2 rounded-md p-3 pl-8'
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
              {selectedVolume === label && <Check className='absolute top-[19px] left-2' />}
              <p className='text-2xl'>{icon}</p>
              <p className='font-bold text-nowrap capitalize'>{t(label)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VolumeSwitcher
