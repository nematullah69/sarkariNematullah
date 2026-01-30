import React from 'react';
import Link from 'next/link';
import { Eye, MapPin, Search, Bell } from 'lucide-react';

export const runtime = "nodejs";

async function getJobsData() {
    try {
        const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Failed to load');
        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

const JobsPage = async () => {
    const jobListings = await getJobsData();

    return (
        <div className="min-h-screen bg-gray-100 antialiased text-slate-900">
           

            <main className="max-w-4xl mx-auto p-2 sm:p-4">
                {/* --- SEARCH BOX --- */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input 
                        type="text" 
                        placeholder="Quick search jobs..." 
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                </div>

                {/* --- COMPACT LIST --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <h2 className="text-[11px] font-bold text-gray-500 uppercase">Latest Notifications</h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {jobListings.length > 0 ? (
                            jobListings.map((job) => (
                                <div key={job.id} className="p-3 sm:p-4 hover:bg-indigo-50/30 transition-colors">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <Link 
                                                href={`/jobs/${job.id}`}
                                                className="text-sm sm:text-base font-bold text-indigo-900 hover:text-indigo-600 leading-snug block mb-1 truncate sm:whitespace-normal"
                                            >
                                                {job.title}
                                            </Link>
                                            
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span className="flex items-center text-[11px] font-medium text-gray-500">
                                                    <MapPin className="h-3 w-3 mr-1 text-gray-400" /> Govt Job
                                                </span>
                                                {/* Date section removed from here */}
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 self-center">
                                            <Link
                                                href={`/jobs/${job.id}`}
                                                className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                                            >
                                                DETAILS
                                                <Eye className="h-3 w-3 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400 text-sm italic">No jobs found.</div>
                        )}
                    </div>
                </div>

                <p className="text-center text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-widest">
                    Best viewed on mobile devices
                </p>
            </main>
        </div>
    );
};

export default JobsPage;