"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ActionTabs() {
  const pathname = usePathname();

  const currentPathClass =
    "text-blue-600 hover:cursor-default underline underline-offset-4 ";

  return (
    <div className="py-2 shadow-sm bg-gray-200 divide-x divide-gray-400 grid grid-cols-2 rounded-sm">
      <Link
        href="job-posts"
        className={cn(
          "ml-4 text-gray-600 hover:underline hover:underline-offset-4 text-center font-semibold",
          pathname === "/business/job-posts" ? currentPathClass : ""
        )}
      >
        Job Posts
      </Link>
      <Link
        href="post-job"
        className={cn(
          "ml-4 text-gray-600 hover:underline hover:underline-offset-4 text-center font-semibold",
          pathname === "/business/post-job" ? currentPathClass : ""
        )}
      >
        Post a Job
      </Link>
    </div>
  );
}
