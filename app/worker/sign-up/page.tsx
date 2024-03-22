import { getSession } from "@/lib/api-requests/fetchers";
import Image from "next/image";
import logo from "../../../public/logo1-5.png"
import { redirect } from "next/navigation";
import React from "react";
import { SignUpForm } from "./_components/SignUpForm";

async function page() {
  const session = await getSession();
  if(session?.user) redirect("/worker/dashboard")
  return (
    <div className="flex flex-col items-center">
      <Image
        src={logo}
        className="object-cover rounded-full"
        alt="app-logo"
        width={100}
        height={100}
      />
      <SignUpForm />
    </div>
  );
}

export default page;
