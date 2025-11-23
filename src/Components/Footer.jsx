"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Search, 
  FileText, 
  AlertTriangle,
  Info,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  RefreshCw
} from "lucide-react";

// ---------------- INFO PAGE -------------------

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER SECTION */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
           
           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
           Governmentexam <span className="text-blue-700">Info 2025</span>
           </h2>
           
           {/* Main Intro Paragraph from Image */}
           <p className="text-base text-slate-600 max-w-4xl mx-auto leading-relaxed border-l-4 border-blue-600 pl-4 text-left bg-blue-50 p-4 rounded-r-lg">
             governmentexam.online is not affiliated with any official government sites. The information provided is for general informational purposes only. Please verify with official notifications. <strong>governmentexam.online</strong>. Stay informed with timely announcements and important details on this portal.
           </p>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
       

        {/* Q&A Grid - Content Updated from Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Q1 */}
          <InfoCard 
            icon={<Info className="h-6 w-6 text-blue-600" />}
            title="Q1. What is Government Result 2025?"
          >
            Sarkari Result is a free job alert website, in which you can find the latest <span className="font-semibold text-blue-600">Government Jobs</span> notification, 
            <span className="font-semibold text-blue-600"> Sarkari Result</span>, 
            <span className="font-semibold text-blue-600"> Admit Card</span>, Answer Key, Cut off Marks, Exam Date, Sarkari Yojana and other updates.
          </InfoCard>

          {/* Q2 */}
          <InfoCard 
            icon={<Zap className="h-6 w-6 text-amber-500" />}
            title="Q2. Why governmentexam is better?"
          >
            <span className="font-bold text-slate-800">governmentexam.online</span> brings information of all Government Jobs and Sarkari Result before other job portals. 
            It also provides <span className="font-semibold text-blue-600">Admissions</span> related information faster than others.
          </InfoCard>

          {/* Q3 */}
          <InfoCard 
            icon={<Search className="h-6 w-6 text-emerald-600" />}
            title="Q3. How to Check Govt Jobs?"
          >
            Kindly visit our Government Results official page. Here you will get all the latest Government Jobs Notification as well as Sarkari Result, 
            Rojgar Result, Bharat Result, and Rojgar Samachar Link of the particular job.
          </InfoCard>

          {/* Q4 */}
          <InfoCard 
            icon={<RefreshCw className="h-6 w-6 text-purple-600" />}
            title="Q4. Updates on Daily Basis?"
          >
            <strong>Yes.</strong> The Sarkari Result Information is updated on a daily basis. Our team works hard to provide 
            the latest recruitment forms, admit cards, and results as soon as they are released by officials.
          </InfoCard>

          {/* Extra Card for Features (To balance grid) */}
          <InfoCard 
            icon={<FileText className="h-6 w-6 text-indigo-600" />}
            title="What Info is Available?"
          >
            <ul className="list-none space-y-1 mt-1">
              {["Latest Jobs", "Sarkari Result", "Admit Card", "Answer Key", "Syllabus", "Admission"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div> {item}
                </li>
              ))}
            </ul>
          </InfoCard>

           {/* Contact/Support */}
           <InfoCard 
            icon={<Mail className="h-6 w-6 text-rose-600" />}
            title="Need Help?"
          >
            If you find any discrepancy or need help regarding any post, feel free to contact us. 
            We verify and update information regularly to ensure the best user experience.
          </InfoCard>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

// Helper Component for Cards
function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
      <div className="text-slate-600 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
}

// ---------------- FOOTER -------------------

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white font-bold text-2xl">
              <div className="bg-blue-600 p-1.5 rounded">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>

              governmentexam

            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted partner for Government Job updates. We make your journey to a government job easier with timely alerts.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Access</h3>
            <ul className="space-y-2.5">
              <FooterLink href="/results" label="Latest Results" />
              <FooterLink href="/admit-card" label="Download Admit Card" />
              <FooterLink href="/answer-key" label="Answer Keys" />
              <FooterLink href="/syllabus" label="Syllabus" />
              <FooterLink href="/notifications" label="Job Notifications" />
            </ul>
          </div>

          {/* Official Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Official Portals</h3>
            <ul className="space-y-2.5">
              <ExternalFooterLink href="https://ssc.nic.in" label="SSC Official" />
              <ExternalFooterLink href="https://upsc.gov.in" label="UPSC Official" />
              <ExternalFooterLink href="https://indianrailways.gov.in" label="Indian Railways" />
              <ExternalFooterLink href="https://www.ibps.in" label="IBPS Banking" />
              <ExternalFooterLink href="https://epfindia.gov.in" label="EPFO India" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3 text-sm">
                 <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                 <span>New Delhi, India - 110025</span>
               </li>
               <li className="flex items-center gap-3 text-sm">
                 <Clock className="h-5 w-5 text-blue-500 shrink-0" />
                 <span>nematullah6895@gmail.com</span>
               </li>
               
               <li className="flex items-center gap-3 text-sm">
                 <Clock className="h-5 w-5 text-blue-500 shrink-0" />
                 <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
               </li>
             </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © 2025 governmentexam.online. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="text-slate-400 hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for Footer (Same as before)
function FooterLink({ href, label }) {
  return (
    <li>
      <Link href={href} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
        <span className="group-hover:translate-x-1 transition-transform">{label}</span>
      </Link>
    </li>
  );
}

function ExternalFooterLink({ href, label }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
         <div className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-500 transition-colors"></div>
         {label}
      </a>
    </li>
  );
}

function SocialIcon({ icon }) {
  return (
    <a href="#" className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
      {icon}
    </a>
  )
}