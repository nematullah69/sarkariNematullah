// app/admit-card/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmitCardDetailsPage from "./AdmitCardDetailsPage"; // your client component

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
  vacancy?: { postName: string; category: string; total: string }[];
  eligibility?: string;
  applicationFee?: { category: string; fee: string }[];
  links?: Record<string, string>;
}

// ✅ Fetch admit card by ID
async function getAdmitCardData(id: string): Promise<AdmitCard | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/admitCardsData.json`, { cache: "force-cache" });
    const data: AdmitCard[] = await res.json();
    return data.find((card) => card.id === id) || null;
  } catch {
    return null;
  }
}

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const admitCard = await getAdmitCardData(params.id);
  if (!admitCard) {
    return {
      title: "Admit Card Not Found | Admit Card Portal",
      description: "Admit card details not found. Explore other exams.",
      robots: "noindex, follow",
    };
  }

  // Trimmed to stay within ~5% of limits
  const title = `${admitCard.examName} Admit Card 2025 | ${admitCard.organization}`.slice(0, 57);
  const description = (admitCard.instructions?.[0] || `${admitCard.examName} admit card for ${admitCard.organization}. Check exam date and download online.`).slice(0, 152);
  const keywords = `Admit Card 2025, ${admitCard.examName}, ${admitCard.organization}, ${admitCard.category || ""}, Download Admit Card Online`.slice(0, 95);

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Your Website Name", url: "https://yourwebsite.com" }],
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

// ✅ JSON-LD for Google
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
  const admitCard = await getAdmitCardData(params.id);

  if (!admitCard) {
    return <div className="p-6 text-red-600">Admit card not found.</div>;
  }

  return (
    <>
      <AdmitCardJsonLd admitCard={admitCard} />
      <AdmitCardDetailsPage />
    </>
  );
}
