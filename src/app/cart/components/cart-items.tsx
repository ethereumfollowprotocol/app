import React, { useMemo } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { useCart } from "#/contexts/cart-context";
import { FollowList } from "#/components/follow-list";
import FarcasterIcon from "public/assets/icons/farcaster.svg";
import { useEFPProfile } from "#/contexts/efp-profile-context";

interface CartItemsProps {
  setClearCartModalOpen: (open: boolean) => void;
}

const CartItems = ({ setClearCartModalOpen }: CartItemsProps) => {
  const { t } = useTranslation();
  const { selectedList, roles } = useEFPProfile();
  const { totalCartItems, loadingCartItems, cartAddresses, socialAddresses } = useCart();
  const hasCreatedEfpList = !!selectedList;

  const profiles = useMemo(() => {
    return cartAddresses.map((address) => ({
      address,
      tags: [],
    }));
  }, [cartAddresses]);

  const socialProfiles = [
    {
      platform: "farcaster",
      profiles: socialAddresses.farcaster.map((address) => ({
        address,
        tags: [],
      })),
      icon: FarcasterIcon,
    },
    // {
    //   platform: 'lens',
    //   profiles: socialAddresses.lens.map(address => ({
    //     address,
    //     tags: []
    //   })),
    //   icon: LensIcon
    // }
  ];

  return (
    <>
      <div className="flex justify-between gap-2 flex-row items-center px-3 md:px-4">
        <h3 className="font-bold text-left text-xl sm:text-3xl xxs:w-2/3">
          {t("cart unc-changes")}
        </h3>
        {totalCartItems > 0 && (
          <button
            className="flex gap-2 cursor-pointer hover:scale-110 transition-transform items-center hover:opacity-80"
            onClick={() => setClearCartModalOpen(true)}
          >
            <p className="font-bold text-nowrap">{t("clear cart")}</p>
            <FiTrash2 className="text-xl" />
          </button>
        )}
      </div>
      {totalCartItems === 0 && !loadingCartItems && (
        <div className="font-bold h-28 xl:h-80 px-4 justify-center flex text-lg items-center italic">
          {t("empty cart")}
        </div>
      )}
      <FollowList
        isLoading={false}
        profiles={profiles}
        socialProfiles={socialProfiles}
        listClassName="rounded-xl gap-1 2xl:gap-0"
        listItemClassName="rounded-xl 2xl:p-4 p-1.5 sm:p-2"
        showTags={true}
        createListItem={!hasCreatedEfpList}
        canEditTags={roles?.isManager}
        loadingCartItems={loadingCartItems}
      />
    </>
  );
};

export default CartItems;
