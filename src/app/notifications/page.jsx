// app/notifications/page.tsx

import NotificationsPage from "./NotificationsPageClient"; // Your client component

export const metadata = {
  // ✅ Title ~55 chars (limit 60 - 5%) - Updated Site Name
  title: "Latest Govt Job Notifications & Circulars 2025 | Government Exam", 
  
  // ✅ Description ~150 chars (limit 160 - 5%) - Updated for clarity
  description:
    "Stay updated with the latest official government job notifications, circulars, and announcements for exams, recruitment, results, and admit cards.", 
  
  // ✅ Keywords ~99 chars (limit 100 - 5%) - Focused on Sarkari/Govt
  keywords:
    "Sarkari Notifications, Government Notifications, Exam Notifications 2025, Official Circulars, Recruitment Alerts, Govt Job News", 
  robots: "index, follow",
  openGraph: {
    title: "Latest Govt Job Notifications & Circulars 2025 | Government Exam",
    description:
      "Stay updated with the latest official government job notifications, circulars, and announcements for exams, recruitment, results, and admit cards.",
    url: "https://governmentexam.online/notifications",
    siteName: "Government Exam", // ➡️ Updated Site Name
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
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://governmentexam.online/notifications",
  },
};

export default function Page() {
  return <NotificationsPage />;
}