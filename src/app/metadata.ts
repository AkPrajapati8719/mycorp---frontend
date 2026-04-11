import type { Metadata } from 'next';

export const constructMetadata = ({
  title = "MyCorp Group | Global Multi-Sector Enterprise",
  description = "A premier collective driving Technology, Real Estate, and Logistics through decentralized infrastructure. Engineering the frameworks of the future.",
  image = "/thumbnail.png", 
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata => {
  return {
    title: {
      default: title,
      template: `%s | MyCorp Group` // Automatically appends brand to sub-page titles
    },

    // 👇 ADD THIS SECTION RIGHT HERE 👇
    verification: {
      google: "WNNZDh-gkp0kEWbNxv3_Ia05HZqtghxjuoWt_pZ-8G8",
    },

    description,
    keywords: [
      "Global Infrastructure", 
      "Industrial Ecosystem", 
      "Neural AI Systems", 
      "Autonomous Logistics", 
      "MyCorp Group",
      "Institutional Trust"
    ],
    authors: [{ name: "MyCorp Engineering" }],
    creator: "MyCorp",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://mycorp-frontend.vercel.app", 
      siteName: "MyCorp Global",
      title,
      description,
      images: [
        { 
          url: image, 
          width: 1200, 
          height: 630, 
          alt: "MyCorp Industrial Vanguard Preview" 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@mycorp_official",
    },
    icons: {
      icon: icons,
      shortcut: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
    // ✅ Updated to your Vercel URL for Canonical Indexing
    metadataBase: new URL('https://mycorp-frontend.vercel.app'), 
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};

// Default export for layout.tsx
export const masterMetadata = constructMetadata();