// src/app/jobs/page.jsx (Server Component)

export const metadata = {
    // ✅ Title ~59 chars (limit 60 - 5%) - Updated Site Name & Focus
    title: "Latest Sarkari & Govt Jobs 2025 | Government Exam",
  
    // ✅ Description ~150 chars (limit 160 - 5%) - Clearer language
    description:
      "Find the latest Government (Sarkari Naukri) and Private job openings in India for 2025. Apply online for free and search by exam or department.",
  
    // ✅ Keywords ~98 chars (limit 100 - 5%) - Targeted Search Terms
    keywords: [
      "sarkari naukri 2025",
      "govt jobs 2025",
      "latest jobs India",
      "apply online jobs",
      "sarkari jobs",
      "private jobs India",
    ],
  
    authors: [{ name: "Government Exam", url: "https://governmentexam.online" }], // ➡️ Updated Site Name
    creator: "Government Exam", // ➡️ Updated Site Name
    publisher: "Government Exam", // ➡️ Updated Site Name
  
    openGraph: {
      title: "Latest Sarkari & Govt Jobs 2025 | Government Exam", // ➡️ Updated Title
      description:
        "Find the latest Government (Sarkari Naukri) and Private job openings in India for 2025. Apply online for free and search by exam or department.",
      url: "https://governmentexam.online/jobs",
      siteName: "Government Exam", // ➡️ Updated Site Name
      images: [
        {
          url: "https://governmentexam.online/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Government Exam - Latest Job Openings 2025",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
  
    twitter: {
      card: "summary_large_image",
      title: "Latest Sarkari & Govt Jobs 2025 | Government Exam", // ➡️ Updated Title
      description:
        "Find the latest Government (Sarkari Naukri) and Private job openings in India for 2025. Apply online for free and search by exam or department.",
      images: ["https://governmentexam.online/og-image.jpg"],
      site: "@YourTwitterHandle",
      creator: "@YourTwitterHandle",
    },
  
    alternates: {
      canonical: "https://governmentexam.online/jobs",
    },
  };
  
  import JobsPageClient from "./JobsPageClient";
  
  export default function JobsPage() {
    return <JobsPageClient />;
  }