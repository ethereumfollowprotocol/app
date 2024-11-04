import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { ProfileListProfile } from "../..";
import { tagRegex } from "#/lib/constants/regex";
import { useCart } from "#/contexts/cart-context";
import Plus from "public/assets/icons/plus-squared.svg";
import type { ImportPlatformType } from "#/types/common";
import { useTagsDropdown } from "../../hooks/use-tags-dropdown";

interface TagsDropdownProps {
  open: boolean;
  canEditTags?: boolean;
  profiles: ProfileListProfile[];
  platform?: ImportPlatformType;
  isBlockedList?: boolean;
}

const TagsDropdown: React.FC<TagsDropdownProps> = ({
  profiles,
  platform,
  open,
  canEditTags,
  isBlockedList,
}) => {
  const { t } = useTranslation();
  const { hasListOpAddTag, hasListOpRemoveTag } = useCart();
  const {
    addTag,
    removeTag,
    recentTags,
    tagInputRef,
    addCustomTag,
    displayedTags,
    customTagInput,
    setCustomTagInput,
  } = useTagsDropdown(profiles, platform, canEditTags, isBlockedList);

  useEffect(() => {
    if (tagInputRef.current) tagInputRef.current.focus();
  }, []);

  return (
    <>
      {open && (
        <div className="absolute z-[9999] flex flex-col w-60 gap-2 left-0 top-10 glass-card bg-neutral p-2 border-[3px] border-grey rounded-lg">
          <div className="w-full flex items-center gap-1.5 justify-between bg-zinc-300 dark:bg-zinc-400 rounded-lg font-bold p-1 text-left">
            <input
              ref={tagInputRef}
              placeholder={t("custom tag")}
              value={customTagInput}
              onChange={(e) => {
                const validString = e.target.value.match(tagRegex)?.join("");
                if (e.target.value.length === 0 || validString)
                  setCustomTagInput(e.target.value.trim().toLowerCase());
              }}
              maxLength={80}
              onKeyDown={(e) => {
                if (e.key === "Enter") addCustomTag();
              }}
              className="p-1 pl-2 rounded-md lowercase bg-neutral/70 w-full"
            />
            <button
              className="flex items-center rounded-full hover:scale-110 transition-all hover:opacity-80 bg-white dark:bg-zinc-300 justify-center p-1.5"
              onClick={(e) => {
                e.stopPropagation();
                addCustomTag();
              }}
            >
              <Image src={Plus} alt="Add Tag" height={16} width={16} />
            </button>
          </div>
          <div className="w-full flex max-w-full flex-wrap items-center gap-2">
            {recentTags.map((tag, i) => (
              <button
                key={`${profiles?.[0]?.address} ${tag} ${i}`}
                className="font-bold py-1.5 hover:scale-110 transition-all text-sm truncate px-3 hover:opacity-80 text-darkGrey bg-zinc-300 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  addTag(tag);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      {displayedTags.map((tag, i) => {
        const address = profiles?.[0]?.address;
        if (!address) return null;

        const addingTag = hasListOpAddTag({ address, tag });
        const removingTag = hasListOpRemoveTag({ address, tag });

        return (
          <div
            key={tag + i}
            className={`relative ${open ? "z-40" : "z-10"} max-w-full ${
              canEditTags ? "hover:scale-110 transition-all" : ""
            }`}
          >
            <button
              className={`font-bold py-1 px-2 md:py-1.5 max-w-full w-fit md:px-3 text-darkGrey truncate text-sm hover:opacity-80 rounded-full ${
                canEditTags && removingTag ? "bg-deletion" : "bg-zinc-300"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (canEditTags || !isBlockedList) removeTag(tag);
              }}
            >
              {tag}
            </button>
            {(removingTag || addingTag) && canEditTags && (
              <div className="absolute h-4 w-4 rounded-full -top-1 -right-1 bg-green-400" />
            )}
          </div>
        );
      })}
    </>
  );
};

export default TagsDropdown;
