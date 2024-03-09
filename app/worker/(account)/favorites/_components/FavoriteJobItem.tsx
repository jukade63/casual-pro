import removeFromFavorites from "@/actions/remove-from-favorites";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import { Calendar } from "lucide-react";
import React from "react";
import RemoveFavItemButton from "./RemoveFavItemButton";

export default function FavoriteJobItem({ job }: { job: Job }) {
  const { jobPost } = job;
  const { business } = jobPost;
  return (
    <div className="rounded-md shadow-md bg-gradient-to-r from-rose-200 to-violet-200 relative">
      <div className="p-2 space-y-2 ">
        <h2 className="text-lg font-semibold text-center">
          Job Position : {jobPost.title}
        </h2>
        <p className="text-sm">
          <Calendar size={16} className="inline-block pb-1" />{" "}
          {formatDateTimeRange(jobPost.startDate, jobPost.endDate)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-y-1 py-2 bg-gray-200 w-full px-2">
          <h3 className="text-md font-semibold">Posted By:</h3>
          <p className="text-sm font-semibold">{business.user.username}</p>
          <div className="space-y-2 pl-5">
            <p className="text-xs ">email : {business.user.email}</p>
            {business.user.phoneNumber && (
              <p className="text-xs ">phone : {business.user.phoneNumber}</p>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <RemoveFavItemButton jobId={job.id} />
      </div>
    </div>
  );
}
