import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Info Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/syllabus" className="text-gray-400 hover:text-white">Syllabus</a></li>
              <li><a href="/answer-keys" className="text-gray-400 hover:text-white">Answer Keys</a></li>
              <li><a href="/jobs" className="text-gray-400 hover:text-white">Latest Government Jobs</a></li>
              <li><a href="/results" className="text-gray-400 hover:text-white">Results</a></li>
              <li><a href="/admissions" className="text-gray-400 hover:text-white">Admissions</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Telegram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">WhatsApp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
            </ul>
          </div>

          {/* Exam Categories */}
          <div>
            <h3 className="font-bold text-lg mb-3">Popular Exams</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/ssc" className="text-gray-400 hover:text-white">SSC</a></li>
              <li><a href="/upsc" className="text-gray-400 hover:text-white">UPSC</a></li>
              <li><a href="/railway" className="text-gray-400 hover:text-white">Railway</a></li>
              <li><a href="/banking" className="text-gray-400 hover:text-white">Banking</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">About Website</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              GovernmentExam.online provides latest government job updates,
              exam results, admit cards, answer keys, and syllabus information
              collected from official sources.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>
            © {currentYear} <strong>GovernmentExam.online</strong> — All Rights Reserved
          </p>
          <p className="text-xs mt-2">
            Disclaimer: This website is not affiliated with any government organization.
            Information provided here is for reference only. Always verify details from
            official websites.
          </p>
        </div>
      </div>
    </footer>
  );
}
