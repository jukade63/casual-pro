import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

export default async function BasicInfo() {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-700">{session?.user?.username}</h2>
        <div className="text-sm text-gray-600">Email : {session?.user?.email}</div>
        <div className="text-sm text-gray-600">Phone Number : {session?.user?.phone_number}</div>
      </div>
    </div>
  );
}
