import React from "react";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import JobList from "@/components/worker/JobList";

function WorkerPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen items-center max-w-6xl mx-auto">
        <div className="pt-5">
          <div className="flex items-center gap-2">
            <Check size={30} color="#158917" />
            <h1 className="font-semibold text-xl">
              Browse Thousands of Casual Jobs – All in One Place!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Check size={30} color="#158917" />
            <h1 className="font-semibold text-xl">
              Work on Your Terms: Choose When and Where You Want to Work.
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Check size={30} color="#158917" />
            <h1 className="font-semibold text-xl">
              Join Now for Free and Start Your Casual Job Journey!
            </h1>
          </div>
        </div>
        <Link href="worker/sign-up" className={`${buttonVariants()} mt-10`}>
          Sign up
        </Link>
        <div className="mt-10">
          <JobList />
        </div>
      </div>
    </>
  );
}

export default WorkerPage;
