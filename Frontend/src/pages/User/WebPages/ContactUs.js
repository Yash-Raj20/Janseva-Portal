/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-[#0C2218] font-poppins pt-28 sm:pt-32 md:pt-36 lg:pt-40 py-20 px-6 sm:px-10 lg:px-24"
      style={{ backgroundImage: "url('/assets/PageBg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Contact Us
        </h1>
        <p className="text-gray-800 text-base sm:text-lg max-w-3xl mx-auto">
          We'd love to hear from you. Whether you have a question about
          features, partnerships, or anything else—our team is ready to answer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Head Office</h3>
            <p className="text-gray-700">
              Smart City Department, Block C, Government Complex, New Delhi,
              India - 110001
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-700">support@jansevaportal.gov.in</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-700">+91 99999 88888</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="flex gap-4 text-xl flex-wrap">
              <a href="#">
                <FaFacebookF className="hover:text-blue-800" />
              </a>
              <a href="#">
                <FaTwitter className="hover:text-lime-600" />
              </a>
              <a href="#">
                <FaInstagram className="hover:text-pink-600" />
              </a>
              <a href="#">
                <FaLinkedinIn className="hover:text-blue-600" />
              </a>
              <a href="#">
                <FaGithub className="hover:text-gray-600" />
              </a>
            </div>
          </div>
        </div>

        <form className="bg-white rounded-2xl p-8 shadow-lg text-black space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFE26A]"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFE26A]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFE26A]"
          ></textarea>
          <button className="w-full bg-[#FFE26A] text-[#0C2218] font-semibold py-3 rounded-md hover:bg-[#0C2218] hover:text-white border border-[#FFE26A] transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
