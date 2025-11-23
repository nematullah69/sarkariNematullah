import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notification from "@/lib/model/Notification";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    // IMPORTANT FIX: Using "id" field from database
    const data = await Notification.findOne({ id }).lean();

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "NOT FOUND",
      });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("API ERROR", error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}
