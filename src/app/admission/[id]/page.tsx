// app/admissions/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmissionDetailsPage from "./AdmissionDetailsPage";
import * as fs from 'fs/promises'; // NEW: Import Node.js File System module
import * as path from 'path';     // NEW: Import Node.js Path module

interface Admission {
  id: string;
  title: string;
  university: string;
  overview: string;
  eligibility: string[];
  applicationEnd: string;
  category: string;
  courseType: string;
  seats: string;
  contact: { website: string };
  imageUrl?: string;
  // Add other properties used in JSON-LD if necessary
}

// Max character limits
const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;
const KEYWORDS_LIMIT = 100;

// 🛠️ CRITICAL FIX: Changed from network fetch to direct file system read
async function getAdmissionData(id: string): Promise<Admission | null> {
  try {
    // 1. Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'admissionsData.json');
    
    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // 3. Parse the JSON data
    const data: Admission[] = JSON.parse(fileContent);

    // 4. Find and return the required item
    return data.find(a => a.id === id) || null;
    
  } catch (err) {
    console.error("❌ Failed to read local admission data:", err); 
    return null;
  }
}

// ✅ Trim function (Remains unchanged)
function trimText(text: string, limit: number) {
  if (!text) return "";
  return text.length <= limit ? text : text.slice(0, limit - 3) + "...";
}

// ✅ Dynamic SEO (Server Component function)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // 'params' is an object and doesn't need to be awaited here.
  const admission = await getAdmissionData(params.id);
  
  if (!admission) return { 
    // ➡️ Updated Not Found Title
    title: "Admission Not Found | Government Exam", 
    description: "Admission details not found. Explore other college and university admission opportunities on our portal.", 
    robots: "noindex, follow" 
  };

  const title = trimText(`${admission.title} | ${admission.university} Admission 2025`, TITLE_LIMIT);
  const description = trimText(`${admission.overview} Last date: ${admission.applicationEnd || "N/A"}`, DESC_LIMIT);
  const keywords = trimText(
    ["Sarkari Admission 2025", admission.university, admission.category, admission.courseType, "Apply Online"].join(","),
    KEYWORDS_LIMIT
  );

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      // ➡️ Updated URL
      url: `https://governmentexam.online/admission/${admission.id}`,
      // ➡️ Updated Site Name
      siteName: "Government Exam",
      images: [
        { 
          // ➡️ Updated URL
          url: admission.imageUrl || "https://governmentexam.online/default-og.png", 
          width: 1200, 
          height: 630, 
          alt: admission.title 
        }
      ],
      locale: "en_IN", // ➡️ Changed locale to India
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // ➡️ Updated URL
      images: [admission.imageUrl || "https://governmentexam.online/default-og.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: { 
      // ➡️ Updated URL
      canonical: `https://governmentexam.online/admission/${admission.id}` 
    },
  };
}

// ✅ JSON-LD Schema (Fixed Prop Passing)
function AdmissionJsonLd({ admission }: { admission: Admission }) {
  return (
    <Script id="admission-schema" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        name: admission.title,
        description: admission.overview,
        educationalProgramMode: "Full-time",
        provider: { "@type": "EducationalOrganization", name: admission.university, sameAs: admission.contact.website },
        programPrerequisites: admission.eligibility,
        endDate: admission.applicationEnd,
        courseMode: admission.courseType,
        numberOfCredits: admission.seats,
        programType: admission.category,
        // ➡️ Added URL to JSON-LD
        url: `https://governmentexam.online/admission/${admission.id}`,
      })
    }} />
  );
}

// ✅ Page Component (Server Component) (Fixed Prop Passing)
export default async function Page({ params }: { params: { id: string } }) {
  // 'params' is available directly here.
  const admission = await getAdmissionData(params.id);
  
  if (!admission) return <div className="p-6 text-red-600">Admission not found.</div>;
  
  return (
    <>
      <AdmissionJsonLd admission={admission} />
      {/* ➡️ CRITICAL FIX: Pass the fetched admission object to the client component */}
      <AdmissionDetailsPage admission={admission} /> 
    </>
  );
}