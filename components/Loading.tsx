import React from "react";

export default function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-slate-100 h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-5 w-5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-5 w-5 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-5 w-5 bg-rose-600 rounded-full animate-bounce"></div>
    </div>
  );
}
