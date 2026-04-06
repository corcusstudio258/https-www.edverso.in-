// app/admin/login/page.tsx
import AdminLoginForm from "@/components/login/AdminLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - KIVT Internship LMS",
  description: "Admin portal for managing students, colleges, and certificates.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AdminLoginForm/>
    </div>
  );
}