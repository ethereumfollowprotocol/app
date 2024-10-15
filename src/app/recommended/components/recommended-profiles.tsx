"use client";

import React, { useState } from "react";
import { useRecommendedProfiles } from "#/contexts/recommended-profiles-context";
import UserProfileCard from "#/components/user-profile-card";
import { cn } from "#/lib/utilities";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(2000px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const RecommendedCards = () => {
  const {
    // page,
    setPage,
    // currentProfile,
    // setCurrentProfile,
    recommendedProfiles,
    // isLoading,
    // isFetchingNextPage,
    // hasNextPage,
    fetchNextPage,
  } = useRecommendedProfiles();

  const [gone, setGone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(recommendedProfiles.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  console.log(props, gone);

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity[0] > 0.2; // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
    if (!down && trigger) {
      gone.add(index);
      if (index === 9) fetchNextPage();
      if (index === 1) {
        setPage((prevPage) => prevPage + 1);
        setGone(() => new Set());
        gone.clear();
      }
      if (dir === 1) {
        console.log("added to cart");
      }
    }

    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0); // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1; // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 60, tension: down ? 3800 : isGone ? 200 : 800 },
      };
    });

    // if (!down && gone.size === recommendedProfiles.length - 1)
    //   setTimeout(() => {
    //     setGone(() => new Set());
    //     // setPage((prevPage) => prevPage + 1);
    //     // api.start((i) => to(i));
    //   }, 600);
  });

  return (
    <div className="flex h-screen w-full items-center overflow-hidden justify-start pt-36 flex-col">
      {props.map(({ x, y, scale }, i) => (
        <animated.div
          className="h-fit w-86 absolute will-change-transform touch-none"
          key={recommendedProfiles[i]?.address}
          style={{ x, y }}
        >
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([scale], trans),
            }}
          >
            <div className={cn("cursor-pointer touch-none")}>
              <UserProfileCard
                profile={recommendedProfiles[i]}
                isResponsive={false}
                stats={recommendedProfiles[i]?.stats}
                hideFollowButton={true}
                solidBackground={true}
              />
            </div>
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
};

export default RecommendedCards;
