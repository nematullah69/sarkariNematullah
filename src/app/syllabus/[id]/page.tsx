// app/syllabus/[id]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import SyllabusDetailsPage from "./SyllabusDetailsPage";

interface Syllabus {
  id: string;
  examName: string;
  department: string;
  organization: string;
  year: string;
  examType: string;
  syllabusOverview: string;
  subjects: string[];
  examPattern: {
    totalQuestions: string;
    totalMarks: string;
    duration: string;
    negativeMarking: string;
    sections: { name: string; questions: string; marks: string }[];
  };
  importantNotes: string[];
  downloadLink: string;
  officialWebsite: string;
  category: string;
  lastUpdated: string;
}

// ✅ Fetch Syllabus Data
async function getSyllabusById(id: string): Promise<Syllabus | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/syllabusData.json`, { cache: "force-cache" });
    const data: Syllabus[] = await res.json();
    return data.find((s) => s.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to fetch syllabus data:", err);
    return null;
  }
}

// ✅ Trim helper with 5% safe margin
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const syllabus = await getSyllabusById(params.id);

  if (!syllabus) {
    return {
      title: "Syllabus Not Found | Govt Exams Portal",
      description: "Syllabus details not found. Explore other exams and syllabus pages.",
      robots: "noindex, follow",
    };
  }

  const seoTitle = trimText(`${syllabus.examName} | ${syllabus.organization}`, 60);
  const seoDesc = trimText(
    `${syllabus.syllabusOverview} Download official syllabus PDF for ${syllabus.year}.`,
    160
  );
  const seoKeywords = trimText(
    [
      syllabus.examName,
      syllabus.organization,
      syllabus.department,
      syllabus.examType,
      syllabus.category,
      "Exam Syllabus 2025",
    ].join(", "),
    100
  );

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: seoKeywords,
    robots: "index, follow",
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://yourwebsite.com/syllabus/${syllabus.id}`,
      siteName: "Govt Exams Portal",
      images: [
        {
          url: "https://yourwebsite.com/default-og-syllabus.png",
          width: 1200,
          height: 630,
          alt: syllabus.examName,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: ["https://yourwebsite.com/default-og-syllabus.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://yourwebsite.com/syllabus/${syllabus.id}`,
    },
  };
}

// ✅ JSON-LD for Syllabus Schema
function SyllabusJsonLd({ syllabus }: { syllabus: Syllabus }) {
  return (
    <Script
      id="syllabus-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: syllabus.examName,
          provider: {
            "@type": "Organization",
            name: syllabus.organization,
            sameAs: syllabus.officialWebsite,
          },
          educationalProgramMode: syllabus.examType,
          startDate: syllabus.year,
          description: syllabus.syllabusOverview,
          educationalCredentialAwarded: "Syllabus Completion",
          hasCourse: syllabus.subjects.map((sub) => ({ "@type": "Course", name: sub })),
        }),
      }}
    />
  );
}

// ✅ Default Export
export default async function Page({ params }: { params: { id: string } }) {
  const syllabus = await getSyllabusById(params.id);

  if (!syllabus) {
    return <div className="p-6 text-red-600">Syllabus not found.</div>;
  }

  return (
    <>
      <SyllabusJsonLd syllabus={syllabus} />
      <SyllabusDetailsPage syllabusId={params.id} />
    </>
  );
}
