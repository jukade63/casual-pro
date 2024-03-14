import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("@/components/worker/Dashboard"), {
  ssr: false,
});
import { getCompletedJobs } from "@/lib/api-requests/fetchers";
import React from "react";

export default async function page() {
  const jobs: Job[] = await getCompletedJobs();
  const data = jobs.map((job) => ({
    monthYear: new Date(job.jobPost.endDate).toLocaleString(
      "default",
      { month: "short", year: "2-digit" }
    ),
    earning: job.jobPost.paymentAmount,
    completed: job.completed,
  }))
  return (
    <>
      <Dashboard data={data} />
    </>
  );
}
