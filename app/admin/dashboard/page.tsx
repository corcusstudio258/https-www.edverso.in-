// app/admin/dashboard/page.tsx
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - KIVT Internship LMS",
  description: "Admin portal for managing the internship platform.",
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}