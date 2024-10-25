import React from "react";
import type { Address } from "viem";
import { useQuery } from "@tanstack/react-query";

import { resolveEnsProfile } from "#/utils/ens";
import type { ENSProfile } from "#/types/requests";
import FollowButton from "#/components/follow-button";
import FollowListItemName from "./follow-list-item-name";
import { cn } from "#/lib/utilities";

export interface FollowListItemProps {
  className?: string;
  address: Address;
  ensProfile?: ENSProfile;
  showFollowsYouBadges?: boolean;
  showTags?: boolean;
  tags: string[];
  counts?: {
    followers: number;
    following: number;
  };
  isFollowers?: boolean;
  canEditTags?: boolean;
  isBlockedList?: boolean;
  isBlockedBy?: boolean;
}

const FollowListItem: React.FC<FollowListItemProps> = React.memo(
  ({
    className = "",
    address,
    ensProfile,
    showFollowsYouBadges,
    showTags,
    tags,
    counts,
    isFollowers,
    canEditTags,
    isBlockedList,
    isBlockedBy,
  }) => {
    const { data: fetchedEnsProfile, isLoading: isEnsProfileLoading } = useQuery({
      queryKey: ["ens metadata", address],
      queryFn: async () => (ensProfile ? ensProfile : await resolveEnsProfile(address)),
    });

    const profileName = fetchedEnsProfile?.name;
    const profileAvatar = fetchedEnsProfile?.avatar;

    return (
      <div
        className={cn(
          "flex items-center justify-between hover:bg-text/5 transition-all p-1.5 2xl:p-2 rounded-xl",
          className
        )}
      >
        {/* Left section: Avatar, Name, and Tags */}
        <FollowListItemName
          address={address}
          avatarUrl={profileAvatar}
          name={profileName}
          counts={counts}
          showFollowsYouBadges={showFollowsYouBadges}
          showTags={showTags}
          tags={tags}
          isFollowers={isFollowers}
          canEditTags={canEditTags}
          isEnsProfileLoading={isEnsProfileLoading}
          isBlockedList={isBlockedList}
        />
        {/* Right section: Follow Button with consistent width */}
        <FollowButton isBlockedBy={isBlockedBy} address={address} />
      </div>
    );
  }
);

export default FollowListItem;
