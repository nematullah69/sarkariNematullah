"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, GraduationCap } from "lucide-react";

const AdmissionPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/admissionsData.json")
      .then((res) => res.json())
      .then((data) => setAdmissions(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredAdmissions = admissions.filter((admission) =>
    admission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[80vh] bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-1">
            <GraduationCap className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Admission Portal</h1>
          </div>
          <p className="text-indigo-200 text-sm">
            Latest admission opportunities in universities & colleges
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-indigo-800 mb-2 text-center">
            Admission Portal
          </h1>

          {/* Search */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by admission name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                           pl-8 text-sm"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Admissions List */}
          <div className="space-y-4">
            {filteredAdmissions.map((admission) => (
              <div
                key={admission.id}
                className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <Link href={`/admission/${admission.id}`} className="flex-1">
                  <h3 className="text-indigo-700 font-semibold text-sm mb-1 hover:underline">
                    {admission.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Last Date: {admission.applicationEnd}</span>
                  </div>
                </Link>

                <Link
                  href={`/admission/${admission.id}`}
                  className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-xs font-medium"
                >
                  Apply Admission
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAdmissions.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <h3 className="font-medium mb-1">No admissions found</h3>
              <p>Try searching with another keyword.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;
