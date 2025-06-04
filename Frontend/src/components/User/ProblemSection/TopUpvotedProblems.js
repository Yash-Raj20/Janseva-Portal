import React, { useMemo, useRef } from "react";
import ProblemCard from "./ProblemCard";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

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
    const cardWidth = scrollContainerRef.current?.firstChild?.offsetWidth || 300;
    const scrollAmount = direction === "next" ? cardWidth + 16 : -(cardWidth + 16);
    scrollContainerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10 relative">
      <h2 className="text-2xl font-bold text-center text-[#0C2218]">
        Most Frequently Upvoted Problems
      </h2>

      <img
        src="./Logo/signature.svg"
        alt="Underline"
        className="mx-auto mb-8 h-6 w-32 object-contain"
      />

      {topProblems.length === 0 ? (
        <p className="text-gray-500">No top voted problems yet.</p>
      ) : (
        <div>
          <div
            ref={scrollContainerRef}
            className="max-w-[85rem] mx-auto flex gap-4 overflow-hidden pb-4"
          >
            {topProblems.map((problem) => (
              <div
                key={problem._id}
                className="flex-shrink-0 w-4/5 sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/3"
              >
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-4 gap-6">
            <button
              onClick={() => handleScroll("prev")}
              className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-[#0C2218] transition-all"
            >
              <CircleArrowLeft />
            </button>
            <button
              onClick={() => handleScroll("next")}
              className="px-5 py-1 bg-gray-700 text-white rounded hover:bg-[#0C2218] transition"
            >
              <CircleArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopUpvotedProblems;