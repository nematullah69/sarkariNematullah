// app/syllabus/page.tsx

import SyllabusPage from "./SyllabusPageClient"; // your client component
import { Metadata } from "next"; // Import Metadata type explicitly

export const metadata= {
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
    url: "https://governmentexam.online/syllabus",
    siteName: "Govt & Competitive Exams Portal",
    images: [
      {
        url: "https://governmentexam.online/default-og-syllabus.png",
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
    images: ["https://governmentexam.online/default-og-syllabus.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://governmentexam.online/syllabus",
  },
};

export default function Page() {
  return <SyllabusPage />;
}
