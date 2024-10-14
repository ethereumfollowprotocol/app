"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { cn } from "#/lib/utilities";
import { NAV_ITEMS } from "#/lib/constants";
import { useEFPProfile } from "#/contexts/efp-profile-context";

const NavItems = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { address: userAddress } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { selectedList, lists } = useEFPProfile();

  const itemUrl =
    pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
    selectedList === Number(lists?.primary_list)
      ? userAddress?.toLowerCase()
      : selectedList?.toString() ?? userAddress?.toLowerCase();

  return (
    <ul className="lg:flex hidden lg:gap-4 xl:gap-6 items-center">
      {NAV_ITEMS.map((item) => (
        <li
          className={cn(
            "font-bold hover:scale-110 transition-transform",
            item.hiddenOnDesktop ? "" : "hidden"
          )}
          key={`${item.name}`}
        >
          <Link
            prefetch={true}
            href={item.href(itemUrl)}
            className={cn([
              "capitalize xl:text-[18px] lg:text-lg transition-all",
              item.href(itemUrl) === pathname.toLowerCase()
                ? "text-text hover:text-text"
                : "text-text-neutral hover:text-text",
            ])}
            onClick={(e) => {
              if (
                (item.name === "profile" || item.name === "feed") &&
                !userAddress &&
                openConnectModal
              ) {
                e.preventDefault();
                openConnectModal();
              }
            }}
          >
            <span className="hidden sm:block text-nowrap">{t(`${item.name}`)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
