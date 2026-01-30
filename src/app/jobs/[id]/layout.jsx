export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  let specificJob = null;
  try {
    const res = await fetch(
      'https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt',
      {
        next: { revalidate: 3600 }
      }
    );

    if (res.ok) {
      const jobs = await res.json();
      specificJob = jobs.find(a => String(a.id) === String(id));
    }
  } catch (error) {
    console.error('Error fetching job metadata:', error);
  }

  // Default metadata if job not found
  const title = specificJob?.title || `Government Job ${id} - GovernmentExam.online`;
  const description = specificJob?.metaD || 
    `Latest government job notification for ${id}. Check eligibility, application process, vacancy details, and important dates.`;
  
  const canonicalUrl = `https://www.governmentexam.online/jobs/${id}`;

  return {
    title: title,
    description: description,
    keywords: [
      `${id} government job`,
      "latest government job",
      "sarkari naukri",
      "government vacancy",
      "competitive exam job",
      "ssc job",
      "upsc job",
      "railway job",
      "bank job",
      "public sector job",
      "online application",
      "recruitment 2026",
      "GovernmentExam job"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: specificJob?.title || title,
      description: specificJob?.metaD || description,
      url: canonicalUrl,
      type: "article",
      publishedTime: specificJob?.postedDate || new Date().toISOString(),
      authors: [specificJob?.organization || "GovernmentExam.online"],
      siteName: "GovernmentExam.online",
      images: [
        {
          url: "https://www.governmentexam.online/og-image-jobs.jpg",
          width: 1200,
          height: 630,
          alt: specificJob?.title || "Government Job Notification"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: specificJob?.title || title,
      description: specificJob?.metaD || description,
      images: ["https://www.governmentexam.online/twitter-image-jobs.jpg"]
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
}

export default function JobsSec({ children }) {
  return <section>{children}</section>
}