import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import { useSounds } from '#/contexts/sounds-context'
import Check from 'public/assets/icons/ui/check.svg'
import VolumeUp from 'public/assets/icons/ui/volume-up.svg'
import ArrowLeft from 'public/assets/icons/ui/arrow-left.svg'
import VolumeMute from 'public/assets/icons/ui/volume-mute.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'

export const volumeOptions = [
  // {
  //   label: 'sfx & music',
  //   icon: <RiVolumeUpFill />,
  //   muteBackgroundMusic: false,
  //   muteActionsSounds: false
  // },
  {
    label: 'sfx',
    icon: VolumeUp,
    muteBackgroundMusic: true,
    muteActionsSounds: false,
  },
  {
    label: 'no sounds',
    icon: VolumeMute,
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
  const selectedVolumeOption = volumeOptions.find(({ label }) => label === selectedVolume)

  return (
    <div ref={clickAwayVolumeRef} className='group relative w-full cursor-pointer'>
      <div
        onClick={() => {
          setVolumeMenuOpen(!volumeMenuOpen)
          setExternalVolumeMenuOpen?.(!volumeMenuOpen)
        }}
        className={cn(
          'flex cursor-pointer items-center justify-between rounded-sm transition-opacity',
          'group-hover:bg-nav-item w-full p-4'
        )}
      >
        <div className='flex items-center justify-end gap-2'>
          {selectedVolumeOption && <selectedVolumeOption.icon className='h-6 w-6' />}
          <p className='font-bold capitalize'>{t(selectedVolume || 'system')}</p>
        </div>
        <ArrowRight />
      </div>
      <div
        className={cn(
          'absolute top-0 -right-full z-50 block h-full transition-transform group-hover:block sm:left-full sm:w-fit sm:pl-2',
          volumeMenuOpen ? 'sm:block' : 'sm:hidden'
        )}
      >
        <div className='bg-neutral flex h-fit max-h-[80vh] w-56 flex-col gap-2 rounded-sm shadow-md'>
          <div
            onClick={() => {
              setVolumeMenuOpen(false)
              setExternalVolumeMenuOpen?.(false)
            }}
            className='hover:bg-nav-item flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity lg:hidden'
          >
            <ArrowLeft className='text-xl' />
            <p className='font-bold'>Back</p>
          </div>
          {volumeOptions.map((option) => (
            <div
              className='hover:bg-nav-item relative flex w-full items-center gap-2 rounded-sm p-4 pl-8'
              key={option.label}
              onClick={() => {
                setSelectedVolume(option.label)
                setBackgroundSoundsMuted(option.muteBackgroundMusic)
                setActionsSoundsMuted(option.muteActionsSounds)
                setVolumeMenuOpen(false)
                setExternalVolumeMenuOpen?.(false)
                closeMenu?.()
              }}
            >
              {selectedVolume === option.label && <Check className='absolute top-5 left-2.5 h-4 w-4 text-green-500' />}
              <option.icon className='h-6 w-6' />
              <p className='font-bold text-nowrap capitalize'>{t(option.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VolumeSwitcher
