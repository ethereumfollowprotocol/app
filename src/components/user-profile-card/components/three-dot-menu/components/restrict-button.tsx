import Image from "next/image";
import React, { type Ref, type RefObject } from "react";

interface RestrictButtonProps {
  blockCoolMode: RefObject<HTMLButtonElement | HTMLDivElement>;
  onClickOption: (option: "block" | "mute") => void;
  text: string;
  type: "block" | "mute";
}

const RestrictButton: React.FC<RestrictButtonProps> = ({
  blockCoolMode,
  onClickOption,
  text,
  type,
}) => {
  return (
    <button
      ref={blockCoolMode as Ref<HTMLButtonElement>}
      onClick={() => onClickOption(type)}
      className="rounded-lg cursor-pointer bg-deletion hover:bg-[#CF4C4C] text-darkGrey transition-all hover:scale-110 relative text-sm flex items-center gap-1.5 justify-center font-bold w-[120px] h-[40px] px-2 py-1.5"
    >
      <Image alt="mainnet logo" src="/assets/mainnet-black.svg" width={16} height={16} />
      <p
        className="max-w-20 break-words text-wrap"
        style={{
          lineHeight: "0.95rem",
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default RestrictButton;
