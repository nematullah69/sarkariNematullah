// app/results/[id]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import ResultDetailsPageClient from "./ResultDetailsPageClient";
import { connectDB } from "@/lib/db";
import ResultModel from "@/lib/model/Result"; // ✅ Correct Import

// --- Interfaces ---
interface Result {
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
  vacancy: {
    postName: string;
    category: string;
    total: string;
    eligibility: string;
  }[];
  salaryDetails: { allowance: string; amount: string }[];
  imageUrl?: string;
}

// =============================================================
// ✅ Fetch Result Data from MongoDB
// =============================================================
async function getResultData(id: string): Promise<Result | null> {
  try {
    await connectDB();

    const data = await ResultModel.findOne({ id }).lean();

    if (!data) return null;

    // ✅ Convert MongoDB object → plain JSON
    const plainData = JSON.parse(JSON.stringify(data));

    return plainData as Result;
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    return null;
  }
}


// Trim helper
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// =============================================================
// 🔥 Dynamic SEO Metadata
// =============================================================
export async function generateMetadata(props: any): Promise<Metadata> {
  const result = await getResultData(props.params.id);

  if (!result) {
    return {
      title: "Result Not Found | Government Exam",
      description:
        "Result details not found. Explore the latest government job results on our portal.",
      robots: "noindex, follow",
    };
  }

  const desc = result.resultDetails?.trim()
    ? result.resultDetails
    : `Check ${result.examName} result released by ${result.organization}.`;

  const seoTitle = trimText(
    `${result.examName} | ${result.organization} ${result.year}`,
    60
  );

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
          url:
            result.imageUrl ||
            "https://governmentexam.online/default-og-result.png",
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
      images: [
        result.imageUrl ||
          "https://governmentexam.online/default-og-result.png",
      ],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://governmentexam.online/results/${result.id}`,
    },
  };
}

// =============================================================
// 📘 JSON-LD Schema
// =============================================================
function ResultJsonLd({ result }: { result: Result }) {
  return (
    <Script
      id="result-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "CreativeWork",
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
          about: {
            "@type": "EducationalOccupationalProgram",
            name: result.examName,
            provider: {
              "@type": "Organization",
              name: result.organization,
              sameAs: result.officialWebsite,
            },
          },
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: result.totalPosts || 0,
          },
          mainEntityOfPage: `https://governmentexam.online/results/${result.id}`,
        }),
      }}
    />
  );
}

// =============================================================
// 📄 Page Component
// =============================================================
export default async function Page(props: any) {
  const result = await getResultData(props.params.id);

  if (!result) {
    return <div className="p-6 text-red-600">Result not found.</div>;
  }

  return (
    <>
      <ResultJsonLd result={result} />
     <ResultDetailsPageClient  />

    </>
  );
}
