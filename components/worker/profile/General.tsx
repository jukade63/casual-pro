import React from "react";
import Image from "next/image";

export default function General() {
  return (
    <div className="flex gap-4 items-center">
      <Image src="/aged-care.jpg" alt="profile" width={100} height={100} className="rounded-full"/>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-700">John Doe</h2>
        <div className="text-sm text-gray-600">Email : email@example.com</div>
        <div className="text-sm text-gray-600">Phone Number : +91 1234567890</div>
      </div>
    </div>
  );
}
