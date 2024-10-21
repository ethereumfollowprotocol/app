import React from "react";
import Image from "next/image";

import Logo from "public/assets/logo.svg";
import type { AnimatedElementType } from "./useRescommendedProfilesCards";

interface AnimatedElementProps {
  element: AnimatedElementType;
  handleAnimationEnd: (index: number) => void;
}

const AnimatedElement: React.FC<AnimatedElementProps> = React.memo(
  ({ element, handleAnimationEnd }) => (
    <div
      className="falling-element fixed z-50"
      style={element.style}
      onAnimationEnd={(e) => {
        e.stopPropagation();
        handleAnimationEnd(element.cardIndex);
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
  )
);

export default AnimatedElement;
