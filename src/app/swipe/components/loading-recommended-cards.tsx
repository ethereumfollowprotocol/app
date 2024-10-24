import { useTranslation } from "react-i18next";
import UserProfileCard from "#/components/user-profile-card";
import type { ProfileDetailsResponse } from "#/types/requests";

interface LoadingRecommendedCardsProps {
  gone: Set<number>;
  isLoading: boolean;
  userAddress?: string;
  isFetchingNextPage: boolean;
  recommendedProfiles: ProfileDetailsResponse[];
}

const LoadingRecommendedCards = ({
  gone,
  isLoading,
  userAddress,
  isFetchingNextPage,
  recommendedProfiles,
}: LoadingRecommendedCardsProps) => {
  const { t } = useTranslation();

  return userAddress ? (
    gone.size === recommendedProfiles.length && !(isFetchingNextPage || isLoading) ? (
      <div className="flex border-[3px] items-center border-[#FFDBD9] dark:border-[#a36d7d] halloween:border-[#a36d7d] sm:mr-[14px] rounded-xl bg-neutral h-[536px] w-full xxs:max-w-92">
        <p className="text-center w-full text-lg font-semibold px-6">{t("no more profiles")}</p>
      </div>
    ) : (
      (isLoading || isFetchingNextPage || recommendedProfiles.length === 0) &&
      new Array(3).fill(1).map((_, i) => (
        <div
          className="h-fit w-full xxs:max-w-92 absolute top-0 z-10 sm:mr-[14px]"
          key={i}
          style={{
            marginTop: `${30 - i * 10}px`,
          }}
        >
          <UserProfileCard
            isLoading={true}
            isResponsive={false}
            hideFollowButton={true}
            isRecommended={true}
          />
        </div>
      ))
    )
  ) : (
    <div className="h-fit w-full sm:max-w-92 absolute top-0 z-10 sm:mr-[14px]">
      <UserProfileCard isResponsive={false} hideFollowButton={true} isRecommended={true} />
    </div>
  );
};

export default LoadingRecommendedCards;
