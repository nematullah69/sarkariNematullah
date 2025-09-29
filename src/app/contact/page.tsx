// app/contact/page.tsx
import ContactPageClient from "./ContactPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact SarkariResult Portal | Government Exam Support",
  description:
    "Get in touch with SarkariResult Portal for queries related to government exam results, admit cards, notifications, and syllabus information across India.",
  keywords:
    "SarkariResult, contact, government exams, exam support, result queries, admit card issues, syllabus, notifications",
  robots: "index, follow",
  openGraph: {
    title: "Contact SarkariResult Portal | Government Exam Support",
    description:
      "Reach out to SarkariResult Portal for assistance with government exam results, admit cards, notifications, and syllabus information.",
    url: "https://yourwebsite.com/contact",
    siteName: "SarkariResult Portal",
    images: [
      {
        url: "https://yourwebsite.com/default-og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact SarkariResult Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SarkariResult Portal | Government Exam Support",
    description:
      "Reach out to SarkariResult Portal for assistance with government exam results, admit cards, notifications, and syllabus information.",
    images: ["https://yourwebsite.com/default-og-contact.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://yourwebsite.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
