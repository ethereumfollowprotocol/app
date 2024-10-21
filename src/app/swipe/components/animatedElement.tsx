import React from "react";
import Image from "next/image";

import Logo from "public/assets/logo.svg";

interface AnimatedElementProps {
  handleAnimationEnd: () => void;
}

const AnimatedElement: React.FC<AnimatedElementProps> = React.memo(({ handleAnimationEnd }) => {
  const randomRight = Math.random() * 80;
  const randomTop = 10 + Math.random() * 30;
  const randomDelay = (window.innerWidth > 768 ? 130 : 50) + Math.random() * 150;

  const style = {
    top: `${randomTop}%`,
    right: `-${randomRight}%`,
    animationDelay: `${randomDelay}ms`,
  };
  return (
    <div
      className="falling-element fixed z-50"
      style={style}
      onAnimationEnd={(e) => {
        e.stopPropagation();
        handleAnimationEnd();
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
  );
});

export default AnimatedElement;
