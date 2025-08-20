import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-[94rem] mx-auto">
        {/* Text Section */}
        <div className="lg:w-1/2 flex flex-col justify-center text-left">
          <p className="text-lg font-medium text-[#0C2218] uppercase tracking-wide mb-2">
            Why Choose Us
          </p>

          <img
            src="./Logo/signature.svg"
            alt="Underline"
            className="mb-6 h-6 w-32 object-contain"
            loading="lazy"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0C2218] leading-snug mb-6">
            With us, the city becomes cleaner, safer, and more efficient
          </h2>

          <p className="text-base sm:text-lg text-gray-800 mb-4">
            We specialize in comprehensive cleaning, waste management, and infrastructure maintenance services, designed to keep your city spotless, efficient, and running smoothly.
          </p>

          <p className="text-base sm:text-lg text-gray-500 mb-8">
            Our services provide high-quality infrastructure maintenance, from cleaning urban areas to maintaining streets and sidewalks in excellent condition.
          </p>

          <button className=" border-2 border-[#FFE26A] px-4 py-2 text-[#0C2218] text-xs sm:text-sm font-semibold bg-[#FFE26A] hover:bg-[#0C2218] hover:text-white rounded-lg transition-all shadow-md hover:shadow-xl">
            ABOUT US
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center gap-6">
          <div className="flex flex-col sm:flex-row lg:flex-row gap-6">
            <img
              src="/assets/img1.jpg"
              alt="City cleaning"
              className="h-auto w-full sm:w-[320px] lg:w-[300px] object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            <img
              src="/assets/img3.jpg"
              alt="Infrastructure maintenance"
              className="hidden md:block h-auto w-full md:w-[320px] lg:w-[300px] object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow md:mt-0 lg:mt-8"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;