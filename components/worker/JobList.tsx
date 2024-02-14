import { Card } from "../ui/card";
import { getAllJobs } from "@/lib/fetchers";
import { Building2 } from "lucide-react";
import { revalidateTag } from "next/cache";

export default async function JobList() {
  revalidateTag("job-posts");
  const jobs: JobPost[] = await getAllJobs();
  const getBackgroundColor = (jobType: string) => {
    switch (jobType) {
      case "casual":
        return "bg-green-500";
      case "part-time":
        return "bg-blue-500";
      case "contract":
        return "bg-yellow-500";
      case "freelance":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="w-screen">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="mb-4 mx-auto p-4 flex gap-2 max-w-[800px] shadow-sm"
        >
          <div className="hidden md:flex flex-col justify-center itemes-center border-r border-gray-300 ">
            <div className="min-w-[200px]">{job.business.user.username}</div>
            {/* <div>{job.business.user.imgUrl}</div> */}
          </div>

          <div className="flex-grow">
            <div className="flex justify-between mb-2">
              <div
                className={`${getBackgroundColor(
                  job.jobType
                )} rounded-full p-1 px-2 text-white text-xs`}
              >
                {job.jobType}
              </div>
              <div>฿{job.paymentAmount}</div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="font-bold">{job.title}</div>
              <div className="flex gap-2 ">
                <Building2 size={20} color="#5ba5e9"/>
                <div className="text-sky-500 text-sm mb-3">{job.location}</div>
              </div>
              {/* <div>{job.requirements[0]}</div> */}
              <div>{job.requirements.map(requirement => <span className="rounded-md p-1 px-2 ml-1 text-xs bg-slate-100 border border-gray-300">{requirement}</span>)}</div>
              <div className="mt-5 text-xs text-gray-500">{job.category}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
