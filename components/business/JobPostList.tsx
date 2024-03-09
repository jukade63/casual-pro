import { getJobPostsByBusiness } from "@/lib/api-requests/fetchers";
import React from "react";
import JobPostCard from "./JobPostCard";

export default async function JobPostList() {
  let jobPosts: JobPost[] = [];
  try {
    jobPosts = await getJobPostsByBusiness()
  } catch (error) {
    console.log(error); 
  }
  const sortedJobPosts = jobPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt!);
    const dateB = new Date(b.createdAt!);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-center my-5">Your post requests</h1>
      {sortedJobPosts.length > 0 &&
        sortedJobPosts.map((jobPost) => (
          <div key={jobPost.id} className="mb-4">
            <JobPostCard jobPost={jobPost} />
          </div>
        ))}
    </div>
  );
}
