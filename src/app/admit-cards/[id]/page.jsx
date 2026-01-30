// "use client"
export const runtime = "nodejs";

import React from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';

import {
  ArrowLeft, Users, CheckCircle, ExternalLink, Briefcase, CalendarDays,
  Wallet, Target, ClipboardList, UserCheck, FilePenLine,
  Link as LinkIcon
} from 'lucide-react';

async function getJobsData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/d6610e1b9fb8e2617c2999d1edc0851c/raw/gistfile1.txt', { 
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const jobs = await res.json();
  const specificJob = jobs.find(j => String(j.id) === id);
  return specificJob;
}

export default async function JobDetail({ params }) {
  const { id } = await params;

  let job;
  try {
    job = await getJobsData(id);
  } catch (error) {
    console.error('Error fetching job:', error);
    job = null;
  }

  // Reusable component for the top info cards - UPDATED design
  const InfoCard = ({ icon, title, value, valueColor = 'text-gray-900' }) => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 flex items-center space-x-4 hover:shadow-md transition-all duration-200">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className={`text-lg font-bold ${valueColor}`}>{value || 'N/A'}</p>
      </div>
    </div>
  );

  // Reusable table component for the sidebar - UPDATED design
  const InfoTable = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center pb-3 border-b">
        <span className="mr-3 text-blue-600">{icon}</span>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2.5 border-b last:border-0">
            <span className="text-gray-700 text-sm font-medium">{item.label}</span>
            <span className={`font-bold text-sm ${item.highlight ? 'text-red-600' : 'text-gray-900'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Reusable Links Card component - UPDATED design
  const LinksCard = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center pb-3 border-b">
        <span className="mr-3 text-blue-600">{icon}</span>
        {title}
      </h2>
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-150 border border-blue-100"
          >
            <span className="text-blue-700 font-bold text-sm">{item.label}</span>
            <ExternalLink className="h-4 w-4 text-blue-500" />
          </a>
        ))}
      </div>
    </div>
  );

  // Job not found page - UPDATED with governmentexam.online
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Admit Card Not Found</h1>
            <p className="text-gray-600 mb-6 text-sm">
              The admit card with ID <strong className="font-semibold text-red-600">{id}</strong> was not found.
            </p>
            <p className="text-gray-500 text-xs mb-6">governmentexam.online</p>
            <Link href="/" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors duration-200 font-bold text-sm shadow">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Data Preparation ---
  const importantDatesItems = job.importantDates ? Object.entries(job.importantDates).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value,
    highlight: key === 'ApplicationEnd',
  })) : [];

  const vacancyItems = job.vacancies?.breakdown ? job.vacancies.breakdown.map(item => ({
    label: item.category,
    value: item.count?.toLocaleString() || '0',
    highlight: false,
  })) : [];

  const selectionProcessItems = job.selectionProcess ? job.selectionProcess.map(step => ({
    label: <CheckCircle className="h-4 w-4 text-green-600 inline-block mr-2" />,
    value: step
  })) : [];

  const importantLinksItems = job.importantLinks ? Object.entries(job.importantLinks).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value: value,
  })) : [];

  const process = job.additionalInfo?.applicationSteps?.map((step, index) => ({
    name: `Step ${index + 1}`,
    text: step
  })) || [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.governmentexam.online" },
          { name: "Admit Cards", url: "https://www.governmentexam.online/admit-cards" },
          { name: `${job.title}`, url: `https://www.governmentexam.online/admit-cards/${id}` },
        ]}
      />
      <HowToSchema
        title="How to Download Admit Card"
        process={process}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Website Name Banner */}
          <div className="mb-6 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-blue-800">GovernmentExam.online</h1>
              <p className="text-sm text-gray-600 mt-1">Your Gateway to Government Examinations</p>
            </Link>
          </div>

          {/* Back Link - UPDATED */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-bold text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* --- Main Header - UPDATED for Admit Card --- */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                  {job.organization || 'Government Organization'}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title || 'Admit Card'}</h1>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                  <p className="font-medium text-sm">Admit Card ID: {id}</p>
                </div>
              </div>
              <a 
                href={job.applicationLink || job.importantLinks?.applyOnline || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl text-base"
              >
                <ExternalLink className="h-5 w-5 mr-3" />
                Download Admit Card
              </a>
            </div>
          </div>

          {/* --- Key Info Bar - UPDATED --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <InfoCard 
              icon={<Users className="h-6 w-6" />} 
              title="Total Vacancies" 
              value={job.vacancies?.total?.toLocaleString() || 'N/A'} 
            />
            <InfoCard 
              icon={<Wallet className="h-6 w-6" />} 
              title="Salary/Post" 
              value={job.salary || 'Not specified'} 
            />
            <InfoCard 
              icon={<CalendarDays className="h-6 w-6" />} 
              title="Exam Date" 
              value={job.importantDates?.ApplicationEnd || job.importantDates?.examDate || 'Check notification'} 
              valueColor="text-red-600 font-bold" 
            />
          </div>

          {/* --- Two-Column Layout --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview / Description */}
              {job.description && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center pb-4 border-b-2">
                    <Briefcase className="h-6 w-6 mr-4 text-blue-600" />
                    Exam Overview
                  </h2>
                  <p className="text-gray-800 text-base leading-relaxed">{job.description}</p>
                </div>
              )}

              {/* Mobile Sidebar - UPDATED */}
              <div className="space-y-6 lg:hidden">
                {importantDatesItems.length > 0 && (
                  <InfoTable
                    title="Important Dates"
                    icon={<CalendarDays className="h-5 w-5" />}
                    items={importantDatesItems}
                  />
                )}

                {vacancyItems.length > 0 && (
                  <InfoTable
                    title="Vacancy Details"
                    icon={<Users className="h-5 w-5" />}
                    items={vacancyItems}
                  />
                )}

                {importantLinksItems.length > 0 && (
                  <LinksCard
                    title="Important Links"
                    icon={<LinkIcon className="h-5 w-5" />}
                    items={importantLinksItems}
                  />
                )}
              </div>

              {/* Post with Eligibility Table - UPDATED with error handling */}
              {job.postAndEligbt && job.postAndEligbt.sections && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <Users className="h-6 w-6 mr-4 text-blue-600" />
                    Post-wise Details
                  </h2>
                  <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Post Name</th>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Vacancy</th>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Eligibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.postAndEligbt.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-4 text-gray-900 text-sm font-medium">{sec.name || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm">{sec.vacancies || sec.vacancy || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm">{sec.eligibility || sec.Eligibility || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Vacancy Category-wise Table - UPDATED with error handling */}
              {job.vacanciesCategory && job.vacanciesCategory.sections && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <Users className="h-6 w-6 mr-4 text-blue-600" />
                    Category-wise Vacancy Details
                  </h2>
                  <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Post Name</th>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2 text-center">General</th>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2 text-center">OBC</th>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2 text-center">EWS</th>
                          <th className="p-4 font-bold text-gray-900 text-sm border-b-2 text-center">SC/ST</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.vacanciesCategory.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-4 text-gray-900 text-sm font-medium">{sec.name || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center">{sec.general || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center">{sec.obc || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center">{sec.ews || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center">{sec.scst || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Exam Pattern - UPDATED with error handling */}
              {job.examPattern && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <ClipboardList className="h-6 w-6 mr-4 text-blue-600" />
                    Exam Pattern
                  </h2>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 text-center">
                      <div className="font-bold text-gray-900 text-xl">{job.examPattern.totalMarks || 'N/A'}</div>
                      <div className="text-xs text-gray-600 font-medium mt-2">Total Marks</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 text-center">
                      <div className="font-bold text-gray-900 text-xl">{job.examPattern.duration || 'N/A'}</div>
                      <div className="text-xs text-gray-600 font-medium mt-2">Duration</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 p-4 rounded-xl text-center">
                      <div className="font-bold text-red-700 text-xl">{job.examPattern.negativeMarking || 'N/A'}</div>
                      <div className="text-xs text-red-600 font-medium mt-2">Negative Marking</div>
                    </div>
                  </div>
                  {job.examPattern.sections && (
                    <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                      <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                          <tr>
                            <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Section Name</th>
                            <th className="p-4 font-bold text-gray-900 text-sm border-b-2 text-center">Questions</th>
                            <th className="p-4 font-bold text-gray-900 text-sm border-b-2 text-center">Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {job.examPattern.sections.map((sec, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                              <td className="p-4 text-gray-900 text-sm font-medium">{sec.name || 'N/A'}</td>
                              <td className="p-4 text-gray-900 text-sm text-center">{sec.questions || 'N/A'}</td>
                              <td className="p-4 text-gray-900 text-sm text-center">{sec.marks || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* How to Download Admit Card - UPDATED */}
              {job.additionalInfo?.applicationSteps?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <FilePenLine className="h-6 w-6 mr-4 text-blue-600" />
                    How to Download Admit Card
                  </h2>
                  <ol className="space-y-3">
                    {job.additionalInfo.applicationSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-4 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-800 text-sm leading-relaxed font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Additional Important Information */}
              {job.additionalInfo?.instructions && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border-2 border-yellow-300 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-4 text-yellow-700" />
                    Important Instructions
                  </h2>
                  <div className="space-y-3">
                    {job.additionalInfo.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                          ✓
                        </span>
                        <span className="text-gray-800 text-sm font-medium">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Sticky Sidebar) - UPDATED */}
            <div className="hidden lg:block space-y-6 sticky top-8">
              {importantDatesItems.length > 0 && (
                <InfoTable
                  title="Important Dates"
                  icon={<CalendarDays className="h-5 w-5" />}
                  items={importantDatesItems}
                />
              )}

              {vacancyItems.length > 0 && (
                <InfoTable
                  title="Vacancy Details"
                  icon={<Users className="h-5 w-5" />}
                  items={vacancyItems}
                />
              )}

              {selectionProcessItems.length > 0 && (
                <InfoTable
                  title="Selection Process"
                  icon={<Target className="h-5 w-5" />}
                  items={selectionProcessItems}
                />
              )}

              {importantLinksItems.length > 0 && (
                <LinksCard
                  title="Important Links"
                  icon={<LinkIcon className="h-5 w-5" />}
                  items={importantLinksItems}
                />
              )}

              {/* Website Info Card */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 p-6 text-center">
                <h3 className="text-lg font-bold text-blue-800 mb-2">GovernmentExam.online</h3>
                <p className="text-sm text-gray-700 mb-3">Your trusted source for government exam information</p>
                <Link href="/admit-cards" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  More Admit Cards
                </Link>
              </div>
            </div>
          </div>

          {/* Footer with website info */}
          <div className="mt-12 pt-8 border-t border-gray-300 text-center">
            <p className="text-gray-600 text-sm mb-2">© {new Date().getFullYear()} GovernmentExam.online - All Rights Reserved</p>
            <p className="text-gray-500 text-xs">Your complete guide to government examinations, admit cards, results and more.</p>
          </div>
        </div>
      </div>
    </>
  );
}