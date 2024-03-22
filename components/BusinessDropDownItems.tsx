import Link from "next/link";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { FilePenLine, Settings, User } from "lucide-react";

export default function BusinessDropDownItems() {
  return (
    <>
      <DropdownMenuItem>
        <Link href="/business/job-posts" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>My job posts</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/business/post-job" className="flex items-center">
          <FilePenLine className="mr-2 h-4 w-4" />
          <span>Request job post</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/business/settings" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
}
