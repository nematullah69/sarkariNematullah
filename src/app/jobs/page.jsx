// src/app/jobs/page.jsx (Server Component)

export const metadata = {
  // ✅ Title ~57 chars (limit 60 - 5%)
  title: "Latest Govt & Private Jobs 2025 | Jobs Portal",

  // ✅ Description ~150 chars (limit 160 - 5%)
  description:
    "Find the latest government and private job openings in India. Apply online for free, search by exam, and stay updated with new vacancies in 2025.",

  // ✅ Keywords ~93 chars (limit 100 - 5%)
  keywords: [
    "govt jobs 2025",
    "private jobs 2025",
    "latest jobs India",
    "apply online jobs",
    "sarkari jobs",
    "job portal India",
  ],

  authors: [{ name: "Jobs Portal India", url: "https://www.yourwebsite.com" }],
  creator: "Jobs Portal India",
  publisher: "Jobs Portal India",

  openGraph: {
    title: "Latest Govt & Private Jobs 2025 | Jobs Portal",
    description:
      "Find the latest government and private job openings in India. Apply online for free, search by exam, and stay updated with new vacancies in 2025.",
    url: "https://www.yourwebsite.com/jobs",
    siteName: "Jobs Portal India",
    images: [
      {
        url: "https://www.yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jobs Portal India - Latest Job Openings 2025",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Latest Govt & Private Jobs 2025 | Jobs Portal",
    description:
      "Find the latest government and private job openings in India. Apply online for free, search by exam, and stay updated with new vacancies in 2025.",
    images: ["https://www.yourwebsite.com/og-image.jpg"],
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
  },

  alternates: {
    canonical: "https://www.yourwebsite.com/jobs",
  },
};

import JobsPageClient from "./JobsPageClient";

export default function JobsPage() {
  return <JobsPageClient />;
}
