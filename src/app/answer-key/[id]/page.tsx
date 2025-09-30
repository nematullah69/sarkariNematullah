// app/answer-key/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AnswerKeyDetailsPageClient from "./AnswerKeyDetailsPageClient";
import * as fs from 'fs/promises'; // Import Node.js File System module
import * as path from 'path';     // Import Node.js Path module

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

// 🛠️ CRITICAL FIX: Changed from network fetch to direct file system read
async function getAnswerKey(id: string): Promise<AnswerKey | null> {
  try {
    // 1. Construct the path to the JSON file relative to the project root (process.cwd())
    const filePath = path.join(process.cwd(), 'public', 'answerKeysData.json');

    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // 3. Parse the JSON data
    const data: AnswerKey[] = JSON.parse(fileContent);

    // 4. Find and return the required item
    return data.find((key) => key.id === id) || null;
    
  } catch (err) {
    // This will log the error if the file is missing or JSON is invalid
    console.error("❌ Failed to read local answer key data:", err); 
    return null;
  }
}

// ✅ Helper → Trim with 5% safe margin (Remains unchanged)
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic Metadata for Answer Key Details (Remains unchanged)
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // CORRECT: Use params.id directly
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

// ✅ JSON-LD Schema for Google (Remains unchanged)
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

// ✅ Default Export (Remains unchanged)
export default async function Page({ params }: { params: { id: string } }) {
  // CORRECT: Use params.id directly
  const key = await getAnswerKey(params.id);

  if (!key) {
    return <div className="p-6 text-red-600">Answer Key not found.</div>;
  }

  return (
    <>
      <AnswerKeyJsonLd answerKey={key} />
      {/* FINAL FIX: No props passed. The client component gets ID via useParams(). */}
      <AnswerKeyDetailsPageClient /> 
    </>
  );
}
