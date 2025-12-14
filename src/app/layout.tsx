import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Government Exam – Latest Govt Jobs, Results, Admit Cards 2025",
  description:
    "GovernmentExam.online – Get the latest government job alerts, exam notifications, results, admit cards, and syllabus updates",
  alternates: {
    canonical: "https://governmentexam.online/",
  },
  verification: {
    google: [
      "vlEyRhKOjJU2SEX-s3eki6i4pTvgirVZDLAa3RNPpwg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* ✅ Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8438144860540330"
          crossOrigin="anonymous"
        />

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

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
