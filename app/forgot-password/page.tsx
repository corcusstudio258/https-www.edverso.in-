// app/forgot-password/page.tsx
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - KIVT Internship LMS",
  description: "Reset your password to access your student dashboard and continue your internship journey.",
  keywords: "forgot password, reset password, student login recovery",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ForgotPasswordForm />
    </div>
  );
}