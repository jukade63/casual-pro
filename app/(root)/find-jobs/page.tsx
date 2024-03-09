import React, { Suspense } from "react";
import JobList from "@/components/worker/JobList";
import JobPageHero from "@/components/worker/JopPageHero";
import Pagination from "@/components/Pagination";
import Skeleton from "@/components/worker/Skeleton";
import { randomUUID } from "crypto";
import JobSearch from "@/app/worker/JobSearch";

async function WorkerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <section key={randomUUID()}>
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
