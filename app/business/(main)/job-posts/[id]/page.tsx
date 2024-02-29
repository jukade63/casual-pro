import EditJobPost from "@/components/business/EditJobPost";
import { getSingleJobPostForBusiness } from "@/lib/apiRequests/fetchers";

export default async function page({ params }: { params: { id: string } }) {
  let jobPost
  if(params.id){
    jobPost = await getSingleJobPostForBusiness(+params.id);
  }

  return (
    <div>
      <p>Job Post</p>
      <EditJobPost jobPost={jobPost}/>
    </div>
  );
}
