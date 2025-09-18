"use client";

import Logo from "@/public/images/Logo";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <motion.header
      className="bg-[#4c271d]  shadow-lg"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className=" mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="md:block hidden"></div>
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
