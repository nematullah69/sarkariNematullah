import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notification from "@/lib/model/Notification";

// ---------------- GET ALL ----------------
export async function GET() {
  await connectDB();
  try {
    const data = await Notification.find({}).sort({ _id: -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ---------------- CREATE ----------------
export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const note = await Notification.create(body);

    return NextResponse.json({
      success: true,
      message: "Notification Created",
      data: note,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
