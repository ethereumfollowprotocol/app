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
  listClassName?: string;
  listItemClassName?: string;
  profiles?: ProfileListProfile[];
  showFollowsYouBadges?: boolean; // Handle showing "Follows you" badges in the ProfileList
  showTags?: boolean;
  loadingRows?: number;
  isLoading: boolean;
  isLoadingMore?: boolean;
  canEditTags?: boolean;
  isBlockedList?: boolean; // If the list is displaying blocked and blocked by profiles
  isBlockedBy?: boolean; // Used to handle the "Block Back" on FollowButton
  isFollowers?: boolean; // If the list is displaying followers
}

const ProfileList: React.FC<ProfileListProps> = ({
  listClassName = "",
  listItemClassName = "",
  profiles,
  showFollowsYouBadges,
  showTags,
  loadingRows = 7,
  isLoading,
  isLoadingMore,
  canEditTags,
  isBlockedList,
  isBlockedBy,
  isFollowers,
}) => {
  const displayLoadingRows = isLoadingMore || isLoading;

  return (
    <div className={`flex flex-col w-full ${listClassName}`}>
      {profiles?.map(({ address, tags, ens, counts }) => (
        <ProfileListItem
          className={listItemClassName}
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
          isFollowers={isFollowers}
        />
      ))}
      {displayLoadingRows &&
        new Array(loadingRows)
          .fill(1)
          .map((_, i) => <LoadingRow key={i} className={listItemClassName} showTags={showTags} />)}
    </div>
  );
};

export default ProfileList;
