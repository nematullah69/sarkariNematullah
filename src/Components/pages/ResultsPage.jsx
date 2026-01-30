import React from 'react';
import Link from 'next/link';
import { Eye, Search, TrendingUp, Award } from 'lucide-react';

export const runtime = "nodejs";

async function getResultData() {
    try {
        const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result', {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Failed to load');
        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

const ResultsPage = async () => {
    const resultListings = await getResultData();

    return (
        <div className="min-h-screen bg-gray-100 antialiased text-slate-900">
            
            <main className="max-w-4xl mx-auto p-2 sm:p-4">
                {/* --- SEARCH BOX --- */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input 
                        type="text" 
                        placeholder="Quick search results..." 
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                </div>

                {/* --- COMPACT LIST --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1.5 text-indigo-600" />
                            Latest Exam Results
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {resultListings.length > 0 ? (
                            resultListings.map((result) => (
                                <div key={result.id} className="p-3 sm:p-4 hover:bg-indigo-50/30 transition-colors">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <Link 
                                                href={`/results/${result.id}`}
                                                className="text-sm sm:text-base font-bold text-indigo-900 hover:text-indigo-600 leading-snug block mb-1 truncate sm:whitespace-normal"
                                            >
                                                {result.title}
                                            </Link>
                                            
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span className="flex items-center text-[11px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                                    <Award className="h-3 w-3 mr-1" /> Result Declared
                                                </span>
                                                {/* Date and other meta can be added here if needed */}
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 self-center">
                                            <Link
                                                href={`/results/${result.id}`}
                                                className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                                            >
                                                VIEW
                                                <Eye className="h-3 w-3 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400 text-sm italic">No results found.</div>
                        )}
                    </div>
                </div>

                <p className="text-center text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-widest">
                    mygovernmentexam.online • Updates 2026
                </p>
            </main>
        </div>
    );
};

export default ResultsPage;