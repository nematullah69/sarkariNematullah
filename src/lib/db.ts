import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error("❌ MONGODB_URI missing");

  try {
    const db = await mongoose.connect(uri, {
      dbName: "jobs",   // ✔ Your actual database name
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected to DB: jobs");
  } catch (error) {
    console.log("❌ MongoDB Error:", error);
  }
};
