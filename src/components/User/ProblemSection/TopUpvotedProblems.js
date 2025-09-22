import React, { useMemo, useRef } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import ProblemCard from "./ProblemCard";

function TopUpvotedProblems({ problems }) {
  const topProblems = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    return [...problems]
      .filter((p) => Array.isArray(p.upvotes))
      .sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0))
      .slice(0, 5);
  }, [problems]);

  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const cardWidth =
      scrollContainerRef.current?.firstChild?.offsetWidth || 300;
    const scrollAmount =
      direction === "next" ? cardWidth + 20 : -(cardWidth + 20);

    scrollContainerRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10 relative">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0C2218] mb-4">
        Most Frequently Upvoted Problems
      </h2>

      <img
        src="./Logo/signature.svg"
        alt="Underline decoration"
        className="mx-auto mb-8 h-6 w-32 object-contain"
        loading="lazy"
      />

      {topProblems.length === 0 ? (
        <p className="text-gray-500 max-w-3xl mx-auto text-center">
          No top voted problems yet.
        </p>
      ) : (
        <div className="relative">
          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="max-w-[90rem] mx-auto flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-hide px-2"
          >
            {topProblems.map((problem) => (
              <div
                key={problem._id}
                className="flex-shrink-0 w-full sm:w-[320px] md:w-[338px] snap-start"
              >
                  <ProblemCard problem={problem} />
              </div>
            ))}
          </div>

          {/* Scroll Buttons */}
          <button
            onClick={() => handleScroll("prev")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-[#0C2218] text-white rounded-full hover:bg-[#FFE26A] hover:text-[#0C2218] shadow-lg transition z-10"
          >
            <CircleArrowLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll("next")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-[#0C2218] text-white rounded-full hover:bg-[#FFE26A] hover:text-[#0C2218] shadow-lg transition z-10"
          >
            <CircleArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default TopUpvotedProblems;
