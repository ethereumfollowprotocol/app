import { useAccount } from "wagmi";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  useContext,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from "react";

import { useEFPProfile } from "./efp-profile-context";
import { RECOMMENDED_PROFILES_LIMIT } from "#/lib/constants";
import type { ProfileDetailsResponse } from "#/types/requests";
import { fetchRecommendedProfiles } from "#/api/fetchRecommendedProfiles";

// Define the type for the profile context
type RecommendedProfilesContextType = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentProfile: number;
  setCurrentProfile: Dispatch<SetStateAction<number>>;
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
  const [currentProfile, setCurrentProfile] = useState(0);
  const [page, setPage] = useState(0);

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

  // const recommendedProfiles =
  //   recommendedProfilesFetched?.pages
  //     ?.reduce((acc, el) => [...acc, ...el.recommended], [] as ProfileDetailsResponse[])
  //     .reverse() || [];

  const recommendedProfiles = useMemo(() => {
    const pageIndex = recommendedProfilesFetched?.pageParams.indexOf(page) || 0;
    return [
      ...(recommendedProfilesFetched?.pages[pageIndex]?.recommended || []),
      ...(pageIndex === 0
        ? []
        : recommendedProfilesFetched?.pages[pageIndex - 1]?.recommended.slice(0, 1) || []),
    ];
  }, [page, recommendedProfilesFetched]);

  return (
    <RecommendedProfilesContext.Provider
      value={{
        page,
        setPage,
        currentProfile,
        setCurrentProfile,
        recommendedProfiles,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
      }}
    >
      {children}
    </RecommendedProfilesContext.Provider>
  );
};

export const useRecommendedProfiles = (): RecommendedProfilesContextType => {
  const context = useContext(RecommendedProfilesContext);
  if (context === undefined) {
    throw new Error("useEFPProfile must be used within an EFPProfileProvider");
  }
  return context;
};
