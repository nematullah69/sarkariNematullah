export const metadata = {
  title: "Admission 2026 – UG, PG & Entrance Exam Online Form | GovernmentExam.online",
  description:
    "Check latest Admission 2026 updates for UG, PG, Diploma and entrance exams. Apply online for government, university and college admissions at GovernmentExam.online.",
  keywords: [
    "admission 2026",
    "latest admission",
    "ug admission 2026",
    "pg admission 2026",
    "entrance exam admission",
    "online admission form",
    "college admission",
    "university admission",
    "government admission",
    "government exam admission",
    "GovernmentExam",
    "competitive exam admission"
  ],
  alternates: {
    canonical: "https://www.governmentexam.online/admissions"
  },
  openGraph: {
    title: "Admission 2026 – UG, PG & Entrance Exam Online Form | GovernmentExam.online",
    description:
      "Latest Admission 2026 updates for UG, PG, Diploma and entrance exams. Apply online for government, university and college admissions.",
    url: "https://www.governmentexam.online/admissions",
    type: "website",
    images: [
      {
        url: "https://www.governmentexam.online/og-image-admissions.jpg",
        width: 1200,
        height: 630,
        alt: "Admission 2026 - GovernmentExam.online"
      }
    ],
    siteName: "GovernmentExam.online"
  },
  twitter: {
    card: "summary_large_image",
    title: "Admission 2026 – UG, PG & Entrance Exam Online Form",
    description: "Latest Admission 2026 updates for government and university admissions.",
    images: ["https://www.governmentexam.online/twitter-image-admissions.jpg"]
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