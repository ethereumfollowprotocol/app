import { useAccount } from "wagmi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext, createContext, useState, useEffect } from "react";

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

  const { selectedList } = useEFPProfile();
  const { address: userAddress } = useAccount();

  useEffect(() => {
    gone.clear();
  }, [selectedList]);

  const {
    data: recommendedProfilesFetched,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommended profiles", userAddress, selectedList],
    queryFn: ({ pageParam = 0 }) => {
      if (!userAddress) return { recommended: [], nextPageParam: 0 };

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
    recommendedProfilesFetched?.pages?.reduce(
      (acc, el) => [...acc, ...el.recommended],
      [] as ProfileDetailsResponse[]
    ) || [];

  return (
    <RecommendedProfilesContext.Provider
      value={{
        gone,
        isLoading,
        hasNextPage,
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