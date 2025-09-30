// app/admit-card/[id]/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import AdmitCardDetailsPage from "./AdmitCardDetailsPage"; // your client component
// ... (Interfaces remain unchanged)

// ... (getAdmitCardData function remains unchanged)

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // FIX APPLIED: Use params.id directly. 'params' object is ready immediately.
  const admitCard = await getAdmitCardData(params.id);
  
  // ... (Rest of metadata logic remains unchanged)
  if (!admitCard) {
    return {
      title: "Admit Card Not Found | Admit Card Portal",
      description: "Admit card details not found. Explore other exams.",
      robots: "noindex, follow",
    };
  }

  // ... (Rest of metadata generation)

  return {
    // ... (Return statement)
  };
}

// ✅ JSON-LD for Google (Function remains unchanged)
function AdmitCardJsonLd({ admitCard }: { admitCard: AdmitCard }) {
  return (
    // ... (Return statement)
  );
}

// 🛠️ FIX APPLIED: Use params.id directly. 
// ✅ Page Component
export default async function Page({ params }: { params: { id: string } }) {
  // Removed: const resolvedParams = await params;
  // Use params.id directly
  const admitCard = await getAdmitCardData(params.id);

  if (!admitCard) {
    return <div className="p-6 text-red-600">Admit card not found.</div>;
  }

  return (
    <>
      <AdmitCardJsonLd admitCard={admitCard} />
      {/* CRITICAL FIX CONFIRMED: No props passed, as the client component uses useParams() */}
      <AdmitCardDetailsPage /> 
    </>
  );
}
