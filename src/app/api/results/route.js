import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Result from "@/lib/model/Result";

export async function GET() {
  try {
    await connectDB();

    const allResults = await Result.find({});

    return NextResponse.json({
      success: true,
      data: allResults,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching results", error: error.message },
      { status: 500 }
    );
  }
}
