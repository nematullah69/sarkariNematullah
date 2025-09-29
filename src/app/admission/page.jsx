// app/admissions/page.tsx or pages/admissions.tsx
import AdmissionPage from "./AdmissionPage";

export const metadata = {
  // ✅ Title ~57 chars (limit 60 - 5%)
  title: "Latest University & College Admissions 2025 | Portal",

  // ✅ Description ~150 chars (limit 160 - 5%)
  description:
    "Discover the latest university and college admission opportunities in India. Apply online for UG, PG, and professional courses in 2025.",

  // ✅ Keywords ~93 chars (limit 100 - 5%)
  keywords: "Admissions 2025, University Admissions, College Admissions, Apply Online, Entrance Exams",

  authors: [{ name: "Your Website Name" }],
  robots: "index, follow",

  openGraph: {
    title: "Latest University & College Admissions 2025 | Portal",
    description:
      "Discover the latest university and college admission opportunities in India. Apply online for UG, PG, and professional courses in 2025.",
    url: "https://yourwebsite.com/admissions",
    siteName: "Admission Portal",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Admission Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Latest University & College Admissions 2025 | Portal",
    description:
      "Discover the latest university and college admission opportunities in India. Apply online for UG, PG, and professional courses in 2025.",
    images: ["https://yourwebsite.com/og-image.png"],
    creator: "@YourTwitterHandle",
  },
};

export default function Page() {
  return <AdmissionPage />;
}
