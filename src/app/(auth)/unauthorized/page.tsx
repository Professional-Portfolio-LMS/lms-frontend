"use client";

import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! You don't have permission to view this page.
      </p>
      <Link
        href="/"
        className="bg-[#00173d] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
