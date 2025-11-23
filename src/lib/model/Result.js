import mongoose from "mongoose";

// --- Schemas ---
const ImportantDatesSchema = new mongoose.Schema({
  notificationDate: String,
  applicationStart: String,
  lastDateApply: String,
  examDate: String,
  resultDate: String,
});

const VacancySchema = new mongoose.Schema({
  postName: String,
  category: String,
  total: mongoose.Schema.Types.Mixed,
  eligibility: String,
});

const SalarySchema = new mongoose.Schema({
  postName: String,
  level: String,
  initialPay: String,
});

const SalaryDetailsSchema = new mongoose.Schema({
  allowance: String,
  amount: mongoose.Schema.Types.Mixed,
});

const CutoffSchema = new mongoose.Schema({
  category: String,
  range: String,
});

const RRBResultSchema = new mongoose.Schema({
  name: String,
  exam: String,
  status: String,
  statusLink: String,
});

const ApplicationFeeSchema = new mongoose.Schema({
  category: String,
  fee: mongoose.Schema.Types.Mixed,
});

// ------------------------------------------------
// ✅ FINAL FIXED MAIN SCHEMA
// ------------------------------------------------
const ResultSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    examName: { type: String, required: true },
    department: String,
    organization: String,
    resultDate: String,
    year: String,
    status: { type: String, default: "Published" },
    category: String,
    resultDetails: String,

    // IMPORTANT DATES → object (NOT array)
    importantDates: ImportantDatesSchema,

    vacancy: [VacancySchema],
    salary: [SalarySchema],
    salaryDetails: [SalaryDetailsSchema],
    cutoff: [CutoffSchema],
    rrbResultsData: [RRBResultSchema],
    applicationFee: [ApplicationFeeSchema],

    totalPosts: mongoose.Schema.Types.Mixed,
    examvacancy: String,

    keywords: [String],
    officialWebsite: String,
    downloadLink: String,
  },
  {
    timestamps: true,
    collection: "resultsdata",
  }
);

export default mongoose.models.Result ||
  mongoose.model("Result", ResultSchema);
