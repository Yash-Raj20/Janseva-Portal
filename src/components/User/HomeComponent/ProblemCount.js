import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaUsers, FaCity, FaChartLine } from "react-icons/fa";

const statsData = [
  {
    icon: <FaCheckCircle className="text-[#FFE26A] w-8 h-8 mb-3" />,
    count: 2500,
    suffix: "+",
    description: "Community problems resolved",
  },
  {
    icon: <FaUsers className="text-[#FFE26A] w-8 h-8 mb-3" />,
    count: 1200,
    suffix: "+",
    description: "Active volunteers",
  },
  {
    icon: <FaCity className="text-[#FFE26A] w-8 h-8 mb-3" />,
    count: 100,
    suffix: "+",
    description: "Cities covered",
  },
  {
    icon: <FaChartLine className="text-[#FFE26A] w-8 h-8 mb-3" />,
    count: 85,
    suffix: "%",
    description: "Resolution success rate",
  },
];

const ProblemCount = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  // Simple counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, i) =>
          val < statsData[i].count ? val + Math.ceil(statsData[i].count / 100) : statsData[i].count
        )
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#f3f9f6] to-[#f4e598] py-20 px-4 sm:px-6 lg:px-20 text-center">
      <h2 className="text-lg sm:text-xl font-medium text-[#0C2218] uppercase tracking-wide mb-3">
        Our Impact
      </h2>
      <img
        src="./Logo/signature.svg"
        alt="Underline"
        className="mx-auto mb-12 h-6 w-32 object-contain"
        loading="lazy"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
          >
            {stat.icon}
            <p className="text-4xl sm:text-5xl font-bold text-[#0C2218] mb-2">
              {counts[index]}
              {stat.suffix}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemCount;