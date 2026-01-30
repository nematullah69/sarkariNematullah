export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  let specificAnswerKey = null;
  try {
    const res = await fetch(
      'https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', 
      {
        next: { revalidate: 3600 }
      }
    );

    if (res.ok) {
      const answerKey = await res.json();
      specificAnswerKey = answerKey.find(a => String(a.id) === String(id));
    }
  } catch (error) {
    console.error('Error fetching answer key metadata:', error);
  }

  // Default metadata if answer key not found
  const title = specificAnswerKey?.title || `Answer Key ${id} - GovernmentExam.online`;
  const description = specificAnswerKey?.description || 
    `Official answer key for ${id}. Check correct answers, solution explanations, and expected cutoff marks.`;
  
  const canonicalUrl = `https://www.governmentexam.online/answer-keys/${id}`;

  return {
    title: title,
    description: description,
    keywords: [
      `${id} answer key`,
      "official answer key",
      "government exam answer key",
      "competitive exam answer key",
      "ssc answer key",
      "upsc answer key",
      "railway answer key",
      "bank exam answer key",
      "solution explanations",
      "expected cutoff",
      "answer key 2026",
      "question paper solutions"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: specificAnswerKey?.title || title,
      description: specificAnswerKey?.description || description,
      url: canonicalUrl,
      type: "article",
      publishedTime: specificAnswerKey?.postedDate || new Date().toISOString(),
      authors: [specificAnswerKey?.organization || "GovernmentExam.online"],
      siteName: "GovernmentExam.online",
      images: [
        {
          url: "https://www.governmentexam.online/og-image-answer-key.jpg",
          width: 1200,
          height: 630,
          alt: specificAnswerKey?.title || "Answer Key - GovernmentExam.online"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: specificAnswerKey?.title || title,
      description: specificAnswerKey?.description || description,
      images: ["https://www.governmentexam.online/twitter-image-answer-key.jpg"]
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

export default function AnswerKeySec({ children }) {
  return <section>{children}</section>
}