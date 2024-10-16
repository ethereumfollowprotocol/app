"use client";

import { TiArrowBack } from "react-icons/ti";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { animated, to as interpolate } from "@react-spring/web";

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
      <div className="flex flex-col w-full items-center justify-start h-fit min-h-[500px] sm:min-h-[680px] relative xxs:mr-8">
        {(isLoading || isFetchingNextPage || recommendedProfiles.length === 0) &&
          new Array(5).fill(1).map((_, i) => (
            <div
              className="h-fit w-full max-w-86 absolute z-10"
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
        {props.reverse().map(({ x, y, rot, scale }, i) => {
          return (
            <animated.div
              className="h-fit w-full max-w-86 absolute top-0 will-change-transform touch-none z-20"
              key={`${recommendedProfiles[i]?.address}-${i}`}
              style={{ x, y }}
            >
              {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
              <animated.div
                {...bind(recommendedProfiles.length - 1 - i)}
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
        })}
        <div className="absolute z-50 xxs:ml-8 top-40 sm:top-60 w-full max-w-128 flex justify-between items-center">
          <button
            className="rounded-full p-2 text-4xl bg-text/20 hover:bg-text/40 transition-all hover:scale-110"
            disabled={
              recommendedProfiles.length === 0 ||
              isLoading ||
              (isFetchingNextPage && gone.size === recommendedProfiles.length)
            }
            onClick={onSwipeLeft}
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            className="rounded-full p-2 text-4xl bg-text/20 hover:bg-text/40 transition-all hover:scale-110"
            disabled={
              recommendedProfiles.length === 0 ||
              isLoading ||
              (isFetchingNextPage && gone.size === recommendedProfiles.length)
            }
            onClick={onSwipeRight}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      <button
        className="cursor-pointer rounded-full fixed bottom-20 bg-text/20 hover:bg-text/40 transition-all hover:scale-110 p-2 text-4xl disabled:opacity-0 disabled:cursor-not-allowed"
        disabled={gone.size === 0}
        onClick={onSwipeBack}
      >
        <TiArrowBack />
      </button>
    </div>
  );
};

export default RecommendedCards;
