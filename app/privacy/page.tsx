/* eslint-disable react/no-unescaped-entities */
// app/privacy-policy/page.tsx
"use client"


export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Edverso ("we," "our," or "us"). We operate the edverso.in website 
                and the Edverso UGC Internship Learning Management System (LMS). We are committed 
                to protecting your personal information and your right to privacy.
              </p>
              <p className="text-gray-700">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our platform as a student enrolled in UGC-compliant 
                internship programs.
              </p>
            </section>

            {/* Information Collection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Full name, email address, phone number</li>
                <li>Educational details (college, course, year of study)</li>
                <li>University/College identification details</li>
                <li>Payment information (via secure payment gateways)</li>
                <li>Government ID proofs for verification</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Academic Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Course progress and completion data</li>
                <li>Assessment scores and performance metrics</li>
                <li>Assignment submissions and project work</li>
                <li>Certificate issuance records</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>IP address, browser type, device information</li>
                <li>Usage patterns and platform interaction data</li>
                <li>Login timestamps and session duration</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and maintain UGC-compliant internship services</li>
                <li>To process your ₹600 course registration fee</li>
                <li>To track academic progress and issue certificates</li>
                <li>To communicate important updates about your internship</li>
                <li>To comply with UGC reporting and verification requirements</li>
                <li>To improve our platform and user experience</li>
                <li>To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">With Educational Authorities</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>University Grants Commission (UGC) for compliance verification</li>
                <li>Your educational institution for academic coordination</li>
                <li>Government authorities as required by law</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">With Service Providers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Payment processors (Razorpay, Stripe, etc.)</li>
                <li>Cloud hosting and storage providers</li>
                <li>Email and communication service providers</li>
                <li>Analytics and performance monitoring tools</li>
              </ul>

              <p className="text-gray-700 mt-4">
                We never sell your personal information to third parties.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures 
                to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Data backup and disaster recovery procedures</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Data Protection Rights</h2>
              <p className="text-gray-700 mb-4">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Restrict or object to processing of your data</li>
                <li>Data portability to another service</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                <li>Provide our educational services</li>
                <li>Comply with UGC record-keeping requirements (minimum 5 years)</li>
                <li>Maintain academic and certification records</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-2">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@edverso.in</p>
                <p className="text-gray-700"><strong>Address:</strong> Edverso Educational Services, India</p>
                <p className="text-gray-700"><strong>Response Time:</strong> Within 7 working days</p>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. The updated version 
                will be indicated by an updated "Last updated" date. We encourage you to 
                review this privacy policy periodically.
              </p>
            </section>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Policy
          </button>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
  );
}