import React, { useEffect, useState } from "react";
import "./Home.css";
import MissionSection from "../../../components/User/HomeComponent/MissionSection";
import WhyChooseUs from "../../../components/User/HomeComponent/WhyChooseUs";
import OurTeam from "../../../components/User/HomeComponent/OurTeam";
import AllWorks from "../../../components/User/HomeComponent/AllWorks";
import OurBlog from "../../../components/User/HomeComponent/BlogSection";
import Testomonial from "../../../components/User/HomeComponent/Testomonial";
import ProblemCount from "../../../components/User/HomeComponent/ProblemCount";
import MapVisual from "../../../components/User/HomeComponent/MapVisual";
import CallToAction from "../../../components/User/HomeComponent/CallToAction";
import WorkStep from "../../../components/User/HomeComponent/WorkStep";
import FAQSection from "../../../components/User/HomeComponent/FAQ";
import ImpactStories from "../../../components/User/HomeComponent/OurStory";
import TopUpvotedProblems from "../../../components/User/ProblemSection/TopUpvotedProblems";
import axios from "../../../api/User/axios";
import HeroSection from "../../../components/User/HomeComponent/HeroSection";

const Home = () => {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    axios
      .get("/problems")
      .then((res) => {
        setProblems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-[#F4FBF7] min-h-screen flex flex-col font-poppins">
      {/* Hero Section */}
      <div className="relative min-h-[100vh] w-full">
        <HeroSection />
        {/* <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#ffff] to-transparent z-10" /> */}
        <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-[#0C2218] to-transparent z-20" />
      </div>

      {/* Trusted Partners Section */}
      <div className="bg-[#0C2218] w-full flex flex-col justify-center text-white z-10 overflow-hidden">
        <div className="flex flex-col justify-center text-center items-center pt-16">
          <p className="text-xl sm:text-2xl font-semibold uppercase mb-3">
            Associated with Government
          </p>
          <p className="text-sm sm:text-base md:text-md mb-5 sm:mb-8 lg:max-w-4xl text-gray-200">
            Working alongside municipalities and government bodies to build a
            New India—cleaner, smarter, inclusive.
          </p>
        </div>

        <div className="mt-10 mb-16 relative group overflow-hidden">
          <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex gap-10 sm:gap-20 text-lg sm:text-2xl font-semibold px-4 text-[#A8AEAB] cursor-pointer"
              >
                <img
                  src="/PartnersLogo/Co-logo1.png"
                  alt="Partner Logo"
                  className="h-10 w-auto"
                />
                <img
                  src="/PartnersLogo/Co-logo2.png"
                  alt="Partner Logo"
                  className="h-10 w-auto"
                />
                <img
                  src="/PartnersLogo/Co-logo3.png"
                  alt="Partner Logo"
                  className="h-10 w-auto"
                />
                <img
                  src="/PartnersLogo/Co-logo4.png"
                  alt="Partner Logo"
                  className="h-10 w-auto"
                />
                <img
                  src="/PartnersLogo/Co-logo5.png"
                  alt="Partner Logo"
                  className="h-10 w-auto"
                />
                <img
                  src="/PartnersLogo/Co-logo6.png"
                  alt="Partner Logo"
                  className="h-10 w-auto"
                />
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 h-full w-32 sm:w-96 bg-gradient-to-r from-[#0C2218] to-transparent pointer-events-none z-50"></div>
          <div className="absolute right-0 top-0 h-full w-32 sm:w-96 bg-gradient-to-l from-[#0C2218] to-transparent pointer-events-none z-50"></div>
        </div>
      </div>

      {/* LIVE UPDATES */}
      <section className="bg-yellow-100 text-yellow-900 px-4 py-3 text-center font-medium animate-pulse text-sm sm:text-base">
        📢 JanSeva Portal partners with Smart Cities Mission to streamline
        public issue resolution under the Viksit Bharat initiative!
      </section>

      {/* MISSION */}
      <MissionSection />

      {/* How It Works */}
      <WorkStep />

      {/* Top Upvoted Problems */}
      <TopUpvotedProblems problems={problems} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Stats */}
      <ProblemCount />

      {/* Our Community */}
      <OurTeam />

      {/* Impact Stories */}
      <ImpactStories />

      {/* Our Works */}
      <AllWorks />

      {/* Ongoing Initiatives */}
      <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-10 text-center">
        {/* Heading */}
        <div className="mb-12 max-w-2xl mx-auto">
          <img
            src="./Logo/signature.svg"
            alt="Underline"
            className="mx-auto h-6 w-32 object-contain mb-4"
            loading="lazy"
          />
          <p className="text-lg font-medium mb-3 text-[#0C2218] uppercase tracking-wide">
            Our Ongoing Initiatives
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Here are some active projects that are transforming local
            communities.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Clean India Drive – Swachh Bharat Collaboration",
              description:
                "Join hands to report and clean public areas under the Swachh Bharat mission.",
            },
            {
              title: "Smart Drainage Monitoring",
              description:
                "Detect and report clogged drains to prevent urban flooding and waterlogging.",
            },
            {
              title: "Women & Youth Empowerment Cells",
              description:
                "Fostering leadership and skill development for women and youth in communities.",
            },
            {
              title: "Smart Infrastructure",
              description:
                "Upgrading roads, lights, and digital systems to build smarter cities.",
            },
            {
              title: "Clean India Movement",
              description:
                "Mobilizing citizens to keep their neighborhoods clean and eco-friendly.",
            },
            {
              title: "Youth Empowerment",
              description:
                "Enabling young changemakers to lead local development initiatives.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white text-[#0C2218] p-6 rounded-xl shadow-md cursor-pointer border border-[#FFE26A] overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#0C2218] hover:text-white"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 relative z-10">
                {item.title}
              </h3>
              <p className="text-gray-700 relative z-10 text-sm sm:text-base">
                {item.description}
              </p>
              {/* Optional gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2218]/70 via-[#0C2218]/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Articles */}
      <OurBlog />

      {/* FAQ Section */}
      <FAQSection />

      {/* Get in Touch */}
      <section className="contact bg-[#0C2218] py-28 px-4 sm:px-6 lg:px-10 text-center">
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row items-center w-full max-w-[85rem] mx-auto">
          {/* Text Section */}
          <div className="text-start mb-14 lg:mb-0 lg:ml-10 w-full lg:w-[60%]">
            <p className="text-lg font-medium text-white uppercase tracking-wide">
              Get in Touch
            </p>

            {/* Professional SVG underline */}
            <img
              src="./Logo/SignatureWhite.svg"
              alt="Underline"
              className="mb-6 h-6 w-32 object-contain"
            />

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              From streets to infrastructure, we’ve got you covered.
            </h2>

            <p className="text-white max-w-xl">
              Contact us today to experience professional solutions tailored to
              your community’s needs!
            </p>
          </div>

          {/* Button Section */}
          <div className="flex justify-center lg:justify-end w-full lg:w-[40%] mt-8 lg:mt-0">
            <button className="w-full sm:w-auto border rounded-md border-white px-6 py-4 text-white text-sm font-semibold hover:bg-white hover:text-[#0C2218] uppercase transition-all">
              Contact Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testomonial />

      {/* Interactive Map */}
      <MapVisual />

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default Home;
