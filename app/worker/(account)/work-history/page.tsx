import { getCompletedJobs } from "@/lib/api-requests/fetchers";
import {
  Bitcoin,
  Building2,
  CalendarDays,
  CheckCircle,
  Navigation,
} from "lucide-react";
import React from "react";

export default async function WorkHistoryPage() {
  
  const completedJobs: Job[] = await getCompletedJobs();
  console.log(completedJobs);
  

  return (
    <div className="mt-5">
      <h1 className="font-bold text-2xl">Latest Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        {completedJobs.map((work, index) => (
          <div key={index} className="mb-4 bg-sky-100 p-4 rounded shadow-sm">
            <h2 className="text-md font-semibold mb-2">{work.jobPost.title}</h2>
            <div className="grid grid-cols-9 items-center">
              <Building2 size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">{work.jobPost.business?.user.username}</p>
              <CalendarDays size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">
                {work.jobPost.startDate} - {work.jobPost.endDate}
              </p>
              <Navigation size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">
                {work.jobPost.location.join(", ")}
              </p>
              <Bitcoin size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">{work.jobPost.paymentAmount}</p>
              <CheckCircle size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">
                {work.completed ? "Completed" : "Not Completed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
