// scripts/seed.js
import mongoose from "mongoose";
import Job from "../lib/model/Job.js";
import AdmitCard from "../lib/model/AdmitCard.js";
import Result from "../lib/model/Result.js";
import Notification from "../lib/model/Notification.js";
import Syllabus from "../lib/model/Syllabus.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// -------------------------
// ENV VARIABLES (Add these to your .env.local file)
//
// MONGODB_URI="mongodb+srv://mdchandraj:fTxD2kjKjpsN5pnf@cluster0.nmtpa1c.mongodb.net/jobs?retryWrites=true&w=majority&appName=Cluster0"
// MONGODB_DB="jobs"
// NEXT_PUBLIC_SITE_URL="http://localhost:3000"
// -------------------------
// TODO: Paste your REAL DATA
// -------------------------

const jobsdata = [];
const admitcards = [];
const results = [];
const notificationsData = [];
const syllabusdata = [];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const job of jobsdata) {
      await Job.findOneAndUpdate({ id: job.id }, job, { upsert: true });
      console.log("Saved Job:", job.id);
    }

    for (const card of admitcards) {
      await AdmitCard.findOneAndUpdate({ id: card.id }, card, { upsert: true });
      console.log("Saved AdmitCard:", card.id);
    }

    for (const result of results) {
      await Result.findOneAndUpdate({ id: result.id }, result, { upsert: true });
      console.log("Saved Result:", result.id);
    }

    for (const noti of notificationsData) {
      await Notification.findOneAndUpdate({ id: noti.id }, noti, { upsert: true });
      console.log("Saved Notification:", noti.id);
    }

    for (const syl of syllabusdata) {
      await Syllabus.findOneAndUpdate({ id: syl.id }, syl, { upsert: true });
      console.log("Saved Syllabus:", syl.id);
    }

    console.log("\nSeeding Completed ✔✔✔");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
