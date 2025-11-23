import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Job from "@/lib/model/Job";
import AdmitCard from "@/lib/model/AdmitCard";
import Result from "@/lib/model/Result";
import Notification from "@/lib/model/Notification";
import Syllabus from "@/lib/model/Syllabus";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const baseUrl = "https://governmentexam.online";

  // Fetch DB data directly
  const [jobs, admitCards, results, notifications, syllabus] = await Promise.all([
    Job.find({}).lean(),
    AdmitCard.find({}).lean(),
    Result.find({}).lean(),
    Notification.find({}).lean(),
    Syllabus.find({}).lean(),
  ]);

  // Static pages
  const staticRoutes = [
    "",
    "/jobs",
    "/admit-card",
    "/results",
    "/notifications",
    "/syllabus",
  ].map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
  }));

  // Dynamic pages
  const dynamicRoutes = [
    ...jobs.map((i: any) => ({
      url: `${baseUrl}/jobs/${i.id}`,
      lastModified: new Date(),
    })),
    ...admitCards.map((i: any) => ({
      url: `${baseUrl}/admit-card/${i.id}`,
      lastModified: new Date(),
    })),
    ...results.map((i: any) => ({
      url: `${baseUrl}/results/${i.id}`,
      lastModified: new Date(),
    })),
    ...notifications.map((i: any) => ({
      url: `${baseUrl}/notifications/${i.id}`,
      lastModified: new Date(),
    })),
    ...syllabus.map((i: any) => ({
      url: `${baseUrl}/syllabus/${i.id}`,
      lastModified: new Date(),
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
