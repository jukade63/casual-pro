"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { navLinks } from "@/lib/constants";
import { Menu } from "lucide-react";
import AppLogo from "../AppLogo";
import React from "react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="sheet-content sm:w-64">
        <Link href="/" className="flex justify-center">
          <AppLogo width={110} height={80} />
        </Link>

        <ul className="flex flex-col gap-4 mt-10">
          {navLinks.slice(0, 2).map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                className={cn(
                  "flex gap-2 text-white py-1 px-3 rounded-md group",
                  isActive && "bg-white text-gray-700"
                )}
                key={link.route}
              >
                {React.cloneElement(<link.icon />, {
                  style: {
                    stroke: isActive ? "#374151" : "#ffffff",
                    transition: "stroke 0.2s",
                  },
                  size: "20",
                })}
                <Link className="sidebar-link cursor-pointer" href={link.route}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
