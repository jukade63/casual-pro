"use client"
import React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";


function Navbar() {

  const pathname  = usePathname();
 
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/worker" className={cn("text-gray-800 hover:text-blue-500", pathname === "/worker" ? "text-blue-500" : "")} >Find jobs</Link>
        <Link href="/business" className={cn("ml-4 text-gray-800 hover:text-blue-500", pathname === "/business" ? "text-blue-500" : "")} >Find candidates</Link>
        <div className="ml-auto">
          <Link href="/how-it-works" className="ml-4 text-gray-800 hover:text-blue-500">How it works</Link>
          <Link href="/about" className="ml-4 text-gray-800 hover:text-blue-500">About</Link>          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
