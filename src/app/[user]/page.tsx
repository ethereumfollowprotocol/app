import type { Metadata } from "next";
import { isAddress, isHex } from "viem";

import UserInfo from "./components/user-info";
import { truncateAddress } from "#/lib/utilities";

interface Props {
  params: { user: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const user = isAddress(params.user) ? params.user : params.user;
  const truncatedUser = isAddress(params.user)
    ? (truncateAddress(params.user) as string)
    : params.user;
  const isList = Number.isInteger(Number(user)) && !(isAddress(user) || isHex(user));

  return {
    title: `${isList ? `List #${user}` : truncatedUser} | EFP`,
    openGraph: {
      title: `${isList ? `List #${user}` : truncatedUser} | EFP`,
      siteName: `${isList ? `List #${user}` : truncatedUser} - EFP profile`,
      description: `${isList ? `List #${user}` : truncatedUser} - EFP profile`,
      url: `https://ethfollow.xyz/${user}`,
      images: [
        {
          url: `https://ethfollow.xyz/og?user=${user}`,
        },
      ],
    },
    twitter: {
      images: `https://ethfollow.xyz/og?user=${user}`,
    },
  };

  // const isList = Number.isInteger(Number(user)) && !isAddress(user)

  // try {
  //   const response = (await fetch(
  //     `${process.env.NEXT_PUBLIC_EFP_API_URL}/${isList ? 'lists' : 'users'}/${user}/account`
  //   ).then(res => res.json())) as AccountResponseType

  //   const fetchedUser =
  //     isList && response.primary_list !== user
  //       ? `List #${user}`
  //       : response.address
  //         ? response.ens.name || truncateAddress(response.address)
  //         : isAddress(user)
  //           ? truncateAddress(user)
  //           : isList
  //             ? `List #${user}`
  //             : user

  //   return {
  //     title: `${fetchedUser} | EFP`,
  //     openGraph: {
  //       title: `${fetchedUser} | EFP`,
  //       siteName: `${fetchedUser} - EFP profile`,
  //       description: `${fetchedUser} - EFP profile`,
  //       url: `https://ethfollow.xyz/${response.address ? response.address : user}`,
  //       images: [
  //         {
  //           url: `https://ethfollow.xyz/og?user=${user}`
  //         }
  //       ]
  //     },
  //     twitter: {
  //       images: `https://ethfollow.xyz/og?user=${user}`
  //     }
  //   }
  // } catch (err: unknown) {
  //   return { title: `${user} | EFP` }
  // }
}

const UserPage = ({ params }: Props) => {
  return (
    <main className="flex overflow-hidden h-screen w-full justify-between xl:justify-center gap-y-4 flex-col md:flex-row flex-wrap xl:flex-nowrap items-start xl:gap-6 mt-[108px] sm:mt-28 md:mt-32 xl:mt-0 px-4 lg:px-8">
      <UserInfo user={params.user} />
    </main>
  );
};

export default UserPage;
