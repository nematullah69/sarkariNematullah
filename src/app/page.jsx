'use client';

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Bell,
  Briefcase,
  GraduationCap,
  BookOpen,
  Key,
  Calendar,
  ArrowRight,
  Search,
  Home as HomeIcon,
} from "lucide-react";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // New ScrollingBanner Component
const ScrollingBanner = ({ items }) => {
  const totalContent = items.length;
  // Speed is based on content length for consistent scroll time
  const scrollSpeed = totalContent *1
  return (
    <div className="bg-orange-600 text-white py-2 overflow-hidden whitespace-nowrap">
      <style jsx>{`
        .scrolling-content {
          display: inline-block;
          padding-left: 100%; /* Start off-screen */
          animation: scroll-left var(--scroll-speed) linear infinite;
        }
        .scrolling-content:hover {
          animation-play-state: paused; /* Pause on hover */
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
      <div className="scrolling-content" style={{ '--scroll-speed': `${items.length * 5}s` }}>
        {items.map((item, index) => (
          <span key={index} className="mx-4 text-sm">
            <Link href={item.link} className="hover:underline">
              {item.text}
            </Link>
            {index < items.length - 1 && <span className="text-red-300 mx-2">||</span>}
          </span>
        ))}
        {/* Duplicate items to ensure continuous loop without a gap */}
        {items.map((item, index) => (
          <span key={`duplicate-${index}`} className="mx-4 text-sm">
            <Link href={item.link} className="hover:underline">
              {item.text}
            </Link>
            {index < items.length - 1 && <span className="text-red-300 mx-2">||</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

const bannerItems = [
  { text: "SSC Delhi Police Constable (Executive) Recruitment 2025", link: "https://governmentexam.online/jobs/ssc-delhi-police-constable-2025" },
  { text: "Meghalaya Police Result 2025 {OUT} Merit List PDF Download", link: "https://governmentexam.online/results/Meg-Police-2025-result" },
  { text: "RBI Officer Grade B Prelims 2025 Admid-card", link: "https://governmentexam.online/admit-card/rbi-gradeb-prelims-2025" },
  { text: "DSSSB Assistant Teacher (Primary) Recruitment 2025", link: "https://governmentexam.online/jobs/dsssb-prt-2025" },
  { text: "SSC CPO Paper 2 Result 2025 OUT", link: "https://governmentexam.online/results/ssc-CPO-2024-result" },
  { text: "MPESB Excise Constable Admit Card 2025", link: "https://governmentexam.online/admit-card/MPESB-EXC-2025" },
  { text: "CLAT 2026 Admission Online Form – Start", link: "https://governmentexam.online/admission/clat-2026" },

];

  const latestJobs = [
    { id: "ssc-delhi-police-constable-2025", title: "SSC Delhi Police Constable (Executive) Recruitment 2025", organization: "SSC", date: "22 September 2025" },
    { id: "dsssb-prt-2025", title: "DSSSB Assistant Teacher (Primary) Recruitment 2025", organization: "DSSSB", date: "10 Sep 2025" },
    { id: "bom-so-2025", title: "Bank of Maharashtra Specialist Officer (SO) Recruitment 2025", organization: "Bank of Maharashtra", date: "10 Sep 2025" },
    { id: "rvunl-technician-2025", title: "RVUNL Technician-III / Operator-III / Plant Attendant-III Recruitment 2025", organization: "RVUNL", date: "10 Sep 2025" },
    { id: "mpesb-group2-subgroup3-2025", title: "MPESB Group-2 Sub Group-3 Recruitment 2025", organization: "MPESB", date: "09 Sep 2025" },
    { id: "orissa-high-court-junior-stenographer-2025", title: "Orissa High Court Junior Stenographer Recruitment 2025", organization: "Orissa HC", date: "18 Sep 2025" },
    { id: "dsssb-group-b-c-2025", title: "DSSSB Group B & Group C Recruitment 2025 (615 Posts)", organization: "DSSSB", date: "31 Jul 2025" },
    { id: "army-afms-medical-officer-2025", title: "Army AFMS Medical Officer Recruitment 2025", organization: "Indian Army", date: "18 Sep 2025" },
    { id: "ib-security-assistant-mt-2025", title: "IB Security Assistant (Motor Transport) Recruitment 2025", organization: "IB", date: "31 Aug 2025" },
    { id: "rpsc-1st-grade-agriculture-teacher-2025", title: "RPSC 1st Grade Teacher (Agriculture) Recruitment 2025", organization: "RPSC", date: "28 Aug 2025" },
    { id: "hau-hisar-apprentice-2025", title: "HAU Hisar Apprentice Recruitment 2025", organization: "HAU", date: "01 Sep 2025" },
    { id: "ibps-clerk-csa-xv-2025", title: "IBPS Clerk (Customer Service Associate – CSA XV) Recruitment 2025", organization: "IBPS", date: "31 Jul 2025" },
    { id: "nhpc-non-executive-2025", title: "NHPC Non-Executive & Junior Engineer Recruitment 2025", organization: "NHPC", date: "19 Sep 2025" },
    { id: "beml-recruitment-2025", title: "BEML Recruitment 2025", organization: "BEML", date: "18 Sep 2025" },
    { id: "ibps-rrb-crp-rrbs-xiv-2025", title: "IBPS RRB Recruitment 2025 (CRP RRBs XIV)", organization: "IBPS", date: "31 Aug 2025" },
    { id: "naval-dockyard-mumbai-apprentice-2025", title: "Naval Dockyard Mumbai Apprentice Recruitment 2025", organization: "Indian Navy", date: "18 Aug 2025" },
    { id: "rrc-wcr-apprentice-2025", title: "RRC WCR Apprentice Recruitment 2025", organization: "WCR", date: "20 Aug 2025" },
    { id: "wbssc-group-c-d-non-teaching-2025", title: "WBSSC Group C, D 2025", organization: "WBSSC", date: "16 Sep 2025" },
    { id: "iocl-pipelines-apprentice-2025", title: "IOCL Pipelines Division Apprentice 2025", organization: "IOCL", date: "29 Aug 2025" },
    { id: "dsssb-delhi-hc-attendant-2025", title: "DSSSB Delhi High Court Attendant 2025", organization: "DSSSB", date: "26 Aug 2025" },
    { id: "rcfl-apprentice-2025", title: "RCFL Apprentice 2025", organization: "RCFL", date: "29 Aug 2025" },
    { id: "hpsc-assistant-environment-engineer-2025", title: "HPSC Assistant Environment Engineer 2025", organization: "HPSC", date: "21 Aug 2025" },
    { id: "isro-nrsc-apprentice-2025", title: "ISRO NRSC Apprentice 2025", organization: "ISRO", date: "22 Aug 2025" },
    { id: "hkrn-various-posts-2025", title: "HKRN Various Posts 2025", organization: "HKRN", date: "12 Aug 2025" }
  ];

  const latestResults = [
    { id: "Meg-Police-2025-result", title: "Meghalaya Police Result 2025 {OUT} Merit List PDF Download", organization: "SLPRB", date: "22 October 2025" },
    { id: "ssc-CPO-2024-result", title: "SSC CPO Paper 2 Result 2025 OUT", organization: "SSC", date: "08 August 2025" },
    { id: "ssc-SG-2024-result", title: "SSC Stenographer Grade C, D Result 2025", organization: "SSC", date: "05 March 2025" },
    { id: "ssc-GD-2024-result", title: "SSC GD Constable Result 2025", organization: "SSC", date: "17 June 2025" },
    { id: "ssc-JE-2024-result", title: "SSC Junior Engineer JE 2024 Final Result", organization: "SSC", date: "03 February 2024" },
    { id: "rssb-2024-jail-result", title: "Rajasthan RSSB Jail Prahari Result 2025 Out", organization: "Rajasthan RSSB", date: "30 August 2025" },
    { id: "CBSE-2025-jail-result", title: "CBSE Junior Assistant Result 2025", organization: "CBSE", date: "29 August 2025" },
    { id: "NEET-2025-PG-result", title: "National Eligibility cum Entrance Test – Postgraduate (NEET PG) 2025", organization: "NBE", date: "19 August 2025" },
    { id: "SBI-2025-1st-result", title: "SBI Clerk 1st Waiting List 2025 {OUT} PDF Download", organization: "SBI", date: "05 September 2025" },
    { id: "SHO-2025-1st-result", title: "Bihar SHSB CHO Result 2025 OUT", organization: "NHM Bihar", date: "09 August 2025" },
    { id: "RSMSSB-2025-1st-result", title: "Rajasthan RSMSSB Animal Attendant Result 2025", organization: "RSMSSB", date: "07 August 2025" },
    { id: "HSSC-CET-2025-result", title: "HSSC CET Result 2025", organization: "HSSC", date: "Out Soon" },
    { id: "NBL-Clerk", title: "Nainital Bank Clerk Result", organization: "Nainital Bank", date: "01 February 2025" },
    { id: "RCet-2025", title: "Rajasthan CET 12th Level Result 2025 OUT, Score Card Download", organization: "Rajasthan Board", date: "17 February 2025" },
    { id: "bsedc-2025-result", title: "BELTRON DEO Result 2025 Declared: Check Cut-Off Marks & Download Scorecard at bsedc.bihar.gov.in", organization: "BSEDC", date: "17 April 2025 (Tentative)" },
    { id: "rvnul-2025", title: "RVUNL JE & Chemist Result 2025 – Download Scorecard", organization: "RVUNL", date: "19 April 2025" },
    { id: "RRB-NTPC", title: "RRB NTPC Graduate Level Result 2025", organization: "RRB", date: "September 2025 (Expected)" },
    { id: "RRB-JE", title: "RRB JE CBT 2 Result 2025", organization: "RRB", date: "02 June 2025" },
    { id: "RRB-ALP", title: "RRB ALP Tier 2 Result 2025", organization: "RRB", date: "01 July 2025" },
    { id: "upsc-cse-2025-result", title: "UPSC ESIC Nursing Officer Final Result 2025", organization: "UPSC", date: "16 July 2025" },
    { id: "SSC-HPR-2024-result", title: "UPSSSC Homoeopathic Pharmacist Result 202", organization: "UPSSSC", date: "02 September 2025" },
  ];

  const latestAdmitCards = [
    {id: "rbi-gradeb-prelims-2025", title: "RBI Officer Grade B Prelims 2025 Admid-card", organization: "Reserve Bank of India (RBI)", date: "12 October 2025"},
    { id: "upsc-pre-2025", title: "UPSC Civil Services Preliminary Exam 2025", organization: "UPSC", date: "01 May 2025" },
    { id: "IB-ACIO-2025", title: "IB ACIO Admit Card 2025", organization: "Intelligence Bureau", date: "3-4 Days Before Exam" },
    { id: "CHD-JBT-2025", title: "Chandigarh JBT Teacher Admit Card 2025", organization: "Chandigarh Education Dept", date: "30 September 2025" },
    { id: "MPESB-EXC-2025", title: "MPESB Excise Constable Admit Card 2025", organization: "MPESB", date: "04 September 2025" },
    { id: "BPSC-71-CCE-2025", title: "BPSC 71st CCE Prelims Admit Card 2025", organization: "BPSC", date: "06 September 2025" },
    { id: "SBI-PO-2025", title: "SBI PO Admit Card 2025", organization: "SBI", date: "04 September 2025" },
    { id: "SSC-CGL-2025", title: "SSC CGL Admit Card 2025", organization: "SSC", date: "09 September 2025" },
    { id: "SBI-Clerk-2025", title: "SBI Clerk Admit Card 2025", organization: "SBI", date: "02 September 2025" },
    { id: "NMDC-WC-2025", title: "NMDC Workmen Cadre Admit Card 2025", organization: "NMDC", date: "30 August 2025" },
    { id: "UPSSSC-PET-2025", title: "UPSSSC PET Admit Card 2025", organization: "UPSSSC", date: "01 September 2025" },
    { id: "SIDBI-GRADE-A-B-2025", title: "SIDBI Grade A & B Admit Card 2025", organization: "SIDBI", date: "29 August 2025" },
    { id: "PFRDA-GRADE-A-2025", title: "PFRDA Assistant Manager Admit Card 2025", organization: "PFRDA", date: "26 August 2025" },
    { id: "SSC-SELECTION-POST-PHASE-13-2025", title: "SSC Selection Post Phase 13 Admit Card 2025", organization: "SSC", date: "26 August 2025" },
    { id: "RSSB-GROUP-D-2025", title: "RSSB Group D Admit Card 2025", organization: "RSSB", date: "September 2025" },
    { id: "BSCB-CLERK-2025", title: "BSCB Clerk Admit Card 2025", organization: "BSCB", date: "21 August 2025" },
    { id: "INDIAN-NAVY-CIVILIAN-2025", title: "Indian Navy Civilian Admit Card 2025", organization: "Indian Navy", date: "21 August 2025" },
    { id: "BPSSC-ENFORCEMENT-SI-2025", title: "BPSSC Enforcement SI Admit Card 2025", organization: "BPSSC", date: "22 August 2025" },
    { id: "WBSSC-ASSISTANT-TEACHER-2025", title: "WBSSC Assistant Teacher Admit Card 2025", organization: "WBSSC", date: "15 August 2025" },
    { id: "IBPS-PO-2025", title: "IBPS PO Admit Card 2025", organization: "IBPS", date: "14 August 2025" },
    { id: "UPSC-CSE-2025", title: "UPSC Civil Services Admit Card 2025", organization: "UPSC", date: "13 May 2025" },
    { id: "IBPS-HINDI-OFFICER-2025", title: "IBPS Hindi Officer Admit Card 2025", organization: "IBPS", date: "11 August 2025" }
  ];

  const latestNotifications = [
    {
      "id": "ssc-cgl-2024",
      "title": "SSC CGL 2024 Recruitment Notification",
      "organization": "Staff Selection Commission (SSC)",
      "date": "24 June 2024",
      "status": "Active"
    },
    {
      "id": "upsc-cse-2024",
      "title": "UPSC Civil Services Examination 2024",
      "organization": "Union Public Service Commission (UPSC)",
      "date": "14 February 2024",
      "status": "Completed"
    },
    {
      "id": "ibps-po-xiv",
      "title": "IBPS PO XIV Recruitment 2024",
      "organization": "Institute of Banking Personnel Selection (IBPS)",
      "date": "August 2024 (Expected)",
      "status": "Upcoming"
    },
    {
      "id": "cds-ii-2024",
      "title": "UPSC CDS II 2024 Notification",
      "organization": "Union Public Service Commission (UPSC)",
      "date": "15 May 2024",
      "status": "Active"
    },
    {
      "id": "neet-ug-2024",
      "title": "NEET UG 2024",
      "organization": "National Testing Agency (NTA)",
      "date": "09 February 2024",
      "status": "Completed"
    }
  ];

  const latestAdmissions = [
    { id: "ofss-bihar-11th-2025", title: "OFSS Bihar 11th Intermediate Admission 2025-27 – Re-Open", organization: "OFSS, Bihar", date: "03 May 2025" },
    { id: "bihar-iti-cat-2025", title: "Bihar ITI CAT 2025 Offline Mop-Up Counselling – Date Extended", organization: "BCECEB", date: "24 May 2025" },
    { id: "bcece-mop-up-2025", title: "BCECE Online Mop-up Counselling 2025", organization: "BCECEB", date: "18 May 2025" },
    { id: "iit-gate-2026", title: "IIT GATE 2026 Admission Online Form – Start", organization: "GATE Committee", date: "28 September 2025" },
    { id: "iim-cat-2025", title: "IIM CAT 2025 Admission Online Form", organization: "CAT Committee", date: "13 September 2025" },
    { id: "clat-2026", title: "CLAT 2026 Admission Online Form – Start", organization: "Consortium of NLUs", date: "31 October 2025" },
    { id: "up-bed-jee-2025", title: "UP B.Ed JEE Online Counseling 2025", organization: "UP B.Ed JEE", date: "25 March 2025" }
  ];

  const latestSyllabus = [
    { id: "upsc-cbi-assistant-programmer-2024", title: "UPSC CBI Assistant Programmer Online Form 2024", organization: "UPSC", year: "2024" },
    { id: "ssc-cgl-2025", title: "SSC CGL 2025 Syllabus", organization: "SSC", year: "2025" },
    { id: "ibps-po-2024", title: "IBPS PO 2024 Syllabus", organization: "IBPS", year: "2024" },
    { id: "upsc-ias-2025", title: "UPSC Civil Services 2025 Syllabus", organization: "UPSC", year: "2025" },
    { id: "cat-2024", title: "CAT 2024 Syllabus", organization: "IIM", year: "2024" },
    { id: "neet-ug-2025", title: "NEET UG 2025 Syllabus", organization: "NTA", year: "2025" }
  ];

  const answerKeys = [
    { id: "upsssc-pet-2025", title: "UPSSSC PET Answer Key 2025", organization: "UPSSSC", date: "09 September 2025" },
    { id: "rajasthan-patwari-2025", title: "Rajasthan RSSB Patwari Answer Key 2025", organization: "Rajasthan RSSB", date: "05 September 2025" },
    { id: "ssc-stenographer-2025", title: "SSC Stenographer Grade C, D Answer Key 2025", organization: "SSC", date: "22 August 2025" },
    { id: "dfccil-2025", title: "DFCCIL Answer Key 2025", organization: "DFCCIL", date: "18 July 2025" },
    { id: "mpesb-nursing-2025", title: "MPESB BSc, MSc Nursing Answer Key 2025", organization: "MPESB", date: "02 July 2025" },
    { id: "rrb-ntpc-2025", title: "RRB NTPC Graduate Level Answer Key 2025", organization: "RRB", date: "01 July 2025" },
    { id: "rpsc-ras-2025", title: "RPSC RAS Answer Key 2025", organization: "RPSC", date: "03 February 2025" },
    { id: "haryana-cet-groupd-2023", title: "Haryana CET Group D Answer Key 2023", organization: "HSSC Haryana", date: "10 November 2023" }
  ];

  const filterData = (data) =>
    data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Quick Links for Mobile Only
  const quickLinks = [
    { name: "Home", icon: <HomeIcon className="h-4 w-4 mr-1" />, link: "/" },
    { name: "Jobs", icon: <Briefcase className="h-4 w-4 mr-1" />, link: "/jobs" },
    { name: "Admit Card", icon: <CreditCard className="h-4 w-4 mr-1" />, link: "/admit-card" },
    { name: "Results", icon: <FileText className="h-4 w-4 mr-1" />, link: "/results" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-2 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Government Exam</h1>
          <p className="text-sm text-blue-100 max-w-xl mx-auto mb-2">
            Your comprehensive destination for government exam results, admit cards, notifications & job opportunities
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-3">
            <input
              type="text"
              placeholder="Search any exam, job, admit card..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-9 rounded text-gray-800 bg-white focus:ring-1 focus:ring-yellow-400 focus:outline-none text-sm"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          {/* Quick Links Mobile Only */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2 md:hidden">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                className="flex items-center px-2 py-1 bg-white rounded shadow text-blue-600 text-xs whitespace-nowrap"
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

            {/* Scrolling Banner */}
            <ScrollingBanner items={bannerItems} />

      {/* Sections */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-5 ">
          <Section title="Latest Jobs" icon={<Briefcase className="h-5 w-5 mr-2 text-purple-600" />} link="/jobs" data={filterData(latestJobs)} buttonColor="bg-purple-600 hover:bg-purple-700" buttonText="Apply" />
          <Section title="Latest Results" icon={<FileText className="h-5 w-5 mr-2 text-blue-600" />} link="/results" data={filterData(latestResults)} buttonColor="bg-blue-600 hover:bg-blue-700" buttonText="Result" />
          <Section title="Latest Admit Cards" icon={<CreditCard className="h-5 w-5 mr-2 text-green-600" />} link="/admit-card" data={filterData(latestAdmitCards)} buttonColor="bg-green-600 hover:bg-green-700" buttonText="Admit" />
          <Section title="Latest Admissions" icon={<GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />} link="/admission" data={filterData(latestAdmissions)} buttonColor="bg-indigo-600 hover:bg-indigo-700" buttonText="Details" />
          <Section title="Latest Syllabus" icon={<BookOpen className="h-5 w-5 mr-2 text-teal-600" />} link="/syllabus" data={filterData(latestSyllabus)} isSyllabus buttonColor="bg-teal-600 hover:bg-teal-700" buttonText="Syllabus" />
          <Section title="Answer Keys" icon={<Key className="h-5 w-5 mr-2 text-red-600" />} link="/answer-key" data={filterData(answerKeys)} buttonColor="bg-red-600 hover:bg-red-700" buttonText="Answer" />
          <Section title="Latest Notifications" icon={<Bell className="h-5 w-5 mr-2 text-yellow-600" />} link="/notifications" data={filterData(latestNotifications)} buttonColor="bg-yellow-600 hover:bg-yellow-700" buttonText="Notice" />
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, icon, link, data, isSyllabus, buttonColor, buttonText }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll ? data : data.slice(0, 4);

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full sm:w-[47%] lg:w-[30%]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          {icon}
          {title}
        </h2>
        <Link href={link} className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center">
          View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>
      <div className="space-y-2.5">
        {visibleData.length > 0 ? (
          visibleData.map((item) => (
            <Link
              key={item.id}
              href={`${link}/${item.id}`}
              className="block border-l-4 border-blue-500 pl-3 py-2 hover:bg-gray-50 transition-colors rounded group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-0.5 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-0.5">{item.organization}</p>
                  <div className="flex items-center text-[11px] text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {isSyllabus ? `Year: ${item.year}` : item.date}
                  </div>
                </div>
                <span
                  className={`${buttonColor} text-white text-[11px] font-medium px-2.5 py-0.5 rounded self-start`}
                >
                  {buttonText}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-xs">No records found.</p>
        )}
      </div>

      {/* See More / See Less */}
      {data.length > 4 && (
        <div className="w-full text-center mt-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

