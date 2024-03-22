import removeFromFavorites from "@/actions/remove-from-favorites";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import { Calendar, MapPin } from "lucide-react";
import React from "react";
import RemoveFavItemButton from "./RemoveFavItemButton";
import { formatDistance } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
          <span className="ml-2 bg-gray-200 px-2 py-1 rounded-md text-gray-500 text-xs">
            will expire in{" "}
            {formatDistance(new Date(jobPost.endDate), new Date(), {
              addSuffix: true,
            })}
          </span>
        </p>
        <p className="text-sm">
          <MapPin size={16} className="inline-block pb-1" />{" "}
          {jobPost.location?.join(", ")}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-y-1 py-2 bg-gray-200 w-full px-2">
          <h3 className="text-md font-semibold">Posted By:</h3>
          <p className="text-sm font-semibold">{business.user.username}</p>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={business.user.imgUrl} />
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs ">email : {business.user.email}</p>
              {business.user.phoneNumber && (
                <p className="text-xs ">phone : {business.user.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <RemoveFavItemButton jobId={job.id} />
      </div>
    </div>
  );
}
