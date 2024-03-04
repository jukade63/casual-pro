import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import JobList from "@/components/worker/JobList";
import JobPageHero from "@/components/worker/JopPageHero";
import JobSearch from "../worker/JobSearch";
import Pagination from "@/components/Pagination";
import Skeleton from "@/components/worker/Skeleton";
import { randomUUID } from "crypto";

async function WorkerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <section key={randomUUID()}>
      <Navbar />
      <JobPageHero />
      <JobSearch />
      <div className="flex justify-center">
        <Pagination searchParams={searchParams} />
      </div>
      <Suspense fallback={<Skeleton/>}>
        <JobList searchParams={searchParams}/>
      </Suspense>
    </section>
  );
}

export default WorkerPage;
