/* eslint-disable @typescript-eslint/no-explicit-any */
// components/payments/PaymentCheckout.tsx
"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface PaymentCheckoutProps {
  studentId: string;
  amount: number;
  email?: string;
  organizationRegNo?: string;
  fullName?: string;
  onSuccess: (studentId: string) => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentCheckout({
  studentId,
  amount,
  email,
  organizationRegNo,
  fullName,
  onSuccess,
  onError,
}: PaymentCheckoutProps) {
  const razorpayActive = process.env.NEXT_PUBLIC_RAZORPAY_ACTIVE === "true";

  const [loading, setLoading] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"online" | "cash">(razorpayActive ? "online" : "cash");
  
  const [cashPaymentRequested, setCashPaymentRequested] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!razorpayActive) return;
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => onError("Failed to load payment gateway");
      document.body.appendChild(script);
    } else {
      setRazorpayLoaded(true);
    }
  }, [onError, razorpayActive]);

  const createOrder = async () => {
    try {
      const res = await api.post("/payments/create-order", {
        studentId,
        amount,
      });

      if (!res.data.order) {
        throw new Error(res.data.error || "Could not create order");
      }

      return res.data;
    } catch (error: any) {
      console.error("Order creation error:", error);
      throw new Error(
        error.response?.data?.error || "Failed to create payment order"
      );
    }
  };

  const verifyPayment = async (paymentResponse: any) => {
    try {
      const verifyResp = await api.post("/payments/verify", {
        studentId,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      });

      if (!verifyResp.data.ok) {
        throw new Error(verifyResp.data.error || "Payment verification failed");
      }

      return true;
    } catch (error: any) {
      console.error("Payment verification error:", error);
      throw new Error(
        error.response?.data?.error || "Payment verification failed"
      );
    }
  };


  const handleCashPaymentRequest = async () => {
    setCashLoading(true);
    try {
      // Call API to create cash payment record
      const res = await api.post("/payments/create-cash-payment", {
        studentId,
        amount,
      });

      if (!res.data.success) {
        throw new Error(res.data.error || "Failed to process cash payment request");
      }

      // Show payment ID input instead of calling onSuccess
      setCashPaymentRequested(true);
      
    } catch (error: any) {
      console.error("Cash payment error:", error);
      onError(error.response?.data?.error || "Failed to process cash payment request");
    } finally {
      setCashLoading(false);
    }
  };

  const verifyCashPayment = async () => {
    if (!paymentId.trim()) {
      onError("Please enter your Payment ID");
      return;
    }

    setVerifying(true);
    try {
      const res = await api.post("/payments/verify-cash-payment", {
        studentId,
        paymentId: paymentId.trim(),
      });

      if (res.data.success) {
        onSuccess(studentId);
      } else {
        onError(res.data.error || "Invalid Payment ID");
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      onError(error.response?.data?.error || "Failed to verify payment");
    } finally {
      setVerifying(false);
    }
  };

  const handleOnlinePayment = async () => {
    setLoading(true);
    try {
      const data = await createOrder();
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Edverso",
        description: "Course Registration Fee",
        order_id: data.order.id,
        prefill: { email, contact: "" },
        handler: async (response: any) => {
          try {
            await verifyPayment(response);
            onSuccess(studentId);
          } catch (err: any) {
            onError(err.message || "Payment verification failed");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      new window.Razorpay(options).open();
    } catch (err: any) {
      onError(err.message || "Payment failed");
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (selectedMethod === "online") {
      handleOnlinePayment();
    } else {
      handleCashPaymentRequest();
    }
  };

  // If cash payment is requested but not verified, show payment ID input
  if (cashPaymentRequested) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-4xl mb-3">✅</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Cash Payment Request Submitted!
          </h3>
          <p className="text-green-700">
            Your cash payment request has been registered successfully.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Next Steps:</h4>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Visit our office with the payment amount (₹{amount})</li>
            <li>Complete the payment at the reception</li>
            <li>You will receive a Payment ID from our staff</li>
            <li>Enter the Payment ID below to activate your course access</li>
          </ol>
        </div>

        {/* Payment ID Input */}
        <div className="space-y-4">
          <div>
            <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Payment ID (Provided by Organization)
            </label>
            <input
              type="text"
              id="paymentId"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              placeholder="Enter your Payment ID here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              This ID will be provided to you after completing the cash payment at our office.
            </p>
          </div>

          <button
            onClick={verifyCashPayment}
            disabled={verifying || !paymentId.trim()}
            className="w-full py-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifying ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Payment ID...</span>
              </div>
            ) : (
              "Verify Payment ID & Activate Course"
            )}
          </button>

          <button
            onClick={() => setCashPaymentRequested(false)}
            className="w-full py-3 text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Payment Methods
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Amount Display */}
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-2">₹{amount}</div>
        <p className="text-gray-600">Course Expense To The Platform</p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <label className="text-lg font-semibold text-gray-900">
          Select Payment Method
        </label>
        
        {/* Online Payment Option */}
        {razorpayActive && (
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === "online" 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setSelectedMethod("online")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === "online" 
                    ? "border-blue-500 bg-blue-500" 
                    : "border-gray-400"
                }`}>
                  {selectedMethod === "online" && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Online Payment</div>
                  <div className="text-sm text-gray-600">Pay securely via Razorpay</div>
                </div>
              </div>
              <div className="flex space-x-2 opacity-75">
                <PaymentMethod icon="💳" name="Card" />
                <PaymentMethod icon="📱" name="UPI" />
                <PaymentMethod icon="🌐" name="Net Banking" />
              </div>
            </div>
          </div>
        )}

        {/* Cash Payment Option */}
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedMethod === "cash" 
              ? "border-green-500 bg-green-50" 
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => setSelectedMethod("cash")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "cash" 
                  ? "border-green-500 bg-green-500" 
                  : "border-gray-400"
              }`}>
                {selectedMethod === "cash" && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-900">Pay in Cash</div>
                <div className="text-sm text-gray-600">Pay offline at our office</div>
              </div>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>

        {/* Cash Payment Instructions */}
        {selectedMethod === "cash" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-600 text-lg">ℹ️</div>
              <div className="text-sm text-yellow-800">
                <p className="font-semibold">Cash Payment Instructions:</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>Visit our office during business hours (9 AM - 6 PM)</li>
                  <li>Bring your student ID and payment amount in cash</li>
                  <li>You will receive a payment receipt with Payment ID</li>
                  <li>Return here and enter the Payment ID to activate your course</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading || cashLoading || (selectedMethod === "online" && !razorpayLoaded)}
        className={`w-full py-4 text-lg font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed rounded-lg ${
          selectedMethod === "online" 
            ? "bg-blue-600 hover:bg-blue-700 text-white" 
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {loading || cashLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>
              {selectedMethod === "online" ? "Processing Payment..." : "Processing Cash Payment..."}
            </span>
          </div>
        ) : (
          <>
            <span className="relative z-10">
              {selectedMethod === "online" 
                ? `Pay Securely - ₹${amount}` 
                : `Request Cash Payment - ₹${amount}`}
            </span>
            <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 ${
              selectedMethod === "online" ? "bg-blue-700" : "bg-green-700"
            }`}></div>
          </>
        )}
      </button>

      {/* Security Badge - Only show for online payments */}
      {selectedMethod === "online" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-green-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">100% Secure Payment</span>
          </div>
          <p className="text-green-600 text-sm mt-1">
            Your payment information is encrypted and secure
          </p>
        </div>
      )}
    </div>
  );
}

const PaymentMethod: React.FC<{ icon: string; name: string }> = ({
  icon,
  name,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl">{icon}</div>
      <div className="text-xs text-gray-600 mt-1">{name}</div>
    </div>
  );
};
