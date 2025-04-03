import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="">
      <div className="bg-[#68B0D4] p-7 text-white">
        <div className="max-w-[86rem] mx-auto px-4 flex flex-col  items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex space-x-6 text-xl">
            <a href="#" className="bg-white rounded-full secondary-text p-2 hover:text-gray-200 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white rounded-full secondary-text p-2 hover:text-gray-200 transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-white rounded-full secondary-text p-2 hover:text-gray-200 transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white rounded-full secondary-text p-2 hover:text-gray-200 transition">
              <FaYoutube />
            </a>
          </div>

          {/* Nav links */}
          <div className="text-base flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              Categories
            </a>
            <a href="#" className="hover:underline">
              Seoul
            </a>
            <a href="#" className="hover:underline">
              Procedures
            </a>
            <a href="#" className="hover:underline">
              Blogs
            </a>
          </div>
        </div>
      </div>

      {/* Bottom dark section */}
      <h4 className="bg-slate-700 text-white py-4 text-center">
        ©2025 All rights reserved
      </h4>
    </footer>
  );
};

export default Footer;
