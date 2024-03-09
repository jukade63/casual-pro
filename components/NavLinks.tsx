"use client";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const current = "text-blue-500 hover:no-underline hover:cursor-default";

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
          key={link.name}
            href={link.route}
            className={cn(
              "ml-4 text-gray-800 hover:underline hover:underline-offset-4",
              isActive && current
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
