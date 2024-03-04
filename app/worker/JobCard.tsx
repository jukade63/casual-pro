import { Card } from "@/components/ui/card";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function JobCard({ job }: { job: JobPost }) {
  return (
    <Card
      key={job.id}
      className="mb-4 mx-auto p-3 flex gap-2 shadow-sm relative"
    >
      <div className="hidden md:flex flex-col justify-center itemes-center border-r border-gray-300">
        <div className="min-w-[200px]">{job?.business?.user.username}</div>
        {/* <div>{job.business.user.imgUrl}</div> */}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div
            className={cn(
              "rounded-full p-1 px-2 font-semibold text-xs border-2",
              {
                "bg-green-200 border-green-600 text-green-600":
                  job.jobType === "part-time",
                "bg-blue-200 border-blue-600 text-blue-600":
                  job.jobType === "casual",
                "bg-purple-200 border-purple-600 text-purple-600":
                  job.jobType === "temporary",
              }
            )}
          >
            {job.jobType}
          </div>
          <div className="flex flex-col items-end">
            <div>฿{job.paymentAmount}</div>
            <div className="text-xs bg-gray-200 text-gray-600 p-1 px-2 rounded-sm">
              {formatDateTimeRange(job.startDate, job.endDate)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-lg">{job.title}</div>
          <div className="flex gap-2 ">
            <Building2 size={15} color="#5ba5e9" />
            <div className="text-sky-500 text-sm mb-3">{job.location}</div>
          </div>
          {/* <div>{job.requirements[0]}</div> */}
          <div>
            {job.requirements.map((requirement) => (
              <span
                className="rounded-md p-1 px-2 ml-1 text-xs bg-slate-100 border border-gray-300"
                key={requirement}
              >
                {requirement}
              </span>
            ))}
          </div>
          <div className="mt-14 text-xs text-gray-500">{job.category}</div>
        </div>
      </div>
      <Link
        href={`/find-jobs/jobs/${job.id}`}
        className="absolute bottom-2 right-2 font-semibold text-xs text-blue-700 p-2 rounded-md border border-gray-300 bg 
    bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
      >
        VIEW JOB
      </Link>
    </Card>
  );
}
