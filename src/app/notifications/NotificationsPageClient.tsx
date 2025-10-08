"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, Calendar } from "lucide-react";

// --- START OF TYPESCRIPT FIX ---

interface Notification {
  id: string;
  title: string;
  publishedDate: string;
  // Note: Add other fields here if they exist in notificationsData.json
}

// --- END OF TYPESCRIPT FIX ---


const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Apply Notification interface to state
  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/notificationsData.json") // fetch from public folder
      .then((res) => res.json())
      // Cast fetched data
      .then((data: Notification[]) => setNotificationsData(data)) 
      .catch((err) => console.error(err));
  }, []);

  // --- FIX APPLIED HERE (Lines 32-37) ---
  const filteredNotifications = notificationsData
    .filter(notification => notification && notification.id) // Filter out items missing an 'id'
    .filter((notification) => {
      // Safely get the title, defaulting to an empty string if null/undefined.
      const titleToSearch = (notification?.title || "").toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      // Perform the inclusion check safely
      return titleToSearch.includes(searchLower);
    });
  // ----------------------------------------

  return (
    <div className="min-h-[80vh] bg-gray-50">
      {/* Header */}
      <div className="bg-purple-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-1">
            <Bell className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Notifications Portal</h1>
          </div>
          <p className="text-purple-200 text-sm">
            Stay updated with latest notifications & circulars
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-purple-800 mb-2 text-center">
            Notifications
          </h1>

          {/* Search */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by notification title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                                pl-8 text-sm"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <Link href={`/notifications/${notification.id}`} className="flex-1">
                  <h3 className="text-purple-700 font-semibold text-sm mb-1 hover:underline">
                    {notification.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Published: {notification.publishedDate}</span>
                  </div>
                </Link>

                <Link
                  href={`/notifications/${notification.id}`}
                  className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-xs font-medium"
                >
                  View Notification
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <h3 className="font-medium mb-1">No notifications found</h3>
              <p>Try searching with another keyword.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

