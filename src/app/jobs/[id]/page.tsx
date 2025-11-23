// app/jobs/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import JobDetailsPage from "./JobDetailsPage";
import { connectDB } from "@/lib/db";
import JobModel from "@/lib/model/Job";

// Interface (Optional)
interface Job {
  id: string;
  title: string;
  department: string;
  organization: string;
  vacancies: string;
  eligibility: string;
  applicationStart: string;
  applicationEnd: string;
  description: string;
  responsibilities: string[];
  selectionProcess: string[];
  salary: string;
  location: string;
  category: string;
  officialLink: string;
  publishedDate: string;
  status: string;
  importantLinks: { label: string; url: string }[];
  importantDates: {
    notificationDate: string;
    applicationStart: string;
    applicationEnd: string;
    examDate: string;
    admitCardRelease: string;
    resultDate: string;
  };
  applicationFee: { category: string; fee: string }[];
  vacancy: { postName: string; category: string; total: string }[];
  examNameS: string;
  salaryDetails: { allowance: string; amount: string }[];
  imageUrl?: string;
}

/* ============================================================
   🔥 Fetch Job from MongoDB
============================================================ */
async function getJobData(id: string): Promise<Job | null> {
  try {
    await connectDB();
    const job = await JobModel.findOne({ id }).lean();

    return job as Job | null;
  } catch (error) {
    console.error("❌ MongoDB Job Fetch Error:", error);
    return null;
  }
}

/* ============================================================
   🔥 Safe Trim Helper
============================================================ */
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95);
  return text.length > safeLimit
    ? text.slice(0, safeLimit - 3) + "..."
    : text;
}

/* ============================================================
   🔥 Dynamic SEO Metadata
============================================================ */
export async function generateMetadata(props: any): Promise<Metadata> {
  const job = await getJobData(props.params.id);

  if (!job) {
    return {
      title: "Job Not Found | Government Exam",
      description: "Job not found. Explore latest government job updates.",
      robots: "noindex, follow",
    };
  }

  const desc =
    job.description?.trim().length > 0
      ? job.description
      : `Apply online for ${job.title} at ${job.organization}.`;

  const seoTitle = trimText(
    `${job.title} | ${job.organization} Recruitment ${new Date(
      job.publishedDate
    ).getFullYear()}`,
    60
  );

  const seoDesc = trimText(
    `${desc} Last date: ${job.applicationEnd || "N/A"}`,
    160
  );

  const seoKeywords = trimText(
    [
      job.title,
      `${job.organization} Recruitment`,
      `${job.department} Jobs`,
      job.category,
      "Sarkari Naukri",
      "Latest Recruitment",
    ].join(", "),
    100
  );

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://governmentexam.online/jobs/${job.id}`,
      siteName: "Government Exam",
      images: [
        {
          url:
            job.imageUrl ||
            "https://governmentexam.online/default-og-image.png",
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [
        job.imageUrl ||
          "https://governmentexam.online/default-og-image.png",
      ],
    },
    alternates: {
      canonical: `https://governmentexam.online/jobs/${job.id}`,
    },
  };
}

/* ============================================================
   🔥 Google JobPosting JSON-LD Schema
============================================================ */
function JobJsonLd({ job }: { job: Job }) {
  return (
    <Script
      id="jobposting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          datePosted: job.publishedDate || "2025-01-01",
          validThrough: job.applicationEnd,
          employmentType: "FULL_TIME",
          hiringOrganization: {
            "@type": "Organization",
            name: job.organization,
            sameAs: job.officialLink || "",
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location || "India",
              addressRegion: "IN",
              addressCountry: "IN",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: {
              "@type": "QuantitativeValue",
              value: job.salary?.replace(/[^\d]/g, "") || "0",
              unitText: "MONTH",
            },
          },
        }),
      }}
    />
  );
}

/* ============================================================
   🔥 PAGE RENDER
============================================================ */
export default async function Page(props: any) {
  const job = await getJobData(props.params.id);

  if (!job) {
    return <div className="p-6 text-red-600">❌ Job not found.</div>;
  }

  return (
    <>
      <JobJsonLd job={job} />

      {/* IMPORTANT FIX 🔥 */}
      <JobDetailsPage/>
      
    </>
  );
}
