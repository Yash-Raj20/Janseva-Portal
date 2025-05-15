import React from "react";

const AboutUs = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-[#0C2218] font-poppins pt-28 sm:pt-32 md:pt-36 lg:pt-40 py-20 px-6 sm:px-10 lg:px-24"
      style={{ backgroundImage: "url('/assets/PageBg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          About JanSeva Portal
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-4xl mx-auto">
          JanSeva Portal is a citizen-centric platform created under the Viksit
          Bharat 2047 vision. We aim to bridge the gap between citizens and
          government bodies by empowering people to raise local issues, seek
          redressal, and contribute to building cleaner, smarter, and more
          sustainable cities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-2xl border-l-4 border-[#FFE26A]">
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600">
            To transform urban communities through participatory governance,
            infrastructure enhancement, and digital engagement. We focus on
            amplifying citizen voices and resolving issues efficiently.
          </p>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-2xl border-l-4 border-[#FFE26A]">
          <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Smart grievance redressal system</li>
            <li>Live map-based issue tracking</li>
            <li>Real-time updates & status reports</li>
            <li>Engagement with smart city initiatives</li>
          </ul>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-2xl border-l-4 border-[#FFE26A] md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Vision for 2047</h3>
          <p className="text-gray-600">
            As India approaches its centenary of independence in 2047, JanSeva
            Portal envisions a nation where every citizen has access to
            transparent, accountable, and responsive governance. Our portal aims
            to be a key driver in enabling this transformation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
