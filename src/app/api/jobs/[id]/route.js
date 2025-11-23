import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/lib/model/Job";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const job = await Job.findOne({ id: params.id });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
