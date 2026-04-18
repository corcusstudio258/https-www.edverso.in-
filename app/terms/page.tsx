/* eslint-disable react/no-unescaped-entities */
// app/terms/page.tsx
"use client"

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Governing your use of Edverso UGC Internship Platform
          </p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              <strong>Important:</strong> By registering on Edverso, you agree to these terms and conditions. 
              Please read them carefully.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="prose prose-lg max-w-none">
            {/* Acceptance */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Edverso ("the Platform"), you accept and agree to be bound 
                by these Terms and Conditions. If you disagree with any part, you may not access 
                our platform.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Must be at least 16 years of age</li>
                <li>Must be currently enrolled in a recognized educational institution</li>
                <li>Must provide accurate educational and personal information</li>
                <li>Must have parental consent if under 18 years of age</li>
                <li>Must comply with UGC internship guidelines</li>
              </ul>
            </section>

            {/* Registration */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Registration and Account</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Account Creation</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>You must provide accurate and complete registration information</li>
                <li>You are responsible for maintaining account confidentiality</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>We reserve the right to disable accounts for violations</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Account Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>One account per student - multiple accounts are prohibited</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must keep your profile information updated</li>
              </ul>
            </section>

            {/* Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payments and Fees</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Course Fee</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Every course has time period and different curriculum so different cost. We just charge cost not fee. So, every course has different fee structure.</li>
                <li>Fee covers course access, mentorship, and certificate</li>
                <li>Payment is required before course access is granted</li>
                <li>All payments are processed through secure gateways</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Refund Policy</h3>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-red-800 font-medium">No Refund Policy</p>
                <p className="text-red-700 text-sm mt-1">
                  Once the payment is processed and course access is provided, fees are non-refundable. 
                  This is due to the immediate allocation of educational resources and UGC compliance requirements.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Payment Issues</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Failed payments may result in course access suspension</li>
                <li>Chargebacks will lead to immediate account termination</li>
                <li>Payment verification may take up to 24 hours</li>
              </ul>
            </section>

            {/* Course Requirements */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Course Completion & Certification</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Completion Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Complete all assigned course modules</li>
                <li>Submit all required assignments and projects</li>
                <li>Maintain minimum 60% score in assessments</li>
                <li>Complete course within the stipulated timeframe</li>
                <li>Adhere to academic integrity policies</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Certificate Issuance</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Digital certificate issued upon successful completion</li>
                <li>Certificates are UGC-compliant and verifiable</li>
                <li>Certificate includes student details and course information</li>
                <li>Replacement certificates may incur additional charges</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Certificate Validity</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Certificates are permanently valid</li>
                <li>Verification available through our platform</li>
                <li>Employers and institutions can verify authenticity</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Conduct and Prohibited Activities</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Academic Integrity</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>No plagiarism in assignments or projects</li>
                <li>No unauthorized collaboration during assessments</li>
                <li>No impersonation or identity fraud</li>
                <li>No sharing of assessment answers</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Platform Usage</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>No reverse engineering or hacking attempts</li>
                <li>No spamming or abusive behavior</li>
                <li>No unauthorized commercial use</li>
                <li>No distribution of malicious content</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Our Content</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>All course materials are proprietary to Edverso</li>
                <li>No unauthorized distribution of course content</li>
                <li>Platform design and code are protected by copyright</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Your Content</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You retain rights to your original assignment submissions</li>
                <li>You grant us license to use your work for educational purposes</li>
                <li>We may use anonymized data for platform improvement</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the platform for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violation of these terms and conditions</li>
                <li>Academic dishonesty or plagiarism</li>
                <li>Non-payment of fees</li>
                <li>Illegal or fraudulent activities</li>
                <li>Platform misuse or abuse</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <p className="text-orange-800 text-sm">
                  Edverso provides educational services and cannot guarantee employment outcomes, 
                  university admissions, or specific career advancements. Our liability is limited 
                  to the course fee paid.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            {/* Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of the platform 
                after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Platform:</strong> Edverso UGC Internship LMS</p>
                <p className="text-gray-700"><strong>Website:</strong> https://edverso.in</p>
                <p className="text-gray-700"><strong>Email:</strong> legal@edverso.in</p>
                <p className="text-gray-700"><strong>Grievance Officer:</strong> Available through contact form</p>
              </div>
            </section>
          </div>
        </div>

        {/* Acceptance Note */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <p className="text-blue-800 font-medium">
            By using Edverso, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}