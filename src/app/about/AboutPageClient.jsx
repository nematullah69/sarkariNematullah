"use client";

import { Target, Users, Shield, CheckCircle, Globe } from "lucide-react";

// app/about/page.tsx







const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "All data is encrypted and secured with industry-standard security protocols.",
    },
    {
      icon: CheckCircle,
      title: "Verified Information",
      description:
        "All results and information are verified directly from official sources.",
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description:
        "Comprehensive coverage of government examinations across India.",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description:
        "Simple and intuitive interface designed for all users.",
    },
  ];

  const stats = [
    { label: "Years of Service", value: "15+" },
    { label: "Results Published", value: "50K+" },
    { label: "Happy Users", value: "2M+" },
    { label: "Exam Categories", value: "200+" },
  ];

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">About SarkariResult Portal</h1>
          <p className="text-blue-200">Learn more about our mission and services</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SarkariResult Portal is dedicated to providing accurate, timely, and reliable information
              about government examination results, admit cards, and notifications. We strive to be the
              most trusted source for millions of aspirants across India, helping them achieve their
              career goals through easy access to examination information.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
              </div>
              <p className="font-medium text-gray-800">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Examination Results</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Latest government exam results</li>
                <li>• SSC, UPSC, Railway, Banking results</li>
                <li>• State government exam results</li>
                <li>• Engineering and medical entrance results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Admit card downloads</li>
                <li>• Answer key publications</li>
                <li>• Syllabus and exam patterns</li>
                <li>• Notification alerts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated team of professionals works around the clock to ensure you get the most
            accurate and up-to-date information. With years of experience in the education sector,
            we understand the importance of timely and reliable information for exam aspirants.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
