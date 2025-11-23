// app/notifications/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import NotificationsPage from "./NotificationsPageClient"; // ✅ Your client component

// ---------------------------
// ✅ Metadata Configuration
// ---------------------------
export const metadata: Metadata = {
  title: "Latest Govt Job Notifications & Circulars 2025 | Government Exam",
  description:
    "Stay updated with the latest official government job notifications, circulars, and announcements for exams, recruitment, results, and admit cards.",
  keywords:
    "Sarkari Notifications, Government Notifications, Exam Notifications 2025, Official Circulars, Recruitment Alerts, Govt Job News",
  applicationName: "Government Exam",
  authors: [{ name: "Government Exam", url: "https://governmentexam.online" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Latest Govt Job Notifications & Circulars 2025 | Government Exam",
    description:
      "Stay updated with the latest official government job notifications, circulars, and announcements for exams, recruitment, results, and admit cards.",
    url: "https://governmentexam.online/notifications",
    siteName: "Government Exam",
    images: [
      {
        url: "https://governmentexam.online/default-og-notifications.png",
        width: 1200,
        height: 630,
        alt: "Government Notifications",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Govt Job Notifications & Circulars 2025 | Government Exam",
    description:
      "Stay updated with the latest official government job notifications, circulars, and announcements for exams, recruitment, results, and admit cards.",
    images: ["https://governmentexam.online/default-og-notifications.png"],
    creator: "@YourTwitterHandle", // ⚠️ Replace with your actual Twitter handle
  },
  alternates: {
    canonical: "https://governmentexam.online/notifications",
  },
};

// ---------------------------
// ✅ JSON-LD Structured Data
// ---------------------------
function NotificationsListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Latest Govt Job Notifications & Circulars 2025 | Government Exam",
    description:
      "Stay updated with the latest official government job notifications, circulars, and announcements for exams, recruitment, results, and admit cards.",
    url: "https://governmentexam.online/notifications",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://governmentexam.online/notifications",
    },
    publisher: {
      "@type": "Organization",
      name: "Government Exam",
      url: "https://governmentexam.online",
      logo: {
        "@type": "ImageObject",
        url: "https://governmentexam.online/default-og-notifications.png",
      },
    },
  };

  return (
    <Script
      id="notifications-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ---------------------------
// ✅ Page Component
// ---------------------------
export default function Page() {
  return (
    <>
      <NotificationsListJsonLd />
      <NotificationsPage />
    </>
  );
}