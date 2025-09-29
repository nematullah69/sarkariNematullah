"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  GraduationCap, 
  ExternalLink,
  Home,
  ChevronRight,
  FileText,
  Clock,
  Users,
  DollarSign,
  BookOpen,
  Award,
  FileCheck,
  Download,
  MapPin,
  Phone,
  Mail,
  Globe,
  UserCheck,
  ClipboardList
} from "lucide-react";








const AdmissionDetailsPage = () => {
  const { id } = useParams();
  const [admissions, setAdmissions] = useState([]);
  const [admission, setAdmission] = useState(null);

  // Load data from public folder JSON
  useEffect(() => {
    fetch("/admissionsData.json")
      .then(res => res.json())
      .then(data => setAdmissions(data))
      .catch(err => console.error(err));
  }, []);

  // Set admission based on ID
  useEffect(() => {
    if (admissions.length > 0) {
      const found = admissions.find(a => a.id === id);
      setAdmission(found);
    }
  }, [admissions, id]);

  if (!admission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admission Not Found</h2>
          <Link 
            href="/admission"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Admissions
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-green-100 text-green-800";
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
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/admission" className="hover:text-blue-600 transition-colors">
              Admissions
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-800 font-medium truncate">{admission.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/admission" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Admissions</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{admission.title}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{admission.university}</span>
              </div>
              <p className="text-gray-600 mb-3">{admission.organization}</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(admission.status)}`}>
                  {admission.status}
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {admission.category}
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {admission.courseType}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Seats</p>
                    <p className="font-semibold text-gray-800">{admission.seats}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Application Fee</p>
                    <p className="font-semibold text-gray-800">{admission.fees}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Quick Overview</h3>
              <p className="text-sm text-blue-700">{admission.overview}</p>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Eligibility Criteria
              </h2>
              <div className="space-y-3">
                {admission.eligibility.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Important Dates
              </h2>
              <div className="space-y-3">
                {admission.importantDates.map((date, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${date.highlight ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                    <span className="font-medium text-gray-800">{date.label}</span>
                    <span className={`font-semibold ${date.highlight ? 'text-yellow-800' : 'text-gray-700'}`}>
                      {date.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ClipboardList className="h-5 w-5 mr-2" />
                Application Process
              </h2>
              <div className="space-y-4">
                {admission.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{step.title}</p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Process */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Selection Process
              </h2>
              <div className="space-y-3">
                {admission.selectionProcess.map((process, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{process}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                Required Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {admission.requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Course Details
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Program Structure</h3>
                  <p className="text-gray-700">{admission.courseDetails.structure}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Duration</h3>
                  <p className="text-gray-700">{admission.courseDetails.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {admission.courseDetails.specializations.map((spec, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

 

            {/* Important Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Important Links</h3>
              <div className="space-y-3">
                <a href={admission.applyLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <ExternalLink className="h-4 w-4" /> <span>Application Portal</span>
                </a>
                <a href={admission.brochureLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <Download className="h-4 w-4" /> <span>Information Brochure</span>
                </a>
                <a href={admission.syllabusLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <BookOpen className="h-4 w-4" /> <span>Syllabus</span>
                </a>
              </div>
            </div>



            {/* Contact Info & Action Buttons */}
               {/* Contact Information */}
               <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">{admission.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">{admission.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <a href={admission.contact.website} className="text-blue-600 hover:underline" target="_blank">
                    Official Website
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">{admission.contact.address}</span>
                </div>
              </div>
            </div>

            {/* ... keep the rest exactly as in your original React page ... */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <a
                href={admission.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 font-medium text-lg"
              >
                <ExternalLink className="h-6 w-6" />
                <span>Apply Now</span>
              </a>
              
              <a
                href={admission.brochureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-3 font-medium text-lg"
              >
                <Download className="h-6 w-6" />
                <span>Download Brochure</span>
              </a>
            </div>

          </div>

          {/* Sidebar */}
          {/* ... keep sidebar exactly as before ... */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-semibold text-gray-800">{admission.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Start</p>
                  <p className="font-semibold text-gray-800">{admission.applicationStart}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application End</p>
                  <p className="font-semibold text-red-600">{admission.applicationEnd}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Seats</p>
                  <p className="font-semibold text-gray-800">{admission.seats}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Fee</p>
                  <p className="font-semibold text-gray-800">{admission.fees}</p>
                </div>
              </div>
            </div>

 

            {/* Deadline Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Application Deadline</h4>
                  <p className="text-sm text-red-700 mb-3">
                    The last date to apply is {admission.applicationEnd}. Don't miss the opportunity!
                  </p>
                  <a
                    href={admission.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium inline-flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Apply Now</span>
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

export default AdmissionDetailsPage;
