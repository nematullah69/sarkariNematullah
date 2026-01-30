export const runtime = "nodejs";

import Link from "next/link";
import Image from "next/image";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Latest Jobs", href: "/jobs" },
  { title: "Results", href: "/results" },
  { title: "Admit Card", href: "/admit-cards" },
  { title: "Answer Key", href: "/answer-keys" },
  { title: "Syllabus", href: "/syllabus" },
  { title: "Admission", href: "/admissions" },
];

export default function Header() {
  return (
    <header className="bg-indigo-900 shadow-lg border-b border-indigo-800">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group transition-transform hover:scale-[1.01]">
          <div className="relative overflow-hidden rounded-xl border-2 border-indigo-400/30 shadow-inner">
            <Image
              src="/gove.jpg"
              alt="Govt Exam Online"
              width={55}
              height={55}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
            Governmentexam
            </h1>
            <p className="text-xs sm:text-sm font-bold text-indigo-200 mt-1 uppercase tracking-widest">
              governmentexam.online
            </p>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] sm:text-[14px] font-bold text-indigo-50 hover:text-yellow-400 transition-all uppercase tracking-wide border-b-2 border-transparent hover:border-yellow-400 pb-0.5"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}