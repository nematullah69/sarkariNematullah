// app/api/jobs/route.js

import { connectDB } from "@/lib/db";
import Job from "@/lib/model/Job";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await Job.find({});
    return NextResponse.json(data);  // <-- FIXED (array return)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
