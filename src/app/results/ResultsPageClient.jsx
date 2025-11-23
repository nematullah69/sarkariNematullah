"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const ResultsPage = () => {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/results");
        const json = await res.json();

        // Data check kiya aur reverse kar diya taaki Newest Result Upar aaye
        if (Array.isArray(json.data)) {
           setResultsData(json.data.reverse());
        } else {
           setResultsData([]);
        }

      } catch (error) {
        console.error("Error fetching results:", error);
        setResultsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResults = (resultsData || []).filter((result) => {
    const matchesSearch =
      (result?.examName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (result?.organization || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Results (Exam Name)..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-teal-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 Header Color: Teal (Red/Green/Blue se alag) 👇 */}
          <div className="bg-teal-700 py-2 border-b border-teal-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Examination Results
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-teal-700 h-8 w-8" />
              </div>
            ) : filteredResults.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {filteredResults.map((result, index) => (
                  <li key={result?.id || index} className="pl-2">
                    <Link 
                      href={`/results/${result?.id}`} 
                      // Classic Style: Text Blue, Hover Red
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-[#FF0000] transition-colors"
                    >
                      {result?.examName}
                    </Link>
                    
                    {/* Optional: Organization ka naam bracket mein dikha sakte hain */}
                    {/* <span className="text-gray-500 text-sm ml-2 hidden sm:inline">
                       — {result?.organization}
                    </span> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No results found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default ResultsPage;