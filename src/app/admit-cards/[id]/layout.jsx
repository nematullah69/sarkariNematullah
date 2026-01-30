export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  let specificAdmitCard = null;
  try {
    const res = await fetch(
      `https://gist.githubusercontent.com/shahidafridi-collab/d6610e1b9fb8e2617c2999d1edc0851c/raw/gistfile1.txt`,
      { 
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      const admitCard = await res.json();
      specificAdmitCard = admitCard.find(a => String(a.id) === String(id));
    }
  } catch (error) {
    console.error('Error fetching admit card metadata:', error);
  }

  // Default metadata if admit card not found
  const title = specificAdmitCard?.title || `Admit Card ${id} - GovernmentExam.online`;
  const description = specificAdmitCard?.description || 
    `Download admit card for ${id}. Get complete information about exam date, venue, and important instructions.`;
  
  const canonicalUrl = `https://www.governmentexam.online/admit-cards/${id}`;

  return {
    title: title,
    description: description,
    keywords: [
      `${id} admit card`,
      "hall ticket download",
      "government exam admit card",
      "competitive exam admit card",
      "ssc admit card",
      "upsc admit card",
      "railway admit card",
      "bank exam admit card",
      "admit card 2026",
      "online admit card"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: specificAdmitCard?.title || title,
      description: specificAdmitCard?.description || description,
      url: canonicalUrl,
      type: "article",
      publishedTime: specificAdmitCard?.postedDate || new Date().toISOString(),
      authors: [specificAdmitCard?.organization || "GovernmentExam.online"],
      siteName: "GovernmentExam.online",
      images: [
        {
          url: "https://www.governmentexam.online/og-image-admit-card.jpg",
          width: 1200,
          height: 630,
          alt: specificAdmitCard?.title || "Admit Card Download"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: specificAdmitCard?.title || title,
      description: specificAdmitCard?.description || description,
      images: ["https://www.governmentexam.online/twitter-image-admit-card.jpg"]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function AdmitCardSec({ children }) {
  return <section>{children}</section>
}