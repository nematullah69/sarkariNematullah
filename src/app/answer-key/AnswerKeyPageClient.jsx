"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Key, Search, Calendar } from "lucide-react";

const AnswerKeyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [answerKeysData, setAnswerKeysData] = useState([]);

  useEffect(() => {
    fetch("/answerKeysData.json")
      .then((res) => res.json())
      .then((data) => setAnswerKeysData(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredAnswerKeys = answerKeysData.filter((key) =>
    key.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <div className="bg-red-800 text-white w-full py-6">
        <div className="w-full md:w-7/10 mx-auto px-4">
          <div className="flex items-center space-x-3 mb-2">
            <Key className="h-7 w-7" />
            <h1 className="text-2xl font-bold">Answer Keys Portal</h1>
          </div>
          <p className="text-red-200 text-sm">
            Download official answer keys for government examinations
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-7/10 mx-auto px-4 py-6">
        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by exam name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pl-9 text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Answer Keys List */}
        <div className="space-y-4">
          {filteredAnswerKeys.map((key) => (
            <Link
              key={key.id}
              href={`/answer-key/${key.id}`}
              className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-red-700 hover:underline">
                    {key.examName}
                  </h3>
                  <div className="flex items-center text-gray-600 text-xs mt-1">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>Release Date: {key.releaseDate}</span>
                  </div>
                </div>
                <span className="bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-700 transition-colors">
                  Check Answer Key
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnswerKeys.length === 0 && (
          <div className="text-center py-10">
            <Key className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <h3 className="text-base font-medium mb-1">No answer keys found</h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or check back later for new answer keys.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerKeyPage;
