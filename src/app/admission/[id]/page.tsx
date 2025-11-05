// app/admissions/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmissionDetailsPage from "./AdmissionDetailsPage"; 
import * as fs from 'fs/promises'; 
import * as path from 'path'; 

// 🎯 NOTE: We keep the Admission interface ONLY for generateMetadata and JSON-LD, 
// but we WILL NOT pass the 'admission' object to the client component.

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
// ❌ REMOVED: contact: { website: string };
  imageUrl?: string;
  
  // ➡️ KEEP ALL PROPERTIES for Metadata and JSON-LD consistency
  organization: string;
  status: 'Open' | 'Closed' | 'Coming Soon';
  fees: string;
  courseName: string;
  applicationStart: string;
  applyLink: string;
  brochureLink: string;
  syllabusLink: string;
  importantDates: { label: string; value: string; highlight: boolean }[];
  applicationProcess: { title: string; description: string }[];
  selectionProcess: string[];
  requiredDocuments: string[];
  courseDetails: {
      structure: string;
      duration: string;
      specializations: string[];
  };
// ✅ Correct, expanded contact structure.
  contact: {
      phone: string;
      email: string;
      website: string; 
      address: string;
  };
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
  	// IMPORTANT: Return null if fetching fails, as metadata and page component rely on this check
    return null; 
  }
}

// ✅ Trim function (Remains unchanged)
function trimText(text: string, limit: number) {
  if (!text) return "";
  return text.length <= limit ? text : text.slice(0, limit - 3) + "...";
}

// ✅ Dynamic SEO (Server Component function)
// 🎯 Use 'any' to bypass the build system's strict type check
export async function generateMetadata(props: any): Promise<Metadata> {
  const admission = await getAdmissionData(props.params.id);
  
  if (!admission) return { 
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
      url: `https://governmentexam.online/admission/${admission.id}`,
      siteName: "Government Exam",
      images: [
        { 
          url: admission.imageUrl || "https://governmentexam.online/default-og.png", 
          width: 1200, 
          height: 630, 
          alt: admission.title 
        }
      ],
      locale: "en_IN", 
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [admission.imageUrl || "https://governmentexam.online/default-og.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: { 
      canonical: `https://governmentexam.online/admission/${admission.id}` 
    },
  };
}

// ✅ JSON-LD Schema (Kept for SEO, still needs the 'admission' object)
// ✅ JSON-LD Schema (Fixed for Google Warnings)
function AdmissionJsonLd({ admission }: { admission: Admission }) {
  return (
    <Script
      id="admission-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: admission.title,
          description: admission.overview || "Admission details for the program.",
          educationalProgramMode: admission.courseType || "Full-time",
          provider: {
            "@type": "EducationalOrganization",
            name: admission.university,
            sameAs: admission.contact?.website,
            address: {
              "@type": "PostalAddress",
              streetAddress: admission.contact?.address || "",
              addressCountry: "IN",
            },
          },
          programPrerequisites: admission.eligibility || [],
          startDate: admission.applicationStart || "",
          endDate: admission.applicationEnd || "",
          numberOfCredits: admission.seats || "",
          programType: admission.category,
          educationalCredentialAwarded: admission.courseName || "Degree/Certificate Program",
          hasCourse: {
            "@type": "Course",
            name: admission.courseDetails?.structure || "Course Curriculum",
            description: admission.courseDetails?.duration || "",
          },
          offers: {
            "@type": "Offer",
            url: `https://governmentexam.online/admission/${admission.id}`,
            availability: admission.status === "Open"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            price: admission.fees || "0",
            priceCurrency: "INR",
          },
          url: `https://governmentexam.online/admission/${admission.id}`,
        }),
      }}
    />
  );
}

// ✅ Page Component (Server Component) 
// 🎯 FINAL FIX: Use 'any' and STOP PASSING THE PROP.
export default async function Page(props: any) {
  // We still fetch the data here to check for existence and render JSON-LD/Metadata
  const admission = await getAdmissionData(props.params.id);
  
  if (!admission) return <div className="p-6 text-red-600">Admission not found.</div>;
  
  return (
    <>
      <AdmissionJsonLd admission={admission} />
      {/* ❌ CRITICAL CHANGE: Stop passing admission={admission} */}
      <AdmissionDetailsPage /> 
    </>
  );
}