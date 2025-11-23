import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Result from "@/lib/model/Result";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const data = await Result.findOne({ id: params.id });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 }
    );
  }
}
