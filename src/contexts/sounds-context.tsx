"use client";

import { useTheme } from "next-themes";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type SoundsContextType = {
  actionsSoundsMuted: boolean;
  setActionsSoundsMuted: Dispatch<SetStateAction<boolean>>;
  backgroundSoundsMuted: boolean;
  setBackgroundSoundsMuted: Dispatch<SetStateAction<boolean>>;
  selectedVolume: string;
  setSelectedVolume: Dispatch<SetStateAction<string>>;
  backgroundMusicRef: React.RefObject<HTMLAudioElement>;
};

const SoundsContext = createContext<SoundsContextType | undefined>(undefined);

export const SoundsProvider = ({ children }: { children: React.ReactNode }) => {
  const [actionsSoundsMuted, setActionsSoundsMuted] = useState(false);
  const [backgroundSoundsMuted, setBackgroundSoundsMuted] = useState(true);
  const [selectedVolume, setSelectedVolume] = useState("sfx only");

  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.3;
      if (backgroundSoundsMuted) backgroundMusicRef.current.pause();
      else backgroundMusicRef.current.play();
    }
  }, [backgroundSoundsMuted]);

  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.userActivation.isActive) return;

    setActionsSoundsMuted(false);
    if (resolvedTheme === "halloween") {
      setBackgroundSoundsMuted(false);
      setSelectedVolume("sfx & music");
      backgroundMusicRef.current?.play();
      if (backgroundMusicRef.current) backgroundMusicRef.current.volume = 0.3;
    } else {
      setBackgroundSoundsMuted(true);
      setSelectedVolume("sfx only");
      backgroundMusicRef.current?.pause();
    }
  }, [resolvedTheme]);

  return (
    <SoundsContext.Provider
      value={{
        selectedVolume,
        setSelectedVolume,
        actionsSoundsMuted,
        backgroundMusicRef,
        setActionsSoundsMuted,
        backgroundSoundsMuted,
        setBackgroundSoundsMuted,
      }}
    >
      {children}
    </SoundsContext.Provider>
  );
};

export const useSounds = (): SoundsContextType => {
  const context = useContext(SoundsContext);
  if (!context) {
    throw new Error("useSounds must be used within a SoundsProvider");
  }
  return context;
};
