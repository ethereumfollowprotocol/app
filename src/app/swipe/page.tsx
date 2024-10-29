import type { Metadata } from "next";
import RecommendedCards from "./components/recommended-profiles";

export const metadata: Metadata = {
  title: "Swipe | EFP",
  openGraph: {
    title: "Swipe | EFP",
    siteName: "Swipe - Ethereum Follow Protocol",
    description: "Discover the team behind Ethereum Follow Protocol",
    url: "https://ethfollow.xyz/swipe",
    images: [
      {
        url: "https://ethfollow.xyz/assets/banners/swipe.png",
      },
    ],
  },
  twitter: {
    images: "https://ethfollow.xyz/assets/banners/swipe.png",
  },
};

const SwipePage = () => {
  return (
    <main className="w-full pt-[6.75rem] sm:pt-32 mb-4 px-2 text-center">
      <RecommendedCards />
    </main>
  );
};

export default SwipePage;
