export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  let specificResult = null;
  try {
    const res = await fetch(
      'https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result',
      {
        next: { revalidate: 3600 }
      }
    );

    if (res.ok) {
      const result = await res.json();
      specificResult = result.find(a => String(a.id) === String(id));
    }
  } catch (error) {
    console.error('Error fetching result metadata:', error);
  }

  // Default metadata if result not found
  const title = specificResult?.title || `Result ${id} - GovernmentExam.online`;
  const description = specificResult?.description || 
    `Check latest result for ${id}. View scores, merit list, cutoff marks, and download scorecard.`;
  
  const canonicalUrl = `https://www.governmentexam.online/results/${id}`;

  return {
    title: title,
    description: description,
    keywords: [
      `${id} result`,
      "latest result",
      "government exam result",
      "competitive exam result",
      "ssc result",
      "upsc result",
      "railway result",
      "bank exam result",
      "merit list",
      "cutoff marks",
      "scorecard download",
      "result 2026",
      "online result",
      "GovernmentExam result"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: specificResult?.title || title,
      description: specificResult?.description || description,
      url: canonicalUrl,
      type: "article",
      publishedTime: specificResult?.declaredDate || new Date().toISOString(),
      authors: [specificResult?.organization || "GovernmentExam.online"],
      siteName: "GovernmentExam.online",
      images: [
        {
          url: "https://www.governmentexam.online/og-image-results.jpg",
          width: 1200,
          height: 630,
          alt: specificResult?.title || "Exam Result - GovernmentExam.online"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: specificResult?.title || title,
      description: specificResult?.description || description,
      images: ["https://www.governmentexam.online/twitter-image-results.jpg"]
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

export default function ResultSec({ children }) {
  return <section>{children}</section>
}