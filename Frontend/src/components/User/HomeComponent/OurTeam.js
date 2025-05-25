import React from "react";

const services = [
  {
    name: "Kamal Kundra",
    title: "Environmental Specialist",
    image: "/assets/Team1.png",
  },
  {
    name: "Ratnesh Kumar",
    title: "Operations Manager",
    image: "/assets/Team3.png",
  },
  {
    name: "Sundar Mishra",
    title: "Urban Maintenance Technician",
    image: "/assets/Team2.png",
  },
];

const OurTeam = () => {
  return (
    <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10">
      {/* Heading Section */}
      <div className="text-center mb-14">
        <p className="text-lg font-medium text-[#0C2218] uppercase tracking-wide">
          Our Community
        </p>

        <img
          src="./Logo/signature.svg"
          alt="Underline"
          className="mx-auto mb-6 h-6 w-32 object-contain"
        />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C2218] leading-tight mb-6">
          The community driving our <br className="hidden md:block" /> mission forward
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
          Our mission is to provide high-quality infrastructure maintenance,
          ranging from cleaning urban areas to maintaining streets and sidewalks
          in good condition.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md overflow-hidden flex flex-col"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-80 sm:h-[25rem] lg:h-[30rem] object-cover object-center"
            />
            <div className="py-6 px-5 flex flex-col flex-grow">
              <h3 className="text-[1.5rem] font-semibold text-[#0C2218] mb-1">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.title}</p>

              <button className="mt-auto w-full sm:w-[60%] border-2 border-[#FFE26A] px-4 py-2 text-[#0C2218] text-sm font-semibold bg-transparent hover:bg-[#0C2218] hover:text-white transition-all">
                View Work
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;