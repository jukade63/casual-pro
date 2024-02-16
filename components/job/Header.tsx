import React from "react";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

type HeaderProps = {
  job: JobPost;
};

export default function Header({ job }: HeaderProps) {
  return (
    <div className="flex flex-col gap-2 p-3 md:w-3/5 h-full">
      <h1 className="text-2xl font-bold text-white">{job.title}</h1>
      <div className="flex gap-2 ">
        <MapPin color="white" size={18}/>
        <div className="text-gray-100 text-sm mb-3">{job.location}</div>
      </div>
      <Button className="max-w-[200px] mt-auto mb-2">APPLY FOR THIS JOB</Button>
    </div>
  );
}
