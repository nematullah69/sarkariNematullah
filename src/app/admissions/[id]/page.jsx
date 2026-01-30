export const runtime = "nodejs";

import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  FileCheck, 
  Bell, 
  ExternalLink, 
  Clock, 
  BookOpen, 
  GraduationCap,
  CheckCircle // ADDED THIS IMPORT
} from 'lucide-react';
import { notFound } from 'next/navigation';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';




async function getAdmissionData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt', { 
    cache: "force-cache" 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const specificAdmission = data.find(a => String(a.id) === String(id));

  if (!specificAdmission) {
    notFound();
  }

  return specificAdmission;
}

export default async function AdmissionDetail({ params }) {
  const { id } = await params;
  
  let admission;
  try {
    admission = await getAdmissionData(id);
  } catch (error) {
    console.error('Error fetching admission data:', error);
    notFound();
  }

  // Prepare process for HowToSchema
  const process = admission?.process?.map((step, index) => ({
    name: `Step ${index + 1}`,
    text: step
  })) || [];

  // Reusable Info Card Component
  const InfoCard = ({ icon, title, value, bgColor = "bg-white", textColor = "text-gray-900" }) => (
    <div className={`${bgColor} rounded-xl border border-gray-200 p-5 flex items-center space-x-4 hover:shadow-md transition-all duration-200`}>
      <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className={`text-lg font-bold ${textColor}`}>{value || 'N/A'}</p>
      </div>
    </div>
  );

  // Reusable Process Step Component
  const ProcessStep = ({ number, title, description, icon }) => (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200">
      <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
      {icon && <div className="text-blue-500">{icon}</div>}
    </div>
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.governmentexam.online" },
          { name: "Admissions", url: "https://www.governmentexam.online/admissions" },
          { name: `${admission?.title || 'Admission'}`, url: `https://www.governmentexam.online/admissions/${id}` },
        ]}
      />
      <HowToSchema
        title="How to Complete Counselling Process"
        process={process}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Website Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-blue-800">GovernmentExam.online</h1>
              <p className="text-sm text-gray-600 mt-1">Complete Guide to Government Examinations & Admissions</p>
            </Link>
          </div>

          {/* Back Link */}
          <div className="mb-6">
            <Link
              href="/admissions"
              className="inline-flex items-center text-blue-700 hover:text-blue-900 font-bold text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Admissions
            </Link>
          </div>

          {/* Main Admission Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  {admission?.organization || 'Government Institution'}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{admission?.title || 'Admission Notification'}</h1>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                  <p className="font-medium text-sm">Admission ID: {id}</p>
                </div>
              </div>
              <div className="w-full lg:w-auto flex flex-col gap-3">
                <a 
                  href={admission?.applyLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full lg:w-auto flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl text-base"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Apply Now
                </a>
                {admission?.brochureLink && (
                  <a 
                    href={admission.brochureLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full lg:w-auto flex-shrink-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-xl font-bold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center shadow"
                  >
                    <BookOpen className="h-5 w-5 mr-3" />
                    Download Brochure
                  </a>
                )}
              </div>
            </div>

            {/* Posted Date */}
            <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 text-sm font-medium">Posted Date:</span>
                <span className="ml-2 font-bold text-gray-900">{admission?.postedDate || 'Not specified'}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 text-sm font-medium">Session:</span>
                <span className="ml-2 font-bold text-gray-900">{admission?.session || '2024-25'}</span>
              </div>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <InfoCard 
              icon={<Calendar className="h-6 w-6" />} 
              title="Application Deadline" 
              value={admission?.lastDate || 'Check notification'} 
              textColor="text-red-600" 
            />
            <InfoCard 
              icon={<Users className="h-6 w-6" />} 
              title="Total Seats" 
              value={admission?.totalSeats?.toLocaleString() || 'N/A'} 
            />
            <InfoCard 
              icon={<FileCheck className="h-6 w-6" />} 
              title="Application Fee" 
              value={admission?.applicationFee || 'Check notification'} 
            />
            <InfoCard 
              icon={<Bell className="h-6 w-6" />} 
              title="Status" 
              value={admission?.status || 'Open'} 
              textColor="text-green-600" 
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Counselling Schedule - Updated Design */}
              {admission?.counsellingDates && (
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl border-2 border-teal-300 p-8">
                  <div className="flex items-center mb-6">
                    <Calendar className="h-7 w-7 text-teal-700 mr-4" />
                    <h2 className="text-2xl font-bold text-teal-800">Counselling Schedule</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {admission.counsellingDates.start && (
                      <div className="text-center p-5 bg-white rounded-xl border border-teal-200">
                        <div className="text-2xl font-bold text-teal-800 mb-2">{admission.counsellingDates.start}</div>
                        <div className="text-sm font-medium text-teal-600">Registration Start Date</div>
                      </div>
                    )}
                    {admission.counsellingDates.mid && (
                      <div className="text-center p-5 bg-white rounded-xl border border-teal-200">
                        <div className="text-2xl font-bold text-teal-800 mb-2">{admission.counsellingDates.mid}</div>
                        <div className="text-sm font-medium text-teal-600">Document Verification</div>
                      </div>
                    )}
                    {admission.counsellingDates.end && (
                      <div className="text-center p-5 bg-white rounded-xl border border-teal-200">
                        <div className="text-2xl font-bold text-teal-800 mb-2">{admission.counsellingDates.end}</div>
                        <div className="text-sm font-medium text-teal-600">Final Allotment</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Counselling Process - Updated Design */}
              {admission?.process && admission.process.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <Users className="h-6 w-6 mr-4 text-blue-600" />
                    Step-by-Step Counselling Process
                  </h2>
                  <div className="space-y-4">
                    {admission.process.map((step, index) => (
                      <ProcessStep
                        key={index}
                        number={index + 1}
                        title={`Step ${index + 1}`}
                        description={step}
                        icon={index === admission.process.length - 1 ? <CheckCircle className="h-5 w-5 text-green-500" /> : null}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Required - Updated Design */}
              {admission?.documentsRequired && admission.documentsRequired.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <FileCheck className="h-6 w-6 mr-4 text-blue-600" />
                    Documents Required
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {admission.documentsRequired.map((doc, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200">
                        <FileCheck className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-800 font-medium text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Important Note */}
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-r-xl p-5">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Important Document Guidelines
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        All documents must be original or self-attested photocopies
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Documents should be arranged in the specified order
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Keep extra copies of all documents
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Latest Updates - Updated Design */}
              {admission?.updates && admission.updates.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border-2 border-yellow-300 p-8">
                  <h2 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
                    <Bell className="h-6 w-6 mr-4 text-yellow-700" />
                    Latest Updates & Notifications
                  </h2>
                  <div className="space-y-4">
                    {admission.updates.map((update, index) => (
                      <div key={index} className="bg-white border border-yellow-200 rounded-xl p-5 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start">
                          <div className="bg-yellow-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium mb-2">{update}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              Updated recently
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {admission?.additionalInfo && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <GraduationCap className="h-6 w-6 mr-4 text-blue-600" />
                    Additional Information
                  </h2>
                  <div className="space-y-4">
                    {admission.additionalInfo.map((info, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-800 text-sm leading-relaxed">{info}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b">Quick Links</h3>
                <div className="space-y-3">
                  {admission?.importantLinks?.apply && (
                    <a href={admission.importantLinks.apply} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-all duration-150">
                      <span className="text-blue-700 font-bold text-sm">Apply Online</span>
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                    </a>
                  )}
                  {admission?.importantLinks?.brochure && (
                    <a href={admission.importantLinks.brochure} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-all duration-150">
                      <span className="text-teal-700 font-bold text-sm">Download Brochure</span>
                      <ExternalLink className="h-4 w-4 text-teal-500" />
                    </a>
                  )}
                  {admission?.importantLinks?.notification && (
                    <a href={admission.importantLinks.notification} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-all duration-150">
                      <span className="text-purple-700 font-bold text-sm">Official Notification</span>
                      <ExternalLink className="h-4 w-4 text-purple-500" />
                    </a>
                  )}
                </div>
              </div>

              {/* Important Dates Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b">Important Dates</h3>
                <div className="space-y-4">
                  {admission?.importantDates && Object.entries(admission.importantDates).map(([key, value], index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-gray-700 text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-bold text-gray-900 text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              {(admission?.contactEmail || admission?.helpline) && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300 p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">Contact & Support</h3>
                  <div className="space-y-3">
                    {admission.contactEmail && (
                      <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200">
                        <span className="text-gray-700 text-sm font-medium">Email:</span>
                        <a href={`mailto:${admission.contactEmail}`} className="ml-2 text-blue-600 font-bold text-sm hover:underline">
                          {admission.contactEmail}
                        </a>
                      </div>
                    )}
                    {admission.helpline && (
                      <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200">
                        <span className="text-gray-700 text-sm font-medium">Helpline:</span>
                        <span className="ml-2 font-bold text-gray-900">{admission.helpline}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Website Info Card */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-center text-white">
                <h3 className="text-lg font-bold mb-2">GovernmentExam.online</h3>
                <p className="text-sm text-blue-100 mb-4">Your trusted partner for admission guidance</p>
                <Link href="/admissions" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                  Explore More Admissions
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-300 text-center">
            <p className="text-gray-600 text-sm mb-2">© {new Date().getFullYear()} GovernmentExam.online - All Rights Reserved</p>
            <p className="text-gray-500 text-xs">Complete admissions, counselling, and examination guidance platform.</p>
          </div>
        </div>
      </div>
    </>
  );
}