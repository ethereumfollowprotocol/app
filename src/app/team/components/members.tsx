"use client";

import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import {
  TEAM_ROLES,
  TEAM_ADDRESSES,
  FOUNDATION_ROLES,
  FOUNDATION_ADDRESSES,
} from "#/lib/constants/team";
import LoadingCell from "#/components/loaders/loading-cell";
import { fetchProfileStats } from "#/api/fetchProfileStats";
import UserProfileCard from "#/components/user-profile-card";
import { fetchProfileDetails } from "#/api/fetchProfileDetails";

const Members = () => {
  const { data: teamProfiles, isLoading: teamIsLoading } = useQuery({
    queryKey: ["team", TEAM_ADDRESSES],
    queryFn: async () => {
      if (!TEAM_ADDRESSES) return [];

      const data = await Promise.all(
        TEAM_ADDRESSES.map(async (address) => await fetchProfileDetails(address))
      );
      return data;
    },
  });
  const { data: teamStats, isLoading: teamStatsIsLoading } = useQuery({
    queryKey: ["team", "stats", TEAM_ADDRESSES],
    queryFn: async () => {
      if (!TEAM_ADDRESSES) return [];

      const data = await Promise.all(
        TEAM_ADDRESSES.map(async (address) => await fetchProfileStats(address))
      );

      return data;
    },
  });

  const { data: foundationProfiles, isLoading: foundationIsLoading } = useQuery({
    queryKey: ["follow protocol foundation", FOUNDATION_ADDRESSES],
    queryFn: async () => {
      if (!FOUNDATION_ADDRESSES) return [];

      const data = await Promise.all(
        FOUNDATION_ADDRESSES.map(async (address) => await fetchProfileDetails(address))
      );
      return data;
    },
  });
  const { data: foundationStats, isLoading: foundationStatsIsLoading } = useQuery({
    queryKey: ["follow protocol foundation", "stats", FOUNDATION_ADDRESSES],
    queryFn: async () => {
      if (!FOUNDATION_ADDRESSES) return [];

      const data = await Promise.all(
        FOUNDATION_ADDRESSES.map(async (address) => await fetchProfileStats(address))
      );

      return data;
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <h2 className="font-bold text-4xl">{t("team")}</h2>
      <div className="flex flex-col w-full gap-16">
        <div className="flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-start">
          {teamProfiles?.map((profile, i) => (
            <div key={profile?.address} className="flex flex-col items-center gap-2">
              <p className="text-lg font-bold text-zinc-500 dark:text-zinc-200">{TEAM_ROLES[i]}</p>
              <UserProfileCard
                isResponsive={false}
                profile={profile}
                stats={teamStats?.[i]}
                isStatsLoading={teamStatsIsLoading}
                profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                showMoreOptions={true}
                // x={records?.['com.twitter'] ?? ''}
                // github={records?.['com.github'] ?? ''}
              />
            </div>
          ))}
          {teamIsLoading &&
            TEAM_ADDRESSES.map((address) => (
              <div key={address} className="flex flex-col items-center gap-2">
                <LoadingCell className="rounded-lg h-7 w-52" />
                <UserProfileCard
                  isResponsive={false}
                  isLoading={teamIsLoading}
                  // x={records?.['com.twitter'] ?? ''}
                  // github={records?.['com.github'] ?? ''}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl font-bold">Follow Protocol Foundation</h2>
          <div className="flex-row flex-wrap flex mx-auto lg:flex-row gap-8 align-middle justify-center items-start">
            {foundationProfiles?.map((profile, i) => (
              <div key={profile?.address} className="flex flex-col items-center gap-2">
                <p className="text-lg font-bold text-zinc-500 dark:text-zinc-200">
                  {FOUNDATION_ROLES[i]}
                </p>
                <UserProfileCard
                  isResponsive={false}
                  profile={profile}
                  stats={foundationStats?.[i]}
                  isStatsLoading={foundationStatsIsLoading}
                  profileList={profile?.primary_list ? Number(profile?.primary_list) : undefined}
                  showMoreOptions={true}
                  // x={records?.['com.twitter'] ?? ''}
                  // github={records?.['com.github'] ?? ''}
                />
              </div>
            ))}
            {foundationIsLoading &&
              FOUNDATION_ADDRESSES.map((address) => (
                <div key={address} className="flex flex-col items-center gap-2">
                  <LoadingCell className="rounded-lg h-7 w-52" />
                  <UserProfileCard
                    isResponsive={false}
                    isLoading={foundationIsLoading}
                    // x={records?.['com.twitter'] ?? ''}
                    // github={records?.['com.github'] ?? ''}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;
