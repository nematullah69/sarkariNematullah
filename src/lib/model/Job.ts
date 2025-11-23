import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    department: String,
    organization: String,
    vacancies: String,
    eligibility: String,
    image: String,
    applicationStart: String,
    applicationEnd: String,
    description: String,

    selectionProcess: [String],
    responsibilities: [String],

    salary: String,
    category: String,
    publishedDate: String,
    status: String,

    importantLinks: [
      {
        label: String,
        url: String,
      },
    ],

    importantDates: {
      notificationDate: String,
      applicationStart: String,
      applicationEnd: String,
      feePaymentDate: String,
      correctionDate: String,
      admitCard: String,
      examDate: String,
      resultDate: String,
    },

    applicationFee: [
      {
        category: String,
        fee: String,
      },
    ],

    examvacancy: String,

    vacancy: [
      {
        postName: String,
        category: String,
        total: String,
      },
    ],

    Salary: [
      {
        postName: String,
        level: String,
        initialPay: String,
      },
    ],

    ageLimit: [
      {
        label: String,
        value: String,
      },
    ],

    keboard: [String],
  },
  { timestamps: true }
);

// Collection name = jobsdata
export default mongoose.models.Job ||
  mongoose.model("Job", JobSchema, "jobsdata");
