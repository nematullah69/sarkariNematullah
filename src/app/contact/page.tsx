// app/contact/page.tsx
import ContactPageClient from "./ContactPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  // ➡️ Updated Title
  title: "Contact Government Exam | Support & Queries",
  // ➡️ Updated Description to match site name
  description:
    "Get in touch with Government Exam for queries related to government job results, admit cards, exam notifications, syllabus, and recruitment support across India.",
  // ➡️ Updated Keywords
  keywords:
    "Government Exam contact, government exams support, job queries, result help, admit card issues, syllabus information",
  robots: "index, follow",
  openGraph: {
    // ➡️ Updated Title
    title: "Contact Government Exam | Support & Queries",
    // ➡️ Updated Description
    description:
      "Reach out to Government Exam for assistance with government job results, admit cards, notifications, and syllabus information.",
    // ➡️ Updated URL
    url: "https://governmentexam.online/contact",
    // ➡️ Updated Site Name
    siteName: "Government Exam",
    images: [
      {
        // ➡️ Updated URL
        url: "https://governmentexam.online/default-og-contact.png",
        width: 1200,
        height: 630,
        // ➡️ Updated Alt text
        alt: "Contact Government Exam",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    // ➡️ Updated Title
    title: "Contact Government Exam | Support & Queries",
    // ➡️ Updated Description
    description:
      "Reach out to Government Exam for assistance with government job results, admit cards, notifications, and syllabus information.",
    // ➡️ Updated URL
    images: ["https://governmentexam.online/default-og-contact.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    // ➡️ Updated URL
    canonical: "https://governmentexam.online/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}