// app/answer-key/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AnswerKeyPageClient from "./AnswerKeyPageClient";

interface AnswerKey {
  id: string;
  examName: string;
  releaseDate: string;
  downloadLink: string;
  organization?: string;
  year?: string;
  imageUrl?: string;
}

// ✅ Fetch Answer Key Data
async function getAnswerKeysData(): Promise<AnswerKey[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    // NOTE: This assumes the JSON is available at the root URL
    const res = await fetch(`${baseUrl}/answerKeysData.json`, { cache: "force-cache" });
    const data: AnswerKey[] = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Failed to fetch answer keys data:", err);
    return [];
  }
}

// ✅ Helper → Trim with 5% safe margin
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95); // 5% margin
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const keys = await getAnswerKeysData();

  // --- UPDATED SEO TITLE (Using site name 'Government Exam') ---
  const seoTitle = trimText("Official Answer Keys 2025 for Govt Exams | Government Exam", 60);
  // -------------------------
  
  const seoDesc = trimText(
    `Download official answer keys (Sarkari Answer Key) for the latest government exams in India. Check challenge dates and verify your answers for exams in 2025.`,
    160
  );
  const seoKeywords = trimText(
    ["Official Answer Keys 2025", "Government Exams Answer Key", "Sarkari Answer Key", "Exam Solutions", "SSC Answer Key", "UPSC Answer Key"].join(
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
      // ➡️ Updated URL
      url: "https://governmentexam.online/answer-keys",
      // ➡️ Updated Site Name
      siteName: "Government Exam",
      images: [
        {
          // ➡️ Updated URL
          url: keys[0]?.imageUrl || "https://governmentexam.online/default-og-answerkey.png",
          width: 1200,
          height: 630,
          alt: "Official Answer Keys Portal",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      // ➡️ Updated URL
      images: [keys[0]?.imageUrl || "https://governmentexam.online/default-og-answerkey.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      // ➡️ Updated URL
      canonical: "https://governmentexam.online/answer-keys",
    },
  };
}

// ✅ JSON-LD Schema for Answer Keys
function AnswerKeyJsonLd({ keys }: { keys: AnswerKey[] }) {
  return (
    <Script
      id="answerkey-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "ItemList",
          itemListElement: keys.map((key, index) => ({
            "@type": "ListItem",
            position: index + 1,
            // ➡️ Updated URL in schema
            url: `https://governmentexam.online/answer-key/${key.id}`,
            name: key.examName,
            datePublished: key.releaseDate,
          })),
        }),
      }}
    />
  );
}

// ✅ Default Export (Fixed Prop Passing)
export default async function Page() {
  const keys = await getAnswerKeysData();

  return (
    <>
      <AnswerKeyJsonLd keys={keys} />
      {/* ➡️ CRITICAL FIX: The fetched keys array must be passed to the client component */}
      <AnswerKeyPageClient keys={keys} />
    </>
  );
}