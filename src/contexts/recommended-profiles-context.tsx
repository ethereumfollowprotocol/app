import { useAccount } from "wagmi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext, createContext, useState } from "react";

import { useCart } from "./cart-context";
import { useEFPProfile } from "./efp-profile-context";
import { RECOMMENDED_PROFILES_LIMIT } from "#/lib/constants";
import type { ProfileDetailsResponse } from "#/types/requests";
import { fetchRecommendedProfiles } from "#/api/fetchRecommendedProfiles";

// Define the type for the profile context
type RecommendedProfilesContextType = {
  gone: Set<any>;
  recommendedProfiles: ProfileDetailsResponse[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onSwipeRight: (index: number) => void;
  fetchNextPage: () => void;
};

type Props = {
  children: React.ReactNode;
};

const RecommendedProfilesContext = createContext<RecommendedProfilesContextType | undefined>(
  undefined
);

export const RecommendedProfilesProvider: React.FC<Props> = ({ children }) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out

  const { addCartItem } = useCart();
  const { selectedList } = useEFPProfile();
  const { address: userAddress } = useAccount();

  const {
    data: recommendedProfilesFetched,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommended profiles", userAddress, selectedList],
    queryFn: ({ pageParam = 0 }) => {
      if (!(userAddress && selectedList)) return { recommended: [], nextPageParam: 0 };

      return fetchRecommendedProfiles(
        userAddress,
        selectedList,
        RECOMMENDED_PROFILES_LIMIT,
        pageParam
      );
    },
    getNextPageParam: (lastPage) => lastPage?.nextPageParam,
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const recommendedProfiles =
    recommendedProfilesFetched?.pages
      ?.reduce((acc, el) => [...acc, ...el.recommended], [] as ProfileDetailsResponse[])
      .reverse() || [];

  const onSwipeRight = (index: number) => {
    if (recommendedProfiles[index]?.address) {
      addCartItem({
        // @ts-ignore
        listOp: listOpAddListRecord(recommendedProfiles[index].address),
      });
    }
  };

  return (
    <RecommendedProfilesContext.Provider
      value={{
        gone,
        isLoading,
        hasNextPage,
        onSwipeRight,
        fetchNextPage,
        isFetchingNextPage,
        recommendedProfiles,
      }}
    >
      {children}
    </RecommendedProfilesContext.Provider>
  );
};

export const useRecommendedProfiles = (): RecommendedProfilesContextType => {
  const context = useContext(RecommendedProfilesContext);
  if (context === undefined) {
    throw new Error("useRecommendedProfiles must be used within an RecommendedProfilesProvider");
  }
  return context;
};
