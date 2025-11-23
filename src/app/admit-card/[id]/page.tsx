// app/admit-card/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmitCardDetailsPage from "./AdmitCardDetailsPage";
import { connectDB } from "@/lib/db";
import AdmitCardModel from "@/lib/model/AdmitCard";

// --- Interfaces ---
interface AdmitCard {
  id: string;
  examName: string;
  examNameS?: string;
  examvacancy?: string;
  organization: string;
  department: string;
  examDate: string;
  totalPosts?: string;
  instructions: string[];
  examGuidelines: string[];
  category: string;
  importantDates?: Record<string, string>;
  salaryDetails?: { postName: string; allowance: string; amount: string }[];
  vacancy?: { postName: string; category: string; total: string }[];
  eligibility?: string;
  applicationFee?: { category: string; fee: string }[];
  links?: Record<string, string>;
}

// Fetch from MongoDB
async function getAdmitCardData(id: string): Promise<AdmitCard | null> {
  try {
    await connectDB();
    const data = await AdmitCardModel.findOne({ id }).lean();

    // FIX TypeScript error with double assertion
    return data ? (data as unknown as AdmitCard) : null;
  } catch (err) {
    console.error("❌ Mongo DB fetch error:", err);
    return null;
  }
}

// --------------------
// Metadata
// --------------------
export async function generateMetadata(props: any): Promise<Metadata> {
  const admitCard = await getAdmitCardData(props.params.id);

  if (!admitCard) {
    return {
      title: "Admit Card Not Found | Government Exam",
      description: "Admit card details not found.",
      robots: "noindex, follow",
    };
  }

  const title = `${admitCard.examName} Admit Card 2025 | ${admitCard.organization}`;
  const description =
    admitCard.instructions?.[0] ||
    `${admitCard.examName} admit card for ${admitCard.organization}.`;
  const keywords = `Sarkari Admit Card 2025, ${admitCard.examName}, ${admitCard.organization}`;

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
    },
    alternates: {
      canonical: `https://governmentexam.online/admit-card/${admitCard.id}`,
    },
  };
}

// --------------------
// JSON-LD Schema
// --------------------
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
          programType: admitCard.category,
          numberOfCredits: admitCard.totalPosts || 0,
          programPrerequisites:
            admitCard.eligibility || "Eligible candidates only",
          educationalLevel: "Graduate",
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
  );
}

// --------------------
// PAGE COMPONENT
// --------------------
export default async function Page(props: any) {
  const admitCard = await getAdmitCardData(props.params.id);

  if (!admitCard) {
    return <div className="p-6 text-red-600">Admit card not found.</div>;
  }

  return (
    <>
      <AdmitCardJsonLd admitCard={admitCard} />
      <AdmitCardDetailsPage/>
    </>
  );
}
