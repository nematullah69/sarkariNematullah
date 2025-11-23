"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  publishedDate: string;
}

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || [];
        if (Array.isArray(data)) {
          // Data ko reverse kiya taaki Newest Upar aaye
          setNotificationsData(data.reverse());
        } else {
          setNotificationsData([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredNotifications = notificationsData
    .filter((n) => n && n.id)
    .filter((n) =>
      (n.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Notifications..."
              className="w-full p-3 pl-10 border border-gray-400 rounded shadow-sm focus:outline-none focus:border-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* --- MAIN CLASSIC UI CONTAINER --- */}
        <div className="border border-gray-400 bg-white shadow-md">
          
          {/* 👇 YAHAN CHANGE KIYA HAI: Red ko Green kar diya 👇 */}
          <div className="bg-green-800 py-2 border-b border-green-900">
            <h1 className="text-white text-center font-bold text-2xl tracking-wide">
              Notifications
            </h1>
          </div>

          {/* List Content */}
          <div className="p-6 md:p-8 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                {/* Loader ka color bhi match kar diya */}
                <Loader2 className="animate-spin text-green-800 h-8 w-8" />
              </div>
            ) : filteredNotifications.length > 0 ? (
              <ul className="list-disc pl-5 md:pl-10 space-y-4">
                {filteredNotifications.map((notification) => (
                  <li key={notification.id} className="pl-2">
                    <Link 
                      href={`/notifications/${notification.id}`} 
                      // Hover effect abhi bhi Red rakha hai classic look ke liye.
                      // Agar ise bhi Green karna ho to 'hover:text-[#FF0000]' ko 'hover:text-green-700' kar dena.
                      className="text-[#0000EE] text-lg md:text-xl font-medium hover:underline hover:text-[#FF0000] transition-colors"
                    >
                      {notification.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">No notifications found.</p>
            )}
          </div>
        </div>
        {/* --- END CLASSIC UI --- */}

      </div>
    </div>
  );
};

export default NotificationsPage;