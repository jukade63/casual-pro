import BasicInfo from "@/components/BasicInfo";
import { ActionTabs } from "@/components/business/Actiontabs";
import { JobPostForm } from "@/components/business/JobPostForm";

export default function page() {
  return (
    <div className="mx-auto my-5">
      <BasicInfo />
      <ActionTabs />
      <JobPostForm />
    </div>
  );
}
