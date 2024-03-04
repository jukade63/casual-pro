import React from "react";
import Header from "./job/Header";
import JobPostDetail from "./job/JobPostDetail";
import { getJobById } from "@/lib/api-requests/fetchers";
import BusinessProfile from "./job/BusinessProfile";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";

export default async function SingleJobPost({ id }: { id: string }) {
  revalidateTag("jobById");
  const job: JobPost = await getJobById(+id);
  return (
    <div className="flex flex-col h-screen" key={randomUUID()}>
      <div className="h-2/5 bg-sky-400 px-5 flex">
        <div className="w-3/4">
          <Header job={job} />
        </div>
        <div className="w-1/4 hidden md:flex place-items-center">
          <BusinessProfile profile={job.business} />
        </div>
      </div>
      <JobPostDetail job={job} />
      <h1 className=" font-semibold text-gray-600 md:hidden p-2">About the business</h1>
      <div className="md:hidden bg-slate-400">
        <BusinessProfile profile={job.business} />
      </div>
    </div>
  );
}
