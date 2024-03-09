import { SignUpForm } from "@/components/worker/SignUpForm";
import { getSession } from "@/lib/api-requests/fetchers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getSession();
  if(session?.user) redirect("/worker/dashboard")
  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/logo.png"}
        className="object-cover rounded-full"
        alt="app-logo"
        width={125}
        height={125}
      />
      <SignUpForm />
    </div>
  );
}

export default page;
