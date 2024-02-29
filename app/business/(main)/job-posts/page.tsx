import BasicInfo from "@/components/BasicInfo";
import { ActionTabs } from "@/components/business/Actiontabs";
import JobPostList from "@/components/business/JobPostList";

export default function page() {
  return (
    <div className="mx-auto my-5">
      <BasicInfo />
      <ActionTabs />
      <JobPostList />
    </div>
  );
}
