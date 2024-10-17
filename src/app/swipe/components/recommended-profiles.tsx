"use client";

import Image from "next/image";
import { HiArrowUturnDown } from "react-icons/hi2";
import { animated, to as interpolate } from "@react-spring/web";

import MainnetBlack from "public/assets/mainnet-black.svg";
import UserProfileCard from "#/components/user-profile-card";
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
    isFetchingNextPage,
    recommendedProfiles,
  } = useRecommendedProfilesCards();

  return (
    <div className="flex w-full items-center justify-start flex-col">
      <div className="flex flex-col w-full items-center justify-start h-fit min-h-[500px] sm:min-h-[680px] relative">
        {(isLoading || isFetchingNextPage || recommendedProfiles.length === 0) &&
          new Array(5).fill(1).map((_, i) => (
            <div
              className="h-fit w-full max-w-86 absolute z-10 xxs:mr-12"
              key={i}
              style={{
                marginTop: `${50 - i * 10}px`,
              }}
            >
              <UserProfileCard
                isLoading={true}
                isResponsive={false}
                hideFollowButton={true}
                isRecommended={true}
              />
            </div>
          ))}
        {props
          .map(({ x, y, rot, scale }, i) => {
            if (gone.has(i) && i < gone.size - 3) {
              return null;
            }
            return (
              <animated.div
                className="h-fit w-full max-w-86 absolute top-0 will-change-transform touch-none z-20 xxs:mr-12"
                key={`${recommendedProfiles[i]?.address}-${i}`}
                style={{ x, y }}
              >
                {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                <animated.div
                  {...bind(i)}
                  style={{
                    transform: interpolate([rot, scale], trans),
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
        {/* <div className="absolute z-30 xxs:ml-8 top-40 sm:top-60 w-full max-w-128 flex justify-between items-center"> */}
        <button
          className="absolute -left-1 sm:left-auto sm:mr-[475px] z-30 sm:z-10 top-56 sm:top-60 rounded-xl w-14 text-lg font-semibold h-14 flex items-center justify-center glass-card border-[3px] border-text/70 transition-all hover:scale-110"
          disabled={
            recommendedProfiles.length === 0 ||
            isLoading ||
            (isFetchingNextPage && gone.size === recommendedProfiles.length)
          }
          onClick={onSwipeLeft}
        >
          Meh
        </button>
        <button
          className="absolute -right-1 sm:right-auto sm:ml-[445px] z-30 sm:z-10 top-56 sm:top-60 rounded-xl w-14 h-14 flex items-center justify-center pl-1.5 pt-1 text-black btn-grad transition-all hover:scale-110"
          disabled={
            recommendedProfiles.length === 0 ||
            isLoading ||
            (isFetchingNextPage && gone.size === recommendedProfiles.length)
          }
          onClick={onSwipeRight}
        >
          <Image src={MainnetBlack} alt="mainnet" width={24} height={24} />
        </button>
        {/* </div> */}
      </div>
      <button
        className="cursor-pointer z-40 rounded-full fixed bottom-4 sm:bottom-10 lg:bottom-20 bg-text/20 flex flex-row-reverse items-center gap-2 hover:bg-text/40 transition-all hover:scale-110 px-3 py-2 text-xl"
        onClick={onSwipeBack}
      >
        <p className="font-semibold text-lg">Undo</p> <HiArrowUturnDown />
      </button>
      {/* <div className={cn("falling-elements-container")}>
        {Array.from({ length: 70 }).map((_, index) => {
          const randomLeft = Math.random() * 100;
          const randomTop = Math.random() * 100;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                // animationDelay: `${randomDuration}ms`,
              }}
            >
              <Image
                src={Logo}
                // className="animate-spin repeat-infinite"
                alt="mainnet"
                width={32}
                height={32}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default RecommendedCards;
