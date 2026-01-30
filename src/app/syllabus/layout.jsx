export const metadata = {
  title: "Government Exam Syllabus 2026 | SSC, UPSC, Railway – GovernmentExam.online",
  description:
    "Check latest government exam syllabus 2026 for SSC, UPSC, Railway, Banking, Police and other exams. Download updated exam pattern and subject-wise syllabus.",
  alternates: {
    canonical: "https://www.governmentexam.online/syllabus",
  },
  keywords: [
    "government exam syllabus 2026",
    "latest exam syllabus",
    "ssc syllabus",
    "upsc syllabus",
    "railway syllabus",
    "bank exam syllabus",
    "competitive exam syllabus",
    "exam pattern",
    "subject-wise syllabus",
    "download syllabus pdf",
    "GovernmentExam syllabus",
    "online syllabus"
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
    title: "Latest Exam Syllabus 2026 – SSC, UPSC, Railway | GovernmentExam.online",
    description:
      "Latest government exam syllabus 2026 for SSC, UPSC, Railway, Banking and other exams. Subject-wise syllabus & exam pattern.",
    url: "https://www.governmentexam.online/syllabus",
    type: "website",
    images: [
      {
        url: "https://www.governmentexam.online/og-image-syllabus.jpg",
        width: 1200,
        height: 630,
        alt: "Government Exam Syllabus 2026 - GovernmentExam.online"
      }
    ],
    siteName: "GovernmentExam.online"
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Exam Syllabus 2026 – SSC, UPSC, Railway",
    description: "Latest government exam syllabus 2026 for SSC, UPSC, Railway, Banking and other competitive exams.",
    images: ["https://www.governmentexam.online/twitter-image-syllabus.jpg"]
  }
};

export default function SyllabusLayout({ children }) {
  return <section>{children}</section>;
}