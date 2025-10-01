"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  CreditCard,
  Info,
  GraduationCap,
  BookOpen,
  Key,
  Phone,
  Bell,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { id: "/", label: "Home", icon: Home },
    { id: "/results", label: "Results", icon: FileText },
    { id: "/jobs", label: "Jobs", icon: Briefcase },
    { id: "/admit-card", label: "Admit Card", icon: CreditCard },
    { id: "/admission", label: "Admission", icon: GraduationCap },
    { id: "/notifications", label: "Notifications", icon: Bell },
    { id: "/syllabus", label: "Syllabus", icon: BookOpen },
    { id: "/answer-key", label: "Answer Key", icon: Key },
    { id: "/contact", label: "Contact", icon: Phone },
    { id: "/about", label: "About", icon: Info },
  ];

  const getCurrentPageTitle = () => {
    const page = navigation.find((nav) => nav.id === pathname);
    return page ? page.label : "Home";
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-white text-blue-800 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Government Results Hub</h1>
              <p className="text-blue-200 text-sm">
                Government Examination Results & Information
              </p>
            </div>
          </Link>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex border-t border-blue-700">
          <div className="flex flex-wrap">
            {navigation.map((nav) => {
              const Icon = nav.icon;
              const isActive =
                pathname === nav.id ||
                (nav.id !== "/" && pathname.startsWith(nav.id));

              return (
                <Link
                  key={nav.id}
                  href={nav.id}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors hover:bg-blue-700 ${
                    isActive ? "bg-blue-700 border-b-2 border-white" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{nav.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-blue-700 rounded-lg shadow-lg overflow-hidden animate-slide-down">
            {navigation.map((nav) => {
              const Icon = nav.icon;
              const isActive =
                pathname === nav.id ||
                (nav.id !== "/" && pathname.startsWith(nav.id));

              return (
                <Link
                  key={nav.id}
                  href={nav.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 w-full px-4 py-3 text-left text-white hover:bg-blue-600 transition-colors ${
                    isActive ? "bg-blue-600 font-semibold" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{nav.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
