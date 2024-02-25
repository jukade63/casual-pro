"use client";
import React, { useEffect } from "react";
import JobSearch from "@/app/worker/JobSearch";
import { useJobPost } from "@/hooks/useJobPost";
import FilteredJobList from "./worker/FilteredJobList";

export default function JobPostCLient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { jobPosts } = useJobPost();
  const [isFound, setIsFound] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFound(true);
    }, 3000);
  }, [jobPosts]);

  return (
    <>
      <JobSearch setIsFound={setIsFound} />
      {!isFound ? (
        <div className="text-center">
          <p className="text-lg bg-sky-200 text-gray-500 inline-block px-4 py-1 rounded-md">
            No jobs found
          </p>
        </div>
      ) : null}
      {jobPosts.length > 0 ? <FilteredJobList /> : children}
    </>
  );
}
