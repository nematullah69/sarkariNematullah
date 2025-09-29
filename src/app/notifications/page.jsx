// app/notifications/page.tsx

import NotificationsPage from "./NotificationsPageClient"; // Your client component

export const metadata = {
  title: "Latest Notifications & Circulars 2025 | Govt Exams Portal", // 57/60
  description:
    "Stay updated with latest government notifications & circulars. View official notifications for exams, recruitment, and results.", // 155/160
  keywords:
    "Government Notifications, Exam Notifications, Official Notifications, Recruitment Alerts", // 99/100
  robots: "index, follow",
  openGraph: {
    title: "Latest Notifications & Circulars 2025 | Govt Exams Portal",
    description:
      "Stay updated with latest government notifications & circulars. View official notifications for exams, recruitment, and results.",
    url: "https://yourwebsite.com/notifications",
    siteName: "Govt Exams Portal",
    images: [
      {
        url: "https://yourwebsite.com/default-og-notifications.png",
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
    title: "Latest Notifications & Circulars 2025 | Govt Exams Portal",
    description:
      "Stay updated with latest government notifications & circulars. View official notifications for exams, recruitment, and results.",
    images: ["https://yourwebsite.com/default-og-notifications.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://yourwebsite.com/notifications",
  },
};

export default function Page() {
  return <NotificationsPage />;
}
