"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { RiVolumeDownFill, RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";

import { useActions } from "#/contexts/actions-context";

const VolumeSelector = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { resolvedTheme } = useTheme();
  const { actionsSoundsMuted, setActionsSoundsMuted } = useActions();
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isClient) return setIsClient(true);

    setActionsSoundsMuted(false);
    if (resolvedTheme === "halloween") {
      setIsMuted(false);
      backgroundMusicRef.current?.play();
      if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0.3;
    } else {
      setIsMuted(true);
      backgroundMusicRef.current?.pause();
    }
  }, [resolvedTheme]);

  return (
    <div className="border-text bg-neutral z-50 border-[3px] fixed -bottom-[3px] -left-[3px] p-2 pb-1 text-xl rounded-tr-xl">
      <audio
        ref={backgroundMusicRef}
        src={resolvedTheme === "halloween" ? "/assets/background-music/halloween.mp3" : ""}
        loop={true}
      />
      <button
        onClick={() => {
          if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0.3;

          if (actionsSoundsMuted) {
            setIsMuted(false);
            setActionsSoundsMuted(false);
            backgroundMusicRef.current?.play();
          } else if (isMuted) setActionsSoundsMuted(true);
          else {
            setIsMuted(true);
            backgroundMusicRef.current?.pause();
          }
        }}
      >
        {actionsSoundsMuted ? (
          <RiVolumeMuteFill />
        ) : isMuted ? (
          <RiVolumeDownFill />
        ) : (
          <RiVolumeUpFill />
        )}
      </button>
    </div>
  );
};

export default VolumeSelector;
