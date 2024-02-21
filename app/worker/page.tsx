import React from "react";
import Navbar from "@/components/Navbar";
import JobList from "@/components/worker/JobList";
import JobPageHero from "@/components/worker/JopPageHero";
import JobSearch from "./JobSearch";
import { BACKEND_URL } from "@/lib/constants";
import { useJobPost } from "@/hooks/useJobPost";
import FilteredJobList from "@/components/worker/FilteredJobList";
import JobPostCLient from "@/components/๋JobPostCLient";

function WorkerPage() {
  // const {jobPosts} = useJobPost()
 
  return (
    <>
      <Navbar />
      <JobPageHero />
      <JobPostCLient>
        <JobList />
      </JobPostCLient>
      {/* <JobSearch /> */}
      {/* {jobPosts.length > 0 ? <FilteredJobList /> :  */}
      {/* <JobList /> */}
      {/* } */}

    </>
  );
}

export default WorkerPage;
