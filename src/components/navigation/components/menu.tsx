"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useState, type Dispatch, type SetStateAction } from "react";

import { cn } from "#/lib/utilities";
import { socials } from "#/components/footer";
import { usePathname } from "next/navigation";
import VolumeSwitcher, { volumeOptions } from "./volume-switcher";
import LanguageSelector from "./language-selector";
import { LANGUAGES } from "#/lib/constants/languages";
import { EXTERNAL_LINKS, NAV_ITEMS } from "#/lib/constants";
import { useEFPProfile } from "#/contexts/efp-profile-context";
import ThemeSwitcher, { themesWithIcons } from "#/components/navigation/components/theme-switcher";

interface MenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false);
  const [languageMenOpenu, setLanguageMenuOpen] = useState(false);

  const pathname = usePathname();
  const { t } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const { address: userAddress } = useAccount();
  const { selectedList, lists } = useEFPProfile();
  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase();

  if (!open) return null;

  return (
    <div
      className={cn(
        "bg-neutral w-[220px] z-50 overflow-x-hidden sm:overflow-visible shadow-md border-[3px] transition-transform rounded-md border-grey absolute top-[120%] flex flex-col items-end -left-[90px]"
      )}
    >
      <div
        className={cn(
          "flex flex-col w-full transition-all overflow-x-visible max-h-[74vh] sm:h-auto p-1",
          languageMenOpenu || themeMenuOpen || volumeMenuOpen
            ? "-translate-x-[216px] sm:translate-x-0"
            : ""
        )}
        style={{
          height: languageMenOpenu
            ? `${(LANGUAGES.length || 0) * 56 + 111}px`
            : themeMenuOpen
            ? `${(themesWithIcons.length || 0) * 56 + 56}px`
            : volumeMenuOpen
            ? `${(volumeOptions.length || 0) * 56 + 56}px`
            : "h-auto",
        }}
      >
        <ThemeSwitcher
          setExternalThemeMenuOpen={setThemeMenuOpen}
          closeMenu={() => {
            setOpen(false);
            setThemeMenuOpen(false);
            setOpen(false);
          }}
        />
        <LanguageSelector
          setExternalLanguageMenuOpen={setLanguageMenuOpen}
          setParentOpen={setOpen}
        />
        <VolumeSwitcher
          setExternalVolumeMenuOpen={setVolumeMenuOpen}
          closeMenu={() => {
            setOpen(false);
            setVolumeMenuOpen(false);
          }}
        />
        {NAV_ITEMS.map((item) => (
          <div
            className={cn("font-bold w-full ", item.hiddenOnDesktop ? "lg:hidden" : "")}
            key={`${item.name}`}
          >
            <Link
              prefetch={true}
              href={item.href(itemUrl)}
              className="capitalize lg:text-lg text-end block transition-colors p-3 w-full rounded-md hover:bg-navItem text-text"
              onClick={(e) => {
                if (item.name === "profile" && !userAddress && openConnectModal) {
                  e.preventDefault();
                  openConnectModal();
                } else setOpen(false);
              }}
            >
              {t(`${item.name}`)}
            </Link>
          </div>
        ))}
        {EXTERNAL_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.target}
            onClick={() => setOpen(false)}
            className="capitalize block transition-colors p-3 w-full rounded-md hover:bg-navItem text-text font-bold"
          >
            <p className="text-end">{t(link.text)}</p>
          </Link>
        ))}
        <div className="flex items-center w-full justify-between p-3">
          {socials.map((item) => (
            <a
              target="_blank"
              rel="noreferrer"
              key={item.text}
              href={item.href}
              className="hover:scale-125 text-3xl transition-transform"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
