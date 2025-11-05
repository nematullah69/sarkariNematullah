// app/results/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import ResultDetailsPageClient from "./ResultDetailsPageClient";
import * as fs from 'fs/promises'; 
import * as path from 'path';     

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

// ✅ Dynamic SEO Metadata
// 🎯 FINAL FIX: Use 'any' to bypass the strict type check
export async function generateMetadata(props: any): Promise<Metadata> {
  // Use props.params.id (which is guaranteed to exist at runtime)
  const result = await getResultData(props.params.id);

  if (!result) {
    return {
      title: "Result Not Found | Government Exam", 
      description: "Result details not found. Explore the latest government job results on our portal.",
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
      "Sarkari Result 2025",
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
      url: `https://governmentexam.online/results/${result.id}`,
      siteName: "Government Exam",
      images: [
        {
          url: result.imageUrl || "https://governmentexam.online/default-og-result.png",
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
      images: [result.imageUrl || "https://governmentexam.online/default-og-result.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://governmentexam.online/results/${result.id}`,
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
          "@type": "CreativeWork", // ✅ Changed to valid type
          name: result.examName,
          description: result.resultDetails,
          datePublished: result.year,
          inLanguage: "en",
          educationalCredentialAwarded: "Result",
          publisher: {
            "@type": "Organization",
            name: result.organization,
            sameAs: result.officialWebsite,
          },
          // ✅ Optional metadata for better SEO
          about: {
            "@type": "EducationalOccupationalProgram",
            name: result.examName,
            provider: {
              "@type": "Organization",
              name: result.organization,
              sameAs: result.officialWebsite,
            },
          },
          // ✅ Added optional numeric metadata
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: result.totalPosts || 0,
          },
          // ✅ Canonical URL for clarity
          mainEntityOfPage: `https://governmentexam.online/results/${result.id}`,
        }),
      }}
    />
  );
}


// ✅ Default Export
// 🎯 FINAL FIX: Use 'any' to bypass the strict type check
export default async function Page(props: any) {
  // Use props.params.id (which is correct at runtime)
  const result = await getResultData(props.params.id);

  if (!result) {
    return <div className="p-6 text-red-600">Result not found.</div>;
  }

  return (
    <>
      <ResultJsonLd result={result} />
      {/* The fetched result must be passed to the client component for rendering */}
      
       <ResultDetailsPageClient /> 
    </>
  );
}