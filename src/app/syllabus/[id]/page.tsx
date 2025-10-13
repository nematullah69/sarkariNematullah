// app/syllabus/[id]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import SyllabusDetailsPage from "./SyllabusDetailsPage"; // Your client component
import * as fs from 'fs/promises'; // NEW: Import Node.js File System module
import * as path from 'path';     // NEW: Import Node.js Path module

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

// 🛠️ CRITICAL FIX: Changed from network fetch to direct file system read
async function getSyllabusById(id: string): Promise<Syllabus | null> {
  try {
    // 1. Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'syllabusData.json');

    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // 3. Parse the JSON data
    const data: Syllabus[] = JSON.parse(fileContent);
    
    // 4. Find and return the required item
    return data.find((s) => s.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to read local syllabus data:", err);
    return null;
  }
}

// ✅ Trim helper with 5% safe margin (Remains unchanged)
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ✅ Dynamic SEO Metadata (Remains unchanged)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // CORRECT: Use params.id directly
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
      url: `https://governmentexam.online/syllabus/${syllabus.id}`,
      siteName: "Govt Exams Portal",
      images: [
        {
          url: "default-og-syllabus.png",
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
      images: ["https://sarkariportl.netlify.app/default-og-syllabus.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://sarkariportl.netlify.app/syllabus/${syllabus.id}`,
    },
  };
}

// ✅ JSON-LD for Syllabus Schema (Remains unchanged)
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

// ✅ Default Export (Remains unchanged)
export default async function Page({ params }: { params: { id: string } }) {
  // CORRECT: Use params.id directly
  const syllabus = await getSyllabusById(params.id);

  if (!syllabus) {
    return <div className="p-6 text-red-600">Syllabus not found.</div>;
  }

  return (
    <>
      <SyllabusJsonLd syllabus={syllabus} />
      {/* CRITICAL FIX: Removed prop passing. The client component must get the ID via useParams(). */}
      <SyllabusDetailsPage />
    </>
  );
}
