import { Metadata } from "next";
import Script from "next/script";
import AdmissionDetailsPage from "./AdmissionDetailsPage";

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
}

// Max character limits
const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;
const KEYWORDS_LIMIT = 100;

// ✅ Fetch data
async function getAdmissionData(id: string): Promise<Admission | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const res = await fetch(`${baseUrl}/admissionsData.json`, { cache: "force-cache" });
    const data: Admission[] = await res.json();
    return data.find(a => a.id === id) || null;
  } catch {
    return null;
  }
}

// ✅ Trim function
function trimText(text: string, limit: number) {
  if (!text) return "";
  return text.length <= limit ? text : text.slice(0, limit - 3) + "...";
}

// ✅ Dynamic SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const admission = await getAdmissionData(params.id);
  if (!admission) return { title: "Admission Not Found", description: "Admission not found", robots: "noindex, follow" };

  const title = trimText(`${admission.title} | ${admission.university} Admission 2025`, TITLE_LIMIT);
  const description = trimText(`${admission.overview} Last date: ${admission.applicationEnd || "N/A"}`, DESC_LIMIT);
  const keywords = trimText(
    ["Admissions 2025", admission.university, admission.category, admission.courseType, "Apply Online"].join(","),
    KEYWORDS_LIMIT
  );

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://yourwebsite.com/admission/${admission.id}`,
      images: [{ url: admission.imageUrl || "https://yourwebsite.com/default-og.png", width: 1200, height: 630, alt: admission.title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [admission.imageUrl || "https://yourwebsite.com/default-og.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: { canonical: `https://yourwebsite.com/admission/${admission.id}` },
  };
}

// ✅ JSON-LD Schema
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
        programType: admission.category
      })
    }} />
  );
}

// ✅ Page Component
export default async function Page({ params }: { params: { id: string } }) {
  const admission = await getAdmissionData(params.id);
  if (!admission) return <div className="p-6 text-red-600">Admission not found.</div>;
  return <>
    <AdmissionJsonLd admission={admission} />
    <AdmissionDetailsPage id={params.id} />
  </>;
}
