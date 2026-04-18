/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/verify-cash-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import { internshipDates } from "@/lib/payment-constants";

export async function POST(req: NextRequest) {
  try {
    const { studentId, paymentId } = await req.json();

    if (!studentId || !paymentId) {
      return NextResponse.json(
        { error: "Missing required fields: studentId, paymentId" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find student and check if payment is approved
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check if payment exists and is approved
    if (!student.payment || student.payment.status !== "paid") {
      return NextResponse.json(
        { error: "Payment not approved yet. Please wait for admin approval." },
        { status: 400 }
      );
    }

    // Check if payment ID matches
    if (student.payment.paymentId !== paymentId) {
      return NextResponse.json(
        { error: "Invalid Payment ID. Please check and try again." },
        { status: 400 }
      );
    }

    // Check if student is already marked as paid
    if (!student.hasPaid) {
      student.hasPaid = true;
      student.registrationStatus = "completed";
      
      const { start: internshipStart, end: internshipEnd } = internshipDates();
      student.internshipStart = internshipStart;
      student.internshipEnd = internshipEnd;
      
      await student.save();
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully!",
      student: {
        hasPaid: student.hasPaid,
        internshipStart: student.internshipStart,
        internshipEnd: student.internshipEnd
      }
    });

  } catch (error: any) {
    console.error("Verify cash payment error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}