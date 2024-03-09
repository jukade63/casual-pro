import { SignInForm } from "@/components/worker/SignInForm";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/logo.png"}
        className="object-cover rounded-full"
        alt="app-logo"
        width={125}
        height={125}
      />
      <SignInForm />
    </div>
  );
}

export default page;
