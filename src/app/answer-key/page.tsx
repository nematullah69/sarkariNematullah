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

  // --- UPDATED SEO TITLE ---
  const seoTitle = trimText("Government Exams Portal: Official Answer Keys for 2025 Examinations", 60);
  // -------------------------
  
  const seoDesc = trimText(
    `Download official answer keys for the latest government exams in India. Check release dates and verify your answers for exams in 2025.`,
    160
  );
  const seoKeywords = trimText(
    ["Answer Keys 2025", "Government Exams", "Official Answer Keys", "Exam Solutions", "RSMSSB", "SSC", "UPSC"].join(
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
      url: "https://yourwebsite.com/answer-keys",
      siteName: "Government Exams Portal",
      images: [
        {
          url: keys[0]?.imageUrl || "https://yourwebsite.com/default-og-answerkey.png",
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
      images: [keys[0]?.imageUrl || "https://yourwebsite.com/default-og-answerkey.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: "https://yourwebsite.com/answer-keys",
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
            url: `https://yourwebsite.com/answer-key/${key.id}`,
            name: key.examName,
            datePublished: key.releaseDate,
          })),
        }),
      }}
    />
  );
}

// ✅ Default Export
export default async function Page() {
  const keys = await getAnswerKeysData();

  return (
    <>
      <AnswerKeyJsonLd keys={keys} />
      <AnswerKeyPageClient />
    </>
  );
}