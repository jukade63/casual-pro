"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import Link from "next/link";
import AcceptOrRejectButton from "./AcceptOrRejectButton";

interface JobPostProps {
  jobPost: JobPost;
}

const JobPostCard = ({ jobPost }: JobPostProps) => {
  const { title, description, applications, status } = jobPost;

  const statusColor =
    status === "pending"
      ? "bg-orange-500"
      : status === "approved"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div className="bg-slate-200 shadow-sm p-4 rounded-mg space-y-2">
      <Link
        href={`/business/job-posts/${jobPost.id}`}
        className="hover:underline hover:underline-offset-2"
      >
        <h1 className="text-xl font-semibold">{title}</h1>
      </Link>
      <p className="text-gray-500 text-sm truncate">{description}</p>
      <p className="text-gray-600 text-sm bg-rose-200 p-2 inline-block rounded-md">
        {formatDateTimeRange(jobPost.startDate, jobPost.endDate)}
      </p>
      <p className="font-semibold">
       Request status : <span className={`${statusColor} text-sm px-2 py-1 rounded-md text-gray-600`}>{status}</span>
      </p>
      {applications && applications.length > 0 && (
        <ol>
          <h2 className="text-md font-semibold">Applicants</h2>
          {applications?.map((application, index) => {
            return (
              <li
                key={index}
                className="flex justify-between items-center px-4 bg-slate-200"
              >
                <div>
                  <span className="text-sm">{index + 1}.</span>

                  <Link
                    href={`/business/applicants/${application.worker?.id}`}
                    className="text-gray-700 hover:underline hover:underline-offset-2"
                  >
                    <span className="font-semibold text-sm ml-2">
                      {application.worker?.user?.username}
                    </span>
                  </Link>
                </div>
                {application.status === "applying" ? (
                  <div className="flex items-center m-2 gap-2 self-end ">
                    <AcceptOrRejectButton
                      applicationId={application.id}
                      jobPostId={jobPost.id}
                    />
                  </div>
                ) : (
                  <p
                    className={`${
                      application.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    } text-sm`}
                  >
                    {application.status}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      )}
      {applications?.length === 0 && (
        <p className="text-gray-700">No applications yet.</p>
      )}
    </div>
  );
};

export default JobPostCard;
