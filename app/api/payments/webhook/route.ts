/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/payments/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { Student } from "@/models/Student";
import { internshipDates } from "@/lib/payment-constants";

const RZP_WEBHOOK_SECRET = process.env.RZP_WEBHOOK_SECRET;
if (!RZP_WEBHOOK_SECRET) console.warn("RZP_WEBHOOK_SECRET not set; webhook signature won't be checked");

export async function POST(req: Request) {
  try {
    const text = await req.text(); // RAW body required for signature validation
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (RZP_WEBHOOK_SECRET) {
      const expected = crypto.createHmac("sha256", RZP_WEBHOOK_SECRET).update(text).digest("hex");
      if (expected !== signature) {
        console.warn("Webhook signature mismatch");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(text);
    const event = payload.event;

    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const orderId = payment.order_id;

      await dbConnect();
      const student = await Student.findOne({ "payment.orderId": orderId });

      if (student) {
        const { start: internshipStart, end: internshipEnd } = internshipDates();

        student.payment = {
          ...(student.payment ?? {}),
          paymentId: payment.id,
          status: "paid",
        };
        student.hasPaid = true;
        student.registrationStatus = "completed";
        student.internshipStart = internshipStart;
        student.internshipEnd = internshipEnd;

        await student.save();

        console.log(
          `Webhook: marked student ${student._id.toString()} as paid — internship set from ${internshipStart.toDateString()} to ${internshipEnd.toDateString()}`
        );
      } else {
        console.warn("Webhook: no student found for orderId", orderId);
      }
    }

    // Reply OK (important for Razorpay)
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("webhook error", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
