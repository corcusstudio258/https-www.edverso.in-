'use client';

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

const UNIVERSITIES = ["Patliputra University"] as const;

const COLLEGES = [
  "A N College, Patna",
  "ANS College, Barh",
  "B D College, Patna",
  "B.S. College",
  "College Of Commerce, Arts & Science, Patna",
  "G J College, Rambagh, Bihta",
  "Ganga Devi Mahila Mahavidalaya, Patna",
  "J D Women’s College, Patna",
  "Jagat Narayan Lal College, Patna",
  "M M College, Bikram",
  "Mahila College, Khagaul",
  "Malti Dhari College, Naubatpur",
  "R L S Y College, Bakhtiarpur",
  "R P M College, Patna City",
  "Ram Krishna Dwarika College, Patna",
  "Ram Ratan Singh College, Mokama",
  "S M D College, Punpun",
  "Sri Arvind Mahila College, Patna",
  "Sri Guru Gobind Singh College, Patna",
  "T P S College, Patna",
  "Govt. Degree College, Rajgir",
  "Kisan College, Nalanda",
  "Nalanda College, Biharsharif",
  "Nalanda Mahila College, Biharsharif",
  "S P M College, Udantpuri",
  "S U College, Hilsa",
  "Oriental College, Patna City",
  "Sogara College, Biharsharif",
  "Allama Iqbal College, Biharsharif",
  "Awadhesh Prasad Mahavidyalaya",
  "B B M B G Kanya College",
  "B L P College, Masaurhi",
  "Bansropan Ram Bahadur Singh Yadav College, Kanhauli",
  "Chandradeo Prasad Verma College, Simri",
  "D N College, Masaurhi",
  "Dr. C P Thakur College, Naubatpur, Patna",
  "Jyoti Kunwar College, Fatehpur",
  "Kameshwar Prasad Singh College, Nadwan",
  "L P Shahi College, Patna",
  "Nunwati Jagdev Singh College, Bakhtiyarpur",
  "P L S College, Masaurhi",
  "P N K College, Achhua",
  "Patna Muslim Science College, Patna",
  "R P College, Datiyana",
  "R L S Y College, Anisabad, Patna",
  "R P S College, Bailey Road",
  "R P S Mahila College, Bailey Road",
  "Ram Roop Prasad College, Patna",
  "S K M V College, Fatuha",
  "S N A Evening College, Barh",
  "Sant Sandhya Das Mahila College, Barh",
  "Sir Ganesh Dutt Memorial College, Patna",
  "Sri Bhuwaneshwari Raja College, Barh",
  "Sri Ram Narayan College, Barh",
  "Trimurti College, Ismailpur"
] as const;

const MAJOR_SUBJECTS = [
  "BioTech",
  "BCA",
  "BBA",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Botany",
  "Zoology",
  "Economics",
  "Political Science",
  "History",
  "Geography",
  "Hindi",
  "English",
  "Urdu",
  "Sanskrit",
  "Philosophy",
  "Psychology",
  "Sociology",
  "Commerce",
] as const;

const TOPICS = ["Healthcare and wellness", "Community development"] as const;
const GRADUATION_TYPES = ["UG", "PG"] as const;
const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

// Indian mobile: 10 digits, starts with 6–9
const INDIAN_PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-Z\s]{3,}$/;
// Roll number: 11 to 13 digits
const ROLL_RE = /^\d{11,13}$/;

interface RegisterFormData {
  fullName: string;
  gender: string;
  universityName: string;
  collegeName: string;
  universityRegistrationNumber: string;
  universityRollNo: string;
  graduation: string;
  majorSubject: string;
  semester: string;
  topics: string;
  phoneNumber: string;
  email: string;
  password: string;
}

type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

function validate(data: RegisterFormData): FormErrors {
  const e: FormErrors = {};

  if (!data.fullName.trim())
    e.fullName = "Full name is required.";
  else if (!NAME_RE.test(data.fullName.trim()))
    e.fullName = "Full name must be at least 3 letters and contain only letters.";

  if (!data.gender)
    e.gender = "Please select your gender.";

  if (!data.universityName)
    e.universityName = "Please select a university.";

  if (!data.collegeName)
    e.collegeName = "Please select a college.";

  if (!data.universityRegistrationNumber.trim())
    e.universityRegistrationNumber = "University registration number is required.";
  else if (data.universityRegistrationNumber.trim().length < 5)
    e.universityRegistrationNumber = "Enter a valid registration number (min 5 characters).";

  if (!data.universityRollNo.trim())
    e.universityRollNo = "University roll number is required.";
  else if (!ROLL_RE.test(data.universityRollNo.trim()))
    e.universityRollNo = "Roll number must be between 11 and 13 digits.";

  if (!data.graduation)
    e.graduation = "Please select graduation type.";

  if (!data.majorSubject)
    e.majorSubject = "Please select a major subject.";

  if (!data.semester)
    e.semester = "Please select a semester.";

  if (!data.topics)
    e.topics = "Please select a topic.";

  if (!data.phoneNumber.trim())
    e.phoneNumber = "Phone number is required.";
  else if (!INDIAN_PHONE_RE.test(data.phoneNumber.trim()))
    e.phoneNumber = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";

  if (!data.email.trim())
    e.email = "Email address is required.";
  else if (!EMAIL_RE.test(data.email.trim()))
    e.email = "Enter a valid email address.";

  if (!data.password)
    e.password = "Password is required.";
  else if (data.password.length < 8)
    e.password = "Password must be at least 8 characters.";
  else if (!/[A-Z]/.test(data.password))
    e.password = "Password must contain at least one uppercase letter.";
  else if (!/[0-9]/.test(data.password))
    e.password = "Password must contain at least one number.";

  return e;
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    gender: "",
    universityName: UNIVERSITIES[0],
    collegeName: "",
    universityRegistrationNumber: "",
    universityRollNo: "",
    graduation: "",
    majorSubject: "",
    semester: "",
    topics: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegisterFormData, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name as keyof RegisterFormData]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof RegisterFormData, boolean>
    );
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        gender: formData.gender,
        universityName: formData.universityName,
        collegeName: formData.collegeName,
        universityRegistrationNumber: formData.universityRegistrationNumber.trim(),
        universityRollNo: formData.universityRollNo.trim(),
        graduation: formData.graduation,
        majorSubject: formData.majorSubject,
        semester: Number(formData.semester),
        topics: formData.topics,
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const res = await api.post("/auth/register/new", payload);

      if (res.data?.ok) {
        toast.success("Registration successful!");
        const studentId = res.data?.student?.id || res.data?.studentId;
        if (studentId) {
          router.push(`/pay?studentId=${studentId}&email=${encodeURIComponent(formData.email)}`);
        } else {
          router.push(`/pay?email=${encodeURIComponent(formData.email)}`);
        }
      } else {
        toast.error(res.data?.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const field = (name: keyof RegisterFormData) => ({
    name,
    id: name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  const errorMsg = (name: keyof RegisterFormData) =>
    touched[name] && errors[name] ? (
      <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
    ) : null;

  const inputClass = (name: keyof RegisterFormData) =>
    `input w-full${touched[name] && errors[name] ? " border-red-500 focus:border-red-500 focus:ring-red-400" : ""}`;

  return (
    <div className="max-w-2xl w-full mx-auto space-y-8">
      <div className="card shadow-xl border-0">
        <div className="card-body p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
            <p className="text-gray-600 mt-2">Fill in your details and continue to payment</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input {...field("fullName")} type="text" className={inputClass("fullName")} placeholder="Enter your full name" />
              {errorMsg("fullName")}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select {...field("gender")} className={inputClass("gender")}>
                <option value="">Select</option>
                {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errorMsg("gender")}
            </div>

            {/* University Name */}
            <div>
              <label htmlFor="universityName" className="block text-sm font-medium text-gray-700 mb-2">
                University Name <span className="text-red-500">*</span>
              </label>
              <select {...field("universityName")} className={inputClass("universityName")}>
                {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
              {errorMsg("universityName")}
            </div>

            {/* College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
                College Name <span className="text-red-500">*</span>
              </label>
              <select {...field("collegeName")} className={inputClass("collegeName")}>
                <option value="">Select college</option>
                {COLLEGES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errorMsg("collegeName")}
            </div>

            {/* University Registration Number */}
            <div>
              <label htmlFor="universityRegistrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
                University Registration Number <span className="text-red-500">*</span>
              </label>
              <input {...field("universityRegistrationNumber")} type="text" className={inputClass("universityRegistrationNumber")} placeholder="Enter university registration number" />
              {errorMsg("universityRegistrationNumber")}
            </div>

            {/* University Roll No */}
            <div>
              <label htmlFor="universityRollNo" className="block text-sm font-medium text-gray-700 mb-2">
                University Roll No <span className="text-red-500">*</span>
              </label>
              <input
                {...field("universityRollNo")}
                type="text"
                inputMode="numeric"
                minLength={11}
                maxLength={13}
                className={inputClass("universityRollNo")}
                placeholder="Enter roll number"
              />
              {errorMsg("universityRollNo")}
            </div>

            {/* graduation */}
            <div>
              <label htmlFor="graduation" className="block text-sm font-medium text-gray-700 mb-2">
                Degree <span className="text-red-500">*</span>
              </label>
              <select {...field("graduation")} className={inputClass("graduation")}>
                <option value="">Select degree type</option>
                {GRADUATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errorMsg("graduation")}
            </div>

            {/* Major Subject */}
            <div>
              <label htmlFor="majorSubject" className="block text-sm font-medium text-gray-700 mb-2">
                Major Subject <span className="text-red-500">*</span>
              </label>
              <select {...field("majorSubject")} className={inputClass("majorSubject")}>
                <option value="">Select major subject</option>
                {MAJOR_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errorMsg("majorSubject")}
            </div>

            {/* Semester */}
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                Semester <span className="text-red-500">*</span>
              </label>
              <select {...field("semester")} className={inputClass("semester")}>
                <option value="">Select semester</option>
                {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              {errorMsg("semester")}
            </div>

            {/* Topics */}
            <div>
              <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-2">
                Topics <span className="text-red-500">*</span>
              </label>
              <select {...field("topics")} className={inputClass("topics")}>
                <option value="">Select topic</option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errorMsg("topics")}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                {...field("phoneNumber")}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className={inputClass("phoneNumber")}
                placeholder="10-digit mobile number"
              />
              {errorMsg("phoneNumber")}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input {...field("email")} type="email" className={inputClass("email")} placeholder="Enter email address" />
              {errorMsg("email")}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Create Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...field("password")}
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass("password")} pr-12`}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                />
                <button
                  type="button"
                  title="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errorMsg("password")}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-lg font-semibold relative overflow-hidden group disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <span className="relative z-10">Submit & Continue to Payment</span>
              )}
              <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 z-0"></div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
