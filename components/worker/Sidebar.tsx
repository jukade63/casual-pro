"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

import AppLogo from "../AppLogo";
import { workerLinks } from "@/lib/constants";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-300 shadow-md h-screen flex flex-col gap-4 p-4">
      <div className="border-b border-gray-400 flex flex-col gap-2 mb-5">
        <Link href='/' className="flex justify-center">
          <AppLogo width={110} height={80}/>
        </Link>
        {workerLinks.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              "flex gap-2 text-gray-600 font-semibold text-sm p-2 rounded-md",
              pathname.includes(link.href)
                ? "bg-blue-700 text-white transition-all duration-100"
                : ""
            )}
          >
            {/* style svg element */}
            {React.cloneElement(<link.icon/>, {
              style: {
                stroke: pathname.includes(link.href) ? "#ffffff" : "#1f2937",
                transition: "stroke 0.2s",
              },
              size: "20",
            })}
            {link.text}
          </Link>
        ))}
      </div>

      <Progress value={33} />
      <p>15% of your profile is complete</p>
      <p className="text-amber-600 text-sm font-semibold">
        Complete your profile to apply for jobs
      </p>
    </div>
  );
}

export default Sidebar;
