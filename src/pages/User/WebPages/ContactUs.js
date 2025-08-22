/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import axios from "../../../api/User/axios"; // keep your axios instance
import { toast } from "react-toastify"; // keep toast
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

/**
 * Modern, responsive, and performant Contact page for JanSeva
 * - Consistent brand colors: Deep Green (#1A5319), Soft Yellow (#FFE26A), Teal accents (#A8E6CF)
 * - Accessible: proper labels, focus states, reduced-motion support
 * - Light animations with prefers-reduced-motion guard
 * - Optimized: small shadows, lazy embeds, memoized static lists
 */
const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const contactItems = useMemo(
    () => [
      {
        icon: <FaMapMarkerAlt className="text-2xl sm:text-3xl" />,
        title: "Head Office",
        body: (
          <>
            Palika Kendra, Sansad Marg, Hanuman Road Area, <br /> Connaught Place, New Delhi, Delhi 110001
          </>
        ),
      },
      {
        icon: <FaEnvelope className="text-2xl sm:text-3xl" />,
        title: "Email Support",
        body: (
          <a href="mailto:support@jansevaportal.gov.in" className="text-[#1A5319] hover:underline">
            support@jansevaportal.gov.in
          </a>
        ),
      },
      {
        icon: <FaPhoneAlt className="text-2xl sm:text-3xl" />,
        title: "Phone Assistance",
        body: (
          <a href="tel:+919999988888" className="text-[#1A5319] hover:underline">
            +91 99999 88888
          </a>
        ),
      },
      {
        icon: <FaClock className="text-2xl sm:text-3xl" />,
        title: "Business Hours",
        body: (
          <>
            Monday – Friday: 9:00 AM – 5:00 PM (IST)
            <div className="text-gray-500 text-sm">Excluding public holidays</div>
          </>
        ),
      },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();

    // simple email check
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
    if (!name || !emailOk || !subject || !message) {
      toast.error("Please complete all fields with a valid email.");
      return;
    }

    // honeypot (basic spam trap)
    if (String(form.get("_bot_field") || "").length > 0) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "/contact",
        { name, email, subject, message },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        e.currentTarget.reset();
      } else {
        toast.error(res?.data?.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error sending message:", err);
      toast.error("An error occurred while sending your message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fcfb] to-[#edf4f3] text-[#1a362f] pt-24 sm:pt-28 md:pt-32 lg:pt-36 py-12 sm:py-16 px-4 sm:px-8 lg:px-16 overflow-hidden relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#1A5319 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Header */}
        <section className="text-center bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#A8E6CF]/40 text-[#0c2218] text-sm font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-[#1A5319]" /> We're listening
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0C2218] tracking-tight">
            Connect With JanSeva
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto mt-4">
            Your bridge to local governance. We're here to listen, assist, and collaborate.
          </p>
        </section>

        {/* Quick Stats / Social proof */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { k: ">150k", v: "Citizens Served" },
            { k: "12k+", v: "Issues Resolved" },
            { k: "24–48h", v: "Avg. Response" },
            { k: "99.9%", v: "Uptime" },
          ].map((item) => (
            <div key={item.v} className="bg-white/70 border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1A5319]">{item.k}</div>
              <div className="text-gray-600 text-sm sm:text-base">{item.v}</div>
            </div>
          ))}
        </section>

        {/* Main: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info Card */}
          <aside className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9 animate-slide-in-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2218] mb-6">Our Details</h2>
            <ul className="space-y-6">
              {contactItems.map((it) => (
                <li key={it.title} className="flex items-start gap-4">
                  <div className="text-[#1A5319] shrink-0">{it.icon}</div>
                  <div>
                    <div className="text-lg font-semibold text-[#0c2218]">{it.title}</div>
                    <div className="text-gray-700 leading-relaxed">{it.body}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-[#0c2218] mb-4">Follow our journey</h3>
              <div className="flex flex-wrap gap-4 text-xl">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social link"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-gray-600 hover:text-[#1A5319] hover:border-[#1A5319] transition transform hover:scale-105"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Tips / Helper */}
            <div className="mt-10 rounded-xl border border-dashed border-[#A8E6CF] bg-[#A8E6CF]/20 p-5">
              <p className="text-sm text-[#0c2218]"><span className="font-semibold">Tip:</span> Include screenshots and an exact location for faster resolutions.</p>
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9 space-y-6 animate-slide-in-right">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1A5319]">Send us a message</h2>
            <p className="text-center text-gray-600 -mt-2">We aim to respond within 24–48 business hours.</p>

            {/* Honeypot */}
            <input type="text" name="_bot_field" tabIndex="-1" autoComplete="off" className="hidden" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FFE26A] focus:border-transparent outline-none"
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FFE26A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="subject" className="sr-only">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject of your inquiry"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FFE26A] focus:border-transparent outline-none"
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="sr-only">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Type your message here..."
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#FFE26A] focus:border-transparent outline-none resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FFE26A] to-[#f7c948] text-[#0c2218] font-semibold py-3 rounded-lg shadow hover:shadow-md transition transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        {/* FAQ */}
        <section className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-10 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-[#1A5319] mb-2">Quick Answers</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6">Browse our most frequently asked questions for immediate assistance.</p>

          <div className="divide-y divide-gray-200/70 max-w-3xl mx-auto">
            {[
              {
                q: "How do I report an issue on JanSeva Portal?",
                a: "Navigate to the ‘Report Issue’ section after logging in. Provide details, attach photos, and pinpoint the location on the map.",
              },
              {
                q: "What is the typical response time for reported issues?",
                a: "Resolution times vary by complexity, but you can track real‑time status updates on your dashboard.",
              },
              {
                q: "Can I suggest new features for the portal?",
                a: "Absolutely. Use the contact form and choose ‘Feature Suggestion’ as your subject.",
              },
              {
                q: "Is JanSeva Portal available in multiple languages?",
                a: "Currently English and Hindi. We’re expanding language support soon.",
              },
            ].map((item, idx) => (
              <details key={idx} className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer text-lg sm:text-xl font-semibold text-[#0c2218]">
                  <span>{item.q}</span>
                  <svg className="w-6 h-6 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <p className="text-gray-700 mt-2 leading-relaxed pl-1 sm:pl-2">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center gap-2 text-[#1A5319] font-semibold hover:underline">
              Visit our comprehensive FAQ section
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </section>

        {/* Map */}
        <section className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-[#1A5319] mb-6">Locate Our Office</h2>
          <div className="w-full overflow-hidden rounded-2xl border border-gray-200">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="JanSeva Portal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d617100.2231592685!2d76.8388698466422!3d28.79108908515258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd9ad55f21f3%3A0x319c1e70d2bd1f56!2sNew%20Delhi%20Municipal%20Council%20(NDMC)!5e1!3m2!1sen!2sin!4v1755858840934!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-3">Visit us during business hours, or use the form for inquiries.</p>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-[#1A5319] text-white rounded-3xl p-10 shadow-sm hover:shadow transition">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Can't Find What You Need?</h2>
          <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto opacity-90">
            Our support team is ready to provide personalized assistance. Reach out to us directly.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#FFE26A] text-[#1A5319] font-semibold py-3 px-6 rounded-xl hover:bg-yellow-400 transition transform hover:scale-[1.02]">
            Send a Direct Message
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7Z"/></svg>
          </button>
        </section>
      </div>

      {/* Animations and utilities */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes fade-in { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slide-in-left { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slide-in-right { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
          .animate-fade-in { animation: fade-in .8s ease-out both; }
          .animate-slide-in-left { animation: slide-in-left .7s ease-out both; }
          .animate-slide-in-right { animation: slide-in-right .7s ease-out both; }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;