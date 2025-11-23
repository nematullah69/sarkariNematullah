"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch MongoDB jobs");
        const data = await res.json();
        
        // Data ko reverse kiya taaki Newest Upar aaye
        if (Array.isArray(data)) {
           setJobsData(data.reverse());
        } else if (Array.isArray(data.data)) {
           setJobsData(data.data.reverse());
        } else {
           setJobsData([]);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Latest Jobs..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 Header Color: Dark Blue (Red nahi hai) 👇 */}
          <div className="bg-blue-800 py-2 border-b border-blue-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Latest Jobs
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-blue-800 h-8 w-8" />
              </div>
            ) : filteredJobs.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {/* 👇 CHANGE: Added 'index' and used it in key to prevent duplicate key error */}
                {filteredJobs.map((job, index) => (
                  <li key={`${job.id}-${index}`} className="pl-2">
                    <Link 
                      href={`/jobs/${job.id}`} 
                      // Text Blue hai, Hover par Red hoga (Classic Style)
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-[#FF0000] transition-colors"
                    >
                      {job.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No jobs found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default JobsPage;