/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import jwt from "jsonwebtoken";

/* -------------------- API HANDLER -------------------- */

export async function GET(req: Request) {
  try {
    await dbConnect();

    /* -------- AUTH -------- */
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    const studentId = decoded.sub;

    if (!studentId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* -------- FETCH STUDENT -------- */
    const student = await Student.findById(studentId)
      .select("-passwordHash")
      .lean();

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const formatDate = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      const parsed = typeof date === "string" ? new Date(date) : date;
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const internshipStart = student.internshipStart;
    const internshipEnd = student.internshipEnd;

    /* -------- CURRENT TOPIC PROGRESS -------- */
    const currentTopic = student.internshipTopic || null;

    const currentTopicProgress = currentTopic
      ? student.topicProgress?.find((p: any) => p.topic === currentTopic) ||
        null
      : null;

    /* -------- RESPONSE OBJECT -------- */
    const responseStudent = {
      _id: student._id,
      fullName: student.fullName,
      gender: student.gender,
      email: student.email,
      universityName: student.universityName,
      collegeName: student.collegeName,
      degree: student.degree,
      department: student.department,
      rollNumber: student.rollNumber,
      classSemester: student.classSemester,
      contactNumber: student.contactNumber,
      parentName: student.parentName,
      emergencyContactName: student.emergencyContactName,
      emergencyContactNumber: student.emergencyContactNumber,
      emergencyRelation: student.emergencyRelation,

      organizationName: student.organizationName,
      organizationRegNo: student.organizationRegNo,
      organizationAddress: student.organizationAddress,
      organizationContact: student.organizationContact,

      internshipTopic: currentTopic,

      // Use formatted start (original) and formatted computed end
      internshipStart: formatDate(student.internshipStart),
      internshipEnd: formatDate(internshipEnd),

      durationHours: student.durationHours || 0,
      registrationStatus: student.registrationStatus,
      hasPaid: student.hasPaid,
      payment: student.payment || null,
      attendance: 100,

      /* -------- CURRENT TOPIC PROGRESS -------- */
      currentTopicProgress: currentTopicProgress
        ? {
            topic: currentTopicProgress.topic,
            currentPage: currentTopicProgress.currentPage,
            pagesRead: currentTopicProgress.pagesRead,
            completed: currentTopicProgress.completed,
            assessmentScore:
              currentTopicProgress.assessmentScore || null,
            assessmentDone:
              currentTopicProgress.assessmentDone || false,
            grade: currentTopicProgress.grade || null,
            completedAt: formatDate(
              currentTopicProgress.completedAt
            ),
            certificateIssued:
              currentTopicProgress.certificateIssued || false,
          }
        : null,

      /* -------- ALL TOPIC PROGRESS -------- */
      topicProgress:
        student.topicProgress?.map((p: any) => ({
          topic: p.topic,
          currentPage: p.currentPage,
          pagesRead: p.pagesRead,
          completed: p.completed,
          assessmentScore: p.assessmentScore || null,
          assessmentDone: p.assessmentDone || false,
          grade: p.grade || null,
          completedAt: formatDate(p.completedAt),
        })) || [],
    };

    return NextResponse.json({ ok: true, student: responseStudent });
  } catch (err: any) {
    console.error("GET /api/students/me error:", err);

    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}