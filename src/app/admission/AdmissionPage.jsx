"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const AdmissionPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admissionsData.json") // Jo aapke code mein URL tha wahi rakha hai
      .then((res) => res.json())
      .then((data) => {
        // 👇 YAHAN CHANGE KIYA HAI:
        // Data ko reverse kiya taaki Newest Admission Upar aaye
        if (Array.isArray(data)) {
          setAdmissions(data.reverse());
        } else {
          setAdmissions([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredAdmissions = admissions.filter((admission) =>
    admission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Admission..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-indigo-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 Header Color: Indigo (Red nahi hai) 👇 */}
          <div className="bg-indigo-700 py-2 border-b border-indigo-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Admission
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-indigo-700 h-8 w-8" />
              </div>
            ) : filteredAdmissions.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {filteredAdmissions.map((admission) => (
                  <li key={admission.id} className="pl-2">
                    <Link 
                      href={`/admission/${admission.id}`} 
                      // Classic Style: Text Blue, Hover Indigo
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-indigo-800 transition-colors"
                    >
                      {admission.title}
                    </Link>
                    
                    {/* Optional: Last Date dikhani ho to uncomment karein */}
                    {/* <span className="text-gray-500 text-sm ml-2 hidden sm:inline">
                       (Last Date: {admission.applicationEnd})
                    </span> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No admissions found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default AdmissionPage;