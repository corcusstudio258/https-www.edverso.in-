/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, BookOpen, Award, Clock, Mail, Download, Receipt } from "lucide-react";
import { api } from "@/lib/api";

// Wrap in Suspense at the page level
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading payment details...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

// Rename the inner component
function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  
  // Get params safely
  const studentId = searchParams?.get('studentId');
  const fullName = searchParams?.get('fullName');
  const router = useRouter();

  useEffect(() => {
      const checkAuthAndFetchData = async () => {
        try {

          const res = await api.get("/students/me");
  
          setStudent(res.data.student);
        } catch (error) {
          console.error("Dashboard error:", error);
        }
      };
  
      checkAuthAndFetchData();
    }, [router]);

  useEffect(() => {
    // Set document title
    document.title = "Payment Successful - Edverso";

    // Generate payment data (in real app, this would come from API)
    const generatedPaymentData: any = {
      transactionId: `TXN${Date.now().toString().slice(-8)}`,
      amount: 1000,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      studentName: fullName || "Student",
    };

    setPaymentData(generatedPaymentData);
  }, [studentId, fullName]);

  const handlePrintReceipt = () => {
    if (!paymentData) return;

    const receiptWindow = window.open("", "_blank");
    if (receiptWindow) {
      receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Payment Receipt - ${student.fullName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px double #000;
              padding-bottom: 20px;
            }
            .organization {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #059669;
            }
            .receipt-title {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 16px;
              color: #666;
              margin-bottom: 20px;
            }
            .section {
              margin-bottom: 25px;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .section-title {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 15px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 8px;
              color: #059669;
            }
            .field-row {
              display: flex;
              margin-bottom: 10px;
              padding: 5px 0;
            }
            .field-label {
              width: 200px;
              font-weight: bold;
              color: #555;
            }
            .field-value {
              flex: 1;
              font-weight: normal;
            }
            .amount-section {
              background: #f0fdf4;
              border: 2px solid #059669;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .amount {
              font-size: 28px;
              font-weight: bold;
              color: #059669;
              margin: 10px 0;
            }
            .success-badge {
              background: #059669;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: bold;
              display: inline-block;
              margin-bottom: 15px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              border-top: 1px solid #ccc;
              padding-top: 20px;
              color: #666;
              font-size: 14px;
            }
            .print-btn {
              display: none;
            }
            .watermark {
              opacity: 0.1;
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 80px;
              color: #059669;
              pointer-events: none;
              z-index: -1;
            }
            @media print {
              body { margin: 0; padding: 20px; }
              .print-btn { display: none; }
              .watermark { display: block; }
            }
          </style>
        </head>
        <body>
          <div class="watermark">PAID</div>
          
          <div class="header">
            <div class="organization">${student.organizationName}</div>
            <div class="receipt-title">OFFICIAL PAYMENT RECEIPT</div>
            <div class="subtitle">UGC Internship Program Registration</div>
            <div class="success-badge">PAYMENT SUCCESSFUL ✓</div>
          </div>

          <div class="section">
            <div class="section-title">Transaction Details</div>
            <div class="field-row">
              <span class="field-label">Transaction ID:</span>
              <span class="field-value"><strong>${paymentData.transactionId}</strong></span>
            </div>
            <div class="field-row">
              <span class="field-label">Payment Date:</span>
              <span class="field-value">${paymentData.date}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Payment Status:</span>
              <span class="field-value" style="color: #059669; font-weight: bold;">COMPLETED</span>
            </div>
          </div>

          <div class="amount-section">
            <div>Amount Paid</div>
            <div class="amount">₹${paymentData.amount.toLocaleString('en-IN')}</div>
            <div>Indian Rupees</div>
          </div>

          <div class="section">
            <div class="section-title">Student Information</div>
            <div class="field-row">
              <span class="field-label">Full Name:</span>
              <span class="field-value">${paymentData.studentName}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Roll Number:</span>
              <span class="field-value">${student.rollNumber}</span>
            </div>
            <div class="field-row">
              <span class="field-label">College Name:</span>
              <span class="field-value">${student.collegeName}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Department:</span>
              <span class="field-value">${student.department}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Organization Details</div>
            <div class="field-row">
              <span class="field-label">Organization Name:</span>
              <span class="field-value">${student.organizationName}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Registration No:</span>
              <span class="field-value">${student.organizationRegNo}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Organization Number:</span>
              <span class="field-value">${student.organizationContact}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Address:</span>
              <span class="field-value">${student.organizationAddress}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Payment Breakdown</div>
            <div class="field-row">
              <span class="field-label">Course Expense Fee:</span>
              <span class="field-value">₹${paymentData.amount.toLocaleString('en-IN')}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Total Amount:</span>
              <span class="field-value"><strong>₹${paymentData.amount.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>

          <div class="footer">
            <p><strong>This is a computer-generated receipt and does not require a physical signature.</strong></p>
            <p>For any queries regarding this payment, please contact support@edverso.in</p>
            <p>Thank you for registering with KIVT Internship Program!</p>
          </div>

          <button class="print-btn" onclick="window.print()">Print Receipt</button>
          
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => {
                window.close();
              }, 1000);
            }, 500);
          </script>
        </body>
        </html>
      `);

      receiptWindow.document.close();
    }
  };

  // If studentId is missing, show a friendly error screen
  if (!studentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="card shadow-2xl border-0">
            <div className="card-body p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Missing Information</h2>
              <p className="text-gray-600 mb-6">
                Student ID is required to view payment confirmation. Please complete your payment first.
              </p>
              <a href="/pay" className="btn btn-primary w-full py-3">
                Go to Payment
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Main Success Card */}
        <div className="card shadow-2xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Dynamic Congrats Message */}
            <h1 className="text-4xl font-bold mb-2">
              🎉 Congratulations{fullName ? `, ${fullName}` : ""}!
            </h1>
            <p className="text-xl text-green-100 opacity-90 max-w-2xl mx-auto">
              Your payment was successful and your registration for the UGC internship program is now confirmed.
            </p>
          </div>

          {/* Body Section */}
          <div className="p-8">
            {/* Download Receipt Section - HIGHLIGHTED */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Download Your Payment Receipt
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Keep this receipt for your records. It contains all important transaction details and serves as proof of payment for your internship registration.
                </p>
                <button
                  onClick={handlePrintReceipt}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-3 mx-auto text-lg"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Payment Receipt</span>
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  📄 The receipt will open in a new window for printing
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                What's Next in Your Internship Journey?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StepCard
                  icon={<BookOpen className="w-8 h-8" />}
                  step="1"
                  title="Access Learning Materials"
                  description="Login to access 7 comprehensive subjects with study materials, PPTs, and videos."
                />
                <StepCard
                  icon={<Clock className="w-8 h-8" />}
                  step="2"
                  title="Complete 30-Day Program"
                  description="Follow the structured curriculum and complete assignments over 30 days."
                />
                <StepCard
                  icon={<Award className="w-8 h-8" />}
                  step="3"
                  title="Get Certified"
                  description="Receive your UGC-compliant internship certificate upon successful completion."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 text-center">
              <p className="text-gray-600 mb-4 text-lg">
                Ready to start your internship journey?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="btn bg-green-600 hover:bg-green-700 text-white py-4 px-8 text-lg font-semibold inline-flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                >
                  <span>Login to Your Dashboard</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <button
                  onClick={handlePrintReceipt}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 text-lg font-semibold inline-flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Get Receipt</span>
                </button>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center space-x-1"
                >
                  <span>Need help? Contact our support team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Student Support</h4>
            <p className="text-gray-600 mb-3">
              Our support team is here to help you throughout your internship journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>support@edverso.in</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+91-7004190414</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Card Component
function StepCard({ icon, step, title, description }: any) {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
        {icon}
      </div>
      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
        {step}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Benefit Item Component
function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}