import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Syllabus from "@/lib/model/Syllabus";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const id = params.id;

    const data = await Syllabus.findOne({ id });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
