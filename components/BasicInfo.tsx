"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useModal } from "@/hooks/useModalStore";
import { SquarePen } from "lucide-react";

export default function BasicInfo() {
  const { onOpen } = useModal();
  const { data: session } = useSession();

  return (
    <div className="flex gap-4 items-center justify-evenly p-5 bg-rose-700 text-white rounded-sm">
      <div className="flex gap-4 items-center">
        <div className="relative w-20 h-20">
          <Image
            src={session?.user?.imgUrl ?? "/fallback-img.png"}
            alt="profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-white">
            {session?.user?.username || ""}
          </h2>
          <div className="text-sm text-white ">
            Email : {session?.user?.email || ""}
          </div>
          <div className="text-sm text-white">
            Phone Number : {session?.user?.phoneNumber || ""}
          </div>
        </div>
      </div>

      <button onClick={() => onOpen("editProfile", { session })}>
        <SquarePen color="white" size={18} className="inline"/>
      </button>
    </div>
  );
}
