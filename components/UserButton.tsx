"use client";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import WorkerDropDownItems from "./WorkerDropDownItems";
import BusinessDropDownItems from "./BusinessDropDownItems";
import Link from "next/link";
import { Button } from "./ui/button";

export function UserButton() {
  const { data: session } = useSession();
  const user = session?.user;
  
  if (!user) {
    return (
      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user?.imgUrl ? (
          <Image
            src={user.imgUrl}
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            alt="user-button"
          />
        ) : (
          <p className="rounded-full cursor-pointer bg-rose-700 text-white w-8 h-8 flex justify-center items-center">
            {user?.username.slice(0, 1).toUpperCase()}
          </p>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {user?.userType === "worker" && <WorkerDropDownItems />}
          {user?.userType === "business" && <BusinessDropDownItems />}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
