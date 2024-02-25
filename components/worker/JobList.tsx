"use server"
import { getAllJobs } from "@/lib/apiCalls/fetchers";
import { revalidateTag } from "next/cache";
import JobCard from "@/app/worker/JobCard";

export default async function JobList() {
  revalidateTag("all-jobs");
  const jobs: JobPost[] = await getAllJobs();

  return (
    <div className="w-screen">
      <h1 className="text-lg font-semibold text-gray-600 mx-5 md:mx-15 lg:mx-52 mb-2 px-4 py-2 rounded-md bg-slate-200 inline-block">Available Jobs</h1>
      {jobs.map((job) => (
       <JobCard key={job.id} job={job}/>
      ))}
    </div>
  );
}
