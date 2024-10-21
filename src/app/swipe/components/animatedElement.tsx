import React from "react";
import Image from "next/image";

import Logo from "public/assets/logo.svg";

interface AnimatedElementProps {
  handleAnimationEnd: () => void;
}

const AnimatedElement: React.FC<AnimatedElementProps> = React.memo(({ handleAnimationEnd }) => {
  return (
    <div
      className="falling-element pointer-events-none h-screen w-screen fixed -right-[100vw] top-0 z-50 delay-150"
      onAnimationEnd={(e) => {
        e.stopPropagation();
        handleAnimationEnd();
      }}
    >
      {new Array(10).fill(1).map((_, index) => {
        const randomLeft = Math.random() * 80;
        const randomTop = 10 + Math.random() * 30;

        return (
          <Image
            key={index}
            src={Logo}
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
            }}
            className="animate-spin absolute repeat-infinite"
            alt="mainnet"
            width={32}
            height={32}
          />
        );
      })}
    </div>
  );
});

export default AnimatedElement;
