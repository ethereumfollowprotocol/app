"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import type { Address } from "viem";
import { useEffect, useMemo, useRef, useState, type Ref } from "react";
import { useTranslation } from "react-i18next";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { cn } from "#/lib/utilities";
import LoadingCell from "../loaders/loading-cell";
import { useCoolMode } from "./hooks/useCoolMode";
import MainnetRed from "public/assets/mainnet-red.svg";
import MainnetBlack from "public/assets/mainnet-black.svg";
import { type FollowButtonState, useFollowButton } from "./hooks/use-follow-button";
import { useTheme } from "next-themes";
import { useActions } from "#/contexts/actions-context";

const theme: Record<
  FollowButtonState,
  { bg: string; hover?: string; text: string; border: string; imageSrc?: string }
> = {
  Follow: {
    bg: "btn-grad",
    text: "text-zinc-800",
    border: "border-0",
  },
  "Pending Following": {
    bg: "btn-following-pending",
    hover:
      "hover:bg-none hover:bg-[#D0D0D0] hover:border-none hover:rounded-[15px] hover:rounded-[11px] hover:py-1.5 hover:scale-110 transition-transform",
    text: "text-gray-900",
    border:
      "border-[3px] after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400",
  },
  Following: {
    bg: "btn-following",
    hover:
      "hover:bg-none hover:bg-deletion hover:border-none hover:rounded-[15px] hover:rounded-[11px] hover:py-1.5 hover:scale-110 transition-transform",
    text: "text-gray-900",
    border: "border-[3px]",
  },
  Unfollow: {
    bg: "bg-deletion",
    hover: "hover:bg-[#CF4C4C]",
    text: "text-gray-900",
    border:
      "border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400",
  },
  Subscribe: {
    bg: "bg-kournikova-300",
    text: "text-zinc-800",
    border: "border-0 ",
  },
  Subscribed: {
    bg: "bg-addition",
    text: "text-zinc-800",
    border: "border-[3px] border-zinc-200",
  },
  Unsubscribe: {
    bg: "bg-deletion",
    text: "text-gray-900",
    border:
      "border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400",
  },
  Block: {
    bg: "bg-deletion",
    hover: "hover:bg-[#CF4C4C]",
    text: "text-zinc-800",
    border: "border-0",
  },
  "Pending Block": {
    bg: "bg-white",
    hover: "hover:bg-[#FFC6C6]",
    text: "text-red-500",
    border:
      "border-[3px] border-red-500 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400",
    imageSrc: MainnetRed,
  },
  Blocked: {
    bg: "bg-white",
    hover: "hover:bg-[#FFC6C6]",
    text: "text-red-500",
    border: "border-[3px] border-red-500",
    imageSrc: MainnetRed,
  },
  Unblock: {
    bg: "bg-deletion",
    hover: "hover:bg-[#CF4C4C]",
    text: "text-zinc-800",
    border:
      "border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400",
  },
  Mute: {
    bg: "bg-deletion",
    hover: "hover:bg-[#CF4C4C]",
    text: "text-darkGrey",
    border: "border-0",
  },
  "Pending Mute": {
    bg: "bg-white",
    hover: "hover:bg-[#FFC6C6]",
    text: "text-red-500",
    border:
      "border-[3px] border-red-500 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400",
    imageSrc: MainnetRed,
  },
  Muted: {
    bg: "bg-white",
    hover: "hover:bg-[#FFC6C6]",
    text: "text-red-500",
    border: "border-[3px] border-red-500",
    imageSrc: MainnetRed,
  },
  Unmute: {
    bg: "bg-deletion",
    hover: "hover:bg-[#CF4C4C]",
    text: "text-zinc-800",
    border:
      "border-0 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-1.5 after:-right-1.5 after:bg-green-400",
  },
};

// const coolEmoji: Record<FollowButtonState, string> = {
//   Follow: '/assets/logo.svg',
//   'Pending Following': '',
//   Following: '/assets/icons/unfollow-emoji.svg',
//   Unfollow: '',
//   Subscribe: '',
//   Subscribed: '',
//   Unsubscribe: '',
//   Block: '/assets/icons/block-emoji.svg',
//   'Pending Block': '',
//   Blocked: '',
//   Unblock: '',
//   Mute: '/assets/icons/mute-emoji.svg',
//   'Pending Mute': '',
//   Muted: '',
//   Unmute: ''
// }

interface FollowButtonProps {
  address: Address;
  className?: string;
  isBlockedBy?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  address,
  className = "",
  isBlockedBy,
  ...props
}) => {
  const [disableHover, setDisableHover] = useState(false);

  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const { actionsSoundsMuted } = useActions();
  const { address: userAddress } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { buttonText, buttonState, handleAction, isLoading } = useFollowButton({
    address,
    isBlockedBy,
  });

  const coolEmoji: Record<FollowButtonState, string> = {
    Follow:
      resolvedTheme === "halloween" ? "/assets/icons/halloween-emoji.svg" : "/assets/logo.svg",
    "Pending Following": "",
    Following:
      resolvedTheme === "halloween"
        ? "/assets/icons/unfollow-halloween-emoji.png"
        : "/assets/icons/unfollow-emoji.svg",
    Unfollow: "",
    Subscribe: "",
    Subscribed: "",
    Unsubscribe: "",
    Block:
      resolvedTheme === "halloween"
        ? "/assets/icons/spider-web-emoji.svg"
        : "/assets/icons/block-emoji.svg",
    "Pending Block": "",
    Blocked: "",
    Unblock: "",
    Mute:
      resolvedTheme === "halloween"
        ? "/assets/icons/ghost-emoji.svg"
        : "/assets/icons/mute-emoji.svg",
    "Pending Mute": "",
    Muted: "",
    Unmute: "",
  };

  const coolEfpLogo = useCoolMode(
    coolEmoji[buttonState],
    coolEmoji[buttonState] === "",
    true,
    isLoading
  );

  const sound = useMemo(
    () =>
      ({
        Follow:
          resolvedTheme === "halloween" ? "/assets/sound-effects/follow-halloween.mp3" : undefined,
        "Pending Following": undefined,
        Following:
          resolvedTheme === "halloween"
            ? "/assets/sound-effects/unfollow-halloween.mp3"
            : undefined,
        Unfollow: undefined,
        Subscribe: undefined,
        Subscribed: undefined,
        Unsubscribe: undefined,
        Block: undefined,
        "Pending Block": undefined,
        Blocked: undefined,
        Unblock: undefined,
        Mute: undefined,
        "Pending Mute": undefined,
        Muted: undefined,
        Unmute: undefined,
      }[buttonState]),
    [buttonState, resolvedTheme]
  );

  const soundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (soundRef.current) {
      if (actionsSoundsMuted) soundRef.current.volume = 0;
      else soundRef.current.volume = 0.4;
    }
  }, [sound, actionsSoundsMuted]);

  return isLoading ? (
    <div className={`rounded-xl ${isBlockedBy ? "w-[132px]" : "w-[110px] 2xl:w-[120px]"}`}>
      <LoadingCell className="h-9 2xl:h-10 w-full rounded-lg" />
    </div>
  ) : (
    <div ref={coolEfpLogo as Ref<HTMLDivElement>}>
      <audio ref={soundRef} src={sound} key={resolvedTheme} preload="auto" />
      <button
        className={cn([
          theme[buttonState].bg,
          theme[buttonState].text,
          theme[buttonState].border,
          "rounded-[11px] 2xl:rounded-xl relative text-[13px] 2xl:text-sm flex h-9 2xl:h-10 items-center w-[110px] 2xl:w-[120px] gap-1.5 transition-all px-2 duration-200 justify-center font-bold",
          disableHover
            ? buttonState === "Pending Following"
              ? ""
              : "bg-right"
            : `hover:scale-110 ${theme[buttonState].hover}`,
          className,
        ])}
        // style={{
        //   minWidth: isBlockedBy ? "132px" : "120px",
        // }}
        onMouseLeave={() => {
          setDisableHover(false);
        }}
        onClick={(e) => {
          e.stopPropagation();

          if (!userAddress && openConnectModal) {
            openConnectModal();
            return;
          }

          soundRef.current?.play();

          setDisableHover(true);
          handleAction();
        }}
        {...props}
      >
        <Image
          alt="mainnet logo"
          src={theme[buttonState].imageSrc || MainnetBlack}
          width={16}
          className="pointer-events-none w-3.5 2xl:w-4"
        />
        <p
          className="text-wrap break-words max-w-[90px]"
          style={{
            lineHeight: "0.95rem",
          }}
        >
          {t(buttonText)}
        </p>
      </button>
    </div>
  );
};

export default FollowButton;
