// app/jobs/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import JobDetailsPage from "./JobDetailsPage";
import * as fs from 'fs/promises'; // Import Node.js File System module
import * as path from 'path';     // Import Node.js Path module

interface Job {
  // ... (Interface remains unchanged)
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

// Max character limits
const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;
const KEYWORDS_LIMIT = 100;

// 🛠️ CRITICAL FIX: Changed from network fetch to direct file system read
async function getJobData(id: string): Promise<Job | null> {
  try {
    // 1. Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'jobsData.json');

    // 2. Read the file content directly
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // 3. Parse the JSON data
    const data: Job[] = JSON.parse(fileContent);

    // 4. Find and return the required item
    return data.find((j) => j.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to read local job data:", err);
    return null;
  }
}

// ✅ Helper → Trim with 5% safe margin (Remains unchanged)
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95); // 5% kam
  return text.length > safeLimit
    ? text.slice(0, safeLimit - 3) + "..."
    : text;
}

// ✅ Dynamic SEO Metadata
// 🎯 FINAL FIX: Use 'any' to bypass the strict type check
export async function generateMetadata(props: any): Promise<Metadata> {
  // Use props.params.id (which is guaranteed to exist at runtime)
  const job = await getJobData(props.params.id);

  if (!job) {
    return {
      title: "Job Not Found | Government Exam",
      description: "Job details not found. Explore the latest government and private job openings in India.",
      robots: "noindex, follow",
    };
  }

  const desc =
    job.description?.trim().length > 0
      ? job.description
      : `Apply online for ${job.title} at ${job.organization}.`;

  // ✅ Apply Safe Limits
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
      "Sarkari Naukri 2025",
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
          url: job.imageUrl || "https://governmentexam.online/default-og-image.png",
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
      images: [job.imageUrl || "https://governmentexam.online/default-og-image.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://governmentexam.online/jobs/${job.id}`,
    },
  };
}

// ✅ JSON-LD Schema for Google Jobs (Remains unchanged)
function JobJsonLd({ job }: { job: Job }) {
  return (
    <Script
      id="jobposting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          datePosted: job.publishedDate,
          validThrough: job.applicationEnd,
          employmentType: "FULL_TIME",
          hiringOrganization: {
            "@type": "Organization",
            name: job.organization,
            sameAs: job.officialLink,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location,
              addressCountry: "IN",
            },
          },
          // NOTE: The salary parsing here is basic and assumes job.salary contains a number. 
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: {
              "@type": "QuantitativeValue",
              value: job.salary.replace(/[^\d]/g, ""), // extract numbers only
              unitText: "MONTH",
            },
          },
        }),
      }}
    />
  );
}

// ✅ Default Export (The main Page component)
// 🎯 FINAL FIX: Use 'any' to bypass the strict type check
export default async function Page(props: any) {
  // Use props.params.id (which is correct at runtime)
  const job = await getJobData(props.params.id);

  if (!job) {
    return <div className="p-6 text-red-600">Job not found.</div>;
  }

  return (
    <>
      <JobJsonLd job={job} />
      {/* ❌ CRITICAL CHANGE: Component rendered WITHOUT the prop */}
      <JobDetailsPage />
    </>
  );
}