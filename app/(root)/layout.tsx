import Navbar from "@/components/Navbar";
import { UserButton } from "@/components/UserButton";
import MobileNav from "@/components/worker/MobileNav";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <nav>
      <div className="flex items-center bg-white h-16 px-5 shadow-sm">
        <div className="hidden md:flex">
          <Navbar />
        </div>
        <div className="absolute top-5 right-2 md:hidden z-10">
          <MobileNav />
        </div>
        <div className="ml-auto pr-6 md:pr-0">
          <UserButton />
        </div>
      </div>
      {children}
    </nav>
  );
}
