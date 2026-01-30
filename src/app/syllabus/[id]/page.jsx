import Link from "next/link";
import { ArrowLeft, Download, BookOpen, Clock, FileText, CheckCircle, BarChart3 } from "lucide-react";
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';


export const runtime = "nodejs";

async function getData(id) {
  const res = await fetch(`https://gist.githubusercontent.com/shahidafridi-collab/c687d6e00dcc0a79bd689a520de733c6/raw/syllabus`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to Load Syllabus Data');
  }
  
  const resultListings = await res.json();
  const specificResult = resultListings.find(r => String(r.id) === String(id));
  return specificResult;
}

export default async function SyllabusDetail({ params }) {
  const { id } = await params;
  
  let syllabus;
  try {
    syllabus = await getData(id);
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    syllabus = null;
  }

  if (!syllabus) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Syllabus Not Found</h1>
            <p className="text-gray-600 mb-6 text-sm">
              The syllabus with ID <strong className="font-semibold text-red-600">{id}</strong> was not found.
            </p>
            <Link href="/syllabus" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors duration-200 font-bold text-sm shadow">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Syllabi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.governmentexam.online" },
          { name: "Syllabus", url: "https://www.governmentexam.online/syllabus" },
          { name: `${syllabus.title}`, url: `https://www.governmentexam.online/syllabus/${id}` }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Website Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-blue-800">GovernmentExam.online</h1>
              <p className="text-sm text-gray-600 mt-1">Complete Syllabus Guide for Government Examinations</p>
            </Link>
          </div>

          {/* Back Link */}
          <div className="mb-6">
            <Link
              href="/syllabus"
              className="inline-flex items-center text-blue-700 hover:text-blue-900 font-bold text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Syllabi
            </Link>
          </div>

          {/* Main Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  {syllabus.exam || 'Government Exam'}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{syllabus.title}</h1>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                  <p className="font-medium text-sm">Syllabus ID: {id}</p>
                </div>
              </div>
              {syllabus.link && (
                <a
                  href={syllabus.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl text-base"
                >
                  <Download className="h-5 w-5 mr-3" />
                  Download Full Syllabus PDF
                </a>
              )}
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Stages</p>
                    <p className="text-lg font-bold text-gray-900">{syllabus.stages?.length || 1}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Sections</p>
                    <p className="text-lg font-bold text-gray-900">
                      {syllabus.stages?.reduce((total, stage) => total + (stage.sections?.length || 0), 0) || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Difficulty</p>
                    <p className="text-lg font-bold text-gray-900">{syllabus.difficulty || 'Moderate'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Stages */}
          <div className="space-y-8">
            {syllabus.stages?.map((stage, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">
                {/* Stage Header */}
                <div className="flex items-center mb-6 pb-4 border-b-2">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{stage.stage}</h2>
                    <p className="text-gray-600 text-sm mt-1">Stage {index + 1} of {syllabus.stages.length}</p>
                  </div>
                </div>

                {/* Exam Pattern */}
                {stage.pattern && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 p-6 mb-8">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-3" />
                      Exam Pattern
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {stage.pattern.mode && (
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                          <div className="text-sm text-gray-600 font-medium mb-1">Mode</div>
                          <div className="text-lg font-bold text-gray-900">{stage.pattern.mode}</div>
                        </div>
                      )}
                      {stage.pattern.duration && (
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                          <div className="text-sm text-gray-600 font-medium mb-1">Duration</div>
                          <div className="text-lg font-bold text-gray-900">{stage.pattern.duration}</div>
                        </div>
                      )}
                      {stage.pattern.totalQuestions && (
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                          <div className="text-sm text-gray-600 font-medium mb-1">Total Questions</div>
                          <div className="text-lg font-bold text-gray-900">{stage.pattern.totalQuestions}</div>
                        </div>
                      )}
                      {stage.pattern.totalMarks && (
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                          <div className="text-sm text-gray-600 font-medium mb-1">Total Marks</div>
                          <div className="text-lg font-bold text-gray-900">{stage.pattern.totalMarks}</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Negative Marking */}
                    <div className={`p-4 rounded-lg ${stage.pattern.negativeMarking?.applicable ? 'bg-red-50 border-red-200 border' : 'bg-green-50 border-green-200 border'}`}>
                      <div className="flex items-center">
                        <CheckCircle className={`h-5 w-5 mr-3 ${stage.pattern.negativeMarking?.applicable ? 'text-red-600' : 'text-green-600'}`} />
                        <div>
                          <span className="font-bold text-gray-900">Negative Marking: </span>
                          <span className={`font-bold ${stage.pattern.negativeMarking?.applicable ? 'text-red-600' : 'text-green-600'}`}>
                            {stage.pattern.negativeMarking?.applicable
                              ? stage.pattern.negativeMarking.deduction
                              : "Not Applicable"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sections */}
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-blue-600" />
                  Sections
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {stage.sections?.map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{section.name}</h4>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            {section.questions && (
                              <span className="flex items-center">
                                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-1"></span>
                                Questions: {section.questions}
                              </span>
                            )}
                            {section.duration && (
                              <span className="flex items-center">
                                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-1"></span>
                                Duration: {section.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        {section.marks && (
                          <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                            {section.marks} Marks
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <h5 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wide">Topics Covered:</h5>
                        <ul className="space-y-2">
                          {section.topics?.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start">
                              <span className="text-blue-600 mr-2 mt-1">•</span>
                              <span className="text-gray-700 text-sm">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Weightage Bar */}
                      {section.weightage && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                            <span>Weightage</span>
                            <span>{section.weightage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                              style={{ width: `${section.weightage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Stage Tips */}
                {stage.tips && stage.tips.length > 0 && (
                  <div className="mt-8 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border-2 border-teal-300 p-6">
                    <h4 className="font-bold text-teal-800 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Preparation Tips for {stage.stage}
                    </h4>
                    <ul className="space-y-2">
                      {stage.tips.map((tip, tipIdx) => (
                        <li key={tipIdx} className="flex items-start">
                          <span className="text-teal-600 mr-2 mt-1">✓</span>
                          <span className="text-gray-800 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Preparation Strategy */}
          {syllabus.preparationStrategy && (
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-300 p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-4" />
                Overall Preparation Strategy
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {syllabus.preparationStrategy.map((strategy, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-purple-200">
                    <h4 className="font-bold text-purple-700 mb-2">{strategy.title}</h4>
                    <p className="text-gray-700 text-sm">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Books */}
          {syllabus.recommendedBooks && syllabus.recommendedBooks.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-300 p-8">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-4" />
                Recommended Books
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {syllabus.recommendedBooks.map((book, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-orange-200 hover:shadow-md transition-all duration-200">
                    <h4 className="font-bold text-gray-900 mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-gray-700 text-sm">{book.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-300 text-center">
            <p className="text-gray-600 text-sm mb-2">© {new Date().getFullYear()} GovernmentExam.online - All Rights Reserved</p>
            <p className="text-gray-500 text-xs">Complete syllabus, exam pattern, and preparation guide for government examinations.</p>
          </div>
        </div>
      </div>
    </>
  );
}