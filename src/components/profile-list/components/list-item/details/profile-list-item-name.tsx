"use client";
import Link from "next/link";
import type { Address } from "viem";
import { ens_beautify } from "@adraffy/ens-normalize";

import { isValidEnsName } from "#/utils/ens";
import { cn, truncateAddress } from "#/lib/utilities";
import LoadingCell from "#/components/loaders/loading-cell";

interface ProfileListItemNameProps {
  name?: string | null;
  address: Address;
  showTags?: boolean;
  isCart?: boolean;
  isLoading?: boolean;
}

const ProfileListItemName: React.FC<ProfileListItemNameProps> = ({
  name,
  address,
  showTags,
  isCart,
  isLoading,
}) => {
  if (isLoading) {
    return <LoadingCell className="w-28 2xl:w-32 h-6 rounded-lg" />;
  }

  return (
    <Link href={`/${address}`} className={cn(!isCart && "w-full")}>
      <p
        className={`font-bold 2xl:text-lg text-start hover:scale-110 ${
          showTags
            ? isCart
              ? "truncate max-w-52"
              : "truncate w-full"
            : "w-fit max-w-full truncate"
        } hover:opacity-75 transition-all`}
      >
        {name && isValidEnsName(name) ? ens_beautify(name) : truncateAddress(address)}
      </p>
    </Link>
  );
};

export default ProfileListItemName;
