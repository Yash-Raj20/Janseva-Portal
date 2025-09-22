import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F4FBF7] flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <img
          src="/Logo/404.png"
          alt="404 Not Found"
          className="mx-auto mt-8 w-96 h-auto"
        />
        <img
          src="/Logo/signature.svg"
          alt="404 Not Found"
          className="mx-auto mb-3 w-72 h-auto"
        />
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0C2218] mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#FFE26A] hover:bg-[#0C2218] hover:text-white text-[#0C2218] font-medium transition-all border border-[#FFE26A]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
