// app/notifications/[id]/page.tsx

import NotificationDetailsPageClient from "./NotificationDetailsPageClient"; // your client component
import Script from "next/script";
import { Metadata } from "next";

interface Notification {
  id: string;
  title: string;
  organization: string;
  department: string;
  category: string;
  status: string;
  eligibility: string;
  importantDates: { label: string; value: string; highlight?: boolean }[];
  details: string;
  officialLink: string;
  releaseDate: string;
  applicationStart?: string;
  applicationEnd?: string;
  examDate?: string;
  imageUrl?: string;
}

// ✅ Fetch Notification by ID
async function getNotification(id: string): Promise<Notification | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/notificationsData.json`, { cache: "force-cache" });
    const data: Notification[] = await res.json();
    return data.find((n) => n.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to fetch notification data:", err);
    return null;
  }
}

// ✅ Helper → Trim text with safe margin
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const notification = await getNotification(params.id);

  if (!notification) {
    return {
      title: "Notification Not Found | Govt Exams Portal",
      description: "Notification details not found. Check other notifications for exams and recruitment.",
      robots: "noindex, follow",
    };
  }

  const seoTitle = trimText(`${notification.title} | ${notification.organization} Notification 2025`, 60);
  const seoDesc = trimText(
    `${notification.details} Official notification released on ${notification.releaseDate}. Apply from ${notification.applicationStart} to ${notification.applicationEnd}.`,
    160
  );
  const seoKeywords = trimText(
    [notification.title, notification.organization, notification.department, notification.category, "Government Notifications 2025"].join(
      ", "
    ),
    100
  );

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://yourwebsite.com/notifications/${notification.id}`,
      siteName: "Govt Exams Portal",
      images: [
        {
          url: notification.imageUrl || "https://yourwebsite.com/default-og-notification.png",
          width: 1200,
          height: 630,
          alt: notification.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [notification.imageUrl || "https://yourwebsite.com/default-og-notification.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://yourwebsite.com/notifications/${notification.id}`,
    },
  };
}

// ✅ JSON-LD Schema
function NotificationJsonLd({ notification }: { notification: Notification }) {
  return (
    <Script
      id="notification-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: notification.title,
          description: notification.details,
          datePublished: notification.releaseDate,
          url: `https://yourwebsite.com/notifications/${notification.id}`,
          publisher: {
            "@type": "Organization",
            name: notification.organization,
            url: notification.officialLink,
          },
        }),
      }}
    />
  );
}

// ✅ Default Page
export default async function Page({ params }: { params: { id: string } }) {
  const notification = await getNotification(params.id);

  if (!notification) {
    return <div className="p-6 text-red-600">Notification not found.</div>;
  }

  return (
    <>
      <NotificationJsonLd notification={notification} />
      <NotificationDetailsPageClient />
    </>
  );
}
