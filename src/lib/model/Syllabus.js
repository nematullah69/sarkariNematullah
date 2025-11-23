import mongoose from "mongoose";

const SyllabusSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    examName: { type: String, required: true },
    department: String,
    organization: String,
    year: String,
    examType: String,
    syllabusOverview: String,
    subjects: [String],
    keywords: [String],
    examPattern: {
      totalQuestions: String,
      totalMarks: String,
      duration: String,
      negativeMarking: String,
      sections: [
        {
          name: String,
          questions: String,
          marks: String
        }
      ]
    },
    importantNotes: [String],
    downloadLink: String,
    officialWebsite: String,
    category: String,
    lastUpdated: String
  },
  { timestamps: true }
);

// 👉 IMPORTANT: Force collection = syllabusdata
export default mongoose.models.Syllabus ||
  mongoose.model("Syllabus", SyllabusSchema, "syllabusdata");
