import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function JobCard({ jobPost }: { jobPost: JobPost }) {
  return (
    <Card
      key={jobPost.id}
      className="mb-4 mx-auto p-3 flex gap-2 shadow-sm relative"
    >
      <div className="hidden md:flex md:flex-col md:justify-center md:items-center border-r border-gray-300">
        <div className="min-w-[200px] text-center text-lg font-semibold">
          {jobPost?.business?.user?.username}
        </div>
        <Avatar>
          <AvatarImage src={jobPost?.business?.user?.imgUrl} sizes="4rem" />
          <AvatarFallback>
            <Image
              src="/fallback-img.png"
              alt="profile"
              width={100}
              height={100}
            />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div
            className={cn(
              "rounded-full p-1 px-2 font-semibold text-xs border-2",
              {
                "bg-green-200 border-green-600 text-green-600":
                  jobPost.jobType === "part-time",
                "bg-blue-200 border-blue-600 text-blue-600":
                  jobPost.jobType === "casual",
                "bg-purple-200 border-purple-600 text-purple-600":
                  jobPost.jobType === "temporary",
              }
            )}
          >
            {jobPost.jobType}
          </div>
          <div className="flex flex-col items-end">
            <div>฿{jobPost.paymentAmount}</div>
            <div className="text-xs bg-gray-200 text-gray-600 p-1 px-2 rounded-sm">
              {formatDateTimeRange(jobPost.startDate, jobPost.endDate)}{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="font-bold text-lg">{jobPost.title}</div>
          <div className="flex gap-2 ">
            <Building2 size={15} color="#5ba5e9" />
            <div className="text-sky-500 text-sm mb-3">
              {jobPost.location.join(", ")}
            </div>
          </div>
          <div>
            {jobPost.requirements.map((requirement) => (
              <div className="flex flex-wrap gap-2 mb-1 justify-center">
                <span
                  className="rounded-md p-1 px-2 ml-1 text-xs bg-slate-100 border border-gray-300"
                  key={requirement}
                >
                  {requirement}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-14 text-xs text-gray-500">{jobPost.category}</div>
        </div>
      </div>
      <Link
        href={`/find-jobs/jobs/${jobPost.id}`}
        className="absolute bottom-2 right-2 font-semibold text-xs text-blue-700 p-2 rounded-md border border-gray-300 bg 
    bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
      >
        VIEW JOB
      </Link>
    </Card>
  );
}
