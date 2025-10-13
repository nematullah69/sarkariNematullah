// app/notifications/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import NotificationDetailsPageClient from "./NotificationDetailsPageClient";
import * as fs from 'fs/promises'; // NEW: Import Node.js File System module
import * as path from 'path';     // NEW: Import Node.js Path module

interface Notification {
// ... (Interface remains unchanged)
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

// 🛠️ CRITICAL FIX: Changed from network fetch to direct file system read
async function getNotification(id: string): Promise<Notification | null> {
  try {
    // 1. Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'notificationsData.json');
    
    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // 3. Parse the JSON data
    const data: Notification[] = JSON.parse(fileContent);
    
    // 4. Find and return the required item
    return data.find((n) => n.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to read local notification data:", err); 
    return null;
  }
}

// ✅ Helper → Trim text with safe margin (Remains unchanged)
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // CORRECT: Use params.id directly
  const notification = await getNotification(params.id);

  if (!notification) {
    return {
      // ➡️ Updated Not Found Title
      title: "Notification Not Found | Government Exam",
      description: "Notification details not found. Check other government job notifications and recruitment alerts.",
      robots: "noindex, follow",
    };
  }

  const seoTitle = trimText(`${notification.title} | ${notification.organization} Notification 2025`, 60);
  const seoDesc = trimText(
    `${notification.details} Official notification released on ${notification.releaseDate}. Apply from ${notification.applicationStart} to ${notification.applicationEnd}.`,
    160
  );
  const seoKeywords = trimText(
    [notification.title, notification.organization, notification.department, notification.category, "Sarkari Notification 2025"].join(
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
      url: `https://governmentexam.online/notifications/${notification.id}`,
      siteName: "Government Exam", // ➡️ Updated Site Name
      images: [
        {
          url: notification.imageUrl || "https://governmentexam.online/default-og-notification.png",
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
      images: [notification.imageUrl || "https://governmentexam.online/default-og-notification.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://governmentexam.online/notifications/${notification.id}`,
    },
  };
}

// ✅ JSON-LD Schema (Remains unchanged)
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
          url: `https://governmentexam.online/notifications/${notification.id}`,
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

// ✅ Default Page (Fixed Prop Passing)
export default async function Page({ params }: { params: { id: string } }) {
  // CORRECT: Use params.id directly
  const notification = await getNotification(params.id);

  if (!notification) {
    return <div className="p-6 text-red-600">Notification not found.</div>;
  }

  return (
    <>
      <NotificationJsonLd notification={notification} />
      {/* ➡️ CRITICAL FIX: The fetched notification object must be passed as a prop */}
      <NotificationDetailsPageClient notification={notification} /> 
    </>
  );
}