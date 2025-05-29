import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <svg
          className="mx-auto mb-6 h-16 w-16 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M4.93 4.93a10 10 0 0114.14 14.14M9.17 9.17a4 4 0 015.66 5.66"
          />
        </svg>

        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don't have permission to view this page.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}