import React from "react";

export default function JobPostDetail({ jobPost }: { jobPost: JobPost }) {
  return (
    <div className="px-2 md:px-10 py-5 space-y-5">
      <div>
        <h2 className=" font-semibold text-gray-600">About this role</h2>
        <p className="text-sm">{jobPost.description}</p>
      </div>
      <div>
        <h2 className="font-semibold text-gray-600">Requirements</h2>
        <ul>
          {jobPost.requirements.map((requirement) => (
            <li className="list-disc list-inside pl-2 text-sm">{requirement}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className=" font-semibold text-gray-600">Job Category</h2>
        <p className="text-sm">{jobPost.category}</p>
      </div>
      <div>
        <h2 className=" font-semibold text-gray-600">Location</h2>
        <p className="text-sm">{jobPost.location}</p>
      </div>
    </div>
  );
}
