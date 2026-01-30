export const runtime = "nodejs";

export const metadata = {
  title: "Admit Card 2026 – SSC, UPSC, Railway Exam Admit Card | GovernmentExam.online",
  description:
    "Download Admit Card 2026 for SSC, UPSC, Railway, Banking and other government exams. Get latest hall ticket updates and exam dates at GovernmentExam.online.",
  keywords: [
    "admit card 2026",
    "latest admit card",
    "ssc admit card",
    "upsc admit card",
    "railway admit card",
    "bank exam admit card",
    "government exam admit card",
    "hall ticket",
    "exam admit card",
    "competitive exam admit card",
    "GovernmentExam",
    "online admit card download"
  ],
  alternates: {
    canonical: "https://www.governmentexam.online/admit-cards"
  },
  openGraph: {
    title: "Admit Card 2026 – SSC, UPSC, Railway Exam Admit Card | GovernmentExam.online",
    description:
      "Latest Admit Card 2026 for SSC, UPSC, Railway, Banking and other government exams. Download hall tickets and check exam dates.",
    url: "https://www.governmentexam.online/admit-cards",
    type: "website",
    images: [
      {
        url: "https://www.governmentexam.online/og-image-admit-cards.jpg",
        width: 1200,
        height: 630,
        alt: "Admit Card 2026 - GovernmentExam.online"
      }
    ],
    siteName: "GovernmentExam.online"
  },
  twitter: {
    card: "summary_large_image",
    title: "Admit Card 2026 – SSC, UPSC, Railway Exam Admit Card",
    description: "Latest Admit Card 2026 for government examinations. Download hall tickets and check exam dates.",
    images: ["https://www.governmentexam.online/twitter-image-admit-cards.jpg"]
  },
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
  }
};

export default function AdmissionLayout({ children }) {
  return <section>{children}</section>;
}