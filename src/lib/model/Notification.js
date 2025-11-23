import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    examName: { type: String },
    department: { type: String },
    organization: { type: String },
    releaseDate: { type: String },
    eligibility: { type: String },
    publishedDate: { type: String },
    examDate: { type: String },
    category: { type: String },
    status: { type: String },
    details: { type: String },

    // Important Dates should be an array of objects
    importantDates: [
      {
        label: String,
        date: String,
      },
    ],

    officialLink: { type: String },
  },
  {
    collection: "notificationsData",
  }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
