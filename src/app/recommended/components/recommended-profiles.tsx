"use client";

import { useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { TiArrowBack } from "react-icons/ti";
import { useSprings, animated, to as interpolate } from "@react-spring/web";

import { useCart } from "#/contexts/cart-context";
import { listOpAddListRecord } from "#/utils/list-ops";
import UserProfileCard from "#/components/user-profile-card";
import { PrimaryButton } from "#/components/buttons/primary-button";
import { useRecommendedProfiles } from "#/contexts/recommended-profiles-context";

const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
});
const from = (i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 });

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const RecommendedCards = () => {
  const { gone, recommendedProfiles, isLoading, isFetchingNextPage, fetchNextPage } =
    useRecommendedProfiles();

  const { addCartItem } = useCart();

  const [props, api] = useSprings(recommendedProfiles.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity[0] > 0.2; // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1; // -1 for left, 1 for right

    if (!down && trigger) {
      gone.add(index);

      if (index % 7 === 0) setTimeout(() => fetchNextPage(), 250);

      if (dir === 1) {
        setTimeout(() => {
          if (recommendedProfiles[index]?.address) {
            addCartItem({
              // @ts-ignore
              listOp: listOpAddListRecord(recommendedProfiles[index].address),
            });
          }
        }, 250);
      }
    }

    api.start((i) => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 8 * velocity[0] : 0); // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.075 : 1; // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 60, tension: down ? 800 : isGone ? 200 : 800 },
      };
    });
  });

  useEffect(() => {
    api.start((i) => {
      if (gone.has(i)) {
        return {
          x: (200 + window.innerWidth) * -1,
          rot: -50,
          scale: 1,
          delay: undefined,
          config: { friction: 30, tension: 800 },
        };
      }
    });
  }, []);

  return (
    <div className="flex w-full items-center justify-start flex-col">
      <div className="flex flex-col w-full items-center justify-start h-fit min-h-[680px] relative">
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
                solidBackground={true}
              />
            </div>
          ))}
        {props.reverse().map(({ x, y, rot, scale }, i) => {
          return (
            <animated.div
              className="h-fit w-full max-w-86 absolute will-change-transform touch-none z-20"
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
                    solidBackground={true}
                  />
                </div>
              </animated.div>
            </animated.div>
          );
        })}
      </div>
      <div className="flex w-full max-w-92 items-center ml-8 justify-between">
        <PrimaryButton
          label="Skip"
          disabled={
            recommendedProfiles.length === 0 ||
            isLoading ||
            (isFetchingNextPage && gone.size === recommendedProfiles.length)
          }
          onClick={() => {
            if (
              recommendedProfiles.length === 0 ||
              isLoading ||
              gone.size === recommendedProfiles.length
            )
              return;

            api.start((i) => {
              if (i === gone.size) {
                if (i % 7 === 0) setTimeout(() => fetchNextPage(), 250);
                const x = (200 + window.innerWidth) * -1;
                const rot = -50;
                const scale = 1;
                return {
                  x,
                  rot,
                  scale,
                  delay: undefined,
                  config: { friction: 50, tension: 300 },
                };
              }
            });
            gone.add(gone.size);
          }}
        />
        <button
          className="cursor-pointer rounded-full bg-text/20 hover:bg-text/40 transition-all hover:scale-110 p-2 text-4xl disabled:opacity-0 disabled:cursor-not-allowed"
          disabled={gone.size === 0}
          onClick={() => {
            gone.delete(gone.size - 1);
            api.start((i) => {
              if (i === gone.size) {
                return to(i);
              }
            });
          }}
        >
          <TiArrowBack />
        </button>
        <PrimaryButton
          label="Follow"
          disabled={
            recommendedProfiles.length === 0 ||
            isLoading ||
            (isFetchingNextPage && gone.size === recommendedProfiles.length)
          }
          onClick={() => {
            if (
              recommendedProfiles.length === 0 ||
              isLoading ||
              gone.size === recommendedProfiles.length
            )
              return;

            api.start((i) => {
              if (i === gone.size) {
                if (i % 7 === 0) setTimeout(() => fetchNextPage(), 250);
                setTimeout(() => {
                  if (recommendedProfiles[i]?.address) {
                    addCartItem({
                      // @ts-ignore
                      listOp: listOpAddListRecord(recommendedProfiles[i].address),
                    });
                  }
                }, 250);
                const x = (200 + window.innerWidth) * 1;
                return {
                  x,
                  rot: 50,
                  scale: 1,
                  delay: undefined,
                  config: { friction: 50, tension: 300 },
                };
              }
            });
            gone.add(gone.size);
          }}
        />
      </div>
    </div>
  );
};

export default RecommendedCards;
