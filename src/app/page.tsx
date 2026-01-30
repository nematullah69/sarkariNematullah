export const runtime = "nodejs";

import Link from "next/link";
import Script from "next/script";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { Calendar, FileText, CreditCard, Key, BookOpen, GraduationCap, TrendingUp, Clock, Bell, Users, Briefcase, Download, Award, CheckCircle } from 'lucide-react';

// Type definitions
interface PostItem {
  title: string;
  link: string;
  latest?: boolean;
  trend?: string;
  subtitle?: string;
  date?: string;
}

interface Category {
  title: string;
  link?: string;
  borderColor?: string;
  items: PostItem[];
}

interface HomeData {
  categories: Category[];
  latestPosts: any; // You can define a more specific type if needed
}

export const metadata = {
  title: "GovernmentExam.online: Latest Govt Jobs, Results, Admit Card & Syllabus",
  description:
    "GovernmentExam.online – Get latest govt jobs, results, admit cards, syllabus, answer keys and exam notifications. Trusted portal for all government examination updates.",
  keywords: [
    "Government Exam",
    "Government Job",
    "Latest Govt Job",
    "Sarkari Result",
    "Admit Card",
    "Syllabus",
    "Answer Key",
    "UPSC",
    "SSC",
    "Railway",
    "Banking",
    "Admission"
  ],
  alternates: {
    canonical: "https://www.governmentexam.online",
  },
  openGraph: {
    title: "GovernmentExam.online: Complete Guide to Govt Exams",
    description:
      "Latest Government Exam updates for jobs, results, admit cards, syllabus and answer keys for all competitive exams.",
    url: "https://governmentexam.online",
    type: "website",
  }
};

async function getHomeData(): Promise<HomeData> {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/13807508220c46402eb6dcc6629e1b86/raw/homePage', { 
    cache: "no-cache" 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const { categories, latestPosts } = await getHomeData();

  const IconMap = {
    FileText: FileText,
    TrendingUp: TrendingUp,
    CreditCard: CreditCard,
    Key: Key,
    BookOpen: BookOpen,
    GraduationCap: GraduationCap,
    Bell: Bell,
    Users: Users,
    Briefcase: Briefcase,
  };

  const BORDER_COLORS: Record<string, string> = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
  };

  const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
    "Latest Jobs": Briefcase,
    "Admit Cards": Download,
    "Results": Award,
    "Syllabus": BookOpen,
    "Answer Keys": Key,
    "Admissions": GraduationCap,
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.governmentexam.online" }
        ]}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "GovernmentExam.online",
            "url": "https://www.governmentexam.online",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.governmentexam.online/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
      </Script>

      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GovernmentExam.online",
          "url": "https://www.governmentexam.online",
          "logo": "https://www.governmentexam.online/logo.png",
          "sameAs": [
            "https://www.facebook.com/",
            "https://www.twitter.com/",
            "https://www.instagram.com/"
          ]
        }
        `}
      </Script>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        
      

        {/* Marquee Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-3 overflow-hidden">
          <div className="flex items-center max-w-7xl mx-auto px-4">
            <div className="bg-white text-amber-700 px-4 py-1.5 font-bold text-sm rounded-full mr-4 flex-shrink-0">
              🚨 BREAKING
            </div>
            <div className="marquee-container flex-1">
              <div className="marquee-content animate-marquee whitespace-nowrap">
                {categories.flatMap((post: Category) =>
                  post.items
                    .filter(item => item.latest)
                    .map((item) => (
                      <Link
                        key={item.link}
                        href={item.link}
                        className="inline-block mr-12 text-sm font-semibold text-white hover:text-gray-200 transition-colors"
                      >
                        🔥 {item.title}
                      </Link>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(CATEGORY_ICONS).map(([title, Icon]) => {
              const category = categories.find(cat => cat.title === title);
              if (!category) return null;
              
              const IconComponent = Icon;
              const borderColor = BORDER_COLORS[category.borderColor || 'blue'] || "border-blue-500";
              
              return (
                <Link key={title} href={category.link || "#"}>
                  <div className={`bg-white rounded-xl border-2 ${borderColor} p-6 text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-200`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600">{category.items?.length || 0} Updates</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Trending Updates */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 mr-3" />
              Trending Updates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.flatMap((post: Category) =>
                post.items
                  .filter(item => item.trend === 'true')
                  .slice(0, 8)
                  .map(i => (
                    <Link key={i.link} href={i.link}>
                      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start">
                          <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                            🔥
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm mb-1">{i.title}</h3>
                            {i.subtitle && (
                              <p className="text-xs text-gray-600">{i.subtitle}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>

          {/* Main Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category, index: number) => {
              const IconComponent = CATEGORY_ICONS[category.title] || FileText;
              const borderColor = BORDER_COLORS[category.borderColor || 'blue'] || "border-blue-500";
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border-2 ${borderColor} shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden`}
                >
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{category.items.length} updates available</p>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-gray-100">
                    {category.items.slice(0, 5).map((item: PostItem, idx: number) => (
                      <Link
                        key={idx}
                        href={item.link}
                        className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150 group"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {item.date}
                          </span>
                          <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View More Link */}
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <Link
                      href={category.link || "#"}
                      className="flex items-center justify-center gap-2 text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors"
                    >
                      View All {category.title}
                      <span className="text-blue-500">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Main Content Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                Complete Guide to Government Examinations
              </h1>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
                Welcome to <strong className="text-blue-600">GovernmentExam.online</strong> - your comprehensive platform for 
                all government examination needs. Get latest updates on jobs, results, admit cards, syllabus, 
                and answer keys for competitive exams like UPSC, SSC, Railway, Banking, and more.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Why Choose Us */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-3" />
                    Why Choose GovernmentExam.online?
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "Real-time updates on all government examinations",
                      "Comprehensive syllabus and exam patterns",
                      "Direct download links for admit cards",
                      "Latest job notifications and vacancy details",
                      "Exam preparation tips and strategies",
                      "Verified and accurate information"
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-800">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Exams */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                    <Award className="h-6 w-6 mr-3" />
                    Popular Government Exams
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "UPSC Civil Services", color: "bg-purple-100 text-purple-800" },
                      { name: "SSC CGL", color: "bg-blue-100 text-blue-800" },
                      { name: "Banking Exams", color: "bg-green-100 text-green-800" },
                      { name: "Railway Exams", color: "bg-orange-100 text-orange-800" },
                      { name: "Defense Exams", color: "bg-red-100 text-red-800" },
                      { name: "State PSC", color: "bg-yellow-100 text-yellow-800" },
                    ].map((exam, idx) => (
                      <span key={idx} className={`text-sm font-medium px-3 py-2 rounded-lg ${exam.color}`}>
                        {exam.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: "What is GovernmentExam.online?",
                    a: "GovernmentExam.online is a comprehensive platform providing latest updates on government examinations, including job notifications, results, admit cards, syllabus, answer keys, and exam preparation guidance."
                  },
                  {
                    q: "How frequently is the information updated?",
                    a: "We update our platform daily with the latest government job notifications, exam dates, results, and other important announcements to ensure you never miss any important update."
                  },
                  {
                    q: "Is GovernmentExam.online affiliated with government agencies?",
                    a: "No, GovernmentExam.online is an independent educational platform that aggregates and organizes information from official government sources to help exam aspirants. We are not affiliated with any government agency."
                  },
                  {
                    q: "How can I download admit cards?",
                    a: "You can download admit cards from the Admit Cards section. We provide direct links to official websites for easy and secure download of hall tickets for various examinations."
                  },
                  {
                    q: "Do you provide study materials?",
                    a: "Yes, we provide comprehensive syllabus, exam patterns, previous year papers, and preparation strategies for various government examinations to help you prepare effectively."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                        Q
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                        <div className="flex items-start mt-2">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                            A
                          </div>
                          <p className="text-gray-700">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-red-500 text-white p-2 rounded-lg mr-4">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg mb-2">Important Notice</h3>
                  <p className="text-red-700">
                    <strong>Disclaimer:</strong> GovernmentExam.online is not affiliated with any official government websites. 
                    The information provided here is for informational purposes only. Always verify details from respective 
                    official websites. We strive to provide accurate and timely information, but we do not guarantee 
                    completeness or accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

     
      </div>

      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is GovernmentExam.online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GovernmentExam.online is a comprehensive platform providing latest updates on government examinations, including job notifications, results, admit cards, syllabus, answer keys, and exam preparation guidance."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How frequently is the information updated?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We update our platform daily with the latest government job notifications, exam dates, results, and other important announcements to ensure you never miss any important update."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is GovernmentExam.online affiliated with government agencies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, GovernmentExam.online is an independent educational platform that aggregates and organizes information from official government sources to help exam aspirants. We are not affiliated with any government agency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I download admit cards?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can download admit cards from the Admit Cards section. We provide direct links to official websites for easy and secure download of hall tickets for various examinations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide study materials?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide comprehensive syllabus, exam patterns, previous year papers, and preparation strategies for various government examinations to help you prepare effectively."
                  }
                }
              ]
            }
        `}
      </Script>
    </>
  );
}