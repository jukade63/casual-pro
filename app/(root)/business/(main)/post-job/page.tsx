import BasicInfo from "@/components/BasicInfo";
import { ActionTabs } from "@/components/business/Actiontabs";
import { JobPostForm } from "@/components/business/JobPostForm";

export default function page() {
  return (
    <section className="mx-auto">
      <BasicInfo />
      <ActionTabs />
      <JobPostForm />
    </section>
  );
}
