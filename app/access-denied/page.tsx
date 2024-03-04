import React from 'react';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center ">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4 ">Access Denied</h2>
        <p className="text-gray-700">Sorry, you do not have permission to access this page.</p>
      </div>
    </div>
  );
}
