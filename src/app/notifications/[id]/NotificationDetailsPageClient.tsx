"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  AlertCircle, 
  ExternalLink,
  Home,
  ChevronRight,
  FileText,
  Clock
} from "lucide-react";

// --- START OF TYPESCRIPT FIXES ---

// 1. Nested Interface
interface ImportantDate {
  label: string;
  value: string;
  highlight?: boolean; // Highlight is optional
}

// 2. Main Notification Interface
interface Notification {
  id: string;
  title: string;
  organization: string;
  department: string;
  status: "Active" | "Closed" | "Coming Soon";
  category: string;
  eligibility: string;
  details: string;
  officialLink: string;

  // Key Dates for Sidebar
  releaseDate: string;
  applicationStart: string;
  applicationEnd: string;
  examDate: string;

  // Important Dates array for Main Content
  importantDates: ImportantDate[];
}

// --- END OF TYPESCRIPT FIXES ---

const NotificationDetailsPage = () => {
  // Assert the type for 'id' from useParams
  const { id } = useParams() as { id: string };

  // Use the Notification interface for state initialization
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    fetch("/notificationsData.json") // fetch from public folder
      .then((res) => res.json())
      .then((data: Notification[]) => { // Cast the incoming data array
        const found = data.find((n) => n.id === id);
        setNotification(found || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!notification) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notification Not Found</h2>
          <Link 
            href="/notifications"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Notifications
          </Link>
        </div>
      </div>
    );
  }

  // Type the status parameter for the helper function
  const getStatusColor = (status: Notification['status']) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Closed": return "bg-red-100 text-red-800";
      case "Coming Soon": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/notifications" className="hover:text-blue-600 transition-colors">
              Notifications
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-800 font-medium truncate">{notification.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/notifications"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Notifications</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{notification.title}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{notification.organization}</span>
              </div>
              <p className="text-gray-600 mb-3">{notification.department}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(notification.status)}`}>
                  {notification.status}
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {notification.category}
                </span>
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Eligibility / Qualification
              </h2>
              <p className="text-gray-700 leading-relaxed">{notification.eligibility}</p>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Important Dates
              </h2>
              <div className="space-y-3">
                {/* The map function is now correctly typed against ImportantDate interface */}
                {notification.importantDates.map((date, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${date.highlight ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                    <span className="font-medium text-gray-800">{date.label}</span>
                    <span className={`font-semibold ${date.highlight ? 'text-yellow-800' : 'text-gray-700'}`}>
                      {date.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notification Details
              </h2>
              <p className="text-gray-700 leading-relaxed">{notification.details}</p>
            </div>

            {/* Official Link Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <a
                href={notification.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 font-medium text-lg"
              >
                <ExternalLink className="h-6 w-6" />
                <span>View Official Notification</span>
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Dates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Key Dates</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Release Date</p>
                  <p className="font-semibold text-gray-800">{notification.releaseDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Start</p>
                  <p className="font-semibold text-gray-800">{notification.applicationStart}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application End</p>
                  <p className="font-semibold text-red-600">{notification.applicationEnd}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exam Date</p>
                  <p className="font-semibold text-gray-800">{notification.examDate}</p>
                </div>
              </div>
            </div>

            {/* Quick Apply */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Don't Miss Out!</h4>
                  <p className="text-sm text-green-700 mb-3">
                    Check the official notification for complete details and application process.
                  </p>
                  <a
                    href={notification.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium inline-flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Now</span>
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

export default NotificationDetailsPage;
