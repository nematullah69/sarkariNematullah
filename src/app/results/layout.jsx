export const metadata = {
  title: "Government Exam Results 2026 – All Latest Exam Results | GovernmentExam.online",
  description:
    "Check Government Exam Results 2026 for all latest exam results including SSC, UPSC, Railway, Banking, Board and University results. Fast & trusted updates on GovernmentExam.online.",
  alternates: {
    canonical: "https://www.governmentexam.online/results",
  },
  keywords: [
    "government exam results 2026",
    "latest exam results",
    "competitive exam results",
    "ssc result",
    "upsc result",
    "railway result",
    "bank result",
    "board exam result",
    "university result",
    "online result",
    "result checker",
    "GovernmentExam results",
    "scorecard download",
    "merit list"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    title: "Government Exam Results 2026 – All Latest Exam Results | GovernmentExam.online",
    description:
      "Check Government Exam Results 2026 for all latest exam results including SSC, UPSC, Railway, Banking, Board and University results.",
    url: "https://www.governmentexam.online/results",
    siteName: "GovernmentExam.online",
    type: "website",
    images: [
      {
        url: "https://www.governmentexam.online/og-image-results-list.jpg",
        width: 1200,
        height: 630,
        alt: "Government Exam Results 2026 - GovernmentExam.online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Exam Results 2026 – All Latest Exam Results",
    description: "Check latest government exam results including SSC, UPSC, Railway, Banking, Board and University results.",
    images: ["https://www.governmentexam.online/twitter-image-results-list.jpg"]
  }
};

export default function ResultsLayout({ children }) {
  return <section>{children}</section>;
}