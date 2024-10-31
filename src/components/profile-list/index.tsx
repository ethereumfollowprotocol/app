import type { Address } from "viem";

import type { ENSProfile } from "#/types/requests";
import type { ProfileStatsType } from "#/types/common";
import LoadingRow from "./components/list-item/loading-list-item";
import ProfileListItem from "./components/list-item/profile-list-item";

export interface ProfileListProfile {
  address: Address;
  ens?: ENSProfile;
  tags: string[];
  counts?: ProfileStatsType;
}

interface ProfileListProps {
  profiles?: ProfileListProfile[];
  showFollowsYouBadges?: boolean; // Handle showing "Follows you" badges in the ProfileList
  showTags?: boolean;
  loadingRows?: number;
  isLoading: boolean;
  isLoadingMore?: boolean;
  canEditTags?: boolean;
  isBlockedList?: boolean; // If the list is displaying blocked and blocked by profiles
  isBlockedBy?: boolean; // Used to handle the "Block Back" on FollowButton
}

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  showFollowsYouBadges,
  showTags,
  loadingRows = 7,
  isLoading,
  isLoadingMore,
  canEditTags,
  isBlockedList,
  isBlockedBy,
}) => {
  const displayLoadingRows = isLoadingMore || isLoading;

  return (
    <div className="flex flex-col w-full gap-2 2xl:gap-3">
      {profiles?.map(({ address, tags, ens, counts }) => (
        <ProfileListItem
          key={address + tags.join(",")}
          address={address}
          ensProfile={ens}
          showFollowsYouBadges={showFollowsYouBadges}
          showTags={showTags}
          tags={tags}
          counts={counts}
          canEditTags={canEditTags}
          isBlockedList={isBlockedList}
          isBlockedBy={isBlockedBy}
        />
      ))}
      {displayLoadingRows &&
        new Array(loadingRows).fill(1).map((_, i) => <LoadingRow key={i} showTags={showTags} />)}
    </div>
  );
};

export default ProfileList;
