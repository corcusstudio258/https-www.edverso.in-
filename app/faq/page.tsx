/* eslint-disable react/no-unescaped-entities */
// app/faq/page.tsx
"use client"


export default function FAQPage() {
  const faqData = [
    {
      category: "Registration & Payment",
      questions: [
        {
          question: "How long does the registration process take?",
          answer: "Our registration process is incredibly simple and takes just 1 minute to complete. You'll be ready to start your internship immediately after registration."
        },
        {
          question: "What documents are required for registration?",
          answer: "No documents are required during registration. We only need basic information like your personal details, educational background, and emergency contact information."
        },
        {
          question: "Is there any fee beyond the ₹1000 course fee?",
          answer: "Every course has time period and different curriculum so different cost. We just charge cost not fee. So, every course has different fee structure."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We offer multiple convenient payment options: Razorpay integration for online payments, any UPI method, all major credit/debit cards, or cash payment at our registered office for those who prefer offline payment."
        }
      ]
    },
    {
      category: "Internship Program",
      questions: [
        {
          question: "What is the duration of the internship program?",
          answer: "Semester IV students must  have to undergo 30 hours Health care and wellness or Community development project as per NEP 2020."
        },
        {
          question: "What topics are available for internships?",
          answer: "What are the topics  students have to select Healthcare and wellness, Community development (Financial literacy)."
        },
        {
          question: "Are there any prerequisites for joining?",
          answer: "No prerequisites are required! Our internships are designed for students at all levels. Whether you're a beginner or have some experience, you can enroll and benefit from our programs."
        },
        {
          question: "Can I change my internship program after starting?",
          answer: "Yes, we provide the flexibility to change your internship program. Contact our support team, and they'll guide you through the process smoothly."
        }
      ]
    },
    {
      category: "Course & Learning",
      questions: [
        {
          question: "What type of study materials are provided?",
          answer: "We provide comprehensive learning materials in both online and offline formats. You'll get access to detailed PDFs, PowerPoint presentations, and additional resources to support your learning journey."
        },
        {
          question: "Is mentor support available?",
          answer: "Yes! You can call our dedicated mentor support anytime at 9341041274. Our team is available 24/7 to assist with any questions or challenges you face during your internship."
        },
        {
          question: "What is the daily time commitment required?",
          answer: "We recommend dedicating approximately 4 hours per day to complete the 120-hour internship within 30 days. However, you can learn at your own pace within the program duration."
        },
        {
          question: "Can I access the course on mobile?",
          answer: "Absolutely! Our platform is fully mobile-responsive. You can access all course materials, submit assignments, and take assessments from your smartphone or tablet."
        }
      ]
    },
    {
      category: "Assessment & Certification",
      questions: [
        {
          question: "What type of assessments are conducted?",
          answer: "We conduct Multiple Choice Question (MCQ) based assessments that are designed to test your understanding of the course material effectively."
        },
        {
          question: "What is the passing criteria for certification?",
          answer: "You need to score at least 60% in the assessment to successfully pass and receive your UGC-compliant internship certificate."
        },
        {
          question: "How long does it take to receive the certificate?",
          answer: "There's no delay! Your certificate is auto-generated and available for download immediately after you successfully complete the assessment with a passing score."
        },
        {
          question: "Is the certificate UGC-compliant?",
          answer: "Yes, all our certificates are UGC-compliant and follow all the guidelines set by the University Grants Commission. They are widely recognized by educational institutions and employers."
        }
      ]
    },
    {
      category: "Technical Support & Access",
      questions: [
        {
          question: "What if I face technical issues during exams?",
          answer: "Don't worry! You can call our technical support immediately at 9341041274. Our team is available 24/7 to resolve any technical issues you encounter during assessments."
        },
        {
          question: "What are your support hours?",
          answer: "We provide 24/7 support. You can reach out to us anytime, day or night, and our team will be available to assist you with any queries or issues."
        },
        {
          question: "Is there a mobile app available?",
          answer: "You can access our complete platform through mobile browsers. Our website is fully optimized for mobile devices, providing the same seamless experience as on desktop."
        }
      ]
    },
    {
      category: "Career Benefits & Recognition",
      questions: [
        {
          question: "How does this internship help in career development?",
          answer: "Our internships provide comprehensive talent development across every field. You gain hands-on experience, practical learning, and skills that are highly valued by employers, giving you a significant career advantage."
        },
        {
          question: "Do you provide placement assistance?",
          answer: "Yes, we offer placement assistance to help you kickstart your career after completing the internship. Our network of industry partners provides excellent opportunities for our students."
        },
        {
          question: "Do universities accept these certificates?",
          answer: "Yes, universities and educational institutions widely accept our UGC-compliant certificates for academic credit and co-curricular activities recognition."
        },
        {
          question: "Are there industry partnerships?",
          answer: "We have established partnerships with more than 10 leading industry organizations, ensuring that our curriculum remains relevant and our students get exposure to real-world requirements."
        }
      ]
    },
    {
      category: "General Questions",
      questions: [
        {
          question: "What makes Edverso different from other platforms?",
          answer: "Edverso stands out with its nice interface, advanced software technology, high-quality study materials, and easy-to-navigate platform. Our 1-minute registration process and immediate certificate generation make us the preferred choice for students."
        },
        {
          question: "Do you offer group discounts or institutional partnerships?",
          answer: "Yes! We offer special WhatsApp group coordination for institutional partnerships and group enrollments. Contact us to discuss customized solutions for your college or student group."
        },
        {
          question: "Is the internship recognized by UGC?",
          answer: "Yes, our internship programs are fully compliant with UGC guidelines and are recognized by educational bodies. We follow all the rules and regulations set by the University Grants Commission."
        },
        {
          question: "What if I need additional help during my internship?",
          answer: "We're always here to help! You can call our 24/7 support line at 9341041274, join our WhatsApp groups for peer support, or use the in-platform messaging system to get immediate assistance."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Find quick answers to common questions about Edverso UGC Internship Programs
          </p>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <section key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {category.category}
                </h2>
              </div>
              
              {/* Questions */}
              <div className="divide-y divide-gray-100">
                {category.questions.map((item, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              We're here to help you succeed in your internship journey
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us Directly</h3>
                <p className="text-blue-600 font-medium text-lg">9341041274</p>
                <p className="text-gray-600 text-sm mt-1">24/7 Available</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Groups</h3>
                <p className="text-green-600 font-medium">Join for Quick Help</p>
                <p className="text-gray-600 text-sm mt-1">Peer & Mentor Support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Contact Support Team
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Start Your Internship Today
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-blue-600">1 Min</div>
            <div className="text-gray-600 text-sm">Registration</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-green-600">₹1000</div>
            <div className="text-gray-600 text-sm">All Inclusive</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600 text-sm">Support</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-2xl font-bold text-orange-600">Instant</div>
            <div className="text-gray-600 text-sm">Certificate</div>
          </div>
        </div>
      </div>
    </div>
  );
}