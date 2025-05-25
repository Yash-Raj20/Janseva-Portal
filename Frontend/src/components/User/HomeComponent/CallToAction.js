import { Link } from "react-router-dom";
import { FaExclamationCircle, FaHandsHelping } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="bg-[#f3f9f6] text-[#0C2218] text-center py-16 px-6 relative overflow-hidden">

      <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
        Be Part of the Change
      </h2>
      <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 text-gray-700">
        Join us today by reporting a local issue, volunteering, or supporting
        the cause. Every step you take helps build a cleaner, greener tomorrow.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        <Link
          to="/report"
          className="flex items-center justify-center gap-2 bg-[#FFE26A] text-[#0C2218] font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:bg-[#0c2218ea] hover:text-white transition duration-300"
        >
          <FaExclamationCircle className="text-lg" />
          Report a Problem
        </Link>
        <Link
          to="/volunteer"
          className="flex items-center justify-center gap-2 bg-white text-[#0C2218] font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:bg-[#0C2218] hover:text-white transition duration-300"
        >
          <FaHandsHelping className="text-lg" />
          Become a Volunteer
        </Link>
      </div>
    </section>
  );
}