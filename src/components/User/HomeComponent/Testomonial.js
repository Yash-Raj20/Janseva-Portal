import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    logo: "🌿",
    company: "Network GreenCity Ltd",
    content:
      "We were struggling with overflowing waste bins and poorly maintained streets around our commercial complexes. Their waste collection and street cleaning services are top-notch, reliable, and eco-friendly. Highly recommended!",
  },
  {
    id: 2,
    logo: "🌆",
    company: "Manila Urban Development Group",
    content:
      "They transformed our city's sanitation program completely. Great experience and dependable services!",
  },
  {
    id: 3,
    logo: "🌟",
    company: "Cape Town Transit Authority",
    content:
      "The improvement in cleanliness and waste management has been phenomenal. Efficient and responsive team!",
  },
  {
    id: 4,
    logo: "⚡",
    company: "Recharge Community Council",
    content:
      "We're truly satisfied with the green initiative and the way they handle urban waste. Clean, green, and future-focused!",
  },
  {
    id: 5,
    logo: "🏙️",
    company: "EcoBuild Infrastructure Pvt Ltd",
    content:
      "Reliable, innovative and committed to sustainability. Our streets have never looked better!",
  },
];

export default function Testimonial() {
  const [selectedId, setSelectedId] = useState(testimonials[0].id);
  const selected = testimonials.find((t) => t.id === selectedId);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#f3f9f6] py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-lg sm:text-xl text-[#0C2218] font-medium mb-3">
          What Our People Say
        </h3>
        <img
          src="./Logo/signature.svg"
          alt="Underline"
          className="mx-auto mb-8 h-6 w-32 object-contain"
        />
        <div className="relative backdrop-blur-sm bg-white/30 border border-white/20 p-8 rounded-2xl shadow-lg mb-12 transition-all duration-500">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0C2218] leading-relaxed">
            "{selected.content}"
          </p>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-[#FFE26A] rounded-full"></div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-5 gap-6">
          {testimonials.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`flex flex-col items-center transition-all duration-300 p-4 rounded-xl cursor-pointer ${
                selectedId === t.id
                  ? "bg-white shadow-xl scale-110"
                  : "bg-white hover:shadow-md"
              }`}
            >
              <div className="text-2xl mb-2">{t.logo}</div>
              <div className="text-sm text-gray-500 text-center">{t.company}</div>
            </button>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden mt-6">
          <Slider {...sliderSettings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-2">
                <button
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full text-center p-4 rounded-xl transition-all duration-300 ${
                    selectedId === t.id
                      ? "bg-white shadow-xl scale-105"
                      : "bg-white shadow hover:shadow-md"
                  }`}
                >
                  <div className="text-2xl mb-2">{t.logo}</div>
                  <div className="text-sm text-gray-500">{t.company}</div>
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
