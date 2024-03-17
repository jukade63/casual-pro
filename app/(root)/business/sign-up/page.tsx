import { SignUpForm } from "@/components/business/SignUpForm";
import { getSession } from "@/lib/api-requests/fetchers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function SignUp() {
  const session = await getSession();
  if (session && session.user.userType === "business") redirect("/business/post-job");
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

export default SignUp;
