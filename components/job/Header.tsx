import React from "react";
import { Button } from "../ui/button";
import { Clock, Globe, MapPin, Wallet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "./ApplyButton";

type HeaderProps = {
  job: JobPost;
};

export default function Header({ job }: HeaderProps) {
  return (
    <div className="flex flex-col gap-2 p-3 md:w-3/5 h-full">
      <h1 className="text-2xl font-bold text-white">{job.title}</h1>
      <p className="text-gray-100 text-sm">
        Industry :{" "}
        <span className="text-blue-700 text-semibold">{job.business?.industry}</span>
      </p>
      <div className="flex flex-wrap gap-x-10">
        <div className="flex gap-2">
          <Globe color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">{job.jobType}</div>
        </div>
        <div className="flex gap-2">
          <Wallet color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">{job.paymentAmount}</div>
        </div>
        <div className="flex gap-2">
          <MapPin color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">{job?.location[2]}</div>
        </div>
        <div className="flex gap-2">
          <Clock color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">
            {formatDistanceToNow(new Date(job.createdAt!), { addSuffix: true })}
          </div>
        </div>
      </div>
      {/* <Button className="max-w-[200px] mt-auto mb-2">APPLY FOR THIS JOB</Button> */}
      <ApplyButton jobPostId={job.id}/>
    </div>
  );
}
