import BasicInfo from "@/components/BasicInfo";
import Navbar from "@/components/Navbar";
import { ActionTabs } from "@/components/business/Actiontabs";
import { getSession } from "@/lib/api-requests/fetchers";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-rose-100">
      <div className="bg-slate-100 px-2 md:px-5 max-w-3xl mx-auto">
        <div className="p-2 md:px-5 md:py-4 max-w-3xl mx-auto pb-10">
          <div className="my-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
