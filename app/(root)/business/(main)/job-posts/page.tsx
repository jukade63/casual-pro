import Loading from "@/components/Loading";
import { ActionTabs } from "@/components/business/Actiontabs";
import JobPostList from "@/components/business/JobPostList";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="mx-auto">
      <ActionTabs />
      <Suspense fallback={<Loading/>}>
        <JobPostList />
      </Suspense>
    </div>
  );
}
