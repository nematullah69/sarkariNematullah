"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  ExternalLink,
  Download,
  Home,
  ChevronRight,
  FileText,
  AlertTriangle,
  Clock,
  Users,
  BookOpen
} from "lucide-react";

// --- START OF TYPESCRIPT FIX ---

// 1. Define the interface for the Marking Scheme (nested object)
interface MarkingScheme {
  marksPerQuestion?: number;
  negativeMarks?: number;
}

// 2. Define the main data structure (AnswerKey)
interface AnswerKey {
  id: string;
  examName: string;
  organization: string;
  department: string;
  status: "Available" | "Coming Soon" | "Updated";
  category: string;
  isRevised?: boolean;
  downloadLink: string;
  officialWebsite: string;
  objectionLink?: string;
  notificationLink?: string;
  
  // Date and Fee details
  releaseDate: string;
  examDate: string;
  lastUpdated: string;
  objectionStartDate?: string;
  objectionEndDate?: string;
  objectionFee?: string | number; // Assuming this can be a number or string like '100'

  // Exam Summary details
  examDuration?: string;
  totalQuestions?: string | number;
  totalMarks?: string | number;
  medium?: string;
  details: string;
  markingScheme?: MarkingScheme;
}

// 3. Define the function component props to extract 'id' correctly
// (Since you use useParams inside, we just ensure the component signature is clean)
const AnswerKeyDetailsPage = () => {
  // Assert the type for 'id' from useParams
  const { id } = useParams() as { id: string };
  
  // Use the AnswerKey interface for state initialization
  const [answerKeysData, setAnswerKeysData] = useState<AnswerKey[]>([]);
  const [answerKey, setAnswerKey] = useState<AnswerKey | null>(null);

  useEffect(() => {
    fetch("/answerKeysData.json")
      .then((res) => res.json())
      .then((data: AnswerKey[]) => { // Cast the incoming data
        setAnswerKeysData(data);
        const found = data.find(k => k.id === id);
        setAnswerKey(found || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!answerKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Answer Key details not available
          </h2>
          <Link 
            href="/answer-key"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Answer Keys
          </Link>
        </div>
      </div>
    );
  }

  // Type the status parameter for the helper function
  const getStatusColor = (status: AnswerKey['status']) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Coming Soon": return "bg-blue-100 text-blue-800";
      case "Updated": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Filter the related keys, ensuring the array is typed
  const relatedAnswerKeys = answerKeysData
    .filter(k => k.id !== id && k.category === answerKey.category)
    .slice(0, 3);
    
// --- REST OF YOUR ORIGINAL CODE (NOW ERROR-FREE) ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-800 text-sm">
              Candidates can raise objections against the answer key from {answerKey.objectionStartDate} to {answerKey.objectionEndDate}. 
              A fee of ₹{answerKey.objectionFee || '100'} per question will be charged for objections.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/answer-key" className="hover:text-blue-600 transition-colors">
              Answer Keys
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-800 font-medium truncate">{answerKey.examName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/answer-key"
          className="flex items-center space-x-2 text-red-600 hover:text-red-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Answer Keys</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{answerKey.examName}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{answerKey.organization}</span>
              </div>
              <p className="text-gray-600 mb-3">{answerKey.department}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(answerKey.status)}`}>
                  {answerKey.status}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  {answerKey.category}
                </span>
                {answerKey.isRevised && (
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    Revised
                  </span>
                )}
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={answerKey.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <Download className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Download Answer Key</h3>
                <p className="text-sm text-gray-600">PDF format</p>
              </a>

              <a
                href={answerKey.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Official Website</h3>
                <p className="text-sm text-gray-600">Visit portal</p>
              </a>

              {answerKey.objectionLink && (
                <a
                  href={answerKey.objectionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                >
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Raise Objection</h3>
                  <p className="text-sm text-gray-600">Challenge answer key</p>
                </a>
              )}
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Important Dates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Answer Key Release Date</p>
                  <p className="text-lg font-bold text-blue-800">{answerKey.releaseDate}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Exam Date</p>
                  <p className="text-lg font-bold text-green-800">{answerKey.examDate}</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Last Updated</p>
                  <p className="text-lg font-bold text-purple-800">{answerKey.lastUpdated}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Status</p>
                  <p className="text-lg font-bold text-red-800">{answerKey.status}</p>
                </div>
                {answerKey.objectionStartDate && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-600 font-medium">Objection Dates</p>
                    <p className="text-lg font-bold text-amber-800">
                      {answerKey.objectionStartDate} to {answerKey.objectionEndDate}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Exam Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Exam Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-800">{answerKey.examDuration || '2 Hours'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="font-semibold text-gray-800">{answerKey.totalQuestions || '100'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Marks</p>
                  <p className="font-semibold text-gray-800">{answerKey.totalMarks || '100'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FileText className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Medium</p>
                  <p className="font-semibold text-gray-800">{answerKey.medium || 'Hindi & English'}</p>
                </div>
              </div>
            </div>

            {/* Answer Key Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Answer Key Details
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">{answerKey.details}</p>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How to Calculate Marks?</h3>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Each question carries {answerKey.markingScheme?.marksPerQuestion || 1} mark</li>
                  <li>For every correct answer: +{answerKey.markingScheme?.marksPerQuestion || 1} mark</li>
                  <li>For every wrong answer: -{answerKey.markingScheme?.negativeMarks || 0.25} mark</li>
                  <li>No marks for unanswered questions</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Steps to Raise Objection</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Visit the official website</li>
                  <li>Login using your credentials</li>
                  <li>Go to the objection portal section</li>
                  <li>Select the question you want to challenge</li>
                  <li>Provide supporting evidence/documentation</li>
                  <li>Pay the objection fee per question</li>
                  <li>Submit your objection</li>
                </ol>
              </div>
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Important Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={answerKey.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-red-600 text-white px-6 py-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Answer Key</span>
                </a>
                <a
                  href={answerKey.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Official Website</span>
                </a>
                {answerKey.objectionLink && (
                  <a
                    href={answerKey.objectionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Raise Objection</span>
                  </a>
                )}
                {answerKey.notificationLink && (
                  <a
                    href={answerKey.notificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Official Notification</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Exam Name</p>
                  <p className="font-semibold text-gray-800">{answerKey.examName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Organization</p>
                  <p className="font-semibold text-gray-800">{answerKey.organization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-full">
                    {answerKey.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(answerKey.status)}`}>
                    {answerKey.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Answer Key Release Date</p>
                  <p className="font-semibold text-gray-800">{answerKey.releaseDate}</p>
                </div>
                {answerKey.objectionStartDate && (
                  <div>
                    <p className="text-sm text-gray-600">Objection Date</p>
                    <p className="font-semibold text-gray-800">
                      {answerKey.objectionStartDate} to {answerKey.objectionEndDate}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Answer Keys */}
            {relatedAnswerKeys.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Related Answer Keys</h3>
                <div className="space-y-3">
                  {relatedAnswerKeys.map(related => (
                    <Link
                      key={related.id}
                      href={`/answer-key/${related.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <p className="font-medium text-gray-800 text-sm">{related.examName}</p>
                      <p className="text-xs text-gray-600 mt-1">{related.organization}</p>
                    </Link>
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

export default AnswerKeyDetailsPage;
