"use client";
import React from "react";
import JobSearch from "@/app/worker/JobSearch";
import { useJobPost } from "@/hooks/useJobPost";
import FilteredJobList from "./worker/FilteredJobList";

export default function JobPostCLient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { jobPosts } = useJobPost();
  const [isFound, setIsFound] = React.useState(false);
  
  if(jobPosts.length === 0){
    setTimeout(() => {
      setIsFound(true);
    }, 5000);
  }

  return (
    <>
      <JobSearch setIsFound={setIsFound}/>
      {!isFound ? <p className="text-lg text-center">No jobs found</p> : null}
      {jobPosts.length > 0 ? <FilteredJobList /> : children}
    </>
  );
}
