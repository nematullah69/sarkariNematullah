export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  let specificAdmission = null;
  try {
    const res = await fetch(
      `https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const admission = await res.json();
      specificAdmission = admission.find(a => String(a.id) === String(id));
    }
  } catch (error) {
    console.error('Error fetching admission metadata:', error);
  }

  // Default metadata if admission not found
  const title = specificAdmission?.title || `Admission ${id} - GovernmentExam.online`;
  const description = specificAdmission?.description || 
    `Latest admission details for ${id}. Get complete information about admission process, eligibility, and important dates.`;
  
  const canonicalUrl = `https://www.governmentexam.online/admissions/${id}`;

  return {
    title: title,
    description: description,
    keywords: [
      `${id} admission`,
      "government admission",
      "college admission",
      "university admission",
      "entrance exam admission",
      "online admission form",
      "admission 2026"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: specificAdmission?.title || title,
      description: specificAdmission?.description || description,
      url: canonicalUrl,
      type: "article",
      publishedTime: specificAdmission?.postedDate || new Date().toISOString(),
      authors: [specificAdmission?.organization || "GovernmentExam.online"],
      siteName: "GovernmentExam.online",
      images: [
        {
          url: "https://www.governmentexam.online/og-image-admission.jpg",
          width: 1200,
          height: 630,
          alt: specificAdmission?.title || "Admission Details"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: specificAdmission?.title || title,
      description: specificAdmission?.description || description,
      images: ["https://www.governmentexam.online/twitter-image-admission.jpg"]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function AdmissionSec({ children }) {
  return <section>{children}</section>
}