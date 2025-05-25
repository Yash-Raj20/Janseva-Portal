import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Text Section */}
        <div className="flex flex-col justify-center text-start lg:ml-20 lg:pr-10 lg:w-1/2">
          <p className="text-lg font-medium text-[#0C2218] uppercase tracking-wide">
            Why Choose Us
          </p>

          <img
            src="./Logo/signature.svg"
            alt="Underline"
            className="mb-6 h-6 w-32 object-contain"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0C2218] leading-tight mb-6">
            With us, the city becomes cleaner, safer, and more efficient
          </h2>

          <p className="text-base sm:text-lg text-gray-800 mb-4">
            We specialize in providing comprehensive cleaning, waste management,
            and infrastructure maintenance services, designed to keep your city
            spotless, efficient, and running smoothly.
          </p>

          <p className="text-base sm:text-lg text-gray-500 mb-8">
            Our services provide high-quality infrastructure maintenance,
            ranging from cleaning urban areas to maintaining streets and
            sidewalks in good condition.
          </p>

          <div>
            <button className="border-2 border-[#FFE26A] px-6 py-3 text-[#0C2218] text-sm font-semibold bg-[#FFE26A] hover:bg-[#0C2218] hover:text-white transition-all">
              ABOUT US
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:w-1/2 gap-6">
          <div className="flex flex-col sm:flex-row lg:flex-row gap-6">
            <img
              src="/assets/img1.jpg"
              alt="img"
              className="h-auto w-full sm:w-[300px] lg:w-[280px] object-cover lg:mb-5"
            />
            <img
              src="/assets/img1.jpg"
              alt="img"
              className="h-auto w-full sm:w-[300px] lg:w-[280px] object-cover sm:mt-0 lg:mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
