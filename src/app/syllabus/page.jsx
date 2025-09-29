// app/syllabus/page.tsx

import SyllabusPage from "./SyllabusPageClient"; // your client component


export const metadata = {
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
    url: "https://yourwebsite.com/syllabus",
    siteName: "Govt & Competitive Exams Portal",
    images: [
      {
        url: "https://yourwebsite.com/default-og-syllabus.png",
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
    images: ["https://yourwebsite.com/default-og-syllabus.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://yourwebsite.com/syllabus",
  },
};

export default function Page() {
  return <SyllabusPage />;
}
