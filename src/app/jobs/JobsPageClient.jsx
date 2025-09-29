"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, Briefcase } from "lucide-react";




const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs JSON from public folder
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/jobsData.json");
        if (!res.ok) throw new Error("Failed to fetch jobs data");
        const data = await res.json();
        setJobsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-1">
            <Briefcase className="h-6 w-8" />
            <h1 className="text-2xl font-bold">Jobs Portal</h1>
          </div>
          <p className="text-blue-200 text-sm">
            Latest government and private job opportunities
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-green-800 mb-2 text-center">
            Jobs Portal
          </h1>

          {/* Search */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by exam name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                           pl-8 text-sm"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                {/* Exam name + last date clickable */}
                <Link href={`/jobs/${job.id}`} className="flex-1">
                  <h3 className="text-green-700 font-semibold text-sm mb-1 hover:underline">
                    {job.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Last Date: {job.applicationEnd}</span>
                  </div>
                </Link>

                {/* Job button */}
                <Link
                  href={`/jobs/${job.id}`}
                  className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-xs font-medium"
                >
                  Apply Job
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-500">
              <Briefcase className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <h3 className="font-medium mb-1">No jobs found</h3>
              <p>Try searching with another keyword.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
