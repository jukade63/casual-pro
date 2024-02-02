"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const links = [
  { href: "dashboard", text: "Dashboard" },
  { href: "profile", text: "Profile" },
  { href: "work-history", text: "Work History" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-300 shadow-md h-screen flex flex-col gap-4 p-4">
      <Link href="/" className="flex justify-center">
        <Image
          src={"/logo.png"}
          className="object-cover rounded-full"
          alt="app-logo"
          width={100}
          height={100}
        />
      </Link>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            "text-gray-800 p-2 rounded-md hover:text-white hover:underline",
            pathname.includes(link.href) ? "bg-blue-700 text-white hover:text-white hover:no-underline transition-all duration-100" : ""
          )}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
