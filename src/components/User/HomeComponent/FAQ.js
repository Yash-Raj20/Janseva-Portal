import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  { question: "How can I report an issue?", answer: "You can report issues through our mobile app, website, or helpline number." },
  { question: "Do you work with government bodies?", answer: "Yes, we collaborate with local municipalities and civic authorities." },
  { question: "Is there a cost for reporting a problem?", answer: "No, reporting problems is completely free of charge." },
  { question: "How long does resolution usually take?", answer: "Resolution time varies by issue but we aim for 24–72 hours." },
  { question: "Can I track the status of my report?", answer: "Yes, you can track your report status via the app or website." },
  { question: "Are volunteers involved in problem resolution?", answer: "Yes, volunteers assist our teams in community projects." },
  { question: "Is my personal info secure?", answer: "Absolutely, we ensure privacy and data security for all users." },
  { question: "Can businesses report issues?", answer: "Yes, both individuals and organizations can report problems." },
  { question: "Do you cover rural areas?", answer: "We focus primarily on urban areas but extend services to selected rural communities." },
  { question: "How can I volunteer?", answer: "You can sign up as a volunteer through our website or app to join local initiatives." },
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
        ref.style.maxHeight = `${scrollHeight + 20}px`; // Add extra space for padding
        ref.style.opacity = 1;
        ref.style.padding = "0 1.5rem 1.5rem 1.5rem";
        ref.style.transition = "max-height 0.5s ease, opacity 0.4s ease, padding 0.4s ease";
      } else {
        ref.style.maxHeight = "0px";
        ref.style.opacity = 0;
        ref.style.padding = "0 1.5rem";
        ref.style.transition = "max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease";
      }
    });
  }, [activeIndex]);

  return (
    <section className="py-20 bg-[#f3f9f6] px-4 sm:px-6 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C2218] mb-14 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
              activeIndex === idx ? "bg-[#FFE26A]/20" : "hover:shadow-2xl"
            }`}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
            >
              <span className="text-[#0C2218] font-medium text-base sm:text-lg">
                {faq.question}
              </span>
              {activeIndex === idx ? (
                <FiMinus className="text-[#0C2218] text-2xl transition-transform duration-300 rotate-180" />
              ) : (
                <FiPlus className="text-[#0C2218] text-2xl transition-transform duration-300" />
              )}
            </button>

            <div
              ref={(el) => (contentRefs.current[idx] = el)}
              className="overflow-hidden text-gray-700 text-sm sm:text-base"
              style={{
                maxHeight: "0px",
                opacity: 0,
                padding: "0 1.5rem",
                transition: "max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease",
              }}
            >
              <p className="mt-0">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
