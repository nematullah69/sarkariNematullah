"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Search, Filter, Building, ArrowRight } from "lucide-react";

const ResultsPage = () => {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  // Removed state for selectedOrganization and selectedYear

  // ✅ Fetch JSON data from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/resultsData.json");
        const data = await res.json();
        setResultsData(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Removed logic for extracting unique organizations & years

  // ✅ Filtering logic (MODIFIED: Only includes search term matching)
  const filteredResults = resultsData.filter((result) => {
    // Keeps the search logic with the necessary null/undefined checks
    const matchesSearch =
      (result.examName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (result.organization || "").toLowerCase().includes(searchTerm.toLowerCase());
      
    // The filter now only returns based on the search term
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Awaited":
        return "bg-yellow-100 text-yellow-800";
      case "Updated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Examination Results</h1>
          </div>
          <p className="text-blue-200">
            Check and download your examination results
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Only */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 gap-4"> 
            {/* The grid is now a single column */}
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by exam name or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Organization and Year filters REMOVED */}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredResults.length} of {resultsData.length} results
          </p>
        </div>

        {/* Results */}
        <div className="flex flex-col items-center gap-6">
          {filteredResults.map((result, index) => (
            <Link
              // Using a fallback for the key just in case 'result.id' is missing
              key={result.id || index} 
              href={`/results/${result.id}`}
              className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition block no-underline"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                    {result.examName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <p className="text-gray-600 text-xs">
                      {result.organization}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                      result.status
                    )}`}
                  >
                    {result.status}
                  </span>
                  <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs shadow">
                    View <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
        </div>

        {/* Empty State */}
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p>
                Try adjusting your search criteria or check back later for new
                results.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;