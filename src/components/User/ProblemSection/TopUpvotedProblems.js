import React, { useMemo, useRef, lazy, Suspense } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const ProblemCard = lazy(() => import("./ProblemCard"));

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
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0C2218] mb-4">
        Most Frequently Upvoted Problems
      </h2>

      <img
        src="./Logo/signature.svg"
        alt="Underline"
        className="mx-auto mb-8 h-6 w-32 object-contain"
        loading="lazy"
      />

      {topProblems.length === 0 ? (
        <p className="text-gray-500 max-w-5xl mx-auto text-center">
          No top voted problems yet.
        </p>
      ) : (
        <div className="relative">
          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="max-w-[94rem] mx-auto flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {topProblems.map((problem) => (
              <div
                key={problem._id}
                className="flex-shrink-0 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
              >
                <Suspense fallback={<div className="h-48 bg-gray-200 rounded animate-pulse" />}>
                  <ProblemCard problem={problem} />
                </Suspense>
              </div>
            ))}
          </div>

          {/* Left & Right Buttons */}
          <button
            onClick={() => handleScroll("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-[#0C2218] text-white rounded-full hover:bg-[#FFE26A] hover:text-[#0C2218] shadow-lg transition z-10"
          >
            <CircleArrowLeft size={28} />
          </button>
          <button
            onClick={() => handleScroll("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-[#0C2218] text-white rounded-full hover:bg-[#FFE26A] hover:text-[#0C2218] shadow-lg transition z-10"
          >
            <CircleArrowRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}

export default TopUpvotedProblems;
