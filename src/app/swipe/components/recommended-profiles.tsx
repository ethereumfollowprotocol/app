"use client";

import Image from "next/image";
import { HiArrowUturnDown } from "react-icons/hi2";
import { animated, to as interpolate } from "@react-spring/web";

import Logo from "public/assets/logo.svg";
// import AnimatedElement from "./animatedElement";
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
    didSwipeBack,
    // isAnimationPlaying,
    // isSecondaryAnimationPlaying,
    animatedElements,
    handleAnimationEnd,
    isFetchingNextPage,
    recommendedProfiles,
  } = useRecommendedProfilesCards();

  return (
    <div className="flex w-full items-center justify-start flex-col">
      {animatedElements.map(({ key, style, cardIndex }) => (
        <div
          key={key}
          className="falling-element fixed z-50"
          style={style}
          onAnimationEnd={(e) => {
            e.stopPropagation();
            handleAnimationEnd(cardIndex);
          }}
        >
          <Image
            src={Logo}
            className="animate-spin repeat-infinite"
            alt="mainnet"
            width={32}
            height={32}
          />
        </div>
      ))}
      {/* {isAnimationPlaying &&
        Array.from({ length: 10 }).map((_, index) => (
          <AnimatedElement
            key={`primary-${index}`}
            handleAnimationEnd={() => handleAnimationEnd("primary")}
          />
        ))} */}
      {/* {isSecondaryAnimationPlaying &&
        Array.from({ length: 10 }).map((_, index) => (
          <AnimatedElement
            key={`secondary-${index}`}
            handleAnimationEnd={() => handleAnimationEnd("secondary")}
          />
        ))} */}
      <div className="flex flex-col w-full items-center justify-start h-fit min-h-[500px] sm:min-h-[680px] relative">
        {(isLoading || isFetchingNextPage || recommendedProfiles.length === 0) &&
          new Array(4).fill(1).map((_, i) => (
            <div
              className="h-fit w-full max-w-86 absolute z-10 xxs:mr-12"
              key={i}
              style={{
                marginTop: `${40 - i * 10}px`,
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
            if (gone.has(i + 3)) {
              return null;
            }
            return (
              <animated.div
                className="h-fit w-full max-w-86 absolute top-0 will-change-transform touch-none z-20 xxs:mr-12"
                key={`${recommendedProfiles[i]?.address}-${i}`}
                style={{ x, y }}
              >
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