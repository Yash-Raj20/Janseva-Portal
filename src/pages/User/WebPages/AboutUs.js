import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fcfb] to-[#edf4f3] text-[#1a362f] font-poppins pt-24 sm:pt-28 md:pt-32 lg:pt-36 py-16 px-4 sm:px-8 lg:px-16 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-56 h-56 bg-[#FFE26A] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#A8E6CF] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-28">
        {/* Hero Section */}
        <section className="text-center py-12 px-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100 transition-all duration-500 hover:scale-[1.01]">
          <span className="text-[#1A5319] text-lg font-semibold mb-3 block">
            Welcome to JanSeva Portal
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-[#0c2218] leading-tight">
            Bridging Dreams. Building Futures.
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed italic">
            "Your voice, our commitment – shaping Viksit Bharat 2047, one
            community at a time."
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/all-problems"
              className="bg-[#1A5319] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#154214] transform hover:scale-105 transition duration-300"
            >
              Discover Our Impact
            </Link>
            <Link
              to="/register"
              className="border border-[#1A5319] text-[#1A5319] bg-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#E0F2F1] transform hover:scale-105 transition duration-300"
            >
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Identity Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#1A5319]">
              The Heart of Citizen Empowerment
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              JanSeva Portal is not just a digital platform; it's a living
              embodiment of the Viksit Bharat 2047 vision. We are shaping a
              future where seamless interaction between citizens and government
              fosters **transparency, accountability, and collective progress.**
            </p>
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-start text-lg">
                <span className="text-[#FFE26A] mr-3">✔</span> Empowering
                Voices: Making it effortless to report issues and provide
                feedback.
              </li>
              <li className="flex items-start text-lg">
                <span className="text-[#A8E6CF] mr-3">✔</span> Driving
                Accountability: Ensuring swift and visible action on concerns.
              </li>
              <li className="flex items-start text-lg">
                <span className="text-[#3D8C84] mr-3">✔</span> Fostering
                Collaboration: Building bridges between citizens and local
                bodies.
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="/assets/Indiamap.png"
              alt="Connected City"
              loading="lazy"
              className="w-full max-w-md object-contain rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1A5319]">
            The Pillars of Our Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Grievance Redressal",
                desc: "Report issues from civic amenities to infrastructure with ease.",
                color: "bg-[#FFE26A]",
              },
              {
                title: "Transparent Progress Tracking",
                desc: "Follow your issues with real-time updates and timelines.",
                color: "bg-[#A8E6CF]",
              },
              {
                title: "Vibrant Community Engagement",
                desc: "Connect, share insights, and drive positive change together.",
                color: "bg-[#3D8C84] text-white",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300 text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${pillar.color}`}
                >
                  <span className="text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#1A5319]">
                  {pillar.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision & Ambition Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-12">
          <h2 className="text-4xl font-bold mb-6 text-[#1A5319] text-center">
            Our Goals & Ambitions
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
            At JanSeva, our ambition is to create a digital ecosystem that not
            only bridges the gap between citizens and governance but also
            inspires collective responsibility. We aim to empower every citizen,
            regardless of their background, with tools and platforms to voice
            concerns, track progress, and co-create sustainable communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold text-[#1A5319] mb-3">
                Short-Term Goals
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  ✔ Enhance accessibility of digital grievance redressal for
                  rural citizens.
                </li>
                <li>
                  ✔ Build intuitive dashboards for transparent issue tracking.
                </li>
                <li>
                  ✔ Strengthen community awareness and participation
                  initiatives.
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold text-[#1A5319] mb-3">
                Long-Term Ambitions
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  ✔ Expand the JanSeva platform nationwide with multilingual
                  support.
                </li>
                <li>
                  ✔ Establish AI-driven governance tools for predictive civic
                  planning.
                </li>
                <li>
                  ✔ Contribute significantly to the vision of Viksit Bharat 2047
                  by fostering transparent, accountable, and inclusive growth.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-8 text-[#1A5319]">
            Meet the Minds Behind the Mission
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
            Our vibrant team comprises passionate innovators, urban planners,
            and public servants united by a vision: a more connected India.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Priya Sharma",
              "Rahul Desai",
              "Dr. Anand Gupta",
              "Sonia Kapoor",
            ].map((name, i) => (
              <div
                key={i}
                className="bg-gray-50/80 rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <img
                  src={`https://randomuser.me/api/portraits/${
                    i % 2 === 0 ? "women" : "men"
                  }/${30 + i}.jpg`}
                  alt={name}
                  loading="lazy"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#A8E6CF] shadow-inner"
                />
                <h4 className="font-bold text-xl text-[#1A5319]">{name}</h4>
                <p className="text-gray-600 text-sm mb-1">
                  {i === 0
                    ? "Lead Architect"
                    : i === 1
                    ? "Community Outreach"
                    : i === 2
                    ? "Urban Strategist"
                    : "Head of Data"}
                </p>
                <p className="text-gray-500 text-xs italic">
                  "Driven for impact."
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#fefefe] rounded-3xl shadow-md p-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#1A5319]">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "This portal has made my life so much easier!",
              "A real game-changer for civic engagement.",
              "Transparent and empowering – I feel heard.",
            ].map((quote, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <p className="text-gray-700 italic mb-4">“{quote}”</p>
                <h4 className="text-[#1A5319] font-semibold">
                  Citizen {i + 1}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[#1A5319] text-white p-12 rounded-3xl shadow-lg hover:scale-[1.01] transition">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Be a Catalyst for Change?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
            Your journey to a cleaner, smarter, and more vibrant India starts
            here.
          </p>
          <button className="bg-[#FFE26A] text-[#1A5319] font-bold py-4 px-10 rounded-full text-lg sm:text-xl hover:bg-yellow-400 transform hover:scale-105 transition duration-300">
            Join the JanSeva Movement
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
