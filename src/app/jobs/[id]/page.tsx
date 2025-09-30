import { Metadata } from "next";
import Script from "next/script";
import JobDetailsPage from "./JobDetailsPage";

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

// ✅ Fetch Job Data
async function getJobData(id: string): Promise<Job | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/jobsData.json`, { cache: "force-cache" });

    const data: Job[] = await res.json();
    return data.find((j) => j.id === id) || null;
  } catch (err) {
    console.error("❌ Failed to fetch job data:", err);
    return null;
  }
}

// ✅ Helper → Trim with 5% safe margin
function trimText(text: string, max: number): string {
  if (!text) return "";
  const safeLimit = Math.floor(max * 0.95); // 5% kam
  return text.length > safeLimit
    ? text.slice(0, safeLimit - 3) + "..."
    : text;
}

// 🛠️ FIX APPLIED: Await 'params'
// ✅ Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // FIX: Await params before accessing its properties
  const resolvedParams = await params; 
  const job = await getJobData(resolvedParams.id);

  if (!job) {
    return {
      title: "Job Not Found | Sarkari Result Jobs Portal",
      description: "Job details not found. Explore latest government and private jobs.",
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
      "Government Jobs 2025",
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
      url: `https://yourwebsite.com/jobs/${job.id}`,
      siteName: "Jobs Portal",
      images: [
        {
          url: job.imageUrl || "https://yourwebsite.com/default-og-image.png",
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [job.imageUrl || "https://yourwebsite.com/default-og-image.png"],
      creator: "@YourTwitterHandle",
    },
    alternates: {
      canonical: `https://yourwebsite.com/jobs/${job.id}`,
    },
  };
}

// ✅ JSON-LD Schema for Google Jobs
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
          // You might need a more robust parsing function for production data.
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

// 🛠️ FIX APPLIED: Await 'params'
// ✅ Default Export (The main Page component)
export default async function Page({ params }: { params: { id: string } }) {
  // FIX: Await params before accessing its properties
  const resolvedParams = await params; 
  const job = await getJobData(resolvedParams.id);

  if (!job) {
    return <div className="p-6 text-red-600">Job not found.</div>;
  }

  return (
    <>
      <JobJsonLd job={job} />
      <JobDetailsPage id={resolvedParams.id} />
    </>
  );
}