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

const OurTeamGallery = () => {
  return (
    <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10">
      {/* Heading Section */}
      <div className="text-center mb-14 max-w-4xl mx-auto">
        <p className="text-lg font-medium text-[#0C2218] uppercase tracking-wide mb-2">
          Our Community
        </p>
        <img
          src="./Logo/signature.svg"
          alt="Underline"
          className="mx-auto mb-6 h-6 w-32 object-contain"
          loading="lazy"
        />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C2218] leading-tight mb-6">
          The community driving our <br className="hidden md:block" /> mission forward
        </h2>
        <p className="text-base sm:text-lg text-gray-500">
          Our mission is to provide high-quality infrastructure maintenance, from cleaning urban areas to maintaining streets and sidewalks in excellent condition.
        </p>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-96 sm:h-[28rem] lg:h-[32rem] object-cover object-center"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white p-6 flex flex-col justify-end">
              <h3 className="text-xl sm:text-2xl font-semibold">{service.name}</h3>
              <p className="text-sm sm:text-base">{service.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeamGallery;