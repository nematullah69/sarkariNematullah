"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Local project ke liye Link best hai
import {
  Bell,
  Briefcase,
  FileText,
  GraduationCap,
  BookOpen,
  Search,
  Zap,
  Loader2,
  TrendingUp,
  ExternalLink,
  Home,
  LayoutGrid
} from "lucide-react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Data States
  const [jobs, setJobs] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [featuredBoxes, setFeaturedBoxes] = useState([]);
  const [marqueeData, setMarqueeData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchData("/api/jobs", setJobs),
        fetchData("/api/admitcards", setAdmitCards),
        fetchData("/api/results", setResults),
        fetchData("/api/notifications", setNotifications),
        fetchData("/api/syllabus", setSyllabus),
      ]);
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  // Data Fetching
  async function fetchData(url, setter) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (Array.isArray(data.data)) {
        finalData = data.data;
      }

      // Reverse to show newest first
      setter(finalData.reverse()); 
      
    } catch (err) {
      console.error("API Error:", url, err);
      setter([]);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      // Featured Boxes Setup
      const defaults = [
        { ...(jobs[0] || {}), type: "New Job", route: "/jobs", bg: "from-pink-600 to-rose-500", icon: <Briefcase /> },
        { ...(results[0] || {}), type: "Result Out", route: "/results", bg: "from-emerald-500 to-teal-600", icon: <GraduationCap /> },
        { ...(admitCards[0] || {}), type: "Admit Card", route: "/admit-card", bg: "from-violet-600 to-purple-600", icon: <FileText /> },
        { ...(jobs[1] || {}), type: "Recruitment", route: "/jobs", bg: "from-blue-500 to-indigo-600", icon: <TrendingUp /> },
        { ...(notifications[0] || {}), type: "Notice", route: "/notifications", bg: "from-amber-500 to-orange-600", icon: <Bell /> },
        { ...(results[1] || {}), type: "Score Card", route: "/results", bg: "from-cyan-500 to-blue-500", icon: <Zap /> },
      ];

      const mappedBoxes = defaults.map(item => {
        if (!item || (!item.title && !item.examName)) return null;
        return {
          id: item.id || 'N/A',
          title: item.title || item.examName,
          bg: item.bg,
          type: item.type,
          icon: item.icon,
          link: item.route
        };
      }).filter(Boolean);
      setFeaturedBoxes(mappedBoxes.slice(0, 6));

      // Marquee Data Setup
      const mixedData = [
        ...jobs.slice(0, 3).map(i => ({...i, link: "/jobs"})),
        ...results.slice(0, 3).map(i => ({...i, link: "/results"})),
        ...admitCards.slice(0, 3).map(i => ({...i, link: "/admit-card"}))
      ];
      setMarqueeData(mixedData);
    }
  }, [isLoading, jobs, admitCards, results, notifications]);

  const filterData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) =>
      (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.examName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20 md:pb-0">
      {/* Header Section */}
      <div className="bg-slate-900 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-20 -left-24 w-72 h-72 bg-pink-600 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 relative z-10">
          <nav className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">Governmentexam</span>
            </div>
          </nav>

          <div className="text-center max-w-2xl mx-auto mb-4">
            <div className="relative max-w-lg mx-auto">
              {/* Thinner Search Bar */}
              <div className="relative bg-white rounded-xl flex items-center p-1 shadow-xl">
                <Search className="h-4 w-4 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 text-sm text-slate-700 focus:outline-none font-medium rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* NEW: Mobile Quick Access Buttons (Phone Only) */}
            <div className="grid grid-cols-4 gap-2 mt-4 md:hidden max-w-lg mx-auto">
                <QuickHeaderBtn href="/" icon={<Home size={18} />} label="Home" color="bg-indigo-600" />
                <QuickHeaderBtn href="/jobs" icon={<Briefcase size={18} />} label="Jobs" color="bg-pink-600" />
                <QuickHeaderBtn href="/results" icon={<GraduationCap size={18} />} label="Result" color="bg-teal-600" />
                <QuickHeaderBtn href="/admit-card" icon={<FileText size={18} />} label="Admit" color="bg-violet-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 pb-12">
        
        {/* Marquee Section */}
        {!isLoading && marqueeData.length > 0 && (
          <div className="mb-6 bg-white border-l-4 border-blue-600 rounded-r-lg shadow-lg overflow-hidden py-3 relative flex items-center">
             <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 absolute left-0 z-10 uppercase tracking-wider shadow-md">
               Latest Updates
             </div>
             <MarqueeSection data={marqueeData} />
          </div>
        )}
        
        {/* Featured Boxes */}
        {!isLoading && featuredBoxes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {featuredBoxes.map((box, idx) => (
              <Link 
                href={`${box.link}/${box.id}`} 
                key={idx}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${box.bg} p-1 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block`}
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-between min-h-[110px]">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                      {box.type}
                    </span>
                    <ExternalLink className="h-4 w-4 text-white/70" />
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mt-2 drop-shadow-sm">
                    {box.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* --- MAIN 3-COLUMN LAYOUT --- */}
        {isLoading ? (
           <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600 h-10 w-10" /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-sans">
            
            {/* 1. Latest Jobs */}
            <ClassicColumn 
                title="Latest Jobs" 
                data={filterData(jobs)} 
                link="/jobs" 
                headerColor="bg-blue-700" 
                borderColor="border-blue-800"
            />

            {/* 2. Admit Card */}
            <ClassicColumn 
                title="Admit Card" 
                data={filterData(admitCards)} 
                link="/admit-card" 
                headerColor="bg-slate-800" 
                borderColor="border-slate-900"
            />

            {/* 3. Latest Result */}
            <ClassicColumn 
                title="Latest Result" 
                data={filterData(results)} 
                link="/results" 
                headerColor="bg-teal-700" 
                borderColor="border-teal-800"
            />

          </div>
        )}

        {/* --- SECONDARY SECTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 font-sans">
          
          {/* 4. Important Notices */}
          <ClassicColumn 
            title="Important Notices" 
            data={filterData(notifications)} 
            link="/notifications" 
            compact 
            headerColor="bg-green-700" 
            borderColor="border-green-800"
          />
          
          {/* 5. Syllabus */}
          <ClassicColumn 
            title="Syllabus & Keys" 
            data={filterData(syllabus)} 
            link="/syllabus" 
            compact 
            headerColor="bg-purple-700" 
            borderColor="border-purple-800"
          />

        </div>

      </div>

      {/* --- MOBILE BOTTOM NAVIGATION (Phone Response Only) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <MobileNavButton icon={<Home size={20} />} label="Home" href="/" active />
            <MobileNavButton icon={<Briefcase size={20} />} label="Jobs" href="/jobs" />
            <MobileNavButton icon={<GraduationCap size={20} />} label="Result" href="/results" />
            <MobileNavButton icon={<FileText size={20} />} label="Admit Card" href="/admit-card" />
        </div>
      </div>

    </div>
  );
}

// ------------------------------------
// HELPER COMPONENTS
// ------------------------------------

function QuickHeaderBtn({ href, icon, label, color }) {
    return (
        <Link href={href} className="flex flex-col items-center group">
            <div className={`${color} p-2 rounded-xl text-white shadow-md mb-1 active:scale-95 transition-transform`}>
                {icon}
            </div>
            <span className="text-[10px] font-semibold text-white/90 tracking-wide text-center leading-tight">
                {label}
            </span>
        </Link>
    )
}

function MobileNavButton({ icon, label, href, active = false }) {
    return (
        <Link href={href} className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-indigo-600 active:text-indigo-700 transition-colors">
            <div className={`${active ? "text-indigo-600" : ""}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-medium mt-1 ${active ? "text-indigo-600" : "text-slate-500"}`}>
                {label}
            </span>
        </Link>
    );
}

function MarqueeSection({ data }) {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full pl-28"> 
      <style jsx>{`
        @keyframes scrollText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          display: inline-block;
          animation: scrollText 30s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-content">
        {data.concat(data).map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <Link href={`${item.link}/${item.id}`} className="text-blue-700 font-bold text-sm hover:underline hover:text-red-600 px-2">
              {item.title || item.examName}
            </Link>
            <span className="text-red-600 font-black mx-2">||</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ClassicColumn({ title, data, link, compact, headerColor, borderColor }) {
  const bgClass = headerColor || "bg-[#990000]";
  const borderClass = borderColor || "border-red-900";

  return (
    <div className="border border-gray-400 bg-white flex flex-col h-full shadow-sm rounded-sm overflow-hidden">
      <div className={`${bgClass} text-white text-center font-bold text-xl py-2 border-b ${borderClass}`}>
        {title}
      </div>
      
      <div className="flex-1 p-4">
        {data && data.length > 0 ? (
          <ul className="list-disc pl-6 space-y-3">
            {data.slice(0, compact ? 5 : 10).map((item, i) => (
              <li key={i} className="text-[15px] leading-snug">
                <Link 
                  href={`${link}/${item.id}`} 
                  className="text-blue-700 underline hover:text-[#990000] transition-colors font-medium"
                >
                  {item.title || item.examName}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">No updates available</div>
        )}
      </div>
      <div className="bg-gray-50 p-2 text-right border-t border-gray-200">
        <Link href={link} className="text-sm font-bold text-blue-700 hover:underline hover:text-[#990000]">
          View More...
        </Link>
      </div>
    </div>
  );
}