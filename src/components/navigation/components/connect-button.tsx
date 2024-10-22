"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { useClickAway } from "@uidotdev/usehooks";
import { HiOutlineWallet } from "react-icons/hi2";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useWalletClient, useChains } from "wagmi";

import EthBalance from "./eth-balance";
import { Avatar } from "#/components/avatar";
import { resolveEnsProfile } from "#/utils/ens";
import { cn, truncateAddress } from "#/lib/utilities";
import { useAutoConnect } from "#/hooks/useAutoConnect";
import LoadingCell from "#/components/loaders/loading-cell";
import GreenCheck from "public/assets/icons/check-green.svg";
import { useEFPProfile } from "#/contexts/efp-profile-context";

const nullEnsProfile = {
  name: null,
  avatar: null,
};

interface ConnectButtonProps {
  isResponsive?: boolean;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ isResponsive = true }) => {
  const [listMenuOpen, setListMenuOpen] = useState(false);
  const [walletMenOpenu, setWalletMenuOpen] = useState(false);

  const clickAwayWalletRef = useClickAway<HTMLDivElement>((_) => {
    setWalletMenuOpen(false);
    setListMenuOpen(false);
  });

  const clickAwayListRef = useClickAway<HTMLDivElement>((_) => {
    setListMenuOpen(false);
  });

  const chains = useChains();
  const { t } = useTranslation();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { address: userAddress, isConnected, connector } = useAccount();
  const { selectedList, lists, setSelectedList, roles } = useEFPProfile();
  const { isLoading: isLoadingWalletClient, data: walletClient } = useWalletClient();

  const listChain = chains.find((chain) => chain.id === roles?.listChainId);

  useEffect(() => {
    if (
      isConnected &&
      userAddress !== undefined &&
      connector !== undefined &&
      !isLoadingWalletClient &&
      !walletClient
    ) {
      disconnect();
    }
  }, [connector, walletClient, isLoadingWalletClient]);

  const { data: ensProfile, isLoading: ensProfileIsLoading } = useQuery({
    queryKey: ["ens-data", userAddress],
    queryFn: async () => {
      if (!userAddress) return nullEnsProfile;

      const data = await resolveEnsProfile(userAddress);
      return data;
    },
  });

  useAutoConnect();

  return (
    <div ref={clickAwayWalletRef} className="relative">
      <button
        type="button"
        className={cn(
          "z-50 px-1 pl-[3px] transition-all border-[3px] gap-[5px] hover:scale-105 cursor-pointer flex justify-between items-center h-[54px] glass-card rounded-full",
          walletMenOpenu ? "connect-button-open " : "connect-button",
          isResponsive ? "w-fit sm:w-48 md:w-56" : "w-56"
        )}
        onClick={() =>
          userAddress
            ? setWalletMenuOpen(!walletMenOpenu)
            : openConnectModal
            ? openConnectModal()
            : null
        }
      >
        {userAddress ? (
          <>
            <div className="flex items-center max-w-[87%] h-fit gap-[8px]">
              {ensProfileIsLoading ? (
                <LoadingCell className="w-[43px] h-[43px] rounded-full" />
              ) : (
                <Avatar
                  avatarUrl={ensProfile?.avatar}
                  name={ensProfile?.name || userAddress}
                  size="w-[43px] h-[43px]"
                />
              )}
              <p className="font-bold hidden sm:block truncate text-lg">
                {ensProfile?.name || truncateAddress(userAddress)}
              </p>
            </div>
            <IoIosArrowDown
              className={`${walletMenOpenu ? "rotate-180" : ""} text-2xl transition-transform mr-1`}
            />
          </>
        ) : (
          <div className="w-full sm:w-60 h-full flex items-center justify-center rounded-full">
            <p className={cn("font-bold text-lg px-1", isResponsive ? "hidden sm:block" : "block")}>
              {t("connect")}
            </p>
            <HiOutlineWallet
              className={cn("text-4xl w-[41px]", isResponsive ? "block sm:hidden" : "hidden")}
            />
          </div>
        )}
      </button>
      {walletMenOpenu && (
        <div
          className={cn(
            "flex w-56 overflow-x-hidden sm:overflow-visible z-50 h-fit shadow-md border-[3px] rounded-lg bg-neutral border-grey absolute top-[120%] flex-col items-end right-0"
          )}
        >
          <div
            className={cn(
              "flex flex-col w-full transition-all overflow-x-visible max-h-[75vh] sm:h-auto",
              listMenuOpen ? "-translate-x-[241px] sm:translate-x-0 sm:p-1" : "p-1"
            )}
            style={{
              height: listMenuOpen ? `${(lists?.lists?.length || 0) * 56 + 111}px` : "auto",
            }}
          >
            {lists?.lists && lists.lists.length > 0 && (
              <div ref={clickAwayListRef} className="w-full cursor-pointer group relative">
                <div
                  onClick={() => setListMenuOpen(!listMenuOpen)}
                  className="flex justify-between items-center w-full group-hover:bg-navItem p-3 rounded-md transition-opacity cursor-pointer"
                >
                  <FiArrowLeft className="text-xl" />
                  <p className=" font-bold">
                    {selectedList ? `${t("list")} #${selectedList}` : t("mint new list")}
                  </p>
                </div>
                <div
                  className={cn(
                    "absolute -right-[244px] w-full -top-[3px] h-full sm:pr-5 sm:right-[97.2%] group-hover:block min-w-[240px] sm:w-fit block z-50 sm:-top-[6px]",
                    lists?.lists && lists?.lists?.length > 0
                      ? listMenuOpen
                        ? "block"
                        : "hidden"
                      : "hidden group-hover:hidden"
                  )}
                >
                  <div className="flex flex-col gap-2 w-full min-w-[240px] sm:max-h-[80vh] overflow-auto border-[3px] rounded-lg bg-transparent sm:bg-neutral border-grey p-1 shadow-md">
                    <div
                      onClick={() => setListMenuOpen(false)}
                      className="flex sm:hidden justify-between items-center w-full group:bg-slate-100 dark:hover:bg-zinc-400/20 p-3 rounded-md transition-opacity cursor-pointer"
                    >
                      <FiArrowLeft className="text-xl" />
                      <p className="font-bold">Back</p>
                    </div>
                    {lists?.lists?.map((list) => (
                      <div
                        className="flex items-center relative p-3 pl-8 w-full gap-1 rounded-md hover:bg-navItem"
                        key={list}
                        onClick={() => {
                          localStorage.setItem("selected-list", list);
                          setSelectedList(Number(list));
                          setListMenuOpen(false);
                          setWalletMenuOpen(false);
                        }}
                      >
                        {selectedList === Number(list) && (
                          <Image
                            src={GreenCheck}
                            alt="List selected"
                            width={16}
                            className="absolute left-2 top-[17px]"
                          />
                        )}
                        <div className="flex flex-wrap sm:flex-nowrap items-end gap-1">
                          <p className="font-bold text-wrap">{`${t("list")} #${list}`}</p>
                          {lists.primary_list === list && (
                            <p className="mb-0.5 text-sm italic text-nowrap font-medium text-zinc-400">
                              - {t("primary")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    <div
                      key={"new list"}
                      className="flex gap-2 p-3 pl-8 relative hover:bg-navItem rounded-md"
                      onClick={() => {
                        localStorage.setItem("selected-list", "new list");
                        setSelectedList(undefined);
                        setListMenuOpen(false);
                        setWalletMenuOpen(false);
                      }}
                    >
                      {selectedList === undefined && (
                        <Image
                          src={GreenCheck}
                          alt="List selected"
                          width={16}
                          className="absolute left-2 top-[17px]"
                        />
                      )}
                      <p className=" font-bold">{t("mint new list")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {userAddress && <EthBalance address={userAddress} chain={listChain || chains[0]} />}
            <p
              className="text-red-500 p-3 text-right font-bold w-full text-nowrap rounded-md hover:bg-navItem transition-opacity cursor-pointer"
              onClick={() => {
                disconnect();
                setWalletMenuOpen(false);
              }}
            >
              {t("disconnect")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
