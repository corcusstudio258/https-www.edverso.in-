/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import bcrypt from "bcryptjs";

const INDIAN_PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLL_RE = /^\d{11,13}$/;

type Body = {
  fullName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  password: string;
  universityName: string;
  collegeName: string;
  universityRegistrationNumber: string;
  universityRollNo: string;
  graduation: string;
  majorSubject: string;
  semester: string | number;
  topics: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    // Required field presence check
    const required: Array<keyof Body> = [
      "universityName", "collegeName", "universityRollNo", "graduation",
      "majorSubject", "semester", "topics",
    ];
    for (const key of required) {
      if (!body[key] && body[key] !== 0) {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 });
      }
    }

    // Indian phone validation
    if (!INDIAN_PHONE_RE.test(String(body.phoneNumber).trim())) {
      return NextResponse.json(
        { error: "phoneNumber must be a valid 10-digit Indian mobile number starting with 6–9" },
        { status: 400 }
      );
    }

    // Email format
    if (!EMAIL_RE.test(String(body.email).trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Roll number: 11 to 13 digits
    if (!ROLL_RE.test(String(body.universityRollNo).trim())) {
      return NextResponse.json(
        { error: "universityRollNo must be between 11 and 13 digits" },
        { status: 400 }
      );
    }

    // Password: min 8 chars, 1 uppercase, 1 digit
    const pwd = String(body.password);
    if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters with one uppercase letter and one number" },
        { status: 400 }
      );
    }

    // Gender enum
    if (!["Male", "Female", "Other"].includes(body.gender)) {
      return NextResponse.json({ error: "Invalid gender value" }, { status: 400 });
    }

    // Topics validation
    if (!["Healthcare and wellness", "Community development"].includes(body.topics)) {
      return NextResponse.json({ error: "Invalid topic selected" }, { status: 400 });
    }

    await dbConnect();

    const existsEmail = await Student.findOne({ email: body.email.toLowerCase() });
    if (existsEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const existsPhone = await Student.findOne({ contactNumber: body.phoneNumber.trim() });
    if (existsPhone) {
      return NextResponse.json({ error: "Mobile number already registered" }, { status: 409 });
    }

    const lastStudent = await Student.findOne({}, {}, { sort: { createdAt: -1 } });
    const organizationRegNo = lastStudent?.organizationRegNo
      ? String(parseInt(lastStudent.organizationRegNo) + 1).padStart(6, "0")
      : "000001";

    const passwordHash = await bcrypt.hash(body.password, 10);

    const student = await Student.create({
      fullName: body.fullName.trim(),
      gender: body.gender,
      contactNumber: body.phoneNumber.trim(),
      email: body.email.trim().toLowerCase(),
      passwordHash,
      universityName: body.universityName,
      collegeName: body.collegeName,
      degree: body.graduation,
      department: body.majorSubject,
      rollNumber: body.universityRollNo.trim(),
      classSemester: String(body.semester),
      internshipTopic: body.topics,
      organizationName: "Balaji Seva Sansathan (BSS)",
      organizationRegNo,
      organizationAddress: "Railly, Pandarak, Patna- 803221",
      organizationContact: "9341041274",
      durationHours: 120,
      internshipStart: null,
      internshipEnd: null,
      registrationStatus: "pending",
      hasPaid: false,
    });

    return NextResponse.json(
      { ok: true, studentId: student._id.toString(), organizationRegNo: student.organizationRegNo },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("register/new error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
