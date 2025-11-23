"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import Head from "next/head";

import {
  ArrowLeft,
  Building,
  FileText,
  ExternalLink,
  Download,
  Home,
  ChevronRight,
  Calendar,
  DollarSign,
  ListChecks,
  Award,
} from "lucide-react";

// --- START OF TYPESCRIPT FIXES ---

// 1. Nested Interfaces
interface VacancyItem {
  postName: string;
  category?: string; // Optional since it's wrapped in a check and might be missing
  total: string | number;
  eligibility?: string; // Appears to be used in the table 
}

interface SalaryItem {
  postName: string;
  level: string;
  initialPay: string;
}

interface SalaryDetail {
  allowance: string;
  amount: string | number;
}

interface CutoffItem {
  category: string;
  range: string; // e.g., "70-75" or "150 Marks"
}

interface RrbResultData {
  name: string;
  exam: string;
  status: string;
  statusLink?: string;
}

interface FeeItem {
  category: string;
  fee: string | number;
}

// 2. Main Result Interface
interface Result {
  id: string | number;
  examName: string;
  organization: string;
  department?: string;
  status: "Published" | "Awaited" | "Updated" | "Pending";
  category?: string;
  downloadLink?: string;
  officialWebsite?: string;
  resultDetails?: string;
  resultDate?: string;
  totalPosts?: string | number;
  keywords?: string[];


  // Optional complex fields
  importantDates?: Record<string, string>; // { key: value } structure
  vacancy?: VacancyItem[];
  examvacancy?: string; // Header for vacancy table
  Salary?: SalaryItem[]; // Post-wise salary table (Note the capital 'S')
  salaryDetails?: SalaryDetail[]; // Detailed allowance table
  examNameS?: string; // Header for detailed allowance table
  cutoff?: CutoffItem[];
  rrbResultsData?: RrbResultData[];
  applicationFee?: FeeItem[];
}

function ResultJsonLd({ result }: { result: Result }) {
  return (
    <Script
      id="result-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "CreativeWork",
          name: result.examName,
          description:
            result.resultDetails ||
            `${result.examName} result published by ${result.organization}.`,
          datePublished: result.resultDate || new Date().toISOString(),
          inLanguage: "en",
          educationalCredentialAwarded: "Result",
          publisher: {
            "@type": "Organization",
            name: result.organization,
            sameAs: result.officialWebsite || "",
          },
          about: {
            "@type": "EducationalOccupationalProgram",
            name: result.examName,
            provider: {
              "@type": "Organization",
              name: result.organization,
              sameAs: result.officialWebsite || "",
            },
          },
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: Number(result.totalPosts) || 0,
          },
          mainEntityOfPage: `https://governmentexam.online/results/${result.id}`,
        }),
      }}
    />
  );
}

// --- END OF TYPESCRIPT FIXES ---

const ResultDetailsPage = () => {
  // Assert the type for 'id' from useParams
  const { id } = useParams() as { id: string }; 
  
  // Use the Result interface for state initialization
  const [results, setResults] = useState<Result[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadData = async () => {
    try {
      const res = await fetch(`/api/results/${id}`);
      const json = await res.json();

      // Ensure we always store an array, so .find() works
      setResults(Array.isArray(json.data) ? json.data : [json.data]);

    } catch (err) {
      console.error("Error loading result:", err);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        .
      </div>
    );
  }

  // Find the result using the correct type assertion and comparison
  const result = results.find((r) => String(r.id) === String(id));

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Result Not Found
          </h2>
          <Link
            href="/results"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  // Type the status parameter for the helper function
  const getStatusColor = (status: Result['status']) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Awaited":
      case "Pending": // Grouping 'Pending' and 'Awaited' for color consistency
        return "bg-yellow-100 text-yellow-800";
      case "Updated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to format camelCase keys for display
  const formatKey = (key: string) => {
    switch (key) {
        case 'postName': return 'Post Name';
        case 'category': return 'Category';
        case 'total': return 'Total Vacancies';
        case 'eligibility': return 'Eligibility Criteria';
        case 'level': return 'Pay Level';
        case 'initialPay': return 'Initial Pay';
        case 'allowance': return 'Allowance';
        case 'amount': return 'Amount / Value';
        default:
            return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <>
     <Head>
          <meta
            name="keywords"
            content={result.keywords ? result.keywords.join(", ") : ""}
          />
        </Head>

  <div className="bg-white border-b">
    <div className="container mx-auto px-4 py-3">
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link
          href="/"
          className="flex items-center hover:text-blue-600 transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/results"
          className="hover:text-blue-600 transition-colors"
        >
          Results
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-800 font-medium truncate">
          {result.examName}
        </span>
      </nav>
    </div>
  </div>
</>


      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/results"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Results</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Header / Primary Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {result.examName}
              </h1>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-semibold">{result.organization}</span>
              </div>
              {result.department && (
                <p className="text-gray-600 mb-3">{result.department}</p>
              )}
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                    result.status
                  )}`}
                >
                  {result.status}
                </span>
                {result.category && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {result.category}
                  </span>
                )}
              </div>
            </div>

            
            {/* 3. Result Details / Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Result Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {result.resultDetails || "No detailed summary available yet."}
              </p>
            </div>
            
            {/* 4. Important Dates */}
            {result.importantDates && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                  Exam Important Dates
                </h2>
                <ul className="space-y-2 text-gray-700">
                      {Object.entries(result.importantDates)
  .filter(([key]) => key !== "_id")
  .map(([key, value], index) => (

                  
                      <li
                        key={index}
                        className="flex justify-between border-b border-gray-100 py-2"
                      >
                        <span className="capitalize font-semibold text-gray-600">
                          {formatKey(key)}:
                        </span>
                        <span className="font-medium text-gray-800">{value}</span>
                      </li>
                    )
                  )}
                </ul>
                <p className="text-gray-600 mt-3 text-sm italic">
                    Applicants should verify the details from the official website before proceeding.
                </p>
              </div>
            )}
            
           {/* 5. Vacancy Table Fixed */}
{result.vacancy && result.vacancy.length > 0 && (
  <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
    <h2 className="text-xl font-bold mb-4 text-center text-green-700 flex items-center justify-center">
      <Award className="h-5 w-5 mr-2" />
      {result.examvacancy || "Vacancy Details"}
    </h2>
    <table className="w-full border border-gray-200 min-w-[600px]">
      <thead>
        <tr className="bg-green-50 text-left">
          {/* FIXED: Headers manually set to match data columns */}
          <th className="p-3 font-bold text-green-800">Post Name</th>
          <th className="p-3 font-bold text-green-800">Category</th>
          <th className="p-3 font-bold text-center text-green-800">Total Vacancies</th>
          <th className="p-3 font-bold text-green-800">Eligibility Criteria</th>
        </tr>
      </thead>
      <tbody>
        {result.vacancy.map((item, index) => (
          <tr key={index} className="border-t hover:bg-gray-50">
            <td className="p-3 font-medium">{item.postName}</td>
            <td className="p-3">{item.category}</td>
            <td className="p-3 text-center font-bold">{item.total}</td>
            <td className="p-3 text-sm text-gray-600">{item.eligibility}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

            {/* 6. Salary Section (combine both structures) */}

            {/* Salary Structure (Post-wise - uses result.Salary) */}
            {result.Salary && result.Salary.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 text-center text-indigo-700 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                  Post-wise Salary Structure
                </h2>
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="bg-indigo-50 text-left">
                      <th className="p-3 font-bold text-indigo-800">Post Name</th>
                      <th className="p-3 font-bold text-indigo-800">Pay Level</th>
                      <th className="p-3 font-bold text-indigo-800">Initial Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.Salary.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{item.postName}</td>
                        <td className="p-3">{item.level}</td>
                        <td className="p-3 font-semibold text-green-700">{item.initialPay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Detailed Salary/Allowance (uses result.salaryDetails) */}
            {result.salaryDetails && (
              <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">
                  {result.examNameS || "Detailed Allowances"}
                </h2>
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="bg-indigo-50 text-left">
                      <th className="p-3 font-bold text-indigo-800">Allowance</th>
                      <th className="p-3 font-bold text-indigo-800">Amount / Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.salaryDetails.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3 font-semibold">{item.allowance}</td>
                        <td className="p-3">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-gray-600 mt-3 text-sm italic">
                    For complete salary and allowance details, refer to the official notification.
                </p>
              </div>
            )}


            {/* 7. Cutoff Information */}
            {result.cutoff && result.cutoff.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 text-center text-red-700 flex items-center justify-center">
                    <ListChecks className="h-5 w-5 mr-2" />
                  Category-wise Cut Off
                </h2>
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="bg-red-50 text-left">
                      <th className="p-3 font-bold text-red-800">Category</th>
                      <th className="p-3 font-bold text-red-800">Cut-off (Marks/Score)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.cutoff.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{item.category}</td>
                        <td className="p-3 font-semibold text-red-600">{item.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 8. RRB Zone Wise Result Section */}
            {result.rrbResultsData && result.rrbResultsData.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                  RRB Zone Wise Results / Links
                </h2>
                <table className="w-full border border-gray-300 text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-3 py-2">RRB Zone</th>
                      <th className="border px-3 py-2">Exam / Event</th>
                      <th className="border px-3 py-2">Status</th>
                      <th className="border px-3 py-2">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rrbResultsData.map((zone, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="border px-3 py-2 font-medium">{zone.name}</td>
                        <td className="border px-3 py-2 text-sm">{zone.exam}</td>
                        <td className="border px-3 py-2 font-semibold">{zone.status}</td>
                        <td className="border px-3 py-2">
                          {zone.statusLink ? (
                            <a
                              href={zone.statusLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline text-sm hover:text-blue-800"
                            >
                              Download Link
                            </a>
                          ) : (
                            <span className="text-gray-500 text-sm">
                                Not Available
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            
            {/* 9. Application Fee Section (if available) */}
            {result.applicationFee && (
              <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 text-center text-pink-600 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Application Fee
                </h2>
                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="bg-pink-50 text-left">
                      <th className="p-3 font-bold text-pink-800">
                        Category
                      </th>
                      <th className="p-3 font-bold text-pink-800">
                        Fee Amount (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.applicationFee.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{item.category}</td>
                        <td className="p-3 font-semibold text-pink-700">{item.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-gray-600 mt-3 text-sm italic">
                  Payment modes usually include Credit Card, Debit Card, Net Banking, or E-Challan.
                </p>
              </div>
            )}

            {/* 2. Important Links (Top Action Section) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Action Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.downloadLink && (
                  <a
                    href={result.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Result / Notice</span>
                  </a>
                )}
                {result.officialWebsite && (
                  <a
                    href={result.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Official Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          

          {/* Sidebar (lg:col-span-1) */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-xl p-6 border-t-4 border-blue-600">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3">
                
                <div className="border-b pb-2">
                  <p className="text-sm text-gray-600">Organization</p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {result.organization}
                  </p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                      result.status
                    )}`}
                  >
                    {result.status}
                  </span>
                </div>

                {result.resultDate && (
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-600">Result Date</p>
                    <p className="font-semibold text-red-600">
                      {result.resultDate}
                    </p>
                  </div>
                )}
                
                {result.totalPosts && (
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-600">Total Posts</p>
                    <p className="font-bold text-green-700 text-xl">
                      {result.totalPosts}
                    </p>
                  </div>
                )}
                
                {result.category && (
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-600">Category</p>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {result.category}
                    </span>
                  </div>
                )}
                {result.department && (
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium text-gray-700">
                      {result.department}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
                      {/* Keywords Section */}
{result.keywords && result.keywords.length > 0 && (
  <div className="bg-white p-4 rounded-lg shadow mt-4">
    
    <div className="flex flex-wrap gap-2">
      {result.keywords.map((keyword: string, index: number) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
        >
          {keyword}
        </span>
      ))}
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailsPage;

