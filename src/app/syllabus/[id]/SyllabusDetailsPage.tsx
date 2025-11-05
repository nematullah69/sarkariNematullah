"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  BookOpen, 
  ExternalLink,
  Download,
  Home,
  ChevronRight,
  FileText,
  Clock,
  Award,
  AlertCircle,
  Users
} from "lucide-react";

// --- START OF TYPESCRIPT FIXES ---

// 1. Nested Interfaces
interface ExamSection {
  name: string;
  questions: string | number;
  marks: string | number;
}

interface ExamPattern {
  totalQuestions: string | number;
  totalMarks: string | number;
  duration: string;
  negativeMarking: string;
  sections: ExamSection[];
}

// 2. Main Syllabus Interface
interface Syllabus {
  id: string;
  examName: string;
  organization: string;
  department: string;
  examType: string;
  category: string;
  year: string | number;
  lastUpdated: string;
  syllabusOverview: string;
  subjects: string[];
  importantNotes: string[];
  downloadLink: string;
  officialWebsite: string;
  
  // Objection Details (used in the banner)
  objectionStartDate?: string;
  objectionEndDate?: string;
  objectionFee?: string | number;

  // Complex Nested Object
  examPattern: ExamPattern;
}

// --- END OF TYPESCRIPT FIXES ---
function SyllabusJsonLd({ syllabus }: { syllabus: Syllabus }) {
  return (
    <Script
      id="syllabus-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: syllabus.examName,
          description: syllabus.syllabusOverview,
          provider: {
            "@type": "Organization",
            name: syllabus.organization,
            sameAs: syllabus.officialWebsite,
          },
          educationalProgramMode: syllabus.examType,
          startDate: syllabus.year,
          dateModified: syllabus.lastUpdated,
          url: `https://governmentexam.online/syllabus/${syllabus.id}`,
          educationalCredentialAwarded: "Syllabus Completion",
          hasCourse: syllabus.subjects.map((sub) => ({
            "@type": "Course",
            name: sub,
          })),
        }),
      }}
    />
  );
}



const SyllabusDetailsPage = () => {
  // Assert the type for 'id' from useParams
  const { id } = useParams() as { id: string };
  
  // Use the Syllabus interface for state initialization
  const [syllabiData, setSyllabiData] = useState<Syllabus[]>([]);
  const [syllabus, setSyllabus] = useState<Syllabus | null>(null);

  useEffect(() => {
    fetch("/syllabusData.json")
      .then(res => res.json())
      .then((data: Syllabus[]) => { // Cast the fetched data
        setSyllabiData(data);
        const found = data.find(s => s.id === id);
        setSyllabus(found || null);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!syllabus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Syllabus Not Found</h2>
          <Link 
            href="/syllabus"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Syllabus
          </Link>
        </div>
      </div>
    );
  }

  // Related exams filter now correctly uses typed properties
  const relatedExams = syllabiData
    .filter(s => s.id !== id && (
      s.category === syllabus.category || 
      s.organization === syllabus.organization || 
      s.examType === syllabus.examType
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Banner */}
      {/* Added check to ensure objection dates are present before showing banner */}
      {syllabus.objectionStartDate && syllabus.objectionEndDate && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800 text-sm">
                Candidates can raise objections against the answer key from {syllabus.objectionStartDate} to {syllabus.objectionEndDate}. 
                A fee of ₹{syllabus.objectionFee || '100'} per question will be charged for objections.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/syllabus" className="hover:text-blue-600 transition-colors">
              Syllabus
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-800 font-medium truncate">{syllabus.examName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/syllabus"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Syllabus</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{syllabus.examName}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{syllabus.organization}</span>
              </div>
              <p className="text-gray-600 mb-3">{syllabus.department}</p>
              <div className="flex items-center space-x-2">
                <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                  {syllabus.examType}
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {syllabus.category}
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {syllabus.year}
                </span>
              </div>
            </div>

            {/* Syllabus Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" /> Syllabus Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">{syllabus.syllabusOverview}</p>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" /> Subjects / Topics Covered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {syllabus.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Pattern */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" /> Exam Pattern
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Total Questions</p>
                  <p className="text-lg font-bold text-blue-800">{syllabus.examPattern.totalQuestions}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Total Marks</p>
                  <p className="text-lg font-bold text-green-800">{syllabus.examPattern.totalMarks}</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Duration</p>
                  <p className="text-lg font-bold text-purple-800">{syllabus.examPattern.duration}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Negative Marking</p>
                  <p className="text-lg font-bold text-red-800">{syllabus.examPattern.negativeMarking}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Section-wise Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Section</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Questions</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syllabus.examPattern.sections.map((section, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">{section.name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{section.questions}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{section.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" /> Important Notes
              </h2>
              <ul className="space-y-2">
                {syllabus.importantNotes.map((note, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Important Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={syllabus.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-teal-600 text-white px-6 py-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  <Download className="h-5 w-5" /> <span>Download Syllabus PDF</span>
                </a>
                <a
                  href={syllabus.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink className="h-5 w-5" /> <span>Official Website Link</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Exam Type</p>
                  <span className="bg-teal-100 text-teal-800 text-sm font-medium px-2 py-1 rounded-full">
                    {syllabus.examType}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year/Session</p>
                  <p className="font-semibold text-gray-800">{syllabus.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-semibold text-gray-800">{syllabus.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Organization</p>
                  <p className="font-semibold text-gray-800">{syllabus.organization}</p>
                </div>
              </div>
            </div>

            {/* Related Exams */}
            {relatedExams.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" /> Related Exams
                </h3>
                <div className="space-y-4">
                  {relatedExams.map((exam) => (
                    <Link
                      key={exam.id}
                      href={`/syllabus/${exam.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-800 mb-1">{exam.examName}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                          {exam.examType}
                        </span>
                        <span>{exam.organization}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Download */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Download className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-teal-800 mb-1">Download Syllabus</h4>
                  <p className="text-sm text-teal-700 mb-3">
                    Get the complete syllabus PDF for detailed preparation.
                  </p>
                  <a
                    href={syllabus.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium inline-flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusDetailsPage;
