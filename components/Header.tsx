"use client";

import Logo from "@/public/images/Logo";
import Link from "next/link";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className=" top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 bg-[#b67237] text-white rounded-2xl shadow">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#about"
              className="text-white/90 hover:text-white text-sm md:text-base"
            >
              About Us
            </Link>
            <Link
              href="#faq"
              className="text-white/90 hover:text-white text-sm md:text-base"
            >
              FAQ
            </Link>
            <Link
              href="#ecosystem"
              className="text-white/90 hover:text-white text-sm md:text-base"
            >
              Ecosystem
            </Link>
            <Link
              href="#community"
              className="text-white/90 hover:text-white text-sm md:text-base"
            >
              Community
            </Link>
          </nav>

          {/* Right: CTA + Socials */}
          <div className="flex items-center gap-3">
            <Link
              href="#build"
              className="hidden  items-center  rounded-full bg-white text-[#2b160f] px-4 py-2 text-sm font-semibold hover:bg-white/90 shadow"
            >
              Build on Espresso
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://discord.gg/espresso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/espressosys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/EspressoSystems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
