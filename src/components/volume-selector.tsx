'use client'

import { useEffect, useRef, useState } from 'react'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'

const VolumeSelector = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const backgroundMusicRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isClient) {
      backgroundMusicRef.current?.play()
      if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0.1
    } else setTimeout(() => setIsClient(true), 100)
  }, [isClient, backgroundMusicRef])

  return (
    <div className='border-text bg-neutral z-50 border-[3px] fixed -bottom-[3px] -left-[3px] p-2 pb-1 text-xl rounded-tr-xl'>
      <audio ref={backgroundMusicRef} loop={true} autoPlay={true}>
        <track kind='captions' />
        <source src='/assets/background-music/halloween.mp3' type='audio/mpeg' />
      </audio>
      <button
        onClick={() => {
          setIsMuted(!isMuted)
          if (isMuted) backgroundMusicRef.current?.play()
          else backgroundMusicRef.current?.pause()
        }}
      >
        {isMuted ? <HiVolumeOff /> : <HiVolumeUp />}
      </button>
    </div>
  )
}

export default VolumeSelector
