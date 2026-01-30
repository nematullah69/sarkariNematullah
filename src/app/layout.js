import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Government Exam – Latest Govt Jobs, Results, Admit Cards 2025",
  description:
    "GovernmentExam.online – Get the latest government job alerts, exam notifications, results, admit cards, and syllabus updates for SSC, UPSC, Banking, Railway, Defence, and more",
  keywords: [
    "Government Result",
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
    title: "Government Exam - Govt Jobs & Exam Updates 2025",
    description:
      "Check latest government job notifications, exam results, admit cards, and syllabus updates at Sarkari Result Point.",
    url: "https://governmentexam.online/",
    siteName: "Sarkari Result Point",
    images: [
      {
        url: "https://governmentexam.online/seo-banner.png",
        width: 1200,
        height: 630,
        alt: "Government Exam - Latest Government Jobs & Exam Notifications",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Results Hub - Latest Govt Jobs 2025",
    description:
      "Stay updated with Government Results Hub for latest government job openings, exam results, and admit cards.",
    images: ["https://governmentexam.online/seo-banner.png"],
  },
  alternates: {
    canonical: "https://governmentexam.online/",
  },
  verification: {
    google: "vlEyRhKOjJU2SEX-s3eki6i4pTvgirVZDLAa3RNPpwg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8438144860540330"
          crossOrigin="anonymous"
        />
        
        {/* ✅ Important meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Google Analytics (GA4) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MRWG0TTSTS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MRWG0TTSTS');
          `}
        </Script>
        
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}