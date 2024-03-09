import React from "react";
import ApplicationList from "./_components/ApplicationList";

export default async function page() {
  return (
    <div className="mt-5">
      <h1 className="font-semibold">Applied Jobs</h1>
      <ApplicationList/>
    </div>
  );
}
