import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const stories = [
  {
    title: "Cleaned 50+ Drainage Lines in Surat",
    description:
      "Our quick response team resolved a major blockage issue in 3 days, improving hygiene for 20k residents.",
    image: "/assets/img1.jpg",
  },
  {
    title: "Revamped Park in Nagpur",
    description:
      "We transformed an abandoned lot into a green park with the help of 30 volunteers.",
    image: "/assets/img4.jpg",
  },
  {
    title: "Restored Streetlights in Patna",
    description:
      "Faulty streetlights were replaced in record time, reducing night-time accidents.",
    image: "/assets/img3.jpg",
  },
];

export default function ImpactStories() {
  return (
    <section className="py-20 bg-[#f3f9f6] px-4 sm:px-6 lg:px-16 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2218]">
        Our Stories
      </h2>
      <img
        src="./Logo/signature.svg"
        alt="Underline"
        className="mx-auto mb-6 h-6 w-32 object-contain"
      />
      <p className="max-w-4xl mx-auto text-base sm:text-lg text-gray-500 mb-10">
        We specialize in providing comprehensive cleaning, waste management, and
        infrastructure maintenance services, designed to keep your city
        spotless, efficient, and running smoothly.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#FFE26A] shadow-md p-4 rounded-lg"
          >
            <LazyLoadImage
              effect="blur"
              src={story.image}
              alt={story.title}
              wrapperClassName="w-full h-48" // key fix
              className="w-full h-48 object-cover mb-4 rounded-md"
            />

            <h3 className="text-lg font-semibold text-[#0C2218] mb-2">
              {story.title}
            </h3>
            <p className="text-gray-600 text-sm">{story.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
