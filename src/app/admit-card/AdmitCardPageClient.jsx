"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AdmitCardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admitCardsData, setAdmitCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/admitCardsData.json");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setAdmitCardsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAdmitCards = admitCardsData.filter((card) =>
    card.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading admit cards...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-3">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Admit Card Portal
      </h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by exam name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-6"
      />

      {/* Admit Card List */}
      <div className="w-full max-w-4xl">
        {filteredAdmitCards.length > 0 ? (
          <div className="space-y-4">
            {filteredAdmitCards.map((card) => (
              <Link
                key={card.id}
                href={`/admit-card/${card.id}`}
                className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition no-underline"
              >
                {/* Left side: exam info */}
                <div>
                  <h2 className="text-sm font-semibold text-green-700">
                    {card.examName}
                  </h2>
                  <p className="text-xs text-gray-600">
                    Exam Date: <span className="font-medium">{card.examDate}</span>
                  </p>
                </div>

                {/* Right side: button style */}
                <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg shadow text-sm">
                  View
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No admit cards found</p>
        )}
      </div>
    </div>
  );
};

export default AdmitCardPage;
