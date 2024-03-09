"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import Link from "next/link";
import AcceptOrRejectButton from "./AcceptOrRejectButton";

interface JobPostProps {
  jobPost: JobPost;
}

const JobPostCard: React.FC<JobPostProps> = ({ jobPost }) => {
  const { title, description, applications, status } = jobPost;

  const statusColor =
    status === "pending"
      ? "text-orange-500"
      : status === "approved"
      ? "text-green-500"
      : "text-red-500";

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
        Status : <span className={statusColor}>{status}</span>
      </p>
      {applications && applications.length > 0 && (
        <ol className="space-y-2">
          <h2 className="text-md font-semibold mb-2">Applicants</h2>
          {applications?.map((application, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between bg-slate-200 p-2  border-b border-gray-400"
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
                {/* <p className="text-gray-700 mb-2 flex items-center gap-2 pl-3">
                  <Mail color="gray" size={15} />
                  <span className="text-sm">
                    {application.worker?.user.email}
                  </span>
                </p> */}
                {application.worker?.user.phoneNumber && (
                  <p className="text-gray-700 mb-2 flex text-sm items-center gap-2 pl-3">
                    <Phone color="gray" size={20} />
                    <span>{application.worker.user.phoneNumber}</span>
                  </p>
                )}
                {application.worker?.availableFrom &&
                  application.worker.availableTo && (
                    <div className="space-x-4">
                      <span className="text-sm">Available from</span>
                      <span className="text-sm">
                        {formatDateTimeRange(
                          application.worker.availableFrom,
                          application.worker.availableTo
                        ).slice(0, -5)}
                      </span>
                    </div>
                  )}
                {application.status === "accepted" && (
                  <p className="text-green-500 text-sm">Accepted</p>
                )}
                {application.status === "rejected" && (
                  <p className="text-red-500 text-sm">Rejected</p>
                )}
              </div>
              {application.status === "applying" && (
                <div className="flex items-center m-2 gap-2 self-end ">
                  <AcceptOrRejectButton
                    applicationId={application.id}
                    jobPostId={jobPost.id}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
      {applications?.length === 0 && (
        <p className="text-gray-700">No applications yet.</p>
      )}
    </div>
  );
};

export default JobPostCard;
