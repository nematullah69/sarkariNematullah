import { Metadata } from "next";
import Script from "next/script";
import AnswerKeyDetailsPageClient from "./AnswerKeyDetailsPageClient";

interface AnswerKey {
  id: string;
  examName: string;
  organization: string;
  department: string;
  category: string;
  status: string;
  releaseDate: string;
  examDate: string;
  lastUpdated: string;
  details: string;
  downloadLink: string;
  officialWebsite: string;
  objectionLink?: string;
  objectionStartDate?: string;
  objectionEndDate?: string;
  objectionFee?: number;
  isRevised?: boolean;
  markingScheme?: { marksPerQuestion: number; negativeMarks: number };
  totalQuestions?: number;
  totalMarks?: number;
  examDuration?: string;
  medium?: string;
  notificationLink?: string;
  imageUrl?: string;
}

// ✅ Fetch Answer Key by ID
async function getAnswerKey(id: string): Promise<AnswerKey | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/answerKeysData.json`, { cache: "force-cache" });
    const data: AnswerKey[] = await res.json();
    return data.find((key) => key.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to fetch answer key data:", err);
    return null;
  }
}

// ✅ Helper → Trim with 5% safe margin
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic Metadata for Answer Key Details
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const key = await getAnswerKey(params.id);

  if (!key) {
    return {
      title: "Answer Key Not Found | Govt Exams Portal",
      description: "Answer key details not found. Check other exams and answer keys.",
      robots: "noindex, follow",
    };
  }

  const seoTitle = trimText(
    `${key.examName} | ${key.organization} Answer Key ${new Date().getFullYear()}`,
    60
  );

  const seoDesc = trimText(
    `${key.details} Download official answer key released on ${key.releaseDate}. Raise objections between ${key.objectionStartDate} to ${key.objectionEndDate}.`,
    160
  );

  const seoKeywords = trimText(
    [
      key.examName,
      `${key.organization} Answer Key`,
      key.department,
      key.category,
      "Government Exams 2025",
      "Official Answer Keys",
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
      url: `https://yourwebsite.com/answer-key/${key.id}`,
      siteName: "Govt Exams Portal",
      images: [
        {
          url: key.imageUrl || "https://yourwebsite.com/default-og-answerkey.png",
          width: 1200,
          height: 630,
          alt: key.examName,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [key.imageUrl || "https://yourwebsite.com/default-og-answerkey.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://yourwebsite.com/answer-key/${key.id}`,
    },
  };
}

// ✅ JSON-LD Schema for Google
function AnswerKeyJsonLd({ answerKey }: { answerKey: AnswerKey }) {
  return (
    <Script
      id="answerkey-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "EducationalOccupationalProgram",
          name: answerKey.examName,
          description: answerKey.details,
          datePublished: answerKey.releaseDate,
          url: `https://yourwebsite.com/answer-key/${answerKey.id}`,
          provider: {
            "@type": "Organization",
            name: answerKey.organization,
            url: answerKey.officialWebsite,
          },
        }),
      }}
    />
  );
}

// ✅ Default Export
export default async function Page({ params }: { params: { id: string } }) {
  const key = await getAnswerKey(params.id);

  if (!key) {
    return <div className="p-6 text-red-600">Answer Key not found.</div>;
  }

  return (
    <>
      <AnswerKeyJsonLd answerKey={key} />
      <AnswerKeyDetailsPageClient />
    </>
  );
}
