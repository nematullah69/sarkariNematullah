"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

// ---------------- INFO PAGE -------------------

export default function InfoPage() {
  return (
    <>
      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto p-6 leading-7">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
        Government Exam Info
        </h2>

        <p className="text-lg mb-4">
          Sarkari Result Info: Get the latest updates on Sarkari Results,
          Sarkari Job Find, Government Job Notifications, Employment News,
          Online Forms, Admit Card, Answer Keys, Cut Off, and Hindi Exam Info
          2025. Stay updated with genuine and fast job alerts.
        </p>

        <p className="bg-yellow-100 p-4 rounded font-semibold mb-6">
          Note: governmentexam.online is not affiliated with any Government Website.
          All information provided is for general awareness only.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-2">Q1. What is Sarkari Result 2025?</h2>
            <p>
              Sarkari Result is a free job alert platform where users get the
              latest updates like
              <a className="text-blue-600"> Government Jobs</a>,
              <a className="text-blue-600"> Sarkari Result</a>,
              <a className="text-blue-600"> Admit Card</a>,
              Answer Key, Exam Date, Cut Off, and Sarkari Yojana info.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">
              Q2. Why governmentexam.online is better?
            </h2>
            <p>
              We provide Govt Job Notifications, Admit Card, Results, Answer Key,
              Syllabus & Admission details faster than most job portals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Q3. How to Check Sarkari Result?</h2>
            <p>
              Go to the Sarkari Result section on governmentexam.online and click
              on the latest updates like Result, Cut Off, Merit List, etc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Q4. What Information is Available?</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Government Job Notifications</li>
              <li>Sarkari Result Updates</li>
              <li>Admit Cards</li>
              <li>Answer Keys & Cut Off</li>
              <li>Exam Dates & Syllabus</li>
              <li>Admissions & University Forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Q5. Why Trust This Website?</h2>
            <p>
              We provide verified information taken from official sources to help
              job seekers get accurate updates quickly.
            </p>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

// ---------------- FOOTER -------------------

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                  Latest Results
                </Link>
              </li>
              <li>
                <Link href="/admit-card" className="text-gray-300 hover:text-white transition-colors">
                  Download Admit Card
                </Link>
              </li>
              <li>
                <Link href="/answer-key" className="text-gray-300 hover:text-white transition-colors">
                  Answer Keys
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="text-gray-300 hover:text-white transition-colors">
                  Notification
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://ssc.nic.in" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                  SSC Official
                </a>
              </li>
              <li>
                <a href="https://upsc.gov.in" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                  UPSC Official
                </a>
              </li>
              <li>
                <a href="https://indianrailways.gov.in" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                  Railway Official
                </a>
              </li>
              <li>
                <a href="https://www.ibps.in" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                  Banking Exams
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 governmentexam.online. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
