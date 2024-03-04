import BasicInfo from "@/components/BasicInfo";
import { ActionTabs } from "@/components/business/Actiontabs";
import { getSession } from "@/lib/api-requests/fetchers";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-2 md:px-0 max-w-3xl mx-auto pb-10">
      <div className="my-5">{children}</div>
    </div>
  );
}
