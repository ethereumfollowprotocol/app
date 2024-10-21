import type { Address } from "viem";
import { FaRegEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

import { cn } from "#/lib/utilities";
import EditModal from "./components/edit-modal";
import LoadingCell from "../loaders/loading-cell";
import { useTopEight } from "./hooks/use-top-eight";
import TopEightProfile from "./components/top-eight-profile";

interface TopEightProps {
  user: Address | string;
  isConnectedUserProfile?: boolean;
}

const TopEight: React.FC<TopEightProps> = ({ user, isConnectedUserProfile }) => {
  const {
    topEight,
    displayLimit,
    editModalOpen,
    setDisplayLimit,
    setEditModalOpen,
    topEightIsLoading,
    topEightIsRefetching,
  } = useTopEight(user);
  const { t } = useTranslation();

  return (
    <>
      {isConnectedUserProfile && editModalOpen && (
        <EditModal profiles={topEight || []} onClose={() => setEditModalOpen(false)} />
      )}
      <div className="glass-card relative xl:w-80 2xl:w-[602px] items-center justify-center w-full border-[3px] px-5 2xl:px-2 py-4 rounded-xl flex flex-col gap-4 xl:gap-4 border-[#FFDBD9] dark:border-[#a36d7d]">
        {isConnectedUserProfile && (
          <div
            onClick={() => setEditModalOpen(true)}
            className="absolute top-2 right-2.5 font-semibold text-sm flex gap-1 items-center text-text-neutral hover:text-text/70 cursor-pointer hover:scale-110 transition-all"
          >
            <FaRegEdit />
            <p>{t("edit")}</p>
          </div>
        )}
        <div
          className={cn(
            "flex gap-2 font-bold justify-center items-center",
            isConnectedUserProfile ? "mt-4" : "mt-2"
          )}
        >
          <h3 className="text-2xl">{t("top eight title")}</h3>
        </div>
        {topEight?.length === 0 && !(topEightIsLoading || topEightIsRefetching) && (
          <p className="font-medium italic text-lg my-16 text-center text-text">
            {t("no top eight")}
          </p>
        )}
        <div className="flex w-full flex-wrap justify-around transition-none sm:justify-between 2xl:justify-start items-start xl:gap-0 sm:gap-1">
          {!(topEightIsLoading || topEightIsRefetching) &&
            topEight
              ?.slice(0, displayLimit)
              .map((profile, index) => <TopEightProfile profile={profile} key={index} />)}
          {new Array(topEightIsLoading || topEightIsRefetching ? displayLimit : 0)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col w-28 xl:w-[128px] 2xl:w-36 py-4 px-0 items-center gap-2"
              >
                <LoadingCell className="h-[50px] w-[50px] rounded-full" />
                <LoadingCell className="h-7 w-24 rounded-lg" />
                <LoadingCell className="h-9 w-[110px] 2xl:w-[120px] 2xl:h-10 rounded-lg" />
              </div>
            ))}
        </div>
        {topEight.length > displayLimit && (
          <div
            className="text-2xl rounded-xl w-full p-2 justify-center cursor-pointer border-[3px] text-text/80 gap-2 flex lg:hidden font-semibold items-center"
            onClick={() => setDisplayLimit(displayLimit >= 8 ? 2 : 8)}
          >
            <IoIosArrowDown
              className={cn("transition-transform", displayLimit >= 8 && "rotate-180")}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TopEight;
