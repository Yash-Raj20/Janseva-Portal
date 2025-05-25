import React from "react";

const services = [
  {
    title: "Green area care",
    desc: "We handle lawn mowing, tree care, and planting to enhance public spaces.",
    bullets: [
      "Lawn Maintenance & Mowing",
      "Tree & Shrub Care",
      "Seasonal Planting",
      "Irrigation System Maintenance",
    ],
    image: "/assets/img1.jpg",
  },
  {
    title: "Seasonal maintenance",
    desc: "We manage snow removal, de-icing, and leaf cleanup for clear public spaces.",
    bullets: [
      "Leaf Cleanup & Removal",
      "Snow & Ice Removal",
      "Seasonal Planting & Landscaping",
      "Storm Damage Cleanup",
    ],
    image: "/assets/img2.jpg",
  },
  {
    title: "Public area cleaning",
    desc: "Maintenance of parks, squares, beaches, and coasts, including cleaning and removal.",
    bullets: [
      "Park & Square Cleaning",
      "Beach & Coastal Area Maintenance",
      "Greenery Care & Landscaping",
      "Public Facility Upkeep",
    ],
    image: "/assets/img3.jpg",
  },
  {
    title: "Public area cleaning",
    desc: "Maintenance of parks, squares, beaches, and coasts, including cleaning and removal.",
    bullets: [
      "Park & Square Cleaning",
      "Beach & Coastal Area Maintenance",
      "Greenery Care & Landscaping",
      "Public Facility Upkeep",
    ],
    image: "/assets/img4.jpg",
  },
];

const MissionSection = () => {
  return (
    <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10 text-center">
      {/* Heading Section */}
      <div className="text-center mb-14">
        <p className="text-lg font-medium text-[#0C2218] uppercase tracking-wide">
          Our Mission
        </p>

        {/* Professional SVG underline */}
        <img
          src="./Logo/signature.svg"
          alt="Underline"
          className="mx-auto mb-6 h-6 w-32 object-contain"
        />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0C2218] leading-tight mb-6">
          Comprehensive <span className="text-[#f1d35b]">solutions</span> for
          <br className="hidden md:block" />
          infrastructure maintenance
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
          At JanSeva Portal, our mission is to empower every citizen to actively
          participate in India’s development journey by reporting local
          problems, fostering transparency, and promoting collaboration between
          people and governance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-[85rem] mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md overflow-hidden text-left flex flex-col h-full"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-60 object-center object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-[#0C2218] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <ul className="list-disc list-inside text-sm text-gray-500 mb-6 space-y-1">
                {service.bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button className="mt-auto border-2 border-[#FFE26A] px-4 py-2 text-[#0C2218] text-sm font-semibold hover:bg-[#0C2218] hover:text-white transition-all">
                EXPLORE SERVICE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionSection;
