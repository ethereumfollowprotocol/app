import type React from "react";
import { useTranslation } from "react-i18next";
import Image, { type StaticImageData } from "next/image";

import Tags from "../tags";
import { formatNumber } from "#/utils/formatNumber";
import SocialFollowButton from "./social-follow-button";
import type { ImportPlatformType } from "#/types/common";
import type { ProfileListProfile } from "#/app/cart/components/cart-items/cart-items-list";

export interface SocialProfileListProfile {
  platform: string;
  profiles: ProfileListProfile[];
  icon: StaticImageData;
}

const SocialProfilesItem: React.FC<SocialProfileListProfile> = ({ platform, profiles, icon }) => {
  const { t } = useTranslation();

  if (profiles.length === 0) return null;

  return (
    <div
      key={platform}
      className="flex sm:w-full justify-between hover:bg-list rounded-xl items-center 2xl:p-4 p-1.5 sm:p-2"
    >
      <div
        className="flex items-center gap-2 sm:gap-3"
        style={{
          width: "calc(100% - 120px)",
        }}
      >
        <Image
          src={icon}
          alt={platform}
          className="rounded-xl h-[45px] w-[45px] 2xl:h-[50px] 2xl:w-[50px]"
        />
        <div className="flex flex-col items-start sm:items-center sm:flex-row gap-1 w-full sm:gap-2 2xl:gap-4">
          <div className="flex flex-col items-start min-w-52 max-w-52 gap-px">
            <p className="text-lg font-bold">
              {t("import from")} <span className="capitalize">{platform}</span>
            </p>
            <p className="font-medium text-sm text-text/80">
              {t("adding")}: {formatNumber(profiles.length)}
            </p>
          </div>
          <Tags
            profiles={profiles}
            platform={platform as ImportPlatformType}
            canEditTags={true}
            isBlockedList={false}
          />
        </div>
      </div>
      <SocialFollowButton profiles={profiles} />
    </div>
  );
};

export default SocialProfilesItem;
