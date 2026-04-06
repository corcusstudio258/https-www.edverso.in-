import PaymentPageClient from "@/components/pay/PaymentPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Payment - KIVT Internship LMS",
  description: "Secure payment gateway for internship registration fee. Complete your registration with ₹1000 payment.",
  keywords: "payment, registration fee, UGC internship, secure payment",
};

interface PayPageProps {
  searchParams: Promise<{ 
    studentId?: string;
    organizationRegNo?: string;
    email?: string;
    fullName?: string;
  }>;
}

export default async function PayPage({ searchParams }: PayPageProps) {
  // Await the searchParams promise
  const params = await searchParams;
  const { studentId, organizationRegNo, email, fullName } = params;

  if (!studentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="card shadow-2xl border-0">
            <div className="card-body p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Missing Information</h2>
              <p className="text-gray-600 mb-6">
                Student ID is required to proceed with payment. Please complete your registration first.
              </p>
              <a href="/register" className="btn btn-primary w-full py-3">
                Go to Registration
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PaymentPageClient 
    studentId={studentId} 
    organizationRegNo={organizationRegNo} 
    email={email} 
    fullName={fullName} 
  />;
}