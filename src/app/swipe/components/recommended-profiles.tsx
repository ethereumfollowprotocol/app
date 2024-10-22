"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useTheme } from "next-themes";
import { HiArrowUturnDown } from "react-icons/hi2";
import { animated, to as interpolate } from "@react-spring/web";

import Logo from "public/assets/logo.svg";
import SwipeButtons from "./swipeButtons";
import UserProfileCard from "#/components/user-profile-card";
import HalloweenEmoji from "public/assets/icons/halloween-emoji.svg";
import LoadingRecommendedCards from "./loading-recommended-cards";
import { trans, useRecommendedProfilesCards } from "./useRescommendedProfilesCards";

const RecommendedCards = () => {
  const {
    bind,
    gone,
    props,
    isLoading,
    onSwipeBack,
    onSwipeLeft,
    onSwipeRight,
    didSwipeBack,
    animatedRef,
    handleAnimationEnd,
    isFetchingNextPage,
    recommendedProfiles,
  } = useRecommendedProfilesCards();

  const { resolvedTheme } = useTheme();
  const { address: userAddress } = useAccount();

  const ArrayOfTen = useMemo(
    () =>
      new Array(10).fill(1).map(() => ({
        randomLeft: Math.random() * 80,
        randomTop: 10 + Math.random() * 30,
      })),
    []
  );

  return (
    <div className="flex w-full items-center justify-start flex-col">
      <div
        ref={animatedRef}
        className="pointer-events-none h-screen w-screen fixed -right-[101vw] top-0 z-50 delay-150"
        onAnimationEnd={(e) => {
          e.stopPropagation();
          handleAnimationEnd();
        }}
      >
        {ArrayOfTen.map(({ randomLeft, randomTop }, index) => (
          <Image
            key={index}
            src={resolvedTheme === "halloween" ? HalloweenEmoji : Logo}
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
            }}
            className="animate-spin absolute repeat-infinite"
            alt="mainnet"
            width={32}
            height={32}
          />
        ))}
      </div>
      <div className="flex flex-col w-full items-center justify-start h-fit min-h-[500px] sm:min-h-[680px] relative">
        <LoadingRecommendedCards
          userAddress={userAddress}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          recommendedProfiles={recommendedProfiles}
          gone={gone}
        />
        {props
          .map(({ x, y, rot, scale }, i) => {
            if (gone.has(i + 3)) return null;

            return (
              <animated.div
                className="h-fit w-full max-w-92 absolute top-0 will-change-transform z-20 sm:mr-[14px]"
                key={`${recommendedProfiles[i]?.address}-${i}`}
                style={{ x, y }}
              >
                <animated.div
                  {...bind(i)}
                  style={{
                    transform: interpolate([rot, scale], trans),
                    touchAction: "none",
                  }}
                >
                  <div className="cursor-pointer">
                    <UserProfileCard
                      profile={recommendedProfiles[i]}
                      isResponsive={false}
                      stats={recommendedProfiles[i]?.stats}
                      hideFollowButton={true}
                      isRecommended={true}
                    />
                  </div>
                </animated.div>
              </animated.div>
            );
          })
          .reverse()}
        <SwipeButtons
          userAddress={userAddress}
          recommendedProfiles={props}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          gone={gone}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
      </div>
      <button
        className="cursor-pointer z-40 rounded-full fixed bottom-4 sm:bottom-10 lg:bottom-20 bg-text/20 flex flex-row-reverse items-center gap-2 hover:bg-text/40 transition-all hover:scale-110 px-3 py-2 text-xl disabled:hidden"
        onClick={onSwipeBack}
        disabled={didSwipeBack || gone.size === 0}
      >
        <p className="font-semibold text-lg">Undo</p> <HiArrowUturnDown />
      </button>
    </div>
  );
};

export default RecommendedCards;
