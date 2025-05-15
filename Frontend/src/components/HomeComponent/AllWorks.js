import React from "react";

const services = [
  {
    image: "/assets/WorkImg2.jpg",
    title: "Public park green space enhancement",
    description:
      "A project to green and enhance public parks, creating new recreational spaces for city residents.",
  },
  {
    image: "/assets/WorkImg1.jpg",
    title: "Street lighting improvement initiative",
    description:
      "A project to upgrade and improve street lighting across the city, ensuring safety and energy efficiency.",
  },
];

const AllWorks = () => {
  return (
    <section className="bg-[#0C2218] py-20 px-4 sm:px-6 lg:px-10 text-center">
      {/* Heading Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-16 gap-8 lg:gap-0">
        <div className="text-start w-full lg:w-1/2 md:ml-16">
          <p className="text-lg font-medium text-white uppercase tracking-wide">
            See our best works
          </p>
          <img
            src="./Logo/signatureWhite.svg"
            alt="Underline"
            className="mb-6 h-6 w-32 object-contain"
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight">
            Transforming cities, one project at a time
          </h2>
        </div>
        <div className="w-full lg:w-1/2 flex lg:justify-end">
          <button className="w-full md:mr-16 sm:w-auto lg:w-[30%] border border-white px-6 py-4 text-white text-sm font-semibold hover:bg-white hover:text-[#0C2218] uppercase transition-all">
            All Projects
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative h-[25rem] rounded-lg overflow-hidden group"
          >
            {/* Background Image */}
            <img
              src={service.image}
              loading="lazy"
              effect="blur"
              alt={`Work img ${index + 1}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-6 text-left text-white z-10">
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm mb-4 max-w-sm">{service.description}</p>
              <button className="text-sm font-semibold underline underline-offset-4">
                LEARN MORE →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllWorks;
