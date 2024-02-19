"use client"
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import placeholder from "@/public/worker-placeholder.png"
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";


export default function General() {
  const {onOpen} = useModal()
  const {data:session} = useSession()  
  const imgSrc = session?.user?.imgUrl || placeholder

  return (
    <div className="flex gap-4 items-center">
      <Image src={placeholder} alt="profile" width={100} height={100} className="rounded-full" />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-700">{session?.user?.username}</h2>
        <div className="text-sm text-gray-600">Email : {session?.user?.email}</div>
        <div className="text-sm text-gray-600">Phone Number : {session?.user?.phoneNumber}</div>
      </div>
      {/* <Button onClick={()=>onOpen('editProfile', {session})}>Edit</Button>
      <button onClick={()=>onOpen('editProfile')}>modal one</button> */}
      <button onClick={()=>onOpen('modalTwo', {session})}>modal two</button>
    </div>
  );
}
