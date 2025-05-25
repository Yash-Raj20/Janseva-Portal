import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    logo: "🌿 Network",
    company: "Network GreenCity Ltd",
    content:
      "We were struggling with overflowing waste bins and poorly maintained streets around our commercial complexes. Their waste collection and street cleaning services are top-notch, reliable, and eco-friendly. Highly recommended!",
  },
  {
    id: 2,
    logo: "🌆 Manila.",
    company: "Manila Urban Development Group",
    content:
      "They transformed our city's sanitation program completely. Great experience and dependable services!",
  },
  {
    id: 3,
    logo: "🌟 C A P E T O W N",
    company: "Cape Town Transit Authority",
    content:
      "The improvement in cleanliness and waste management has been phenomenal. Efficient and responsive team!",
  },
  {
    id: 4,
    logo: "⚡ Recharge",
    company: "Recharge Community Council",
    content:
      "We're truly satisfied with the green initiative and the way they handle urban waste. Clean, green, and future-focused!",
  },
  {
    id: 5,
    logo: "🏙️ EcoBuild",
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
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Tablets and below
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#f3f9f6] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-lg sm:text-xl text-[#0C2218] font-medium">
          What our Peoples say
        </h3>
        <img
          src="./Logo/signature.svg"
          alt="Underline"
          className="mb-8 h-6 w-32 mx-auto object-contain"
        />
        <p className="md:px-20 text-lg sm:text-xl md:text-3xl font-semibold text-[#0C2218] mb-10 leading-relaxed">
          "{selected.content}"
        </p>

        <div className="hidden sm:grid border-t border-gray-300 pt-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {testimonials.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`text-center transition duration-300 px-2 py-2 border-b-2 ${
                selectedId === t.id
                  ? "border-green-700 text-black font-bold"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              <div className="text-base sm:text-lg">{t.logo}</div>
              <div className="text-sm sm:text-[13px] text-gray-500 mt-1">
                {t.company}
              </div>
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
                  className={`w-full text-center transition duration-300 px-4 py-3 rounded-xl border-b-2 ${
                    selectedId === t.id
                      ? "border-green-700 text-black font-bold bg-white shadow"
                      : "border-transparent text-gray-600 hover:text-black bg-white"
                  }`}
                >
                  <div className="text-base">{t.logo}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.company}</div>
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
