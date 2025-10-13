// app/admissions/page.tsx or pages/admissions.tsx
import AdmissionPage from "./AdmissionPage";
import { Metadata } from "next";

export const metadata={
  // ➡️ Updated Title (Using site name)
  title: "Latest Admissions 2025 | University, College, & Govt Programs | Government Exam", // ~60 chars

  // ➡️ Updated Description
  description:
    "Find and apply for the latest official admission notifications for Universities, Colleges, and professional Government programs (UG, PG, PhD) in India for 2025.", // ~158 chars

  // ➡️ Updated Keywords
  keywords: "Admissions 2025, University Admissions, College Admissions, Entrance Exams, Government Programs, Apply Online", // ~100 chars

  // ➡️ Updated Authors/Creator
  authors: [{ name: "Government Exam", url: "https://governmentexam.online" }],
  robots: "index, follow",

  openGraph: {
    // ➡️ Updated Title
    title: "Latest Admissions 2025 | University, College, & Govt Programs | Government Exam",
    // ➡️ Updated Description
    description:
      "Find and apply for the latest official admission notifications for Universities, Colleges, and professional Government programs (UG, PG, PhD) in India for 2025.",
    // ➡️ Updated URL (Changed to /admission)
    url: "https://governmentexam.online/admission",
    // ➡️ Updated Site Name
    siteName: "Government Exam",
    images: [
      {
        // ➡️ Updated URL
        url: "https://governmentexam.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "University and College Admissions 2025",
      },
    ],
    locale: "en_IN", // Changed from en_US to en_IN
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    // ➡️ Updated Title
    title: "Latest Admissions 2025 | University, College, & Govt Programs | Government Exam",
    // ➡️ Updated Description
    description:
      "Find and apply for the latest official admission notifications for Universities, Colleges, and professional Government programs (UG, PG, PhD) in India for 2025.",
    // ➡️ Updated URL
    images: ["https://governmentexam.online/og-image.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    // ➡️ Updated Canonical URL (Changed to /admission)
    canonical: "https://governmentexam.online/admission",
  },
};

export default function Page() {
  return <AdmissionPage />;
}