// app/dashboard/page.tsx
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - KIVT Internship LMS",
  description: "Access your internship progress, courses, and certificates.",
};

export default function DashboardPage() {
  return <StudentDashboard />;
}