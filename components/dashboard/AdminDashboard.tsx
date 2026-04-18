// app/admin/dashboard/AdminDashboard.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { decodeToken } from "@/lib/auth";

interface AdminData {
  id: string;
  fullName: string;
  email: string;
  orgName?: string;
  role: string;
}

interface Stats {
  totalStudents: number;
  totalColleges: number;
  pendingPayments: number;
  completedCertificates: number;
  activeInternships: number;
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const token = localStorage.getItem('balaji_token');
        if (!token) {
          router.push('/admin/login');
          return;
        }

        const decoded = decodeToken(token);
        if (!decoded || decoded.role !== 'admin') {
          router.push('/admin/login');
          return;
        }

        // Set admin data
        setAdmin({
          id: decoded.sub,
          fullName: decoded.name || 'Admin',
          email: decoded.email,
          role: decoded.role,
        });

        // Fetch stats (mock data for now)
        const mockStats: Stats = {
          totalStudents: 1247,
          totalColleges: 156,
          pendingPayments: 23,
          completedCertificates: 892,
          activeInternships: 355,
        };

        setStats(mockStats);
      } catch (error) {
        console.error('Admin dashboard error:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load admin data.</p>
          <Link href="/admin/login" className="text-purple-600 hover:text-purple-700">
            Return to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard 👑
          </h1>
          <p className="text-gray-600">
            Welcome back, {admin.fullName}. Manage your internship platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats?.totalStudents.toString() || "0"}
            description="Registered students"
            icon="👨‍🎓"
            color="blue"
            href="/admin/students"
          />
          <StatCard
            title="Partner Colleges"
            value={stats?.totalColleges.toString() || "0"}
            description="Registered colleges"
            icon="🏛️"
            color="green"
            href="/admin/colleges"
          />
          <StatCard
            title="Active Internships"
            value={stats?.activeInternships.toString() || "0"}
            description="Currently active"
            icon="📊"
            color="purple"
            href="/admin/internships"
          />
          <StatCard
            title="Certificates Issued"
            value={stats?.completedCertificates.toString() || "0"}
            description="Successful completions"
            icon="🏆"
            color="orange"
            href="/admin/certificates"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ActionCard
                    title="Manage Students"
                    description="View, edit, and manage all student accounts"
                    icon="👨‍🎓"
                    href="/admin/students"
                    buttonText="View Students"
                  />
                  <ActionCard
                    title="College Partners"
                    description="Manage partner colleges and institutions"
                    icon="🏛️"
                    href="/admin/colleges"
                    buttonText="Manage Colleges"
                  />
                  <ActionCard
                    title="Course Management"
                    description="Manage internship courses and materials"
                    icon="📚"
                    href="/admin/courses"
                    buttonText="Manage Courses"
                  />
                  <ActionCard
                    title="Certificate Issuance"
                    description="Issue and manage internship certificates"
                    icon="🏆"
                    href="/admin/certificates"
                    buttonText="Issue Certificates"
                  />
                  <ActionCard
                    title="Payment Reports"
                    description="View payment status and reports"
                    icon="💰"
                    href="/admin/payments"
                    buttonText="View Reports"
                  />
                  <ActionCard
                    title="System Settings"
                    description="Configure platform settings"
                    icon="⚙️"
                    href="/admin/settings"
                    buttonText="Settings"
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card mt-6">
              <div className="card-header">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <ActivityItem
                    title="New Student Registration"
                    description="Priya Sharma registered for internship"
                    time="10 minutes ago"
                    type="registration"
                  />
                  <ActivityItem
                    title="Payment Received"
                    description="₹600 payment from Amit Kumar"
                    time="1 hour ago"
                    type="payment"
                  />
                  <ActivityItem
                    title="Certificate Issued"
                    description="Internship certificate for Rohan Singh"
                    time="2 hours ago"
                    type="certificate"
                  />
                  <ActivityItem
                    title="College Partner Added"
                    description="Delhi University partnership activated"
                    time="5 hours ago"
                    type="college"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Info Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Admin Information</h3>
              </div>
              <div className="card-body space-y-3">
                <InfoItem label="Name" value={admin.fullName} />
                <InfoItem label="Email" value={admin.email} />
                <InfoItem label="Role" value="Administrator" status="success" />
                <InfoItem label="Status" value="Active" status="success" />
                {admin.orgName && <InfoItem label="Organization" value={admin.orgName} />}
              </div>
            </div>

            {/* System Status */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">System Status</h3>
              </div>
              <div className="card-body space-y-3">
                <StatusItem label="API Server" status="online" />
                <StatusItem label="Database" status="online" />
                <StatusItem label="Payment Gateway" status="online" />
                <StatusItem label="Certificate Service" status="online" />
                <StatusItem label="Email Service" status="online" />
              </div>
            </div>

            {/* Pending Actions */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Pending Actions</h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <PendingAction
                    title="Pending Payments"
                    count={stats?.pendingPayments || 0}
                    href="/admin/payments"
                  />
                  <PendingAction
                    title="Student Verifications"
                    count={8}
                    href="/admin/students?filter=pending"
                  />
                  <PendingAction
                    title="Certificate Requests"
                    count={15}
                    href="/admin/certificates?filter=pending"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  href: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color, href }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    red: 'bg-red-50 text-red-600 hover:bg-red-100',
  };

  return (
    <Link href={href} className="block">
      <div className={`card hover:shadow-lg transition-all duration-200 ${colorClasses[color]}`}>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
              <p className="text-xs opacity-70 mt-1">{description}</p>
            </div>
            <div className="text-3xl opacity-80">
              {icon}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Action Card Component
interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  buttonText: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, href, buttonText }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors duration-200">
      <div className="flex items-start space-x-3">
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <Link
            href={href}
            className="btn bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

// Activity Item Component
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  type: 'registration' | 'payment' | 'certificate' | 'college';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'registration': return '👤';
      case 'payment': return '💰';
      case 'certificate': return '🏆';
      case 'college': return '🏛️';
      default: return '🔔';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'registration': return 'text-blue-600 bg-blue-50';
      case 'payment': return 'text-green-600 bg-green-50';
      case 'certificate': return 'text-purple-600 bg-purple-50';
      case 'college': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getColor()}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

// Info Item Component
interface InfoItemProps {
  label: string;
  value: string;
  status?: 'success' | 'warning' | 'error';
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}:</span>
      <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor()}`}>
        {value}
      </span>
    </div>
  );
};

// Status Item Component
interface StatusItemProps {
  label: string;
  status: 'online' | 'offline' | 'warning';
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return { color: 'text-green-600 bg-green-50', text: 'Online' };
      case 'offline':
        return { color: 'text-red-600 bg-red-50', text: 'Offline' };
      case 'warning':
        return { color: 'text-yellow-600 bg-yellow-50', text: 'Warning' };
      default:
        return { color: 'text-gray-600 bg-gray-50', text: 'Unknown' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-xs font-medium px-2 py-1 rounded ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
};

// Pending Action Component
interface PendingActionProps {
  title: string;
  count: number;
  href: string;
}

const PendingAction: React.FC<PendingActionProps> = ({ title, count, href }) => {
  return (
    <Link href={href} className="flex items-center justify-between group">
      <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
        {title}
      </span>
      <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
        {count}
      </span>
    </Link>
  );
};