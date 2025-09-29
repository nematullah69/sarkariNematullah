import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import HomePages from "@/Components/HomePages";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarkari Result Point - Latest Govt Jobs, Results, Admit Cards 2025",
  description:
    "Your one-stop portal for latest government jobs, exam notifications, admit cards, results, answer keys, and syllabus updates. Stay updated with Sarkari Result Point for SSC, UPSC, Banking, Railway, Defence, Police, Teaching jobs and more.",
  keywords: [
    "Sarkari Result",
    "Govt Jobs 2025",
    "SSC Jobs",
    "UPSC Jobs",
    "Railway Jobs",
    "Bank Jobs",
    "Police Jobs",
    "Teaching Jobs",
    "Exam Results",
    "Admit Cards",
    "Answer Keys",
    "Syllabus",
    "Admission"
  ],
  openGraph: {
    title: "Sarkari Result Point - Govt Jobs & Exam Updates 2025",
    description:
      "Check latest government job notifications, exam results, admit cards, and syllabus updates at Sarkari Result Point.",
    url: "https://sarkariresultpoint.com",
    siteName: "Sarkari Result Point",
    images: [
      {
        url: "https://sarkariresultpoint.com/seo-banner.png",
        width: 1200,
        height: 630,
        alt: "Sarkari Result Point - Latest Government Jobs & Exam Notifications",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarkari Result Point - Latest Govt Jobs 2025",
    description:
      "Stay updated with Sarkari Result Point for latest government job openings, exam results, and admit cards.",
    images: ["https://sarkariresultpoint.com/seo-banner.png"],
  },
  alternates: {
    canonical: "https://sarkariresultpoint.com",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
      <Header/>
       {children}
    <Footer/>
    
      
     
      
     
        
      </body>
    </html>
  );
}
