"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    if (isActive) {
      return "text-zinc-500 pointer-events-none select-none";
    }
    return "text-white transition-colors cursor-pointer";
  };

  return (
    <nav
      className={`fixed left-0 w-full px-12 py-1 flex justify-between items-center z-[100] ${
        isProjectsPage ? "top-3" : "top-0"
      } ${
        pathname === "/" ? "-translate-y-full global-navbar" : "translate-y-0"
      } ${isProjectsPage ? "bg-black/10" : "bg-transparent"}`}
    >
      {/* Logo group */}
      <Link href="/#about-studio" className="no-glow flex items-center gap-3 cursor-pointer">
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
          className={`no-glow ${getLinkClass("/projects")}`}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={`no-glow ${getLinkClass("/about")}`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`no-glow ${getLinkClass("/contact")}`}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
