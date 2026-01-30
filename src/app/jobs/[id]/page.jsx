// "use client"
export const runtime = "nodejs";

import React from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';

import {
  ArrowLeft, Users, CheckCircle, ExternalLink, Briefcase, CalendarDays,
  Wallet, Target, ClipboardList, UserCheck, FilePenLine,
  Link as LinkIcon, TrendingUp, FileText, HelpCircle, BarChart3, BookOpen
} from 'lucide-react';

async function getJobsData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', {
    cache: 'no-store'
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

  // Reusable component for the top info cards - BOLDER DESIGN
  const InfoCard = ({ icon, title, value, valueColor = 'text-gray-900' }) => (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center space-x-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl text-blue-600 border border-blue-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
        <p className={`text-xl font-bold ${valueColor}`}>{value || 'N/A'}</p>
      </div>
    </div>
  );

  // Reusable table component for the sidebar - BOLDER DESIGN
  const InfoTable = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
      <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center pb-3 border-b-2">
        <span className="mr-3 text-blue-600">{icon}</span>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2.5 border-b last:border-0">
            <span className="text-gray-700 font-medium text-sm">{item.label}</span>
            <span className={`font-bold ${item.highlight ? 'text-red-600' : 'text-gray-900'} text-sm`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Reusable Links Card component - BOLDER DESIGN
  const LinksCard = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
      <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center pb-3 border-b-2">
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
            className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-150 border border-blue-100"
          >
            <span className="text-blue-700 font-bold text-sm">{item.label}</span>
            <ExternalLink className="h-4 w-4 text-blue-500" />
          </a>
        ))}
      </div>
    </div>
  );

  // Job not found page - BOLDER DESIGN
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Job Not Found</h1>
            <p className="text-gray-700 mb-6 text-sm font-medium">
              The job with ID <strong className="font-extrabold text-red-600">{id}</strong> was not found.
            </p>
            <Link href="/jobs" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-bold text-sm shadow">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Data Preparation --- (No changes to data logic)
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

  const cutoffItems = job.cutoffTrends ? [
    { label: '2024 Expected Cutoff', value: job.cutoffTrends?.expected2024 || 'N/A' },
    { label: '2023 Final Cutoff', value: job.cutoffTrends?.final2023 || 'N/A' },
    { label: '2022 Final Cutoff', value: job.cutoffTrends?.final2022 || 'N/A' },
    { label: '2021 Final Cutoff', value: job.cutoffTrends?.final2021 || 'N/A' },
  ] : [];

  const analysisItems = job.jobAnalysis ? [
    { 
      label: 'Competition Level', 
      value: job.jobAnalysis?.competitionLevel || 'N/A', 
      highlight: job.jobAnalysis?.competitionLevel === 'High' 
    },
    { 
      label: 'Application Trend', 
      value: job.jobAnalysis?.applicationTrend || 'N/A' 
    },
    { 
      label: 'Success Rate', 
      value: job.jobAnalysis?.successRate || 'N/A' 
    },
    { 
      label: 'Difficulty Level', 
      value: job.jobAnalysis?.difficultyLevel || 'N/A' 
    },
  ] : [];

  const faqItems = job.faq ? job.faq.map(item => ({
    question: item.question || '',
    answer: item.answer || ''
  })) : [];

  const syllabusItems = job.jobSyllabus?.topics ? job.jobSyllabus.topics.map(topic => ({
    topic: topic.name || '',
    subtopics: topic.subtopics?.join(', ') || ''
  })) : [];

  const overviewItems = job.jobOverview ? [
    { label: 'Job Type', value: job.jobOverview?.jobType || 'N/A' },
    { label: 'Job Level', value: job.jobOverview?.jobLevel || 'N/A' },
    { label: 'Work Location', value: job.jobOverview?.workLocation || 'N/A' },
    { label: 'Department', value: job.jobOverview?.department || 'N/A' },
    { label: 'Recruitment Type', value: job.jobOverview?.recruitmentType || 'N/A' },
    { label: 'Notification Release', value: job.jobOverview?.notificationRelease || 'N/A' },
  ] : [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" },
          { name: "Jobs", url: "https://www.sarkariresult27.com/jobs" },
          { name: `${job.title}`, url: `https://www.sarkariresult27.com/jobs/${id}` },
        ]} 
      />
      <HowToSchema
        title="How to Complete Counselling Process 2026"
        process={[]}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Back Link - BOLDER */}
          <div className="mb-8">
            <Link href="/jobs" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-bold text-sm">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Jobs
            </Link>
          </div>

          {/* --- Main Job Header - BOLDER --- */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-extrabold mb-4">
                  {job.organization || 'Government Organization'}
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{job.title || 'Job Title'}</h1>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                  <p className="font-bold text-sm">Job ID: {id}</p>
                </div>
              </div>
              <a 
                href={job.importantLinks?.applyOnline || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-extrabold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                <ExternalLink className="h-5 w-5 mr-3" />
                Apply Now
              </a>
            </div>
          </div>

          {/* --- Key Info Bar - BOLDER --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <InfoCard 
              icon={<Users className="h-6 w-6" />} 
              title="Total Vacancies" 
              value={job.vacancies?.total?.toLocaleString() || 'N/A'} 
            />
            <InfoCard 
              icon={<Wallet className="h-6 w-6" />} 
              title="Salary" 
              value={job.salary || 'Not specified'} 
            />
            <InfoCard 
              icon={<CalendarDays className="h-6 w-6" />} 
              title="Application Deadline" 
              value={job.importantDates?.ApplicationEnd || 'Check notification'} 
              valueColor="text-red-600 font-extrabold" 
            />
          </div>

          {/* --- Two-Column Layout --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview Section - BOLDER */}
              {job.jobOverview && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <Briefcase className="h-6 w-6 mr-4 text-blue-600" />
                    Job Overview
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {overviewItems.map((item, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200">
                        <p className="text-xs text-gray-600 font-bold mb-2 uppercase tracking-wide">{item.label}</p>
                        <p className="text-base font-extrabold text-gray-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {job.jobOverview?.description && (
                    <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <p className="text-gray-800 text-sm leading-relaxed font-medium">{job.jobOverview.description}</p>
                    </div>
                  )}
                </div>
              )}

              {job.description && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center pb-4 border-b-2">
                    <FileText className="h-6 w-6 mr-4 text-blue-600" />
                    Job Description
                  </h2>
                  <p className="text-gray-800 text-base leading-relaxed font-medium">{job.description}</p>
                </div>
              )}

              {/* Job Analysis Section - BOLDER */}
              {job.jobAnalysis && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <BarChart3 className="h-6 w-6 mr-4 text-blue-600" />
                    Job Analysis
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {analysisItems.map((item, index) => (
                      <div key={index} className={`p-4 rounded-xl border-2 ${item.highlight ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200 hover:border-blue-300'} transition-all duration-200`}>
                        <p className="text-xs text-gray-600 font-bold mb-2 uppercase tracking-wide">{item.label}</p>
                        <p className={`text-base font-extrabold ${item.highlight ? 'text-red-700' : 'text-gray-900'}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  {job.jobAnalysis?.analysis && (
                    <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                      <p className="text-gray-800 text-sm leading-relaxed font-bold">{job.jobAnalysis.analysis}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Sidebar - BOLDER */}
              <div className="space-y-6 lg:hidden">
                {importantDatesItems.length > 0 && (
                  <InfoTable
                    title="Important Dates"
                    icon={<CalendarDays className="h-5 w-5" />}
                    items={importantDatesItems}
                  />
                )}

                {cutoffItems.length > 0 && (
                  <InfoTable
                    title="Cutoff Trends"
                    icon={<TrendingUp className="h-5 w-5" />}
                    items={cutoffItems}
                  />
                )}

                {applicationFeeItems.length > 0 && (
                  <InfoTable
                    title="Application Fee"
                    icon={<Wallet className="h-5 w-5" />}
                    items={applicationFeeItems}
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

              {/* Eligibility Criteria - BOLDER */}
              {(job.eligibility || job.ageLimit) && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center pb-4 border-b-2">
                    <UserCheck className="h-6 w-6 mr-4 text-blue-600" />
                    Eligibility Criteria
                  </h2>
                  {job.eligibility && <p className="text-gray-800 text-base mb-5 font-medium">{job.eligibility}</p>}
                  {job.ageLimit && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-5 rounded-r-xl">
                      <p className="font-extrabold text-gray-900 text-base">
                        Age Limit: <span className="font-bold">{job.ageLimit}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Post with Eligibility Table - BOLDER */}
              {job.postAndEligbt && job.postAndEligbt.sections && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <Users className="h-6 w-6 mr-4 text-blue-600" />
                    Post-wise Eligibility
                  </h2>
                  <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">Post Name</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">Vacancy</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">Eligibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.postAndEligbt.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-4 text-gray-900 text-sm font-bold">{sec.name || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm font-medium">{sec.vacancies || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm">{sec.Eligibility || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Age Limits by Category - BOLDER */}
              {job.ageLimits && Array.isArray(job.ageLimits) && job.ageLimits.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <UserCheck className="h-6 w-6 mr-4 text-blue-600" />
                    Age Limit Relaxation
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {job.ageLimits.map((item, i) => (
                      <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200">
                        <span className="font-extrabold text-gray-900 text-sm">{item.category || 'Category'}:</span>
                        <span className="text-gray-800 text-sm font-bold ml-2">{item.count || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vacancy Category-wise Table - BOLDER */}
              {job.vacanciesCategory && job.vacanciesCategory.sections && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <Users className="h-6 w-6 mr-4 text-blue-600" />
                    Category-wise Vacancy Details
                  </h2>
                  <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">Post Name</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2 text-center">General</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2 text-center">OBC</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2 text-center">EWS</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2 text-center">SC/ST</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.vacanciesCategory.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-4 text-gray-900 text-sm font-bold">{sec.name || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center font-medium">{sec.general || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center font-medium">{sec.obc || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center font-medium">{sec.ews || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center font-medium">{sec.scst || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Exam Pattern - BOLDER */}
              {job.examPattern && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <ClipboardList className="h-6 w-6 mr-4 text-blue-600" />
                    Exam Pattern
                  </h2>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 text-center">
                      <div className="font-extrabold text-gray-900 text-xl">{job.examPattern.totalMarks || 'N/A'}</div>
                      <div className="text-xs text-gray-600 font-bold mt-2 uppercase tracking-wide">Total Marks</div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 text-center">
                      <div className="font-extrabold text-gray-900 text-xl">{job.examPattern.duration || 'N/A'}</div>
                      <div className="text-xs text-gray-600 font-bold mt-2 uppercase tracking-wide">Duration</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 p-4 rounded-xl text-center">
                      <div className="font-extrabold text-red-700 text-xl">{job.examPattern.negativeMarking || 'N/A'}</div>
                      <div className="text-xs text-red-600 font-bold mt-2 uppercase tracking-wide">Negative Marking</div>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">Section Name</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2 text-center">Questions</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2 text-center">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.examPattern.sections?.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-4 text-gray-900 text-sm font-bold">{sec.name || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center font-medium">{sec.questions || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm text-center font-medium">{sec.marks || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Cutoff Trends Section - BOLDER */}
              {job.cutoffTrends && job.cutoffTrends.yearlyData && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 overflow-hidden">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <TrendingUp className="h-6 w-6 mr-4 text-blue-600" />
                    Previous Year Cutoff Trends
                  </h2>
                  <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">Year</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">General Category</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">OBC Category</th>
                          <th className="p-4 font-extrabold text-gray-900 text-sm border-b-2">SC/ST Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.cutoffTrends.yearlyData.map((data, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-4 text-gray-900 text-sm font-extrabold">{data.year || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm font-bold">{data.general || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm font-bold">{data.obc || 'N/A'}</td>
                            <td className="p-4 text-gray-900 text-sm font-bold">{data.scst || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {job.cutoffTrends.note && (
                    <div className="mt-6 p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-r-xl">
                      <p className="text-gray-800 text-sm font-bold">{job.cutoffTrends.note}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Job Syllabus Section - BOLDER */}
              {job.jobSyllabus && job.jobSyllabus.topics && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <BookOpen className="h-6 w-6 mr-4 text-blue-600" />
                    Complete Syllabus
                  </h2>
                  <div className="space-y-5">
                    {syllabusItems.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-5 py-4 bg-gradient-to-r from-blue-50 to-transparent rounded-r-xl">
                        <h3 className="text-lg font-extrabold text-gray-900 mb-2">{item.topic}</h3>
                        <p className="text-gray-800 text-sm mb-3 font-medium">{item.subtopics}</p>
                        {job.jobSyllabus.topics[index]?.weightage && (
                          <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-full">
                            Weightage: {job.jobSyllabus.topics[index].weightage}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {job.jobSyllabus.importantNotes && (
                    <div className="mt-6 p-5 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-r-xl">
                      <h4 className="font-extrabold text-gray-900 text-sm mb-2">Important Notes:</h4>
                      <p className="text-gray-800 text-sm font-bold">{job.jobSyllabus.importantNotes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* How to Apply - BOLDER */}
              {job.additionalInfo?.applicationSteps?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <FilePenLine className="h-6 w-6 mr-4 text-blue-600" />
                    How to Apply
                  </h2>
                  <ol className="space-y-3">
                    {job.additionalInfo.applicationSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-extrabold mr-4 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-800 text-sm leading-relaxed font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

               {/* FAQ Section - BOLDER */}
              {job.faq && faqItems.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center pb-4 border-b-2">
                    <HelpCircle className="h-6 w-6 mr-4 text-blue-600" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-5">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-5 last:pb-0">
                        <h3 className="text-base font-extrabold text-gray-900 mb-3 flex items-start">
                          <span className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-extrabold mr-4 flex-shrink-0">
                            Q
                          </span>
                          {item.question}
                        </h3>
                        <div className="flex items-start ml-10">
                          <span className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-extrabold mr-4 flex-shrink-0">
                            A
                          </span>
                          <p className="text-gray-800 text-sm font-medium">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (Sticky Sidebar) - BOLDER */}
            <div className="hidden lg:block space-y-6 sticky top-8">
              {importantDatesItems.length > 0 && (
                <InfoTable
                  title="Important Dates"
                  icon={<CalendarDays className="h-5 w-5" />}
                  items={importantDatesItems}
                />
              )}

              {cutoffItems.length > 0 && (
                <InfoTable
                  title="Cutoff Trends"
                  icon={<TrendingUp className="h-5 w-5" />}
                  items={cutoffItems}
                />
              )}

              {applicationFeeItems.length > 0 && (
                <InfoTable
                  title="Application Fee"
                  icon={<Wallet className="h-5 w-5" />}
                  items={applicationFeeItems}
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

              {analysisItems.length > 0 && (
                <InfoTable
                  title="Quick Analysis"
                  icon={<BarChart3 className="h-5 w-5" />}
                  items={analysisItems}
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
          </div>
        </div>
      </div>
    </>
  );
}