import type { Metadata } from "next";
import RecommendedCards from "./components/recommended-profiles";

export const metadata: Metadata = {
  title: "Recommended | EFP",
  openGraph: {
    title: "Recommended | EFP",
    siteName: "Recommended - Ethereum Follow Protocol",
    description: "Discover the team behind Ethereum Follow Protocol",
    url: "https://ethfollow.xyz/recommended",
    images: [
      {
        url: "https://ethfollow.xyz/assets/banners/recommended.png",
      },
    ],
  },
  twitter: {
    images: "https://ethfollow.xyz/assets/banners/recommended.png",
  },
};

const RecommendedPage = () => {
  return (
    <main className="w-full pt-28 sm:pt-32 mb-4 px-4 text-center">
      <RecommendedCards />
    </main>
  );
};

export default RecommendedPage;
