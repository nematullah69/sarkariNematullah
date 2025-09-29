"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+91-9472476058", "+91-9718876355"],
      description: "Mon-Fri: 10:00 AM - 6:00 PM",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["mdnematullah1020@gmail.com", "mdchandraj6895@gmail.com"],
      description: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "123 Government Plaza",
        "Connaught Place, New Delhi - 110001",
      ],
      description: "India",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 10:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
      ],
      description: "Sunday: Closed",
    },
  ];

  const faqs = [
    {
      question: "How can I download my result?",
      answer:
        "Go to the Results page, search for your examination, and click on the download link. You may need to enter your roll number and date of birth.",
    },
    {
      question: "When will the admit card be available?",
      answer:
        "Admit cards are usually released 10-15 days before the examination date. Check the official notification for exact dates.",
    },
    {
      question: "How to raise objection for answer key?",
      answer:
        'You can raise objections only for provisional answer keys within the specified time frame. Visit the Answer Key page and click on "Raise Objection".',
    },
    {
      question: "Is this website official?",
      answer:
        "We are an information portal that provides exam-related information from official sources. Always verify important information from official websites.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {info.title}
                        </h4>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-gray-600 text-sm mb-1"
                          >
                            {detail}
                          </p>
                        ))}
                        <p className="text-gray-500 text-xs">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                How to Reach Us
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    For Result Queries
                  </h4>
                  <p className="text-sm text-blue-700">
                    Visit the Results page and use the search function to find
                    your examination result. If you face any issues, call our
                    helpline during office hours.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    For Admit Card Issues
                  </h4>
                  <p className="text-sm text-green-700">
                    Use the official links provided on our Admit Card page. For
                    technical issues, contact the respective examination
                    authority directly.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    For General Information
                  </h4>
                  <p className="text-sm text-purple-700">
                    Check our Notifications page for the latest updates and
                    announcements. All official information is updated
                    regularly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Response Time
          </h3>
          <p className="text-blue-700">
            We typically respond to all inquiries within 24 hours during
            business days. For urgent matters, please call our support number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
