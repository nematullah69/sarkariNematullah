// app/syllabus/[id]/page.tsx

import { Metadata } from "next";
import Script from "next/script";
import SyllabusDetailsPage from "./SyllabusDetailsPage";
import { connectDB } from "@/lib/db";
import SyllabusModel from "@/lib/model/Syllabus";

// ----------------------
// Syllabus Interface
// ----------------------
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

// ----------------------
// ⭐ Fetch Syllabus From MongoDB
// ----------------------
async function getSyllabusById(id: string): Promise<Syllabus | null> {
  try {
    await connectDB();

    const data = await SyllabusModel.findOne(
      { id },
      { _id: 0, __v: 0 }   // ⬅️ FIX: remove mongoose fields
    ).lean();

    return data as Syllabus | null; // ⬅️ FIX: TS type safe return
  } catch (err) {
    console.error("❌ Failed to fetch from MongoDB:", err);
    return null;
  }
}

// ----------------------
// Utility – Trim Text
// ----------------------
function trimText(text: string, max: number) {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit ? text.slice(0, safeLimit - 3) + "..." : text;
}

// ----------------------
// ⭐ Dynamic Metadata
// ----------------------
export async function generateMetadata(props: any): Promise<Metadata> {
  const syllabus = await getSyllabusById(props.params.id);

  if (!syllabus) {
    return {
      title: "Syllabus Not Found | Govt Exams Portal",
      description: "Syllabus not found.",
      robots: "noindex",
    };
  }

  const seoTitle = trimText(`${syllabus.examName} | ${syllabus.organization}`, 60);
  const seoDesc = trimText(syllabus.syllabusOverview, 160);

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: `${syllabus.examName}, ${syllabus.organization}, syllabus, exam pattern, subjects`,
  };
}

// ----------------------
// ⭐ JSON-LD SCHEMA
// ----------------------
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
          description: syllabus.syllabusOverview,
          educationalProgramMode: syllabus.examType,
          startDate: syllabus.year,
          url: `https://governmentexam.online/syllabus/${syllabus.id}`,
          provider: {
            "@type": "Organization",
            name: syllabus.organization,
            sameAs: syllabus.officialWebsite,
          },
          hasCourse: syllabus.subjects?.map((s) => ({
            "@type": "Course",
            name: s,
          })),
        }),
      }}
    />
  );
}

// ----------------------
// ⭐ PAGE COMPONENT
// ----------------------
export default async function Page(props: any) {
  const syllabus = await getSyllabusById(props.params.id);

  if (!syllabus) {
    return <div className="p-6 text-red-600">Syllabus not found.</div>;
  }

  return (
    <>
      <SyllabusJsonLd syllabus={syllabus} />

      {/* ⭐ Pass syllabus to client component */}
      <SyllabusDetailsPage  />
    </>
  );
}
