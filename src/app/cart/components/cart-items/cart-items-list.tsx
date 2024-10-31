import Image from "next/image";
import type { Address } from "viem";
import { useTranslation } from "react-i18next";
import { useEffect, useCallback, useRef } from "react";
import List from "react-virtualized/dist/commonjs/List";

import EFPLogo from "public/assets/logo.svg";
import type { ENSProfile } from "#/types/requests";
import type { ProfileStatsType } from "#/types/common";
import SocialProfilesItem, {
  type SocialProfileListProfile,
} from "#/components/profile-list/components/social-profiles-item";
import LoadingRow from "#/components/profile-list/components/list-item/loading-list-item";
import ProfileListItem from "#/components/profile-list/components/list-item/profile-list-item";

export interface ProfileListProfile {
  address: Address;
  ens?: ENSProfile;
  tags: string[];
  counts?: ProfileStatsType;
}

interface CartItemsListProps {
  listClassName?: string;
  profiles?: ProfileListProfile[];
  socialProfiles?: SocialProfileListProfile[];
  showTags?: boolean;
  createListItem?: boolean;
  loadingRows?: number;
  isLoading: boolean;
  loadingCartItems?: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  listClassName = "",
  profiles,
  socialProfiles,
  showTags,
  createListItem,
  loadingRows = 7,
  isLoading,
  loadingCartItems,
  containerRef,
}) => {
  const { t } = useTranslation();

  const isCreatingNewList =
    createListItem &&
    ((profiles && profiles?.length > 0) ||
      socialProfiles?.map((profile) => profile.profiles.length > 0).includes(true));

  const listRef = useRef<List>(null);

  let scrollTop = 0;
  const handleWheel = useCallback((event: WheelEvent) => {
    if (listRef.current) {
      // Adjust the scroll position of the div
      const maxScrollTop =
        listRef.current.props.rowCount * Number(listRef.current.props.rowHeight) -
        listRef.current.props.height;

      if (scrollTop < maxScrollTop || event.deltaY < 0) {
        listRef.current.scrollToPosition(scrollTop + event.deltaY);
        if (scrollTop + event.deltaY >= -20) scrollTop += event.deltaY;
      }
    }
  }, []);

  useEffect(() => {
    // Attach the wheel event listener to the window
    containerRef.current?.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup function to remove the event listener
    return () => {
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <div className={`flex flex-col w-full ${listClassName}`}>
      {isLoading ? (
        new Array(loadingRows).fill(1).map((_, i) => <LoadingRow key={i} showTags={showTags} />)
      ) : (
        <>
          {isCreatingNewList && (
            <div
              key={"new list"}
              className="flex w-[350px] sm:w-full items-center hover:bg-list ounded-xl gap-2 2xl:p-4 p-1.5 sm:p-2 sm:gap-3"
            >
              <Image
                src={EFPLogo}
                alt="EFP List"
                className="rounded-full h-[45px] w-[45px] md:h-[50px] md:w-[50px]"
              />
              <div className="flex flex-col md:flex-row md:items-center">
                <p className="text-lg font-bold w-fit sm:w-56 text-left">{t("mint name")}</p>
                <p className="font-bold text-sm sm:text-base text-left italic text-text/80">
                  {t("mint description")}
                </p>
              </div>
            </div>
          )}
          {socialProfiles?.map((social) => (
            <SocialProfilesItem key={social.platform} {...social} />
          ))}
          {(profiles?.length || 0) > 0 && (
            <List
              ref={listRef}
              autoWidth={true}
              key={"list"}
              height={window.innerHeight - 186}
              width={window.innerWidth}
              overscanRowCount={10}
              className="overflow-y-visible"
              estimatedRowSize={window.innerWidth > 1536 ? 82 : 74}
              rowCount={
                (profiles?.length || 0) +
                (loadingCartItems || 0) +
                (window.innerWidth > 1536 ? 2 : window.innerWidth > 1280 ? 3 : 2)
              }
              rowHeight={window.innerWidth > 1536 ? 82 : 74}
              rowRenderer={({ key, index, style }) => {
                const profile = profiles?.[index];
                if (!profile)
                  return (
                    <div style={style} key={key} className="opacity-0">
                      <LoadingRow showTags={showTags} />
                    </div>
                  );

                return (
                  <div className="w-full" key={key} style={style}>
                    <ProfileListItem
                      key={profile.address}
                      address={profile.address}
                      ensProfile={profile.ens}
                      showTags={true}
                      tags={profile.tags}
                      counts={profile.counts}
                      canEditTags={true}
                    />
                  </div>
                );
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CartItemsList;
