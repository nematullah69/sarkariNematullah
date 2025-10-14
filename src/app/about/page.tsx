// app/about/page.tsx
import AboutPageClient from "./AboutPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Government  Exam | Government Exam Updates",
  description:
    "Learn about Government  Exam – our mission, services, and team dedicated to providing accurate and reliable government exam results, admit cards, notifications, and syllabus information across India.",
  keywords:
    "SarkariResult, government exams, exam results, admit card, syllabus, notifications, SSC, UPSC, Railway, Banking, India",
  robots: "index, follow",
  openGraph: {
    title: "About Government  Exam | Government Exam Updates",
    description:
      "Discover our mission and services. SarkariResult Portal provides verified government exam results, admit cards, notifications, and syllabus information across India.",
    url: "http://governmentexam.online/about",
    siteName: "SarkariResult Portal",
    images: [
      {
        url: "https://governmentexam.online/default-og-about.png",
        width: 1200,
        height: 630,
        alt: "About SarkariResult Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Government  Exam | Government Exam Updates",
    description:
      "Discover our mission and services. SarkariResult Portal provides verified government exam results, admit cards, notifications, and syllabus information across India.",
    images: ["https://governmentexam.online/default-og-about.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://governmentexam.online/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
