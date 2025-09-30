// app/answer-key/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import ResultDetailsPageClient from "./ResultDetailsPageClient";
import * as fs from 'fs/promises'; // NEW: Import Node.js File System module
import * as path from 'path';     // NEW: Import Node.js Path module

interface Result {
// ... (Interface remains unchanged)
  id: string;
  examName: string;
  organization: string;
  department: string;
  resultDetails: string;
  year: string;
  status: string;
  category: string;
  totalPosts: string;
  downloadLink: string;
  officialWebsite: string;
  importantDates: {
    notificationDate: string;
    applicationStart: string;
    lastDateApply: string;
    ExamDate: string;
    ResultDate: string;
  };
  applicationFee: { category: string; fee: string }[];
  vacancy: { postName: string; category: string; total: string; eligibility: string }[];
  salaryDetails: { allowance: string; amount: string }[];
  imageUrl?: string;
}

// ✅ Fetch Result Data
async function getResultData(id: string): Promise<Result | null> {
  try {
    // 1. Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'resultsData.json');

    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // 3. Parse the JSON data
    const data: Result[] = JSON.parse(fileContent);
    
    // 4. Find and return the required item
    return data.find((r) => r.id === id) || null;
  } catch (err) {
    // Log file read error instead of fetch error
    console.error("❌ Failed to read local result data:", err);
    return null;
  }
}

// ✅ Helper → Trim with 5% safe margin (Remains unchanged)
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95); // 5% margin
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic SEO Metadata (Remains unchanged)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // CORRECT: Access params.id directly
  const result = await getResultData(params.id);

  if (!result) {
    return {
      title: "Result Not Found | RSMSSB Results Portal",
      description: "Result details not found. Explore latest government exam results.",
      robots: "noindex, follow",
    };
  }

  const desc =
    result.resultDetails?.trim().length > 0
      ? result.resultDetails
      : `Check ${result.examName} result released by ${result.organization}.`;

  // ✅ Apply Safe Limits
  const seoTitle = trimText(`${result.examName} | ${result.organization} ${result.year}`, 60);
  const seoDesc = trimText(`${desc} Download PDF & check important dates.`, 160);
  const seoKeywords = trimText(
    [
      result.examName,
      `${result.organization} Results`,
      `${result.department} Exam`,
      result.category,
      "Government Exam 2025",
      "RSMSSB Result 2025",
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
      url: `https://yourwebsite.com/results/${result.id}`,
      siteName: "RSMSSB Results Portal",
      images: [
        {
          url: result.imageUrl || "https://yourwebsite.com/default-og-result.png",
          width: 1200,
          height: 630,
          alt: result.examName,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [result.imageUrl || "https://yourwebsite.com/default-og-result.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://yourwebsite.com/results/${result.id}`,
    },
  };
}

// ✅ JSON-LD Schema for Google (Remains unchanged)
function ResultJsonLd({ result }: { result: Result }) {
  return (
    <Script
      id="result-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Exam",
          name: result.examName,
          description: result.resultDetails,
          datePublished: result.year,
          provider: {
            "@type": "Organization",
            name: result.organization,
            sameAs: result.officialWebsite,
          },
          educationalCredentialAwarded: "Result",
          numberOfResults: result.totalPosts,
        }),
      }}
    />
  );
}

// ✅ Default Export (Remains unchanged)
export default async function Page({ params }: { params: { id: string } }) {
  // CORRECT: Access params.id directly
  const result = await getResultData(params.id);

  if (!result) {
    return <div className="p-6 text-red-600">Result not found.</div>;
  }

  return (
    <>
      <ResultJsonLd result={result} />
      {/* Prop passing removed to avoid the 'IntrinsicAttributes' error */}
      <ResultDetailsPageClient />
    </>
  );
}
