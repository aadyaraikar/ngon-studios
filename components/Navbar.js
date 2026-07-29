"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-12 py-8 flex justify-between items-center z-[100] bg-transparent ${
        pathname === "/" ? "-translate-y-full global-navbar" : "translate-y-0"
      }`}
    >
      {/* Logo group */}
      <Link href="/#about-studio" className="flex items-center gap-3 cursor-pointer">
        <Image
          src="/images/logo white.png"
          alt="NGON Studios Logo"
          width={32}
          height={32}
          className="object-contain w-auto h-8"
        />
        <span className="text-3xl md:text-4xl tracking-tighter uppercase font-mono mt-1">
          NGON Studios
        </span>
      </Link>

      {/* Links */}
      <div className="flex gap-8 text-3xl md:text-4xl tracking-wide uppercase font-mono">
        <Link
          href="/projects"
          className="hover:text-zinc-400 transition-colors cursor-pointer"
        >
          Projects
        </Link>
        <Link
          href="/about"
          className="hover:text-zinc-400 transition-colors cursor-pointer"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-zinc-400 transition-colors cursor-pointer"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
