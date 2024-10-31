import Image from "next/image";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

import { cn } from "#/lib/utilities";
import TagsDropdown from "./tags-dropdown";
import type { ProfileListProfile } from "../..";
import { useCart } from "#/contexts/cart-context";
import Plus from "public/assets/icons/plus-squared.svg";
import type { ImportPlatformType } from "#/types/common";

interface TagsProps {
  profiles: ProfileListProfile[];
  platform?: ImportPlatformType;
  canEditTags?: boolean;
  isBlockedList?: boolean;
  isCart?: boolean;
}

const Tags: React.FC<TagsProps> = ({ profiles, platform, canEditTags, isBlockedList, isCart }) => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const clickAwayTagDropwdownRef = useClickAway<HTMLDivElement>(() => {
    setTagDropdownOpen(false);
  });

  const address = profiles?.[0]?.address;
  const { hasListOpRemoveRecord, hasListOpRemoveTag, hasListOpAddTag } = useCart();
  const isBeingRemoved = address ? hasListOpRemoveRecord(address) : false;
  const isBeingUnrestricted = address
    ? hasListOpRemoveTag({ address, tag: "block" }) || hasListOpRemoveTag({ address, tag: "mute" })
    : false;
  const isBeingRestricted = address
    ? hasListOpAddTag({ address, tag: "block" }) || hasListOpAddTag({ address, tag: "mute" })
    : false;
  const isRestriction = isBeingUnrestricted || isBeingRestricted;

  return (
    <div
      className={cn(
        "relative min-h-8 flex max-w-[90%] flex-wrap gap-2 items-center",
        // isCart
        //   ? "xl:max-w-[55%] 2xl:max-w-[65%] 3xl:max-w-[75%]"
        //   : "xl:max-w-[45%] 2xl:max-w-[42.5%] 3xl:max-w-[47.5%]",
        (isBeingRemoved || isRestriction) && "hidden"
      )}
      ref={clickAwayTagDropwdownRef}
    >
      {canEditTags && (
        <button
          className="p-1.5 rounded-full hover:opacity-80 hover:scale-110 bg-zinc-300"
          onClick={(e) => {
            e.stopPropagation();
            setTagDropdownOpen(!tagDropdownOpen);
          }}
        >
          <Image src={Plus} alt="Add Tag" width={12} />
        </button>
      )}
      <TagsDropdown
        profiles={profiles}
        platform={platform}
        open={tagDropdownOpen}
        canEditTags={canEditTags}
        isBlockedList={isBlockedList}
      />
      {canEditTags && tagDropdownOpen && (
        <div
          className="fixed z-30 top-0 left-0 w-full h-full bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setTagDropdownOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default Tags;
