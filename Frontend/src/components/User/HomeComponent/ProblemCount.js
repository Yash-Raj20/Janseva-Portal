import React from "react";

const ProblemCount = () => {
  return (
    <section className="bg-gradient-to-b from-[#f3f9f6] to-[#f4e598] py-20 px-4 sm:px-6 lg:px-20 text-center">
      <h2 className="text-lg sm:text-xl font-medium text-[#0C2218] uppercase tracking-wide">
        Our Impact on Problems
      </h2>
      <img
        src="./Logo/signature.svg"
        alt="Underline"
        className="mx-auto mb-10 h-6 w-32 object-contain"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="md:text-start text-center md:pl-8">
          <p className="text-5xl font-semibold text-gray-700">2,500+</p>
          <p className="mt-3 text-sm text-gray-600">
            We’ve resolved over 2,500 community-reported problems.
          </p>
        </div>

        {/* Card 2 */}
        <div className="md:text-start text-center md:pl-8 md:border-l border-gray-400">
          <p className="text-5xl font-semibold text-gray-700">1,200+</p>
          <p className="mt-3 text-sm text-gray-600">
            More than 1,200 volunteers actively involved in solving issues.
          </p>
        </div>

        {/* Card 3 */}
        <div className="md:text-start text-center md:pl-8 md:border-l border-gray-400">
          <p className="text-5xl font-semibold text-gray-700">100+</p>
          <p className="mt-3 text-sm text-gray-600">
            Operating in 100+ cities for cleaner, safer communities.
          </p>
        </div>

        {/* Card 4 */}
        <div className="md:text-start text-center md:pl-8 md:border-l border-gray-400">
          <p className="text-5xl font-semibold text-gray-700">85%</p>
          <p className="mt-3 text-sm text-gray-600">
            We maintain an 85% resolution success rate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemCount;