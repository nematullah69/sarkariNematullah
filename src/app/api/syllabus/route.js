import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Syllabus from "@/lib/model/Syllabus";

export async function GET() {
  try {
    await connectDB();
    const data = await Syllabus.find({});
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error", error: err.message },
      { status: 500 }
    );
  }
}
