// app/admit-card/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmitCardDetailsPage from "./AdmitCardDetailsPage"; // your client component
import * as fs from 'fs/promises'; // NEW: Import Node.js File System module
import * as path from 'path';     // NEW: Import Node.js Path module

// --- Interfaces restored for compiler context ---
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
  department?: string;
  examDate?: string;
  totalPosts?: string;
  instructions: string[];
  examGuidelines: string[];
  category?: string;
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
    // Log file read error instead of fetch error
    console.error("❌ Failed to read local admit card data:", err); 
    return null;
  }
}

// ✅ Dynamic Metadata (Logic is simplified to use params directly)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const admitCard = await getAdmitCardData(params.id);
  
  if (!admitCard) {
    return {
      title: "Admit Card Not Found | Admit Card Portal",
      description: "Admit card details not found. Explore other exams.",
      robots: "noindex, follow",
    };
  }

  const title = `${admitCard.examName} Admit Card 2025 | ${admitCard.organization}`.slice(0, 57);
  const description = (admitCard.instructions?.[0] || `${admitCard.examName} admit card for ${admitCard.organization}. Check exam date and download online.`).slice(0, 152);
  const keywords = `Admit Card 2025, ${admitCard.examName}, ${admitCard.organization}, ${admitCard.category || ""}, Download Admit Card Online`.slice(0, 95);

  return {
    title,
    description,
    keywords,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `https://yourwebsite.com/admit-card/${admitCard.id}`,
      siteName: "Admit Card Portal",
      images: [
        {
          url: "https://yourwebsite.com/default-og-admit-card.png",
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
      images: ["https://yourwebsite.com/default-og-admit-card.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://yourwebsite.com/admit-card/${admitCard.id}`,
    },
  };
}

// ✅ JSON-LD for Google (Function restored)
function AdmitCardJsonLd({ admitCard }: { admitCard: AdmitCard }) {
  return (
    <Script
      id="admit-card-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: admitCard.examName,
          description: admitCard.instructions?.[0] || "Download your admit card online.",
          provider: {
            "@type": "Organization",
            name: admitCard.organization,
            sameAs: admitCard.links?.officialWebsite,
          },
          startDate: admitCard.importantDates?.applicationStart,
          endDate: admitCard.importantDates?.examDate,
          programType: admitCard.category,
          numberOfCredits: admitCard.totalPosts,
          programPrerequisites: admitCard.eligibility,
        }),
      }}
    />
  );
}

// ✅ Page Component
export default async function Page({ params }: { params: { id: string } }) {
  // Use params.id directly
  const admitCard = await getAdmitCardData(params.id);

  if (!admitCard) {
    return <div className="p-6 text-red-600">Admit card not found.</div>;
  }

  return (
    <>
      <AdmitCardJsonLd admitCard={admitCard} />
      {/* Prop passing removed to avoid the 'IntrinsicAttributes' error */}
      <AdmitCardDetailsPage />
    </>
  );
}
