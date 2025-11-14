"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  Calendar,
  FileText,
  Download,
  Building,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

// --- START OF TYPESCRIPT FIX ---

// 1. Define the interfaces for nested objects
interface FeeItem {
  category: string;
  fee: string;
}

interface VacancyItem {
  postName: string;
  category: string;
  total: string;
}

interface CutoffItem {
  category: string;
  range: string;
}

interface SalaryItem {
  postName: string;
  level: string;
  initialPay: string;
}

interface LinkUrls {
  admitCard?: string;
  examDate?: string;
  notification?: string;
  officialWebsite?: string;
}

// 2. Define the main data structure (AdmitCard)
interface AdmitCard {
  id: string;
  examName: string;
  organization: string;
  department: string;
  category: string;
  examDate: string; // Added from the Sidebar content
  
  // Optional complex fields
  importantDates?: Record<string, string>; // e.g., { admitCardRelease: '2025-10-01' }
  applicationFee?: FeeItem[];
  vacancy?: VacancyItem[];
  examvacancy?: string; // Appears to be the header for the vacancy table
  eligibility?: string; // Appears to be a string based on usage
  totalPosts?: string;
  cutoff?: CutoffItem[];
  Salary?: SalaryItem[]; // Note the capital 'S' based on your usage
  instructions: string[];
  examGuidelines: string[];
  keboard?: string[];
  links?: LinkUrls;
}

// --- END OF TYPESCRIPT FIX ---

// ✅ JSON-LD for Google (no warnings)
function AdmitCardJsonLd({ admitCard }: { admitCard: AdmitCard }) {
  return (
    <>
      {/* ✅ JSON-LD for SEO */}
      <Script
        id="admit-card-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            name: admitCard.examName,
            description:
              admitCard.instructions?.[0] ||
              "Download your admit card and check exam details.",
            provider: {
              "@type": "Organization",
              name: admitCard.organization,
              sameAs:
                admitCard.links?.officialWebsite ||
                "https://governmentexam.online",
            },
            startDate: admitCard.importantDates?.applicationStart || "",
            endDate: admitCard.importantDates?.examDate || "",
            programType: admitCard.category || "Recruitment Examination",
            numberOfCredits: admitCard.totalPosts || 0,
            programPrerequisites: admitCard.eligibility || "Eligible candidates only",
            educationalLevel: "Graduate",
            inLanguage: "en-IN",
            identifier: {
              "@type": "PropertyValue",
              name: admitCard.examName,
              value: admitCard.id,
            },
            publisher: {
              "@type": "Organization",
              name: "Government Exam Online",
              url: "https://governmentexam.online",
              logo: {
                "@type": "ImageObject",
                url: "https://governmentexam.online/logo.png",
              },
            },
            url: `https://governmentexam.online/admit-card/${admitCard.id}`,
          }),
        }}
      />
    </>
  );
}


const AdmitCardDetailsPage = () => {
  // Assert the type of 'id' from useParams for TypeScript compliance
  const { id } = useParams() as { id: string }; 
  const router = useRouter();
  
  // Use the AdmitCard array type in useState
  const [admitCardsData, setAdmitCardsData] = useState<AdmitCard[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/admitCardsData.json");
        if (!res.ok) throw new Error("Failed to fetch data");
        // Cast the fetched data to the correct type
        const data: AdmitCard[] = await res.json(); 
        setAdmitCardsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading admit card...</p>
      </div>
    );
  }

  // Find the admit card using the correct type assertion
  const admitCard = admitCardsData.find((card) => card.id === id);

  if (!admitCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Admit Card Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The admit card you are looking for might have been removed or the ID is incorrect.
          </p>
          <button
            onClick={() => router.push("/admit-card")}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admit Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Back Button */}
          <div className="pb-4">
            <button
              onClick={() => router.push("/admit-card")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Admit Cards</span>
            </button>
          </div>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {admitCard.examName}
            </h1>
            <div className="flex items-center space-x-2 mb-2">
              <Building className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{admitCard.organization}</span>
            </div>
            <p className="text-gray-600 mb-3">{admitCard.department}</p>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {admitCard.category}
            </span>
          </div>

          {/* Important Dates */}
          {admitCard.importantDates && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Important Dates</h2>
              <ul className="space-y-2 text-gray-700">
                {Object.entries(admitCard.importantDates).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b py-1">
                    <span className="capitalize">
                      {/* The regex is safe to use on strings */}
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                    </span>
                    <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application Fee */}
          {admitCard.applicationFee && (
            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 text-center text-pink-600">Application Fee</h2>
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-bold text-purple-700">Category</th>
                    <th className="p-3 font-bold text-purple-700">Fee (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {admitCard.applicationFee.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">{item.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-gray-600 mt-3 text-sm">
                Pay the Examination Fee through Credit Card, Debit Card, Net Banking, or Offline through E-Challan.
              </p>
            </div>
          )}

          {/* Vacancy Table */}
          {admitCard.vacancy && (
            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 text-center text-green-600">{admitCard.examvacancy}</h2>
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-bold text-purple-700">Post Name</th>
                    <th className="p-3 font-bold text-purple-700">Category</th>
                    <th className="p-3 font-bold text-purple-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {admitCard.vacancy.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.postName}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Eligibility */}
              {admitCard.eligibility && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Eligibility</h3>
                  <p className="text-gray-700">{admitCard.eligibility}</p>
                </div>
              )}
            </div>
          )}

            {/* Total Vacancies */}
            {admitCard.totalPosts && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Total Posts</h2>
                <p className="text-2xl font-bold text-red-600">{admitCard.totalPosts}</p>
              </div>
            )}

          {/* Cutoff */}
          {admitCard.cutoff && (
            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 text-center text-pink-600">Category-wise Cut Off</h2>
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-bold text-purple-700">Category</th>
                    <th className="p-3 font-bold text-purple-700">Cut-off</th>
                  </tr>
                </thead>
                <tbody>
                  {admitCard.cutoff.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">{item.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Salary */}
          {admitCard.Salary && (
            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 text-center text-pink-600">Post-wise Salary Structure</h2>
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 font-bold text-purple-700">Post Name</th>
                    <th className="p-2.8 font-bold text-purple-700">Level</th>
                    <th className="p-3 font-bold text-purple-700">Initial Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {admitCard.Salary.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.postName}</td>
                      <td className="p-3">{item.level}</td>
                      <td className="p-3">{item.initialPay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" /> Instructions
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {admitCard.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          {/* Exam Guidelines */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" /> Exam Guidelines
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {admitCard.examGuidelines.map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-center text-red-700 mb-4">IMPORTANT LINKS</h2>
            <table className="w-full border border-yellow-300">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-semibold text-gray-800">Download Admit Card</td>
                  <td className="p-3 text-blue-600 font-medium">
                    <a href={admitCard.links?.admitCard || "#"} target="_blank" rel="noopener noreferrer">Click Here</a>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold text-gray-800">Check Exam Date Notice</td>
                  <td className="p-3 text-red-600 font-medium">
                    {admitCard.links?.examDate ? (
                      <a href={admitCard.links.examDate} target="_blank" rel="noopener noreferrer">Click Here</a>
                    ) : (
                      "Link Activate Soon"
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold text-gray-800">Download Notification</td>
                  <td className="p-3 text-blue-600 font-medium">
                    <a href={admitCard.links?.notification || "#"} target="_blank" rel="noopener noreferrer">Click Here</a>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold text-gray-800">Official Website</td>
                  <td className="p-3 text-blue-600 font-medium">
                    <a href={admitCard.links?.officialWebsite || "#"} target="_blank" rel="noopener noreferrer">Click Here</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Info</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Organization:</strong> {admitCard.organization}</li>
              <li><strong>Exam Date:</strong> {admitCard.examDate}</li>
              <li><strong>Category:</strong> {admitCard.category}</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notice</h3>
            <p className="text-blue-700 text-sm">
              Please carry a valid photo ID proof along with your admit card to the exam center.
            </p>
          </div>




{/* ✅ Dynamic Keywords Section */}
                {admitCard.keboard && admitCard.keboard.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {admitCard.keboard.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}




        </div>
      </div>
    </div>
  );
};

export default AdmitCardDetailsPage;