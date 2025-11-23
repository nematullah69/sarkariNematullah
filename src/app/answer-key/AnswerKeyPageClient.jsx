"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const AnswerKeyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [answerKeysData, setAnswerKeysData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/answerKeysData.json")
      .then((res) => res.json())
      .then((data) => {
        // 👇 YAHAN CHANGE KIYA HAI:
        // Data ko reverse kiya taaki Newest Answer Key Upar aaye
        if (Array.isArray(data)) {
          setAnswerKeysData(data.reverse());
        } else {
          setAnswerKeysData([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredAnswerKeys = answerKeysData.filter((key) =>
    key.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Answer Key..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-pink-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 Header Color: Dark Pink (Red nahi hai) 👇 */}
          <div className="bg-pink-700 py-2 border-b border-pink-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Answer Key
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-pink-700 h-8 w-8" />
              </div>
            ) : filteredAnswerKeys.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {filteredAnswerKeys.map((key) => (
                  <li key={key.id} className="pl-2">
                    <Link 
                      href={`/answer-key/${key.id}`} 
                      // Classic Style: Text Blue, Hover Pink
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-pink-800 transition-colors"
                    >
                      {key.examName}
                    </Link>
                    
                    {/* Optional: Release Date show karni ho to uncomment karein */}
                    {/* <span className="text-gray-500 text-sm ml-2">
                       (Released: {key.releaseDate})
                    </span> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No answer keys found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default AnswerKeyPage;