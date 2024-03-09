"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import placeholder from "@/public/worker-placeholder.png";
import { useModal } from "@/hooks/useModalStore";
import { SquarePen } from "lucide-react";

export default function BasicInfo() {
  const { onOpen } = useModal();
  const { data: session } = useSession();


  return (
    <div className="flex gap-4 items-center justify-evenly bg-orange-400 text-white p-5 max-w-3xl rounded-md">
      <div className="flex gap-4 items-center">
        <div className="relative w-20 h-20">
          <Image
            src={session?.user?.imgUrl ?? placeholder}
            alt="profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
     
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-gray-700">
            {session?.user?.username || ""}
          </h2>
          <div className="text-sm text-gray-600">
            Email : {session?.user?.email || ""}
          </div>
          <div className="text-sm text-gray-600">
            Phone Number : {session?.user?.phoneNumber || ""}
          </div>
        </div>
      </div>

      <button onClick={() => onOpen("editProfile", { session })}>
        <SquarePen />
      </button>
    </div>
  );
}
