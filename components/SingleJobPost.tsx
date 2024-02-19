import React from "react";
import Header from "./job/Header";
import JobPostDetail from "./job/JobPostDetail";
import { getJob } from "@/lib/apiCalls/fetchers";


export default async function SingleJobPost({id} : {id: string}) {
  const job: JobPost = await getJob(+id);
  return (
    <div className="flex flex-col h-screen ">
      <div className="h-2/5 bg-sky-400">
        <Header job={job} />
      </div>
      <JobPostDetail job={job}/>
    </div>
  );
}
