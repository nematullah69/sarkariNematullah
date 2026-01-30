export const runtime = "nodejs";

async function getResultData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result', { 
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to Load Result Data');
  }
  
  const resultListings = await res.json();
  const specificResult = resultListings.find(r => String(r.id) === String(id));
  return specificResult;
}

import React from 'react';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Users,
  Briefcase,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Download,
  FileText,
  Award,
  TrendingUp,
  BarChart3,
  BookOpen,
  Clock,
} from 'lucide-react';

// Safe helpers
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-IN') : 'N/A');
const fmtNum = (n) => (typeof n === 'number' ? n.toLocaleString('en-IN') : (n ?? 'N/A'));
const safeArray = (v) => (Array.isArray(v) ? v : []);
const safeObjectEntries = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.entries(v) : []);

export default async function UniversalResultPage({ params }) {
  const { id } = await params;
  
  let result;
  try {
    result = await getResultData(id);
  } catch (error) {
    console.error('Error fetching result:', error);
    result = null;
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center p-8 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Result Not Found</h1>
            <p className="text-gray-600 mb-6 text-sm">
              The result with ID <strong className="font-semibold text-red-600">{id}</strong> was not found.
            </p>
            <Link href="/results" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors duration-200 font-bold text-sm shadow">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const type = result.type || 'mixed';
  const process = result.checkSteps?.map((step, index) => ({
    name: `Step ${index + 1}`,
    text: step
  })) || [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.governmentexam.online" },
          { name: "Results", url: "https://www.governmentexam.online/results" },
          { name: `${result.title}`, url: `https://www.governmentexam.online/results/${id}` },
        ]}
      />
      <HowToSchema
        title="How to Check Result"
        process={process}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        {/* Website Header */}
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-800">GovernmentExam.online</h1>
            <p className="text-sm text-gray-600 mt-1">Your Complete Guide to Government Examinations</p>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <div className="mb-6">
            <Link href="/results" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-bold text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Results
            </Link>
          </div>

          <main className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
            <HeaderSection result={result} type={type} />
            
            <DescriptionSection result={result} />
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <aside className="space-y-8">
                  <DownloadSection files={safeArray(result.downloadLinks)} />
                  <QuickFacts result={result} type={type} />
                  <ResultStats result={result} />
                </aside>

                {/* Main Content */}
                <section className="lg:col-span-2 space-y-8">
                  {/* Result Type Specific Sections */}
                  {(type === 'job' || type === 'mixed') && (
                    <JobSections result={result} />
                  )}

                  {(type === 'board' || type === 'mixed') && (
                    <BoardSections result={result} />
                  )}

                  {(type === 'admission' || type === 'mixed') && (
                    <AdmissionSections result={result} />
                  )}

                  <CommonSections result={result} />
                  
                  {/* Disclaimer */}
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-r-xl p-5">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-red-800 mb-2">Important Notice</h4>
                        <p className="text-red-700 text-sm">
                          This result is for informational purposes only. Always verify from official websites. 
                          GovernmentExam.online is not responsible for any discrepancies.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

/* ------------------------- Header ------------------------- */
function HeaderSection({ result, type }) {
  const org = result.organization ?? 'Government Organization';
  const title = result.title ?? 'Result';
  const status = result.status ?? 'Declared';

  return (
    <header className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="mb-4">
        <span className="inline-flex items-center bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
          {org}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        <div className="flex items-center">
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${status === 'Declared' ? 'bg-green-600' : 'bg-yellow-600'}`}>
            {status}
          </div>
          <span className="ml-4 text-blue-100">
            Result ID: {result.id}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          icon={<Calendar className="h-5 w-5" />}
          label="Exam Date"
          value={fmtDate(result.examDate)}
        />
        <StatCard 
          icon={<Award className="h-5 w-5" />}
          label="Result Date"
          value={fmtDate(result.declaredDate)}
        />
        <StatCard 
          icon={<Users className="h-5 w-5" />}
          label={type === 'board' ? "Students Appeared" : "Vacancies"}
          value={fmtNum(result.vacancies ?? result.seats ?? result.totalCandidates ?? null)}
        />
      </div>
    </header>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
      <div className="flex items-center mb-2">
        <div className="bg-white/20 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <span className="text-blue-100 text-sm font-medium">{label}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

/* ------------------------- Description ------------------------- */
function DescriptionSection({ result }) {
  if (!result?.description && !result?.overview && !result?.notes) return null;

  return (
    <section className="p-8 border-b border-gray-200">
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-3" />
          Result Overview
        </h2>
        
        {result?.description && (
          <p className="text-gray-800 mb-4 leading-relaxed">
            <span className="font-semibold text-gray-900">{result.organization}: </span>
            {result.description}
          </p>
        )}

        {result?.overview && (
          <p className="text-gray-700 mb-3 leading-relaxed">{result.overview}</p>
        )}

        {result?.notes && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-700">{result.notes}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------- Left Column ------------------------- */
function DownloadSection({ files }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <Download className="h-5 w-5 mr-3 text-blue-600" />
        Download Links
      </h2>
      <div className="space-y-3">
        {files.length > 0 ? (
          files.map((f, i) => (
            <a
              key={i}
              href={f?.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-600 mr-3" />
                <span className="text-blue-800 font-bold text-sm">{f?.label ?? `File ${i + 1}`}</span>
              </div>
              <ExternalLink className="h-4 w-4 text-blue-500" />
            </a>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No downloadable resources available.</p>
        )}
      </div>
    </div>
  );
}

function QuickFacts({ result, type }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <Briefcase className="h-5 w-5 mr-3 text-blue-600" />
        Quick Facts
      </h2>
      <div className="space-y-3">
        {result.postName && (
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700 text-sm font-medium">Post Name:</span>
            <span className="font-bold text-gray-900 text-sm">{result.postName}</span>
          </div>
        )}
        {result.selectionProcess && (
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700 text-sm font-medium">Selection Process:</span>
            <span className="font-bold text-gray-900 text-sm">{result.selectionProcess}</span>
          </div>
        )}
        {result.applyStart && result.applyEnd && (
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700 text-sm font-medium">Application Period:</span>
            <span className="font-bold text-gray-900 text-sm">
              {fmtDate(result.applyStart)} to {fmtDate(result.applyEnd)}
            </span>
          </div>
        )}
        {!result.postName && !result.selectionProcess && !result.applyStart && (
          <p className="text-gray-600 text-sm">No additional facts available.</p>
        )}
      </div>
    </div>
  );
}

function ResultStats({ result }) {
  const hasStats = result.totalMarks || result.percentage || result.passStatus;
  
  if (!hasStats) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-3 text-blue-600" />
        Result Statistics
      </h2>
      <div className="space-y-3">
        {result.totalMarks && (
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700 text-sm font-medium">Total Marks:</span>
            <span className="font-bold text-gray-900 text-sm">{fmtNum(result.totalMarks)}</span>
          </div>
        )}
        {result.percentage && (
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700 text-sm font-medium">Percentage:</span>
            <span className="font-bold text-green-600 text-sm">{result.percentage}%</span>
          </div>
        )}
        {result.passStatus && (
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 text-sm font-medium">Pass Status:</span>
            <span className={`font-bold text-sm ${result.passStatus === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
              {result.passStatus}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------- Job Sections ------------------------- */
function JobSections({ result }) {
  const cutoffs = safeArray(result.cutoffs);
  const meritList = safeArray(result.meritList);

  return (
    <>
      {cutoffs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-3 text-blue-600" />
            Category-wise Cutoffs
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                <tr>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Category</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Cutoff Marks</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {cutoffs.map((c, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                    <td className="p-4 text-gray-900 text-sm font-medium">{c?.category ?? '—'}</td>
                    <td className="p-4 text-gray-900 text-sm font-bold">{c?.marks ?? c?.score ?? 'N/A'}</td>
                    <td className="p-4 text-gray-900 text-sm">{c?.notes ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {meritList.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-3 text-blue-600" />
            Merit List (Top Candidates)
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                <tr>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Rank</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Registration No.</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Candidate Name</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {meritList.slice(0, 10).map((m, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                    <td className="p-4 text-gray-900 text-sm font-bold">{m?.rank ?? '—'}</td>
                    <td className="p-4 text-gray-900 text-sm">{m?.regNo ?? '—'}</td>
                    <td className="p-4 text-gray-900 text-sm font-medium">{m?.name ?? '—'}</td>
                    <td className="p-4 text-gray-900 text-sm">{m?.category ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {meritList.length > 10 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Showing top 10 candidates. Download full list for complete details.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ------------------------- Board Sections ------------------------- */
function BoardSections({ result }) {
  const toppers = safeArray(result?.toppers);

  return (
    <>
      {toppers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-3 text-blue-600" />
            Top Performers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toppers.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs text-blue-600 font-bold mb-1">Rank #{t?.rank ?? i + 1}</div>
                    <h3 className="font-bold text-gray-900 text-lg">{t?.name ?? '—'}</h3>
                    <p className="text-sm text-gray-600">{t?.school ?? t?.district ?? ''}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">{t?.percentage ?? t?.marks ?? '—'}</div>
                    <div className="text-xs text-gray-600">Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------- Admission Sections ------------------------- */
function AdmissionSections({ result }) {
  const cutoffs = safeArray(result?.cutoffs);

  return (
    <>
      {cutoffs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-3 text-blue-600" />
            Admission Cutoffs
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                <tr>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Category</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Cutoff Score</th>
                  <th className="p-4 font-bold text-gray-900 text-sm border-b-2">Closing Rank</th>
                </tr>
              </thead>
              <tbody>
                {cutoffs.map((c, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                    <td className="p-4 text-gray-900 text-sm font-medium">{c?.category ?? '—'}</td>
                    <td className="p-4 text-gray-900 text-sm font-bold">{c?.marks ?? c?.score ?? 'N/A'}</td>
                    <td className="p-4 text-gray-900 text-sm">{c?.closingRank ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------- Common Sections ------------------------- */
function CommonSections({ result }) {
  const steps = safeArray(result?.checkSteps);
  const nextSteps = safeArray(result?.nextSteps);

  return (
    <>
      {steps.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
            How to Check Your Result
          </h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start">
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm mr-4 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-800 leading-relaxed text-sm">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {nextSteps.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-3" />
            Next Steps
          </h2>
          <div className="space-y-3">
            {nextSteps.map((step, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}