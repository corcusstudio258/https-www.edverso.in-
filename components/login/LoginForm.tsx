/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// app/login/LoginForm.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import toast from "react-hot-toast";

interface LoginError {
  message: string;
  type: 'credentials' | 'payment' | 'registration' | 'general';
  studentId?: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      // Normal login success
      if (res.data?.ok && res.data?.token) {
        toast.success("Login successful!");
        setError(null);
        setLoading(false);
        saveToken(res.data.token);
         const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
        router.push(redirect || '/dashboard');
        return;
      }
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Handle different error types
      if (err.response?.status === 401) {
        setError({
          message: "Invalid email or password. Please check your credentials.",
          type: 'credentials'
        });
      } else if (err.response?.status === 403) {
        const errorData = err.response.data;
        
        if (errorData.error?.includes("Payment pending")) {
          setError({
            message: errorData.error,
            type: 'payment',
            studentId: errorData.student?.id
          });
        } else if (errorData.error?.includes("Registration incomplete")) {
          setError({
            message: errorData.error,
            type: 'registration',
            studentId: errorData.student?.id
          });
        } else {
          setError({
            message: errorData.error || "Access denied. Please contact support.",
            type: 'general'
          });
        }
      } else {
        setError({
          message: err?.response?.data?.error || err.message || "An unexpected error occurred",
          type: 'general'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    if (error?.studentId) {
      router.push(`/pay?studentId=${error.studentId}&email=${email}`);
    }
  };

  const getErrorStyles = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'registration':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'credentials':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return '💰';
      case 'registration':
        return '📝';
      case 'credentials':
        return '🔒';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">

      {/* Login Card */}
      <div className="card shadow-xl border-0">
        <div className="card-body p-8">
          {/* Error Alert */}
          {error && (
            <div className={`p-4 rounded-lg mb-6 space-y-3 border ${getErrorStyles(error.type)}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-lg ${
                  error.type === 'payment' ? 'bg-orange-100' : 
                  error.type === 'registration' ? 'bg-yellow-100' : 
                  'bg-red-100'
                }`}>
                  {getErrorIcon(error.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{error.message}</p>
                  
                  {/* Payment Pending Action */}
                  {error.type === 'payment' && error.studentId && (
                    <button
                      onClick={handlePaymentRedirect}
                      className="mt-3 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-sm"
                    >
                      Complete Payment - ₹600
                    </button>
                  )}

                  {/* Registration Incomplete Action */}
                  {error.type === 'registration' && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm opacity-90">
                        Please complete your registration process to access your account.
                      </p>
                      <div className="flex space-x-3">
                        <Link
                          href="/register"
                          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium text-sm transition-all duration-200"
                        >
                          Complete Registration
                        </Link>
                        <Link
                          href="/contact"
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium text-sm transition-all duration-200"
                        >
                          Contact Support
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Credentials Error Action */}
                  {error.type === 'credentials' && (
                    <div className="mt-3">
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium underline hover:no-underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                title="button"
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg 
                    className={`h-5 w-5 ${
                      showPassword ? 'text-blue-600' : 'text-gray-400'
                    } hover:text-blue-600 transition-colors`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {showPassword ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </>
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link 
                  href="/forgot-password" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-lg font-semibold relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span className="relative z-10">Sign in to your account</span>
              )}

              {/* background overlay behind content */}
              <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 z-0 "></div>
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                href="/register" 
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Support Info */}
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-700">
          Need help with login?{" "}
          <Link href="/contact" className="font-semibold hover:text-blue-800">
            Contact support
          </Link>
        </p>
      </div>

      {/* Login Status Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Login Status Guide:</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span><strong>Success:</strong> Access your internship dashboard</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span><strong>Payment Pending:</strong> Complete ₹600 payment to continue</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span><strong>Registration Incomplete:</strong> Finish registration process</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span><strong>Invalid Credentials:</strong> Check email and password</span>
          </div>
        </div>
      </div>
    </div>
  );
}

            