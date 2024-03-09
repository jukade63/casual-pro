import { UserButton } from "@/components/UserButton";
import MobileNav from "@/components/worker/MobileNav";
import Navbar from "@/components/worker/Navbar";
import Sidebar from "@/components/worker/Sidebar";
import WorkerMobileNav from "@/components/worker/WorkerMobileNav";
import { getSession } from "@/lib/api-requests/fetchers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  const sessionExpired = session && new Date() > new Date(session?.expires);

  if (sessionExpired) redirect("/sign-in");
  return (
    <div>
      <div className="md:hidden fixed top-3 right-2 z-50">
        <WorkerMobileNav />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        <div className="col-span-1 hidden md:block fixed top-0 left-0">
          <Sidebar />
        </div>
        <div className="col-span-5 p-4 md:ml-[305px]">{children}</div>
      </div>
    </div>
  );
}
