import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  name: String,
  questions: Number, // Changed to Number
  marks: Number,     // Changed to Number
  duration: String,  // Duration is often a string (e.g., "60 minutes")
}, { _id: false }); // Prevents Mongoose from adding an _id to sub-sections

const AdmitCardSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Added unique constraint
    examName: { type: String, required: true }, // Recommended: make examName required
    examNameS: String,
    organization: String,
    department: String,
    
    releaseDate: Date, // Changed to Date
    examDate: Date,    // Changed to Date (if a single date is used here)
    image: String,

    totalPosts: Number, // Changed to Number

    instructions: [String],
    examGuidelines: [String],
    category: String,

    importantDates: {
      notificationDate: Date,  // Changed to Date
      applicationStart: Date,  // Changed to Date
      lastDateApply: Date,     // Changed to Date
      lastDateFeePayment: Date, // Changed to Date
      correctionLastDate: Date, // Changed to Date
      examCityAvailable: Date,  // Changed to Date
      admitCardDate: Date,     // Changed to Date
      examDate: Date,          // Changed to Date
      resultDateWinterBound: Date, // Changed to Date
    },

    applicationFee: [
      {
        category: String,
        fee: String, // Fee amount is often stored as String (e.g., "₹850")
      },
    ],

    links: {
      admitCard: String,
      officialWebsite: String,
      examDate: String,
      notification: String,
      // You may also want to add 'homepage': String here if needed
    },

    examPattern: {
      totalQuestions: Number, // Changed to Number
      totalMarks: Number,     // Changed to Number
      duration: String,
      negativeMarking: String,

      sections: [SectionSchema], // Using the sub-schema for clarity
    },

    keywords: [String], // Renamed from keboard
  },
  { timestamps: true }
);

export default mongoose.models.AdmitCard ||
  mongoose.model("AdmitCard", AdmitCardSchema, "admitcards");