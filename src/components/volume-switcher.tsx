import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import { useSounds, type VolumeType } from '#/contexts/sounds-context'
import Check from 'public/assets/icons/ui/check.svg'
import VolumeUp from 'public/assets/icons/ui/volume-up.svg'
import ArrowLeft from 'public/assets/icons/ui/arrow-left.svg'
import VolumeMute from 'public/assets/icons/ui/volume-mute.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'

type VolumeOption = {
  label: VolumeType
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  muteBackgroundMusic: boolean
  muteActionsSounds: boolean
}

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
] satisfies VolumeOption[]

interface VolumeSwitcherProps {
  closeMenu?: () => void
  setExternalVolumeMenuOpen?: (open: boolean) => void
}

const VolumeSwitcher: React.FC<VolumeSwitcherProps> = ({ closeMenu, setExternalVolumeMenuOpen }) => {
  const { selectedVolume, setSelectedVolume } = useSounds()
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
          <p className='font-bold capitalize'>{t(selectedVolume)}</p>
        </div>
        <ArrowRight />
      </div>
      <div
        className={cn(
          'absolute -top-[113px] -right-full z-50 block w-full transition-all transition-discrete group-hover:block sm:top-0 sm:left-full sm:w-fit sm:pl-2 sm:transition-normal',
          volumeMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className='bg-neutral shadow-medium flex h-screen max-h-[80vh] w-full flex-col gap-2 rounded-sm sm:h-auto sm:w-56'>
          <div
            onClick={() => {
              setVolumeMenuOpen(false)
              setExternalVolumeMenuOpen?.(false)
            }}
            className='hover:bg-nav-item flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity lg:hidden'
          >
            <ArrowLeft className='text-xl' />
            <p className='font-bold'>{t('back')}</p>
          </div>
          {volumeOptions.map((option) => (
            <div
              className='hover:bg-nav-item relative flex w-full items-center gap-2 rounded-sm p-4 pl-8'
              key={option.label}
              onClick={() => {
                setSelectedVolume(option.label)
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
