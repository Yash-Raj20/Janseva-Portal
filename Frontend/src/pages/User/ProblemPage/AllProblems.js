/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "../../../api/User/axios";
import "../WebPages/Home.css";
import ProblemCard from "../../../components/User/ProblemSection/ProblemCard";

function AllProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [selectedMostUpvotes, setSelectedMostUpvotes] = useState("");

  // Fetch Problems
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("/problems")
      .then((res) => setProblems(res.data))
      .catch(() => setError("Failed to load problems"))
      .finally(() => setLoading(false));
  }, []);

  // Fetch States & Districts from JSONBin.io
  const jsonBinUrl = process.env.REACT_APP_JSON_DATA_URL;
  const jsonBinKey = process.env.REACT_APP_X_MASTER_KEY;

  useEffect(() => {
    const fetchStatesAndDistricts = async () => {
      try {
        const response = await fetch(jsonBinUrl, {
          headers: {
            "X-Master-Key": jsonBinKey,
          },
        });
        const data = await response.json();
        setStates(data.record.states || []);
      } catch (err) {
        console.error("Failed to fetch states and districts:", err);
      }
    };

    fetchStatesAndDistricts();
  }, []);

  const handleClearFilters = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCategory("");
    setSelectedUrgency("");
    setSelectedMostUpvotes("");
  };

  // Filtered & Sorted Problems
  const filteredProblems = problems.filter((problem) => {
    const matchesCategory = selectedCategory ? problem.category === selectedCategory : true;
    const matchesUrgency = selectedUrgency ? problem.urgency === selectedUrgency : true;
    const matchesState = selectedState ? problem.state === selectedState : true;
    const matchesDistrict = selectedDistrict ? problem.district === selectedDistrict : true;
    const matchesShortBy = selectedMostUpvotes ? 
      (selectedMostUpvotes === "Most Upvotes" ? problem.upvotes > 0 : problem.views > 0) : true;

    return matchesCategory && matchesUrgency && matchesState && matchesDistrict && matchesShortBy;
  });

  let sortedProblems = [...filteredProblems];

  if (selectedMostUpvotes === "Most Upvotes") {
    sortedProblems.sort((a, b) => b.upvotes - a.upvotes);
  } else if (selectedMostUpvotes === "Most Views") {
    sortedProblems.sort((a, b) => b.views - a.views);
  }

  return (
    <div className="min-h-screen bg-[#F4FBF7] bg-cover bg-center px-4 sm:px-6 lg:px-12 py-16 lg:py-20 font-poppins">
      <div className="max-w-[85rem] mx-auto lg:mt-20 md:mt-16 sm:mt-14 mt-14">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center text-[#0C2218]">
          Reported Problems
        </h1>
        <p className="max-w-6xl mx-auto text-center text-gray-500 text-base sm:text-lg md:text-md leading-relaxed mb-10">
          Explore the various issues reported by users across different regions.
          From local infrastructure challenges to public utility concerns, this
          section provides a platform for raising awareness and finding
          solutions. Filter by state, category, urgency, and more to discover
          problems that matter to you.
        </p>

        {/* Filters */}
        <div className="relative mb-6">
          <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide">
            <button
              onClick={handleClearFilters}
              className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-br from-amber-400 to-amber-700 text-white font-semibold rounded-lg shadow-md hover:from-[#0C2218] hover:to-[#0C2216] transition-all"
            >
              All Problems
            </button>

            {[
              {
                label: "Category",
                value: selectedCategory,
                setter: setSelectedCategory,
                options: ["water & sanitation", "road & transport", "electricity", "waste management", "public health", "deforestation", "education", "other"],
              },
              {
                label: "Urgency",
                value: selectedUrgency,
                setter: setSelectedUrgency,
                options: ["Low", "Medium", "High", "Critical"],
              },
              {
                label: "State",
                value: selectedState,
                setter: setSelectedState,
                options: states.map((state) => state.state),
              },
              {
                label: "District",
                value: selectedDistrict,
                setter: setSelectedDistrict,
                options: selectedState
                  ? states.find((s) => s.state === selectedState)?.districts || []
                  : [],
                disabled: !selectedState,
              },
              {
                label: "Sort By",
                value: selectedMostUpvotes,
                setter: setSelectedMostUpvotes,
                options: ["Most Upvotes"],
              },
            ].map(({ label, value, setter, options, disabled }) => (
              <div key={label} className="relative flex-shrink-0 max-w-[250px]">
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  disabled={disabled}
                  className={`appearance-none w-full px-4 py-2.5 bg-white/20 border border-[#0C2216] rounded-lg shadow-sm pr-10 focus:outline-none ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">{label}</option>
                  {options.map((opt) => (
                    <option
                      className="text-[#0C2218] hover:bg-gray-200"
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#0C2218]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            ))}

            <button
              onClick={handleClearFilters}
              className="flex-shrink-0 px-5 py-2.5 border-2 border-[#ffe26a] bg-white text-[#0C2218] font-semibold rounded-full hover:bg-gradient-to-br hover:from-red-500 hover:to-red-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Problem Cards */}
        {loading && (
          <p className="text-center text-gray-400 text-lg">
            Loading problems...
          </p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}
        {!loading && !error && sortedProblems.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No problems match your filters.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProblems.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProblems;