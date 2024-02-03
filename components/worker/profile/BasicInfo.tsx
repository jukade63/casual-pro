import React from "react";
import Image from "next/image";

export default function BasicInfo() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-700">John Doe</h2>
        <div className="text-sm text-gray-600">Email : email@example.com</div>
        <div className="text-sm text-gray-600">Phone Number : +91 1234567890</div>
      </div>
    </div>
  );
}
