// app/login/page.tsx
import LoginForm from "@/components/login/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - KIVT Internship LMS",
  description: "Access your student dashboard. Login to continue your internship journey, track progress, and download certificates.",
  keywords: "student login, internship portal, UGC login, dashboard access",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br fromˀ-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm/>
    </div>
  );
}