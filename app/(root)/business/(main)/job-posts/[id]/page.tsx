import EditJobPost from "@/components/business/EditJobPost";
import { getJobPostByIdByBusiness} from "@/lib/api-requests/fetchers";

export default async function page({ params }: { params: { id: string } }) {
  let jobPost
  if(params.id){
    jobPost = await getJobPostByIdByBusiness(+params.id);
  }

  return (
    <div>
      <p>Job Post</p>
      <EditJobPost jobPost={jobPost}/>
    </div>
  );
}
