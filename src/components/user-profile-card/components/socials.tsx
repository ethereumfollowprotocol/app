import { profileCardSocials } from "#/lib/constants";
import type { ProfileDetailsResponse } from "#/types/requests";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

interface SocialsProps {
  profile: ProfileDetailsResponse;
}

const Socials: React.FC<SocialsProps> = ({ profile }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {profileCardSocials.map((social) => (
        <a
          key={social.name}
          href={social.url(
            social.name === "etherscan" ? profile.address : profile.ens.records?.[social.name] || ""
          )}
          target="_blank"
          rel="noreferrer"
          className={
            profile.ens.records?.[social.name] || social.name === "etherscan"
              ? "opacity-100 hover:opacity-80 hover:scale-110 transition-all"
              : "opacity-20 pointer-events-none"
          }
        >
          <Image
            src={social.icon(resolvedTheme || "")}
            alt={social.name}
            width={36}
            height={36}
            className="rounded-full w-8 h-8 3xl:w-9 3xl:h-9"
          />
        </a>
      ))}
    </div>
  );
};

export default Socials;
