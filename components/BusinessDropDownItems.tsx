import Link from "next/link";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { CreditCard, FilePenLine, User } from "lucide-react";

export default function BusinessDropDownItems() {
  return (
    <>
      <DropdownMenuItem>
        <Link href="/business/job-posts" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/worker/dashbard" className="flex items-center">
          <FilePenLine className="mr-2 h-4 w-4" />
          <span>Request job post</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/worker/applied-jobs" className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
}
