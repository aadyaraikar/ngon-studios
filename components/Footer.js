"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black text-white px-8 py-10 md:px-16 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          {/* Left Column */}
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-5xl font-teko  uppercase text-white">
              NGON STUDIOS
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed whitespace-normal md:whitespace-nowrap">
              A creative studio exploring worlds between art, technology and storytelling.
            </p>
            <div>
              <a
                href="mailto:ngonstudios.indie@gmail.com"
                className="text-zinc-300 text-lg hover:text-white transition-colors"
              >
                ngonstudios.indie@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column (Socials aligned with email) */}
          <div className="flex flex-wrap gap-6 text-lg text-zinc-300">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              YouTube
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              ArtStation
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end text-base">
          <div>
            <p className="text-zinc-300">© 2026 NGON Studios</p>
            <p className="text-zinc-500 text-base mt-1">Made with curiosity.</p>
          </div>
          <button
            onClick={scrollToTop}
            className="text-base text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            back to top
          </button>
        </div>
      </div>
    </footer>
  );
}