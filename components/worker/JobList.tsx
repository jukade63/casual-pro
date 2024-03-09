import JobCard from "@/app/worker/JobCard";
import { getAllJobs } from "@/lib/api-requests/fetchers";
import { revalidatePath } from "next/cache";

interface PaginationProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function JobList({ searchParams }: PaginationProps) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;
  const location = searchParams.location;
  const category = searchParams.category;
  const jobType = searchParams.jobType;

  const jobPosts: JobPost[] = await getAllJobs(
    page,
    limit,
    location,
    category,
    jobType
  ) || [];

  return (
    <div className="max-w-3xl mx-auto space-y-2">
      {jobPosts.length > 0 && <h1
        className="text-lg font-semibold text-gray-600 px-4 py-2 
      rounded-md bg-slate-200 inline-block"
      >
        Available Jobs
      </h1>}
      {jobPosts.length > 0 && jobPosts.map((jobPost) => (
        <JobCard key={jobPost.id} jobPost={jobPost} />
      ))}
      {jobPosts.length === 0 && (
        <p className="text-center mt-10">No available jobPosts</p>
      )}
    </div>
  );
}
