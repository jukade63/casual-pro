"use server"
import { Card } from "../ui/card";
import { getAllJobs } from "@/lib/apiCalls/fetchers";
import { Building2 } from "lucide-react";
import { revalidateTag } from "next/cache";
import { cn } from "@/lib/utils";
import { formatDateTimeRange } from "@/lib/formatDateTimeRange";
import Link from "next/link";
import JobCard from "@/app/worker/JobCard";

export default async function JobList() {
  revalidateTag("all-jobs");
  const jobs: JobPost[] = await getAllJobs();

  return (
    <div className="w-screen">
      <h1 className="text-xl font-semibold mb-4">Available Jobs</h1>
      {jobs.map((job) => (
       <JobCard key={job.id} job={job}/>
      ))}
    </div>
  );
}
