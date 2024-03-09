import BasicInfo from "@/components/BasicInfo";
import { ActionTabs } from "@/components/business/Actiontabs";
import JobPostList from "@/components/business/JobPostList";

export default function page() {
  return (
    <div className="mx-auto">
      <BasicInfo />
      <ActionTabs />
      <JobPostList />
    </div>
  );
}
