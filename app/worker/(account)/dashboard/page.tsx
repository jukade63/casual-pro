
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboard from "@/components/worker/Dashboard";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {

  const session = await getServerSession(authOptions)
  console.log(session);
  

  return (
    <>

    {JSON.stringify(session, null, 2)}
      <Dashboard />
    </>
  );
}
