import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How can I report an issue?",
    answer:
      "You can report issues through our mobile app, website, or helpline number.",
  },
  {
    question: "Do you work with government bodies?",
    answer:
      "Yes, we collaborate with local municipalities and civic authorities.",
  },
  {
    question: "Is there a cost for reporting a problem?",
    answer:
      "No, reporting problems is completely free of charge.",
  },
  {
    question: "How long does resolution usually take?",
    answer:
      "Resolution time varies by issue but we aim for 24–72 hours.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (!ref) return;

      if (idx === activeIndex) {
        const scrollHeight = ref.scrollHeight;
        ref.style.maxHeight = `${scrollHeight}px`;
        ref.style.opacity = 1;
        ref.style.paddingBottom = "1rem";
        ref.style.transition = "max-height 0.4s ease, opacity 0.3s ease 0.1s";
      } else {
        ref.style.maxHeight = "0px";
        ref.style.opacity = 0;
        ref.style.paddingBottom = "0";
        ref.style.transition = "max-height 0.4s ease, opacity 0.2s ease";
      }
    });
  }, [activeIndex]);

  return (
    <section className="py-20 bg-[#f3f9f6] px-4 sm:px-6 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2218] mb-12 text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg shadow-sm transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
            >
              <span className="text-[#0C2218] font-medium text-base sm:text-lg">
                {faq.question}
              </span>
              {activeIndex === idx ? (
                <FiMinus className="text-[#0C2218] text-xl" />
              ) : (
                <FiPlus className="text-[#0C2218] text-xl" />
              )}
            </button>
            <div
              ref={(el) => (contentRefs.current[idx] = el)}
              className="overflow-hidden px-6 text-gray-600 text-sm sm:text-base"
              style={{
                maxHeight: "0px",
                opacity: 0,
                transition: "max-height 0.4s ease, opacity 0.2s ease",
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}