import React from "react";
import {
  FaRegEdit,
  FaUsersCog,
  FaBroom,
  FaCheckCircle,
  FaCommentDots,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Report Problem",
    description: "Citizens or officials report issues via our platform.",
    icon: (
      <FaRegEdit className="text-4xl text-[#0C2218] mb-4 transition-transform duration-300 transform hover:scale-110" />
    ),
  },
  {
    title: "Assign Team",
    description: "We allocate the right team based on the issue type.",
    icon: (
      <FaUsersCog className="text-4xl text-[#0C2218] mb-4 transition-transform duration-300 transform hover:scale-110" />
    ),
  },
  {
    title: "Clean or Fix",
    description: "Our team addresses the issue promptly and professionally.",
    icon: (
      <FaBroom className="text-4xl text-[#0C2218] mb-4 transition-transform duration-300 transform hover:scale-110" />
    ),
  },
  {
    title: "Confirm Completion",
    description: "We confirm the task is resolved and document it.",
    icon: (
      <FaCheckCircle className="text-4xl text-[#0C2218] mb-4 transition-transform duration-300 transform hover:scale-110" />
    ),
  },
  {
    title: "Feedback",
    description: "Users provide feedback to help us improve.",
    icon: (
      <FaCommentDots className="text-4xl text-[#0C2218] mb-4 transition-transform duration-300 transform hover:scale-110" />
    ),
  },
];

export default function WorkStep() {
  return (
    <section className="py-16 bg-[#f3f9f6] px-4 sm:px-6 lg:px-16 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2218] mb-1">
        How It Works
      </h2>

      <img
        src="./Logo/signature.svg"
        alt="Underline"
        className="mx-auto mb-6 h-6 w-32 object-contain"
        loading="lazy"
      />

      <p className="max-w-5xl mx-auto text-base sm:text-lg text-gray-500 mb-14">
        Our streamlined process ensures that every reported issue is addressed
        quickly and efficiently. From reporting a problem to receiving feedback,
        we make sure citizens and officials stay connected, informed, and
        empowered to improve their community.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            {step.icon}
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-500 text-md max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/submit"
          className="uppercase border-2 border-[#FFE26A] px-6 py-3 text-[#0C2218] text-sm font-semibold bg-[#FFE26A] hover:bg-[#0C2218] hover:text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-xl"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}
