"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import logo from "../public/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();

  const currentPathClass =
    "text-blue-500 hover:no-underline hover:cursor-default";

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center p-4">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            className="object-cover rounded-full"
            alt="app-logo"
            width={100}
            height={80}
          />
        </Link>
        <Link
          href="/find-jobs"
          className={cn(
            "ml-4 text-gray-800 hover:underline hover:underline-offset-4",
            pathname === "/find-jobs" ? currentPathClass : ""
          )}
        >
          Find jobs
        </Link>
        <Link
          href="/find-workers"
          className={cn(
            "ml-4 text-gray-800 hover:underline hover:underline-offset-4",
            pathname === "/business" ? currentPathClass : ""
          )}
        >
          Find workers
        </Link>
        <Link
          href="/find-workers/#how-it-works"
          className={cn(
            "ml-4 text-gray-800 hover:underline hover:underline-offset-4",
            pathname === "/how-it-works" ? currentPathClass : ""
          )}
        >
          How it works
        </Link>
        <div className="ml-auto flex gap-4 items-center">
          {session && (
            <div className="flex flex-col items-center">
              <span className="text-gray-800 text-xs rounded-sm bg-amber-200 px-2 py-1">
                Logged in as
              </span>
              <span className="capitalize">{session?.user?.username}</span>
            </div>
          )}
          {session ? (
            <Button
              onClick={() => signOut()}
              variant="secondary"
              className="text-sm space-x-2 bg-slate-100 border border-gray-300"
            >
              <span>Sign out</span>

            </Button>
          ) : (
            <Link href="/sign-in">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
