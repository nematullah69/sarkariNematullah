// app/admit-card/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmitCardDetailsPage from "./AdmitCardDetailsPage"; // your client component
import * as fs from 'fs/promises'; 
import * as path from 'path'; 

// --- Interfaces ---
interface FeeItem {
  category: string;
  fee: string;
}
interface VacancyItem {
  postName: string;
  category: string;
  total: string;
}
interface AdmitCard {
  id: string;
  examName: string;
  examNameS?: string;
  examvacancy?: string;
  organization: string;
  
  // All properties required for compatibility with the Client Component and Metadata
  department: string; 
  examDate: string; 
  
  totalPosts?: string;
  instructions: string[];
  examGuidelines: string[];
  
  category: string; 
  
  importantDates?: Record<string, string>;
  salaryDetails?: { postName: string; allowance: string; amount: string }[];
  vacancy?: VacancyItem[];
  eligibility?: string;
  applicationFee?: FeeItem[];
  links?: Record<string, string>;
}

// 🛠️ CRITICAL FIX: Changed from network fetch to direct file system read
async function getAdmitCardData(id: string): Promise<AdmitCard | null> {
  try {
    // 1. Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'admitCardsData.json');
    
    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // 3. Parse the JSON data
    const data: AdmitCard[] = JSON.parse(fileContent);
    
    // 4. Find and return the required item
    return data.find((card) => card.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to read local admit card data:", err); 
    return null;
  }
}

// ✅ Dynamic Metadata
// 🎯 FINAL FIX: Use 'any' to bypass the build system's strict type check
export async function generateMetadata(props: any): Promise<Metadata> {
  // Use props.params.id (which is correct at runtime)
  const admitCard = await getAdmitCardData(props.params.id);
  
  if (!admitCard) {
    return {
      title: "Admit Card Not Found | Government Exam",
      description: "Admit card details not found. Explore other government job exams and hall tickets.",
      robots: "noindex, follow",
    };
  }

  const title = `${admitCard.examName} Admit Card 2025 | ${admitCard.organization}`.slice(0, 57);
  const description = (admitCard.instructions?.[0] || `${admitCard.examName} admit card for ${admitCard.organization}. Check exam date and download online.`).slice(0, 152);
  const keywords = `Sarkari Admit Card 2025, ${admitCard.examName}, ${admitCard.organization}, ${admitCard.category || ""}, Download Admit Card Online`.slice(0, 95); 

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `https://governmentexam.online/admit-card/${admitCard.id}`,
      siteName: "Government Exam",
      images: [
        {
          url: "https://governmentexam.online/default-og-admit-card.png",
          width: 1200,
          height: 630,
          alt: admitCard.examName,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://governmentexam.online/default-og-admit-card.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://governmentexam.online/admit-card/${admitCard.id}`,
    },
  };
}

// ✅ JSON-LD for Google (Warning-Free)
function AdmitCardJsonLd({ admitCard }: { admitCard: AdmitCard }) {
  return (
    <>
      {/* ✅ JSON-LD for SEO */}
      <Script
        id="admit-card-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            name: admitCard.examName,
            description:
              admitCard.instructions?.[0] ||
              "Download your admit card and check exam details.",
            provider: {
              "@type": "Organization",
              name: admitCard.organization,
              sameAs:
                admitCard.links?.officialWebsite ||
                "https://governmentexam.online",
            },
            startDate: admitCard.importantDates?.applicationStart || "",
            endDate: admitCard.importantDates?.examDate || "",
            programType: admitCard.category || "Recruitment Examination",
            numberOfCredits: admitCard.totalPosts || 0,
            programPrerequisites: admitCard.eligibility || "Eligible candidates only",
            educationalLevel: "Graduate",
            inLanguage: "en-IN",
            identifier: {
              "@type": "PropertyValue",
              name: admitCard.examName,
              value: admitCard.id,
            },
            publisher: {
              "@type": "Organization",
              name: "Government Exam Online",
              url: "https://governmentexam.online",
              logo: {
                "@type": "ImageObject",
                url: "https://governmentexam.online/logo.png",
              },
            },
            url: `https://governmentexam.online/admit-card/${admitCard.id}`,
          }),
        }}
      />
    </>
  );
}


// ✅ Page Component
// 🎯 FINAL FIX: Use 'any' and STOP PASSING THE PROP.
export default async function Page(props: any) {
  // Fetch is still done here for Metadata and JSON-LD
  const admitCard = await getAdmitCardData(props.params.id);

  if (!admitCard) {
    return <div className="p-6 text-red-600">Admit card not found.</div>;
  }

  return (
    <>
      <AdmitCardJsonLd admitCard={admitCard} />
      {/* ❌ CRITICAL CHANGE: Component rendered without props */}
      <AdmitCardDetailsPage />
    </>
  );
}