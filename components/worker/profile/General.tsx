'use client'
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import placeholder from "@/public/worker-placeholder.png"


export default function General() {
  const {data:session} = useSession()

  console.log({session});
  

  const imgSrc = session?.user?.img_url || placeholder

  return (
    <div className="flex gap-4 items-center">
      <Image src={imgSrc} alt="profile" width={100} height={100} className="rounded-full" />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-700">{session?.user?.username}</h2>
        <div className="text-sm text-gray-600">Email : {session?.user?.email}</div>
        <div className="text-sm text-gray-600">Phone Number : {session?.user?.phone_number}</div>
      </div>
    </div>
  );
}
