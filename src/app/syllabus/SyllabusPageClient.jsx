"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const SyllabusPage = () => {
  const [syllabiData, setSyllabiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Load JSON data from public folder
  useEffect(() => {
    fetch("/api/syllabus")
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || [];
        
        // Data ko reverse kiya taaki Newest Syllabus Upar aaye
        if (Array.isArray(data)) {
          setSyllabiData(data.reverse());
        } else {
          setSyllabiData([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredSyllabi = syllabiData.filter((s) =>
    s.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Syllabus..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 Header Color: Purple (No Red) 👇 */}
          <div className="bg-purple-800 py-2 border-b border-purple-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Syllabus & Exam Pattern
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-purple-800 h-8 w-8" />
              </div>
            ) : filteredSyllabi.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {filteredSyllabi.map((syllabus) => (
                  <li key={syllabus.id} className="pl-2">
                    <Link 
                      href={`/syllabus/${syllabus.id}`} 
                      // Text Blue (Classic), Hover Purple (Red hata diya)
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-purple-700 transition-colors"
                    >
                      {syllabus.examName}
                    </Link>
                    
                    {/* Optional: Year */}
                    {/* <span className="text-gray-500 text-sm ml-2">
                       - {syllabus.year}
                    </span> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No syllabus found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default SyllabusPage;