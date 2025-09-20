"use client";

import Logo from "@/public/images/Logo";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <motion.header
      className="bg-[#b67237]  shadow-lg"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className=" mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="md:block hidden">
            <button className="flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-sm  text-white rounded-[3rem] hover:bg-black/90 transition-all duration-300 shadow-lg border border-white/10">
              <span className="font-medium">Join Community</span>
              <svg
                className="w-4 h-4 -rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
          <Logo />

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://discord.gg/espresso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso-text hover:text-espresso-text-secondary transition-colors"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/espressosys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso-text hover:text-espresso-text-secondary transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/EspressoSystems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso-text hover:text-espresso-text-secondary transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
