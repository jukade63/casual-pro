import { getJobPostsByBusiness } from "@/lib/api-requests/fetchers";
import React from "react";
import JobPostCard from "./JobPostCard";

export default async function JobPostList() {
    const jobPosts: JobPost[] = await getJobPostsByBusiness()

  return (
    <div>
      <h1 className="text-xl font-semibold text-center my-5">Your post requests</h1>
      {jobPosts.length > 0 &&
        jobPosts.map((jobPost) => (
          <div key={jobPost.id} className="mb-4">
            <JobPostCard jobPost={jobPost} />
          </div>
        ))}
    </div>
  );
}
