import JobCard from '@/app/worker/JobCard'
import { useJobPost } from '@/hooks/useJobPost'



export default function FilteredJobList() {
  const {jobPosts, setJobPosts} = useJobPost()
  return (
    <div>
      <h1 className='text-lg font-semibold text-gray-600 mx-5 md:mx-15 lg:mx-52 mb-2 px-4 py-2 rounded-md bg-slate-200 inline-block'>Found Jobs</h1>
      {jobPosts.length > 0 ? jobPosts.map((job) => (
        <JobCard key={job.id} job={job} />
      )): <p>No jobs found</p>}

    </div>
  )
}
