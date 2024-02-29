import { getJobPostsByBusiness } from "@/lib/apiRequests/fetchers";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import React from "react";
import JobPostCard from "./JobPostCard";

export default async function JobPostList() {
  let jobPosts: JobPost[] = (await getJobPostsByBusiness()) || [];

  jobPosts = jobPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

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
