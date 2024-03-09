"use client"
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <div className="flex items-center justify-end p-4 mr-5">
      <Link
        href="/find-jobs"
        className="ml-4 text-gray-800 hover:text-blue-500"
      >
        Find jobs
      </Link>
      <Button className="ml-4" variant="destructive" onClick={() => signOut({callbackUrl: '/'})}>Log out</Button>
    </div>
  );
}

export default Navbar;
