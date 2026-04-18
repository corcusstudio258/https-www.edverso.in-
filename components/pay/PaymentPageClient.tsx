"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaymentCheckout from "./PaymentCheckout";
import toast from "react-hot-toast";
import { COURSE_AMOUNT_INR } from "@/lib/payment-constants";

interface PaymentPageClientProps {
  studentId: string;
  organizationRegNo?: string;
  email?: string;
  fullName?: string;
}

export default function PaymentPageClient({
  studentId,
  organizationRegNo,
  email,
  fullName,
}: PaymentPageClientProps) {
  const [paymentMode, setPaymentMode] = useState<"razorpay" | "mock">("mock");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const mode = process.env.NEXT_PUBLIC_PAYMENT_MODE || "mock";
    setPaymentMode(mode as "razorpay" | "mock");
  }, []);

  const handlePaymentSuccess = (studentId: string) => {
    toast.success("Payment successful!");
    setTimeout(() => {
      const successUrl = `/payment-success?studentId=${studentId}&fullName=${encodeURIComponent(
        fullName || ""
      )}&email=${encodeURIComponent(email || "")}`;
      router.push(successUrl);
    }, 1500);
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    toast.error(error);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment gateway...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Main Payment Card */}
        <div className="card shadow-2xl border-0">
          <div className="card-body p-8">
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Registration Summary
                  </h3>
                  {fullName && (
                    <p className="text-gray-700">Student: {fullName}</p>
                  )}
                  {email && (
                    <p className="text-gray-600 text-sm">Email: {email}</p>
                  )}
                  <p className="text-gray-600 text-sm">
                    Student Registration ID: {organizationRegNo}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">₹{COURSE_AMOUNT_INR}</div>
                  <div className="text-sm text-gray-500">Course Expense</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  paymentMode === "mock"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                {paymentMode === "mock"
                  ? "🔧 Test Mode (Mock Payments)"
                  : "🔒 Live Mode"}
              </div>
            </div>

            {paymentMode === "razorpay" ? (
              <PaymentCheckout
                studentId={studentId}
                amount={COURSE_AMOUNT_INR}
                email={email}
                organizationRegNo={organizationRegNo}
                fullName={fullName}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            ) : (
              <PaymentCheckout
                studentId={studentId}
                amount={COURSE_AMOUNT_INR}
                email={email}
                organizationRegNo={organizationRegNo}
                fullName={fullName}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
