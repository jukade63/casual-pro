import { getFavoutiteJobs } from "@/lib/api-requests/fetchers";

import FavoriteJobItem from "./_components/FavoriteJobItem";

export default async function page() {

  const favoriteJobs: Job[] = await getFavoutiteJobs()

  return (
    <div className="space-y-4">
      {favoriteJobs?.map((job) => (
        <FavoriteJobItem key={job.id} job={job}/>
      ))}
    </div>
  );
}
