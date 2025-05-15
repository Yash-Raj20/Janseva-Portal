import React from "react";
import { FaBook } from "react-icons/fa";

const services = [
  {
    image: "/assets/WorkImg1.jpg",
    title: "Sustainability and waste management",
    desc: "Eco-friendly waste management for cities",
    date: "Apr 15, 2025",
  },
  {
    image: "/assets/WorkImg2.jpg",
    title: "Infrastructure and maintenance",
    desc: "10 ways modern cities stay clean and green",
    date: "March 10, 2025",
  },
];

const OurBlog = () => {
  return (
    <section className="bg-[#f3f9f6] py-24 px-4 sm:px-6 lg:px-10 text-center">
      {/* Heading Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-16 gap-8">
        <div className="text-start w-full lg:w-1/2 md:ml-16">
          <p className="text-lg font-medium text-[#0C2218] uppercase tracking-wide">
            Our Latest Articles
          </p>

          <img
            src="./Logo/signature.svg"
            alt="Underline"
            className="mb-6 h-6 w-32 object-contain"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0C2218] leading-tight">
            Your guide to cleaner, greener communities
          </h2>
        </div>

        <div className="w-full lg:w-1/2 flex lg:justify-end">
          <button className="w-full md:mr-16 sm:w-auto lg:w-[30%] border border-[#0C2218] px-6 py-4 text-[#0C2218] text-sm font-semibold hover:bg-[#0C2218] hover:text-white uppercase transition-all">
            All Articles
          </button>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden text-left flex flex-col"
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-md font-medium uppercase text-[#0C2218] cursor-pointer hover:text-gray-500 transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm uppercase mt-2 sm:mt-0">
                  {service.date}
                </p>
              </div>

              <p className="text-[20px] font-semibold text-[#0C2218] cursor-pointer hover:text-gray-500 transition-all mb-4">
                {service.desc}
              </p>
            </div>

            <img
              src={service.image}
              loading="lazy"
               effect="blur"
              alt="Article Thumbnail"
              className="w-full h-64 object-cover object-center px-6 mb-4"
            />

            <div className="px-6 mb-6">
              <button
                className="w-full sm:w-auto px-4 py-2 border-2 border-[#FFE26A] flex items-center justify-center gap-2 text-[#0C2218] hover:bg-[#0C2218] hover:text-white transition-all text-sm font-semibold"
              >
                <FaBook />
                Read Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurBlog;
