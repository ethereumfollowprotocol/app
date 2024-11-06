import React from "react";
import type { Address } from "viem";
import { useTheme } from "next-themes";
import { FaQrcode } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";

import { cn } from "#/lib/utilities";
import CopyValue from "./components/copy-value";
import { useCoolMode } from "#/hooks/useCoolMode";
import type { FollowState } from "#/types/common";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useThreeDotMenu } from "../../hooks/use-three-dot-menu";
import RestrictButton from "./components/restrict-button";
import OpenModalButton from "./components/open-modal-button";
import { FOLLOW_BUTTON_COOL_EMOJI } from "#/lib/constants/follow-button";

interface ThreeDotMenuProps {
  address: Address;
  profileList?: number | null;
  primaryList?: number | null;
  profileName?: string | null;
  isConnectedUserCard: boolean;
  showMoreOptions: boolean;
  followState: FollowState;
  openBlockModal?: () => void;
  openQrCodeModal?: () => void;
  openListSettingsModal?: () => void;
}

const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  address,
  profileList,
  primaryList,
  profileName,
  isConnectedUserCard,
  showMoreOptions,
  followState,
  openBlockModal,
  openQrCodeModal,
  openListSettingsModal,
}) => {
  const {
    threeDotMenuOpen,
    setThreeDotMenuOpen,
    threeDotMenuRef,
    onClickOption,
    toggleTopEight,
    isPendingBlock,
    isPendingMute,
    isInTopEight,
    isAddingToTopEight,
    isRemovingFromTopEight,
  } = useThreeDotMenu({ address, followState });

  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();

  const blockCoolEmoji =
    FOLLOW_BUTTON_COOL_EMOJI[followState === "blocks" || isPendingBlock ? "Unblock" : "Block"][
      resolvedTheme || "light"
    ];
  const blockCoolMode = useCoolMode(blockCoolEmoji || "", !blockCoolEmoji, !threeDotMenuOpen);

  const muteCoolEmoji =
    FOLLOW_BUTTON_COOL_EMOJI[followState === "mutes" || isPendingMute ? "Unmute" : "Mute"][
      resolvedTheme || "light"
    ];
  const muteCoolMode = useCoolMode(muteCoolEmoji || "", !muteCoolEmoji, !threeDotMenuOpen);

  return (
    <div className={showMoreOptions ? "block" : "hidden"} ref={threeDotMenuRef}>
      <div
        className="flex gap-[3px] px-1.5 py-2 rounded-md bg-zinc-300 cursor-pointer items-center hover:opacity-50 transition-all hover:scale-110"
        onClick={() => setThreeDotMenuOpen(!threeDotMenuOpen)}
      >
        <div className="h-1 w-1 bg-black rounded-full"></div>
        <div className="h-1 w-1 bg-black rounded-full"></div>
        <div className="h-1 w-1 bg-black rounded-full"></div>
      </div>
      <div
        className={cn(
          threeDotMenuOpen && showMoreOptions ? "flex" : "hidden",
          "absolute top-9 right-0 flex-col items-center z-50 gap-2 w-fit p-1  bg-neutral border-grey border-[3px] rounded-xl drop-shadow-lg"
        )}
      >
        {!isConnectedUserCard && (
          <div className="flex w-full items-center justify-center pt-2 flex-col gap-3">
            <RestrictButton
              blockCoolMode={blockCoolMode}
              onClickOption={onClickOption}
              text="Block"
              type="block"
            />
            <RestrictButton
              blockCoolMode={muteCoolMode}
              onClickOption={onClickOption}
              text="Mute"
              type="mute"
            />
          </div>
        )}
        {!isConnectedUserCard && (
          <button
            onClick={toggleTopEight}
            className="rounded-lg text-nowrap cursor-pointer hover:bg-text/5 transition-colors w-full relative text-xs flex items-center gap-1 justify-center font-bold p-3"
          >
            {t(
              (isInTopEight || isAddingToTopEight) && !isRemovingFromTopEight
                ? "remove from top eight"
                : "add to top eight"
            )}
          </button>
        )}
        <CopyValue value={address} text="copy address" />
        <CopyValue
          value={`https://ethfollow.xyz/${
            profileList ? (profileList === Number(primaryList) ? address : profileList) : address
          }`}
          text="copy profile"
        />
        {profileName && <CopyValue value={profileName} text="copy ens" />}
        {/* {refetchProfile && (
          <button
            onClick={refetchProfile}
            className="rounded-lg cursor-pointer hover:bg-text/5 transition-colors relative text-xs flex items-center gap-1 justify-center font-bold w-full p-3"
          >
            <IoRefresh className="text-base" />
            <p className="text-nowrap">{t("refresh ens")}</p>
          </button>
        )} */}
        <a
          href={`https://app.ens.domains${profileName ? `/${profileName}` : ""}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg cursor-pointer hover:bg-text/5 transition-colors relative text-xs flex items-center gap-1 justify-center font-bold w-full p-3"
        >
          <p className="text-nowrap">ENS app</p>
          <HiOutlineExternalLink className="text-lg" />
        </a>
        {openBlockModal && (
          <OpenModalButton
            onClick={() => {
              openBlockModal();
              setThreeDotMenuOpen(false);
            }}
            text="block-mute"
          />
        )}
        {openListSettingsModal && profileList && (
          <OpenModalButton
            onClick={() => {
              openListSettingsModal();
              setThreeDotMenuOpen(false);
            }}
            text="settings"
            icon={<IoMdSettings className="text-lg" />}
          />
        )}
        {openQrCodeModal && (
          <OpenModalButton
            onClick={() => {
              openQrCodeModal();
              setThreeDotMenuOpen(false);
            }}
            text="qr code"
            icon={<FaQrcode className="text-lg mr-1" />}
          />
        )}
      </div>
    </div>
  );
};

export default ThreeDotMenu;
