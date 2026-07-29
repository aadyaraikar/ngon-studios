"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-24 pb-8 px-6 md:px-12 relative z-30">
      {/* Section 1: Typography CTA */}
      <div className="flex justify-start text-left max-w-7xl mx-auto w-full">
        <a
          href="mailto:contact@ngonstudios.com"
          className="text-4xl md:text-5xl lg:text-6xl font-mono tracking-tighter leading-none hover:text-zinc-300 transition-colors uppercase block select-none"
        >
          LET'S CONNECT.
        </a>
      </div>

      {/* Section 2: 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto my-20">
        {/* Column 1: Logo & Tagline */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo white.png"
              alt="NGON Studios Logo"
              width={28}
              height={28}
              className="object-contain w-auto h-7"
            />
            <span className="text-xl font-mono tracking-tighter uppercase font-bold">
              NGON STUDIOS
            </span>
          </div>
          <p className="text-base text-zinc-400 font-sans leading-relaxed max-w-xs">
            A creative agency specializing in 3D animation, motion graphics, and visual effects. Bringing awe-inspiring stories to life.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-zinc-500 font-mono tracking-widest uppercase text-sm font-semibold mb-2">
            Navigation
          </h3>
          <Link
            href="/projects"
            className="font-mono tracking-widest uppercase text-lg text-zinc-300 hover:text-white transition-colors w-fit"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="font-mono tracking-widest uppercase text-lg text-zinc-300 hover:text-white transition-colors w-fit"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-mono tracking-widest uppercase text-lg text-zinc-300 hover:text-white transition-colors w-fit"
          >
            Contact Us
          </Link>
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col gap-3">
          <h3 className="text-zinc-500 font-mono tracking-widest uppercase text-sm font-semibold mb-2">
            Socials
          </h3>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono tracking-widest uppercase text-lg text-zinc-300 hover:text-white transition-colors w-fit"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono tracking-widest uppercase text-lg text-zinc-300 hover:text-white transition-colors w-fit"
          >
            LinkedIn
          </a>
        </div>

        {/* Column 4: Get in touch */}
        <div className="flex flex-col gap-3">
          <h3 className="text-zinc-500 font-mono tracking-widest uppercase text-sm font-semibold mb-2">
            Get in touch
          </h3>
          <a
            href="mailto:contact@ngonstudios.com"
            className="font-mono tracking-widest uppercase text-lg text-zinc-300 hover:text-white transition-colors w-fit break-all"
          >
            contact@ngonstudios.com
          </a>
        </div>
      </div>

      {/* Section 3: Bottom Bar */}
      <div className="pt-8 mt-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono tracking-wider gap-4">
        <span>
          © {new Date().getFullYear()} NGON STUDIOS. ALL RIGHTS RESERVED.
        </span>
        <button
          onClick={scrollToTop}
          className="hover:text-white transition-colors uppercase flex items-center gap-1 cursor-pointer"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
