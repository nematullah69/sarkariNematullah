// app/about/page.tsx
import AboutPageClient from "./AboutPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SarkariResult Portal | Government Exam Updates",
  description:
    "Learn about SarkariResult Portal – our mission, services, and team dedicated to providing accurate and reliable government exam results, admit cards, notifications, and syllabus information across India.",
  keywords:
    "SarkariResult, government exams, exam results, admit card, syllabus, notifications, SSC, UPSC, Railway, Banking, India",
  robots: "index, follow",
  openGraph: {
    title: "About SarkariResult Portal | Government Exam Updates",
    description:
      "Discover our mission and services. SarkariResult Portal provides verified government exam results, admit cards, notifications, and syllabus information across India.",
    url: "https://yourwebsite.com/about",
    siteName: "SarkariResult Portal",
    images: [
      {
        url: "https://yourwebsite.com/default-og-about.png",
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
    title: "About SarkariResult Portal | Government Exam Updates",
    description:
      "Discover our mission and services. SarkariResult Portal provides verified government exam results, admit cards, notifications, and syllabus information across India.",
    images: ["https://yourwebsite.com/default-og-about.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://yourwebsite.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
