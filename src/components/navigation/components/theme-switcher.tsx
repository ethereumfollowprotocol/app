import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useClickAway } from "@uidotdev/usehooks";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";

import i18n from "#/app/i18n";
import { cn } from "#/lib/utilities";
import GreenCheck from "public/assets/icons/check-green.svg";

export const themesWithIcons = [
  {
    theme: "system",
    icon: <HiOutlineDesktopComputer />,
    language: undefined,
  },
  {
    theme: "light",
    icon: <MdLightMode />,
    language: undefined,
  },
  {
    theme: "dark",
    icon: <MdDarkMode />,
    language: undefined,
  },
  // {
  //   theme: "halloween",
  //   icon: <GiPumpkinLantern />,
  //   language: "halloween",
  // },
];

const themes = ["system", "light", "dark"] as const;
type ThemeType = (typeof themes)[number];

interface ThemeSwitcherProps {
  closeMenu?: () => void;
  setExternalThemeMenuOpen?: (open: boolean) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ closeMenu, setExternalThemeMenuOpen }) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const clickAwayThemeRef = useClickAway<HTMLDivElement>(() => {
    setThemeMenuOpen(false);
    setExternalThemeMenuOpen?.(false);
  });

  const { t } = useTranslation();
  const { setTheme, theme: selectedTheme } = useTheme();

  return (
    <div ref={clickAwayThemeRef} className="cursor-pointer group relative w-full">
      <div
        onClick={() => {
          setThemeMenuOpen(!themeMenuOpen);
          setExternalThemeMenuOpen?.(!themeMenuOpen);
        }}
        className="flex justify-between items-center rounded-md transition-opacity cursor-pointer group-hover:bg-navItem p-3 w-full"
      >
        <FiArrowLeft className="text-xl" />
        <div className="flex items-center justify-end gap-2">
          <p className="text-2xl">
            {themesWithIcons.find(({ theme }) => theme === selectedTheme)?.icon}
          </p>
          <p className="capitalize font-bold">{t(selectedTheme || "system")}</p>
        </div>
      </div>
      <div
        className={cn(
          "absolute group-hover:block block h-[230px] sm:h-[174px] z-50 -right-[223px] sm:right-[97.2%] min-w-[220px] -top-[7px] sm:pr-5",
          themeMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col p-1 gap-2 w-full max-h-[75vh] sm:max-h-[90vh] border-[3px] rounded-lg bg-neutral border-grey shadow-md">
          <div
            onClick={() => {
              setThemeMenuOpen(false);
              setExternalThemeMenuOpen?.(false);
            }}
            className="flex sm:hidden justify-between items-center w-full hover:bg-navItem p-3 rounded-md transition-opacity cursor-pointer"
          >
            <FiArrowLeft className="text-xl" />
            <p className="font-bold">Back</p>
          </div>
          {themesWithIcons.map(({ theme, icon, language }) => (
            <div
              className="flex items-center relative p-3 pl-8 w-full gap-2 rounded-md hover:bg-navItem"
              key={theme}
              onClick={() => {
                setTheme(theme as ThemeType);
                setThemeMenuOpen(false);
                setExternalThemeMenuOpen?.(false);
                if (language) {
                  i18n.changeLanguage(language);
                }
                closeMenu?.();
              }}
            >
              {selectedTheme === theme && (
                <Image
                  src={GreenCheck}
                  alt="List selected"
                  width={16}
                  className="absolute left-2 top-[19px]"
                />
              )}
              <p className="text-2xl">{icon}</p>
              <p className="text-nowrap capitalize font-bold">{t(theme)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
