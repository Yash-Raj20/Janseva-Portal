/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import Tooltip from "../Tooltip";

const Footer = () => {
  return (
    <footer className="bg-white text-[#0C2218] pt-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-20">
        {/* Social Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-200 pb-6 mb-8">
          <p className="mb-4 lg:mb-0 text-center lg:text-left font-medium text-base sm:text-lg">
            Get connected with us on social networks:
          </p>
          <div className="flex gap-4 text-xl flex-wrap justify-center">
            <Tooltip text="Facebook">
              <a href="#">
                <FaFacebookF className="hover:text-blue-800" />
              </a>
            </Tooltip>
            <Tooltip text="Twitter">
              <a href="#">
                <FaTwitter className="hover:text-lime-600" />
              </a>
            </Tooltip>
            <Tooltip text="Instagram">
              <a href="#">
                <FaInstagram className="hover:text-pink-600" />
              </a>
            </Tooltip>
            <Tooltip text="LinkedIn">
              <a href="#">
                <FaLinkedinIn className="hover:text-blue-600" />
              </a>
            </Tooltip>
            <Tooltip text="GitHub">
              <a href="#">
                <FaGithub className="hover:text-gray-600" />
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          {/* JanSeva About - Comes first on tablets */}
          <div className="text-center sm:text-left order-1 md:order-1 lg:order-1 col-span-full md:col-span-2 lg:col-span-1">
            <img
              src="/Logo/signature.svg"
              alt="JanSeva Portal"
              className="h-auto w-40 mx-auto lg:mx-0 mb-3"
            />
            <h6 className="uppercase font-bold mb-3">JanSeva Portal</h6>
            <p className="leading-relaxed text-gray-700">
              A vision to transform India into a fully developed nation by its
              100th year of independence. Focused on sustainability, innovation,
              and inclusive growth, Viksit Bharat is building a smarter and
              greener future for all.
            </p>
          </div>

          {/* Our Initiatives */}
          <div className="text-center sm:text-left order-3 md:order-2 lg:order-2">
            <h6 className="uppercase font-bold mb-4">Our Initiatives</h6>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="#" className="hover:text-[#b89e37] transition-all">
                  Smart Cities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b89e37] transition-all">
                  Digital India
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b89e37] transition-all">
                  Green Growth
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b89e37] transition-all">
                  Youth Empowerment
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="text-center sm:text-left order-4 md:order-3 lg:order-3">
            <h6 className="uppercase font-bold mb-4">Useful Links</h6>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a href="/about-us" className="hover:text-[#b89e37]">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-[#b89e37]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b89e37]">
                  Contribute
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b89e37]">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left order-5 md:order-4 lg:order-4">
            <h6 className="uppercase font-bold mb-4">Contact</h6>
            <ul className="space-y-2 text-gray-700">
              <li>📍 Ahmedabad, India 382481</li>
              <li>📧 info@janseva.com</li>
              <li>📞 +91 9876******</li>
              <li>📠 +91 98********</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-10 py-4 border-t border-gray-200 text-xs sm:text-sm">
          © {new Date().getFullYear()} <strong>JanSeva Portal</strong> — Smart &
          Sustainable India | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
