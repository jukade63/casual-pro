import Navbar from "@/components/worker/Navbar";
import Sidebar from "@/components/worker/Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        <div className="col-span-1 hidden md:block">
          <Sidebar />
        </div>
        <div className="col-span-4 relative p-4">{children}</div>
        <div className="absolute top-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
