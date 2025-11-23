import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AdmitCard from "@/lib/model/AdmitCard";

export async function GET() {
  try {
    await connectDB();

    const data = await AdmitCard.find({}); // Get all admit cards

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
