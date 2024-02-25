"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ActionTabs() {
  const pathname = usePathname();

  const currentPathClass =
    "text-blue-500 hover:no-underline hover:cursor-default";

  return (
    <div className="container mx-auto h-16 items-center p-4 flex justify-center gap-16 shadow-sm bg-white">
      <Link
        href="job-posts"
        className={cn(
          "ml-4 text-gray-800 hover:underline hover:underline-offset-4",
          pathname === "/business/job-posts" ? currentPathClass : ""
        )}
      >
        Job Posts
      </Link>
      <Link
        href="post-job"
        className={cn(
          "ml-4 text-gray-800 hover:underline hover:underline-offset-4",
          pathname === "/business/post-job" ? currentPathClass : ""
        )}
      >
        Post a Job
      </Link>
    </div>
  );
}
