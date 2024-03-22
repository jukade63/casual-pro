import { getJobPostsByBusiness } from "@/lib/api-requests/fetchers";
import React from "react";

export default async function History() {
  const completedJobs: JobPost[] = await getJobPostsByBusiness();

  const filteredJobs = completedJobs.filter(
    (jobPost) => jobPost.job?.completed === true
  );
  return (
    <section className="space-y-2">
      <h1 className="text-xl font-semibold">Completed Jobs</h1>
      <ul>
        {filteredJobs.length > 0 &&
          filteredJobs.map((job) => (
            <li key={job.id} className="bg-green-200 p-3">
              <li>{job.title}</li>
              <h2 className="font-semibold">Workers</h2>
              <ul className="pl-4 ">
                {job.applications?.map((application, index) => (
                  <li className="list-decimal list-inside flex gap-8 items-center" key={application.id}>
                    <p>{index + 1}. {application.worker?.user.username}</p>
                    <button className="bg-yellow-400 py-1 px-2 text-sm rounded-full">Review worker</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
}
