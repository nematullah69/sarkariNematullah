// app/notifications/[id]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import NotificationDetailsPageClient from "./NotificationDetailsPageClient";

// DB + Model
import { connectDB } from "@/lib/db";
import Notification from "@/lib/model/Notification";

// ----------------------
// 🔹 TYPES
// ----------------------
interface NotificationType {
  _id: string;
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

// MongoDB returned object type
type NotificationDoc = {
  _id: any;
  id?: string;
  title?: string;
  organization?: string;
  department?: string;
  category?: string;
  status?: string;
  eligibility?: string;
  importantDates?: any[];
  details?: string;
  officialLink?: string;
  releaseDate?: string;
  applicationStart?: string;
  applicationEnd?: string;
  examDate?: string;
  imageUrl?: string;
};

// ----------------------
// 🔹 Fetch Single Notification
// ----------------------
async function getNotification(id: string): Promise<NotificationType | null> {
  try {
    await connectDB();

    const doc = (await Notification.findOne({ id }).lean()) as NotificationDoc | null;

    if (!doc) return null;

    return {
      _id: String(doc._id),
      id: doc.id || "",
      title: doc.title || "",
      organization: doc.organization || "",
      department: doc.department || "",
      category: doc.category || "",
      status: doc.status || "",
      eligibility: doc.eligibility || "",
      importantDates: doc.importantDates || [],
      details: doc.details || "",
      officialLink: doc.officialLink || "",
      releaseDate: doc.releaseDate || "",
      applicationStart: doc.applicationStart || "",
      applicationEnd: doc.applicationEnd || "",
      examDate: doc.examDate || "",
      imageUrl: doc.imageUrl || "",
    };
  } catch (error) {
    console.error("❌ MongoDB Fetch Error:", error);
    return null;
  }
}

// ----------------------
// 🔹 Trim Helper
// ----------------------
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ----------------------
// 🔹 Dynamic Metadata
// ----------------------
export async function generateMetadata(props: any): Promise<Metadata> {
  const notification = await getNotification(props.params.id);

  if (!notification) {
    return {
      title: "Notification Not Found | Government Exam",
      description: "Notification details not found.",
      robots: "noindex, follow",
    };
  }

  const seoTitle = trimText(
    `${notification.title} | ${notification.organization} Notification 2025`,
    60
  );

  const seoDesc = trimText(
    `${notification.details} Official notification released on ${notification.releaseDate}.`,
    160
  );

  const seoKeywords = trimText(
    [
      notification.title,
      notification.organization,
      notification.department,
      notification.category,
      "Sarkari Notification 2025",
    ].join(", "),
    100
  );

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: seoKeywords,

    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://governmentexam.online/notifications/${notification.id}`,
      siteName: "Government Exam",
      images: [
        {
          url:
            notification.imageUrl ||
            "https://governmentexam.online/default-og-notification.png",
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
      images: [
        notification.imageUrl ||
          "https://governmentexam.online/default-og-notification.png",
      ],
    },

    alternates: {
      canonical: `https://governmentexam.online/notifications/${notification.id}`,
    },
  };
}

// ----------------------
// 🔹 JSON-LD Schema
// ----------------------
function NotificationJsonLd({ notification }: { notification: NotificationType }) {
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
          dateModified: notification.releaseDate,
          url: `https://governmentexam.online/notifications/${notification.id}`,
          publisher: {
            "@type": "Organization",
            name: notification.organization,
          },
          mainEntityOfPage: `https://governmentexam.online/notifications/${notification.id}`,
        }),
      }}
    />
  );
}

// ----------------------
// 🔹 MAIN PAGE COMPONENT
// ----------------------
export default async function Page(props: any) {
  const notification = await getNotification(props.params.id);

  if (!notification) {
    return <div className="p-6 text-red-600">Notification not found.</div>;
  }

  return (
    <>
      <NotificationJsonLd notification={notification} />

      {/* You can pass the data here if required */}
      
      <NotificationDetailsPageClient /> 
    </>
  );
}
