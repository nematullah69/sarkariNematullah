"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

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
                <Link href="/answer-keys" className="text-gray-300 hover:text-white transition-colors">
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
                <a href="https://ssc.nic.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  SSC Official
                </a>
              </li>
              <li>
                <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  UPSC Official
                </a>
              </li>
              <li>
                <a href="https://indianrailways.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Railway Official
                </a>
              </li>
              <li>
                <a href="https://www.ibps.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Banking Exams
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">nematull69@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+91-9472476058</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-blue-400 mt-1" />
                <div className="text-gray-300">
                  <p>Mon - Fri: 10:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SarkariResult Portal. All rights reserved.
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

export default Footer;
