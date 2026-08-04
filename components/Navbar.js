"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    if (isActive) {
      return "text-zinc-500 pointer-events-none select-none";
    }
    return "text-white transition-colors cursor-pointer";
  };

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
          className={getLinkClass("/projects")}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={getLinkClass("/about")}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={getLinkClass("/contact")}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
