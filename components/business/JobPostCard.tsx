import React from "react";
import { Mail, Phone } from "lucide-react";
import { formatDateTimeRange } from "@/lib/formatDateTimeRange";
import { Button } from "../ui/button";
import Link from "next/link";

interface JobPostProps {
  jobPost: JobPost;
}

const JobPostCard: React.FC<JobPostProps> = ({ jobPost }) => {
  const { title, description, applications } = jobPost;

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
      {applications.length > 0 ? (
        <ol className="space-y-2">
          <h2 className="text-md font-semibold mb-2">Applicants</h2>
          {applications.map((application, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between bg-slate-200 p-2  border-b border-gray-400"
            >
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">
                    {index + 1}. {application.worker.user.username}
                  </span>
                </p>
                <p className="text-gray-700 mb-2 flex items-center gap-2 pl-3">
                  <Mail color="gray" size={20} />
                  <span>{application.worker.user.email}</span>
                </p>
                <p className="text-gray-700 mb-2 flex items-center gap-2 pl-3">
                  <Phone color="gray" size={20} />
                  <span>{application.worker.user.phoneNumber}</span>
                </p>
                {application.worker.availableFrom &&
                  application.worker.availableTo && (
                    <div className="space-x-4 text-gray-400">
                      <span>Available from</span>
                      <span>
                        {
                          formatDateTimeRange(
                            application.worker.availableFrom,
                            application.worker.availableTo
                          )[0]
                        }
                      </span>
                      <span>to</span>
                      <span>
                        {
                          formatDateTimeRange(
                            application.worker.availableFrom,
                            application.worker.availableTo
                          )[1]
                        }
                      </span>
                    </div>
                  )}

                {application.status === "accepted" && (
                  <p className="text-green-500">Accepted</p>
                )}
              </div>
              {application.status === "pending" && (
                <div className="flex items-center mb-2 gap-2 self-end">
                  <Button className="px-3 py-1">Accept</Button>
                  <Button className="px-3 py-1" variant="destructive">
                    Decline
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-700">No applications yet.</p>
      )}
    </div>
  );
};

export default JobPostCard;
