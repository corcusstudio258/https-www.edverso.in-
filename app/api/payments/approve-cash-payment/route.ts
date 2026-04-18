/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/approve-cash-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import {  validateToken, getUserRole} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Admin authentication
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = getUserRole(token);
    if (role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { studentId, action, rejectionReason } = await req.json();

    if (!studentId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: studentId, action" },
        { status: 400 }
      );
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    await dbConnect();

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check if payment is pending cash payment
    if (student.payment?.status !== "pending" || student.payment?.method !== "cash") {
      return NextResponse.json(
        { error: "No pending cash payment found for this student" },
        { status: 400 }
      );
    }

    // In your existing approve-cash-payment API, update the approval section:

if (action === "approve") {
  const paymentId = `CASH${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  student.payment.status = "paid";
  student.payment.paymentId = paymentId;
  await student.save();

  return NextResponse.json({
    success: true,
    message: "Cash payment approved successfully!",
    paymentId: paymentId,
    student: { id: student._id, name: student.fullName }
  });
}else if (action === "reject") {
      // Remove payment record if rejected
      student.payment = undefined;
      await student.save();

      return NextResponse.json({
        success: true,
        message: "Cash payment rejected",
        rejectionReason: rejectionReason || "No reason provided"
      });
    }

  } catch (error: any) {
    console.error("Approve cash payment error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}