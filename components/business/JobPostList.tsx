import { getJobPostsByBusiness } from "@/lib/apiCalls/fetchers";
import { revalidatePath } from "next/cache";
import React from "react";
import JobPostCard from "./JobPostCard";
import Link from "next/link";

export default async function JobPostList() {
  revalidatePath("/business/job-posts");
  const jobPosts: JobPost[] = (await getJobPostsByBusiness()) || [];
  console.log(jobPosts);

  return (
    <div>
      {jobPosts.length > 0 &&
        jobPosts.map((jobPost) => (
          <div key={jobPost.id} className="mb-4">
            <JobPostCard jobPost={jobPost} />
          </div>
        ))}
    </div>
  );
}
