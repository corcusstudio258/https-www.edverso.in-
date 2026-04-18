/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/create-order/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import { COURSE_AMOUNT_PAISE } from "@/lib/payment-constants";

const RZP_KEY_ID = process.env.RZP_KEY_ID;
const RZP_KEY_SECRET = process.env.RZP_KEY_SECRET;
if (!RZP_KEY_ID || !RZP_KEY_SECRET) throw new Error("Razorpay keys not set");

const razorpay = new Razorpay({
  key_id: RZP_KEY_ID,
  key_secret: RZP_KEY_SECRET,
});

export async function POST(req: Request) {
  try {
    const { studentId } = await req.json();
    if (!studentId) return NextResponse.json({ error: "studentId required" }, { status: 400 });

    await dbConnect();
    const student = await Student.findById(studentId);
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

    // if already paid
    if (student.hasPaid) return NextResponse.json({ error: "Already paid" }, { status: 400 });

    const amountInPaise = COURSE_AMOUNT_PAISE;

    // create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `edverso_${studentId}`,
      payment_capture: true,
    });

    const orderAmount =
      typeof order.amount === "string" ? Number(order.amount) : order.amount ?? amountInPaise;

    // save order id on student (payment pending)
    student.payment = {
      orderId: order.id,
      amount: orderAmount,
      status: "pending",
    };
    
    await student.save();

    return NextResponse.json({
      ok: true,
      key: RZP_KEY_ID,
      order: {
        id: order.id,
        amount: orderAmount,
        currency: order.currency,
      },
    });
  } catch (err: any) {
    console.error("create-order error", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
