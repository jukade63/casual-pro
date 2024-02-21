import { SignUpForm } from "@/components/business/SignUpForm";
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
      <SignUpForm />
    </div>
  );
}

export default page;
