import type { Metadata } from 'next';

export const constructMetadata = ({
  title = "MyCorp Group | Global Multi-Sector Enterprise",
  description = "A premier collective driving Technology, Real Estate, and Logistics through decentralized infrastructure.",
  image = "/thumbnail.png", // Add a professional thumbnail in your public folder
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@mycorp_official",
    },
    icons,
    metadataBase: new URL('https://mycorp-backend-67ut.onrender.com'), // Update this to your Vercel URL later
  };
};

export const masterMetadata = constructMetadata();