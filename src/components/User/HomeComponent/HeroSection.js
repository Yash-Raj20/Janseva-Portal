import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/assets/img1.jpg",
    title: "JanSeva Portal",
    subtitle: "Empowering Local Communities",
    description:
      "Our portal focuses on solving local area problems, supporting initiatives aligned with the Viksit Bharat goals. We’ve worked in multiple regions to bring real change.",
  },
  {
    image: "/assets/img3.jpg",
    title: "Local Impact in 5 Areas",
    subtitle: "Community Development",
    description:
      "We implemented targeted solutions in 5 key areas, addressing issues from sanitation to education, ensuring measurable progress in each locality.",
  },
  {
    image: "/assets/img4.jpg",
    title: "Sustainable Solutions",
    subtitle: "Long-term Growth",
    description:
      "Our approach ensures sustainability, empowering local citizens to take ownership and continue improvements independently.",
  },
  {
    image: "/assets/Team2.png",
    title: "Team Efforts",
    subtitle: "Dedicated Volunteers",
    description:
      "A committed team of volunteers collaborated with local communities to understand challenges and implement effective solutions.",
  },
  {
    image: "/assets/Team1.png",
    title: "Visible Results",
    subtitle: "Highlights of Achievements",
    description:
      "From improved infrastructure to educational initiatives, these highlights showcase the tangible positive outcomes of our work.",
  },
];

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Auto sliding every 8s (adjust as needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-poppins text-white">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out 
          ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            filter: `brightness(0.9)`,
          }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center mt-8 p-8">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 sm:p-8">
          <p className="text-xl sm:text-2xl font-light mb-2">
            {slides[currentSlide].title}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            {slides[currentSlide].subtitle}
          </h1>
          <p className="text-base sm:text-lg mb-8 max-w-lg">
            {slides[currentSlide].description}
          </p>
          <div className="flex space-x-4">
            <Link to="/about-us" className="border-2 border-white text-white font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-[#0C2218] transition-colors">
              Read More
            </Link>
            <Link to="/submit" className="bg-white text-[#0C2218] font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition-colors">
              Raise Your Problem
            </Link>
          </div>
        </div>

        {/* Right Side: Thumbnails */}
        <div className="hidden md:flex w-1/2 justify-center items-center space-x-4 h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-1/6 rounded-md overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer 
              ${index === currentSlide ? "h-[65%] opacity-100" : "h-[55%] opacity-70"}`}
              onClick={() => goToSlide(index)}
            >
              <img
                src={slide.image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover border-2 border-white rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;