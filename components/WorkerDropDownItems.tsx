import Link from "next/link";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { ClipboardList, GaugeCircle, User } from "lucide-react";

export default function WorkerDropDownItems() {
  return (
    <>
      <DropdownMenuItem>
        <Link href="/worker/profile" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/worker/dashboard" className="flex items-center">
          <GaugeCircle className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/worker/applied-jobs" className="flex items-center">
          <ClipboardList className="mr-2 h-4 w-4" />
          <span>My Jobs</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
}
