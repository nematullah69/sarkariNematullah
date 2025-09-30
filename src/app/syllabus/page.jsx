// app/syllabus/page.tsx

import SyllabusPage from "./SyllabusPageClient"; // your client component
import { Metadata } from "next"; // Import Metadata type explicitly

export const metadata: Metadata = {
  title: "Latest Exam Syllabus 2025 | Govt & Competitive Exams Portal",
  description:
    "Download detailed syllabus for government and competitive exams. Stay updated with official exam syllabus for UPSC, SSC, JEE, NEET, and more.",
  keywords:
    "Exam Syllabus 2025,Government Exams Syllabus,Competitive Exams Syllabus,UPSC Syllabus, SSC Syllabus",
  robots: "index, follow",
  openGraph: {
    title: "Latest Exam Syllabus 2025 | Govt & Competitive Exams Portal",
    description:
      "Download detailed syllabus for government and competitive exams. Stay updated with official exam syllabus for UPSC, SSC, JEE, NEET, and more.",
    // FIX APPLIED: Updated URL to Netlify domain
    url: "https://sarkariportl.netlify.app/syllabus",
    siteName: "Govt & Competitive Exams Portal",
    images: [
      {
        // FIX APPLIED: Updated URL to Netlify domain
        url: "https://sarkariportl.netlify.app/default-og-syllabus.png",
        width: 1200,
        height: 630,
        alt: "Exam Syllabus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Exam Syllabus 2025 | Govt & Competitive Exams Portal",
    description:
      "Download detailed syllabus for government and competitive exams. Stay updated with official exam syllabus for UPSC, SSC, JEE, NEET, and more.",
    // FIX APPLIED: Updated URL to Netlify domain
    images: ["https://sarkariportl.netlify.app/default-og-syllabus.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    // FIX APPLIED: Updated canonical URL
    canonical: "https://sarkariportl.netlify.app/syllabus",
  },
};

export default function Page() {
  return <SyllabusPage />;
}
