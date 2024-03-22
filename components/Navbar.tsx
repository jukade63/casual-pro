import React from "react";
import Link from "next/link";
import logo from "../public/logo2.png";
import Image from "next/image";
import NavLinks from "./NavLinks";

async function Navbar() {
  return (
    <div className="">
      <div className="container mx-auto flex items-center p-2">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            className="object-cover rounded-full"
            alt="app-logo"
            width={50}
            height={50}
          />
        </Link>
        <NavLinks />
      </div>
    </div>
  );
}

export default Navbar;
