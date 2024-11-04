"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";

import Checkout from "./checkout";
import { cn } from "#/lib/utilities";
import ImportModal from "./import-modal";
import { Search } from "#/components/search";
import ClearCartModal from "./clear-cart-modal";
import { useCart } from "#/contexts/cart-context";
import { formatNumber } from "#/utils/formatNumber";
import Recommendations from "#/components/recommendations";
import FarcasterIcon from "public/assets/icons/farcaster.svg";
import { useEFPProfile } from "#/contexts/efp-profile-context";
import { PrimaryButton } from "#/components/buttons/primary-button";
import { DEFAULT_CHAIN, LIST_OP_LIMITS } from "#/lib/constants/chains";
import useStickyScroll from "#/components/home/hooks/use-sticky-scroll";

const CartItems = lazy(() => import("./cart-items"));

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"farcaster">("farcaster");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { t } = useTranslation();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { selectedList, roles } = useEFPProfile();
  const { totalCartItems, cartItems } = useCart();

  const containerRef = useRef<HTMLDivElement>(null);
  const { StickyScrollRef: SidebarRef, onScroll: onScrollSidebar } = useStickyScroll(140);
  // const { StickyScrollRef: CartItemsRef, onScroll: onScrollCartItems } = useStickyScroll(260);

  const hasCreatedEfpList = !!selectedList;

  const transactionsCount = useMemo(() => {
    let count = 0;
    const splitSize = LIST_OP_LIMITS[roles?.listChainId || DEFAULT_CHAIN.id] || 1000;

    for (let i = 0; i < cartItems.length; i += splitSize) {
      count += 1;
    }

    if (selectedList === undefined) count += 1;

    return count;
  }, [cartItems, selectedList]);

  return (
    <>
      {isConnected && isCheckingOut ? (
        <div className="px-2">
          <Checkout setOpen={setIsCheckingOut} hasCreatedEfpList={hasCreatedEfpList} />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex flex-col-reverse xl:flex-row overflow-y-auto justify-center gap-4 w-full h-full xl:gap-6 pt-[6.75rem] px-2 lg:px-8 pb-6 xl:pb-0"
          onScroll={(e) => {
            // onScrollCartItems(e);
            onScrollSidebar(e);
          }}
        >
          {importModalOpen && (
            <ImportModal onClose={() => setImportModalOpen(false)} platform={selectedPlatform} />
          )}
          {clearCartModalOpen && <ClearCartModal closeModal={() => setClearCartModalOpen(false)} />}
          <div
            className="flex flex-col mb-6 xl:sticky glass-card gap-4 px-1 py-4 sm:p-4 h-fit rounded-2xl border-[3px] border-grey xl:max-w-[600px] w-full xl:w-1/3"
            ref={SidebarRef}
          >
            <div className="w-full flex justify-between items-center px-4 sm:px-2 pt-2">
              <h1 className="text-left text-xl sm:text-3xl font-bold">{t("editor title")}</h1>
              <div className="flex gap-1">
                <p className="text-lg font-bold text-right mr-1">{t("import")}</p>
                <Image
                  src={FarcasterIcon}
                  alt="Import from Farcaster"
                  width={30}
                  className="cursor-pointer rounded-lg hover:opacity-75 hover:scale-110 transition-all"
                  onClick={() => {
                    setImportModalOpen(true);
                    setSelectedPlatform("farcaster");
                  }}
                />
                {/* <Image
                  src={LensIcon}
                  alt='Import from Lens'
                  width={30}
                  className='cursor-pointer rounded-lg hover:opacity-75 hover:scale-110 transition-all'
                  onClick={() => {
                    setImportModalOpen(true)
                    setSelectedPlatform('lens')
                  }}
                /> */}
              </div>
            </div>
            <Search size="w-full z-50 px-2 pt-2" isEditor={true} />
            <Recommendations header={t("recommendations")} endpoint="recommended" limit={30} />
          </div>
          <div
            className="flex flex-col h-fit xl:sticky relative top-0  w-full xl:w-2/3"
            // ref={CartItemsRef}
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-2 flex-row items-center px-3 md:px-4">
                  <h3 className="font-bold text-left text-xl sm:text-3xl xxs:w-2/3">
                    {t("cart unc-changes")}
                  </h3>
                </div>
              }
            >
              <div className="xl:absolute xl:top-0 xl:left-0 w-full h-fit flex flex-col gap-3 md:gap-4 md:pt-6 pt-5 pb-2 px-1 sm:px-3 md:px-4 glass-card rounded-2xl border-[3px] border-grey">
                <CartItems
                  containerRef={containerRef}
                  setClearCartModalOpen={setClearCartModalOpen}
                />
              </div>
            </Suspense>
          </div>
          {isClient && (
            <div
              className={cn(
                "fixed md:w-fit w-full bottom-4 sm:bottom-[3vh] right-0 px-2 sm:px-4 lg:right-[3vw] justify-end",
                isClient && totalCartItems > 0 ? "flex" : "hidden"
              )}
            >
              <div className="flex gap-1 xxs:gap-2 md:gap-6 w-full border-[3px] border-grey lg:w-fit items-center px-3 py-4 sm:p-4 bg-white/10 justify-between glass-card bg-opacity-50 shadow-xl rounded-xl">
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex gap-2 items-center">
                    <p className="text-4xl 3xs:text-5xl sm:text-6xl font-bold">
                      {formatNumber(totalCartItems)}
                    </p>
                    <div className="flex gap-0 flex-col w-24 sm:w-28 font-bold text-sm 3xs:text-base sm:text-lg text-left whitespace-break-spaces">
                      {t("unc-changes")}
                    </div>
                  </div>
                  <p className="text-base pl-2 font-medium">{`${formatNumber(transactionsCount)} ${
                    transactionsCount === 1 ? t("transaction") : t("transactions")
                  }`}</p>
                </div>
                <PrimaryButton
                  className=" px-4 text-xl rounded-full"
                  onClick={() => {
                    if (!isConnected) {
                      if (openConnectModal) openConnectModal();
                      return;
                    }

                    setIsCheckingOut(true);
                  }}
                  label={t("confirm")}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
