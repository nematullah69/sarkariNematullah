// "use client"
export const runtime = "nodejs";

import React from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';
// The original react-router-dom imports are commented out, as they should be.
// import { useParams, Link } from 'react-router-dom';

import {
  ArrowLeft, Users, CheckCircle, ExternalLink, Briefcase, CalendarDays,
  Wallet, Target, ClipboardList, UserCheck, FilePenLine,
  Link as LinkIcon
} from 'lucide-react';
// import { jobListings } from '../../../data/jobListingData';

async function getJobsData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const jobs = await res.json();

  // FIX: Compare types correctly (URL param is a string, data ID is a number)
  // We use == for loose comparison or convert one type to another.
  // Using String() is often safer than parseInt() if IDs might be non-numeric.
  const specificJob = jobs.find(j => String(j.id) === id);
  return specificJob;
}


// The corrected JobDetail component
export default async function JobDetail({ params }) {
  // 1. FIX: Get 'id' directly from params. It's an object, not a Promise.
  const { id } = await params;

  // 2. FIX: Pass the 'id' variable, not the entire 'params' object.
  const job = await getJobsData(id);

  // Reusable component for the top info cards
  const InfoCard = ({ icon, title, value, valueColor = 'text-gray-900' }) => (
    <div className="bg-gray-100/70 p-4 rounded-lg flex items-center space-x-4">
      <div className="bg-white p-2 rounded-full shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-lg font-semibold ${valueColor}`}>{value || 'N/A'}</p>
      </div>
    </div>
  );

  // Reusable table component for the sidebar
  const InfoTable = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        {icon}
        {title}
      </h2>
      <table className="w-full text-left">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b last:border-b-0">
              <td className="py-2.5 pr-2 text-gray-600">{item.label}</td>
              <td className={`py-2.5 pl-2 text-right font-semibold ${item.highlight ? 'text-red-600' : 'text-gray-900'}`}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Reusable Links Card component
  const LinksCard = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        {icon}
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
            >
              {item.label}
              <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // Job not found page
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Job not found for ID: **{id}**</p>
      </div>
    );
  }

  // --- Data Preparation (No changes needed here) ---
  const importantDatesItems = job.importantDates ? Object.entries(job.importantDates).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value,
    highlight: key === 'ApplicationEnd',
  })) : [];

  const applicationFeeItems = job.applicationFee ? Object.entries(job.applicationFee).map(([key, value]) => ({
    label: key,
    value: value,
    highlight: false,
  })) : [];

  const vacancyItems = job.vacancies?.breakdown ? job.vacancies.breakdown.map(item => ({
    label: item.category,
    value: item.count.toLocaleString(),
    highlight: false,
  })) : [];

  const selectionProcessItems = job.selectionProcess ? job.selectionProcess.map(step => ({
    label: <CheckCircle className="h-5 w-5 text-green-500 inline-block mr-2" />,
    value: step
  })) : [];

  const importantLinksItems = job.importantLinks ? Object.entries(job.importantLinks).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value: value,
  })) : [];


  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" },
          { name: "AnswerKeys", url: `https://www.sarkariresult27.com/answer-keys` },
          { name: `${job.title}`, url: `https://www.sarkariresult27.com/answer-keys/${id}` },
        ]}
      />
      <HowToSchema
        title="How to Complete Counselling Process 2026"
        process={process}
      />
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <div className="mb-6">
            {/* Link uses 'href' prop in Next.js, which is already correct */}
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HOME
            </Link>
          </div>

          {/* --- Main Job Header --- (rest of the component structure is fine) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <p className="text-blue-600 font-semibold mb-1">{job.organization}</p>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{job.title}</h1>
              </div>
              <a href={job.applicationLink || '#'} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center shadow-sm">
                <ExternalLink className="h-5 w-5 mr-2" />
                DownLoad AnswerKey
              </a>
            </div>
          </div>

          {/* --- Key Info Bar --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard icon={<Users className="h-6 w-6 text-blue-500" />} title="Total Vacancies" value={job.vacancies?.total?.toLocaleString()} />
            <InfoCard icon={<Wallet className="h-6 w-6 text-green-500" />} title="Salary" value={job.salary} />
            <InfoCard icon={<CalendarDays className="h-6 w-6 text-red-500" />} title="Application Deadline" value={job.importantDates?.ApplicationEnd} valueColor="text-red-600" />
          </div>

          {/* --- Two-Column Layout --- */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {job.description && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Briefcase className="h-6 w-6 mr-3 text-blue-600" />Job Overview</h2>
                  <p className="text-gray-700 leading-relaxed text-base">{job.description}</p>
                </div>
              )}

              <div className="col-span-1 top-8 space-y-8 lg:hidden">
                {/* Important Dates */}
                {importantDatesItems.length > 0 && (
                  <InfoTable
                    title="Important Dates"
                    icon={<CalendarDays className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={importantDatesItems}
                  />
                )}



                {/* vacancy details */}
                {vacancyItems.length > 0 && (
                  <InfoTable
                    title="Vacancy Details"
                    icon={<Users className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={vacancyItems}
                  />
                )}
                {/* important link */}
                {importantLinksItems.length > 0 && (
                  <LinksCard
                    title="Important Links"
                    icon={<LinkIcon className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={importantLinksItems}
                  />
                )}
              </div>


              {/* NEW: Post with Eligibility Table */}
              {job.postAndEligbt && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Users className="h-6 w-6 mr-3 text-blue-600" />Post-wise Eligibility</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Post Name</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">Vacancy</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">Eligibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.postAndEligbt.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800 font-medium">{sec.name}</td>
                            <td className="p-3 text-gray-800">{sec.vacancies}</td>
                            <td className="p-3 text-gray-800">{sec.eligibility}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


              {/* NEW: Vacancy Category-wise Table */}
              {job.vacanciesCategory && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Users className="h-6 w-6 mr-3 text-blue-600" />Category-wise Vacancy Details</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Post Name</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">General</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">OBC</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">EWS</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">SC/ST</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.vacanciesCategory.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800 font-medium">{sec.name}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.general}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.obc}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.ews}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.scst}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


              {/* Exam Pattern */}
              {job.examPattern && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><ClipboardList className="h-6 w-6 mr-3 text-blue-600" />Exam Pattern</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg"><span className="font-semibold">{job.examPattern.totalMarks}</span> Total</div>
                    <div className="bg-gray-50 p-3 rounded-lg"><span className="font-semibold">{job.examPattern.duration}</span> Duration</div>
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg"><span className="font-semibold">{job.examPattern.negativeMarking}</span></div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Section Name</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">Questions</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.examPattern.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800">{sec.name}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.questions}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.marks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Additional information */}
              {job.additionalInfo?.applicationSteps?.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><FilePenLine className="h-6 w-6 mr-3 text-blue-600" />How to DownLoad Answer Key</h2>
                  <ol className="space-y-4 list-decimal list-inside text-gray-700">
                    {job.additionalInfo.applicationSteps.map((step, index) => (
                      <li key={index} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Right Column (Sticky Sidebar) */}
            <div className="lg:col-span-1 lg:sticky top-8 space-y-8 hidden lg:block"> {/* Added hidden lg:block to hide in mobile as it's duplicated above */}
              <div className='space-y-4'>
                {/* Important Dates */}
                {importantDatesItems.length > 0 && (
                  <InfoTable
                    title="Important Dates"
                    icon={<CalendarDays className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={importantDatesItems}
                  />
                )}


                {/* vacancy details */}
                {vacancyItems.length > 0 && (
                  <InfoTable
                    title="Vacancy Details"
                    icon={<Users className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={vacancyItems}
                  />
                )}
              </div>


              {/* seletion Process */}
              {selectionProcessItems.length > 0 && (
                <InfoTable
                  title="Selection Process"
                  icon={<Target className="h-5 w-5 mr-2.5 text-blue-600" />}
                  items={selectionProcessItems}
                />
              )}
              {/* important link */}
              {importantLinksItems.length > 0 && (
                <LinksCard
                  title="Important Links"
                  icon={<LinkIcon className="h-5 w-5 mr-2.5 text-blue-600" />}
                  items={importantLinksItems}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>

  );
}