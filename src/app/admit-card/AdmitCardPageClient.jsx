"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

const AdmitCardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admitCardsData, setAdmitCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from MongoDB API route
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admitcards");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        
        // Data check kiya aur reverse kar diya taaki Newest Admit Card Upar aaye
        const data = result.data || [];
        if (Array.isArray(data)) {
           // We'll rely on the array index for the key to avoid the duplicate ID issue
           setAdmitCardsData(data.reverse());
        } else {
           setAdmitCardsData([]);
        }

      } catch (error) {
        // You should console.error(error.message) here for clarity
        console.error("Fetch error:", error);
        setAdmitCardsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAdmitCards = admitCardsData.filter((card) =>
    card.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Admit Card..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 Header Color: Dark Slate (Red hata diya) 👇 */}
          <div className="bg-slate-800 py-2 border-b border-slate-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Admit Card
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-slate-800 h-8 w-8" />
              </div>
            ) : filteredAdmitCards.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {filteredAdmitCards.map((card, index) => ( // <-- ADDED 'index' HERE
                  // 👇 FIX: The key is now a combination of the non-unique ID and the unique array index
                  <li key={`${card.id}-${index}`} className="pl-2"> 
                    <Link 
                      href={`/admit-card/${card.id}`} 
                      // Text Blue (Classic), Hover Slate/Black (Professional look)
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-slate-900 transition-colors"
                    >
                      {card.examName}
                    </Link>
                    
                    {/* Optional: Exam Date */}
                    {/* <span className="text-gray-500 text-sm ml-2 hidden sm:inline">
                      (Exam Date: {card.examDate})
                    </span> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No admit cards found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default AdmitCardPage;