'use client'

import { useIsClient } from '@uidotdev/usehooks'
import { useRef, useState, useContext, createContext, type Dispatch, type SetStateAction, useEffect } from 'react'

export type VolumeType = 'sfx' | 'sfx & music' | 'no sounds'

type SoundsContextType = {
  selectedVolume: VolumeType
  setSelectedVolume: Dispatch<SetStateAction<VolumeType>>
  backgroundMusicRef: React.RefObject<HTMLAudioElement | null>
}

const SoundsContext = createContext<SoundsContextType | undefined>(undefined)

export const SoundsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedVolume, setSelectedVolume] = useState<VolumeType>('sfx')
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    const storedSelectedVolume = localStorage.getItem('selectedVolume')
    if (storedSelectedVolume) {
      setSelectedVolume(storedSelectedVolume as VolumeType)
    } else {
      localStorage.removeItem('selectedVolume')
    }
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    localStorage.setItem('selectedVolume', selectedVolume)
  }, [selectedVolume])

  const backgroundMusicRef = useRef<HTMLAudioElement>(null)
  // useEffect(() => {
  //   if (backgroundMusicRef.current) {
  //     backgroundMusicRef.current.volume = 0.3
  //     if (backgroundSoundsMuted) backgroundMusicRef.current.pause()
  //     else backgroundMusicRef.current.play()
  //   }
  // }, [backgroundSoundsMuted])

  // const { resolvedTheme } = useTheme();
  // useEffect(() => {
  //   if (typeof window === "undefined" || !navigator.userActivation.isActive) return;

  //   setActionsSoundsMuted(false);
  //   if (resolvedTheme === "halloween") {
  //     setBackgroundSoundsMuted(false);
  //     setSelectedVolume("sfx & music");
  //     backgroundMusicRef.current?.play();
  //     if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0.3;
  //   } else {
  //     setBackgroundSoundsMuted(true);
  //     setSelectedVolume("sfx only");
  //     backgroundMusicRef.current?.pause();
  //   }
  // }, [resolvedTheme]);

  return (
    <SoundsContext.Provider
      value={{
        selectedVolume,
        setSelectedVolume,
        backgroundMusicRef,
      }}
    >
      {children}
    </SoundsContext.Provider>
  )
}

export const useSounds = (): SoundsContextType => {
  const context = useContext(SoundsContext)
  if (!context) {
    throw new Error('useSounds must be used within a SoundsProvider')
  }
  return context
}
