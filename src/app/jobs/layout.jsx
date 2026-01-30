export const metadata = {
  title: "Latest Government Jobs 2026 – Sarkari Naukri | GovernmentExam.online",
  description:
    "Check latest government jobs 2026 on GovernmentExam.online. Get Sarkari Naukri updates for SSC, UPSC, Railway, Banking, Police, Defence and state govt jobs.",
  keywords: [
    "latest government jobs 2026",
    "sarkari jobs",
    "sarkari naukri 2026",
    "government job notification",
    "ssc jobs",
    "upsc jobs",
    "railway jobs",
    "bank jobs",
    "police jobs",
    "defence jobs",
    "state government jobs",
    "competitive exam jobs",
    "public sector jobs",
    "GovernmentExam jobs",
    "online job application"
  ],
  alternates: {
    canonical: "https://www.governmentexam.online/jobs"
  },
  openGraph: {
    title: "Latest Government Jobs 2026 – Sarkari Naukri | GovernmentExam.online",
    description:
      "Latest Sarkari Jobs 2026 updates for SSC, UPSC, Railway, Banking, Police, Defence and state govt jobs.",
    url: "https://www.governmentexam.online/jobs",
    type: "website",
    images: [
      {
        url: "https://www.governmentexam.online/og-image-jobs-list.jpg",
        width: 1200,
        height: 630,
        alt: "Latest Government Jobs 2026 - GovernmentExam.online"
      }
    ],
    siteName: "GovernmentExam.online"
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Government Jobs 2026 – Sarkari Naukri",
    description: "Latest Sarkari Jobs 2026 updates for government examinations and public sector recruitment.",
    images: ["https://www.governmentexam.online/twitter-image-jobs-list.jpg"]
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

export default function JobsLayout({ children }) {
  return <section>{children}</section>;
}