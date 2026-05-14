'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => { //pins video in background
    ScrollTrigger.create({
      trigger: videoContainerRef.current,
      start: 'top top',
      end: '+=200%', //keeps it pinned
      pin: true,
      pinSpacing: false, //allows next section to slide over
    });
  }, []);
  
  return (
    <main className="relative bg-zinc-950 text-white min-h-[200vh]">
      {/*bg video*/}
      <section
      ref = {videoContainerRef}
      className="h-screen w-full absolute top-0 left-0 z-0 overflow-hidden">
        <video
        autoPlay
        muted
        loop
        playsInline
        className='w-full h-full object-cover'
        src="/videos/showreel (demo).mp4"/>
      </section>

      
      {/*hero section - space to see the video*/}
      <section className="h-screen w-full relative z-10 bg-transparent">
      </section>

      {/*nav bar overlay*/}
      <section className="relative z-20 h-screen w-full bg-black/70 flex flex-col items-center justify-center"> 

      {/*nav bar*/}
      <nav className="absolute top-0 left-0 w-full px-12 py-8 flex justify-between items-center">
        {/*logo grp*/}
        <div className="flex items-center gap-3">
            {/* Simple CSS Polygon for the geometric logo in your image */}
            <div className="w-8 h-8 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            <span className="font-bold text-2xl tracking-tighter uppercase">NGON Studios</span>
          </div>

          {/* Links */}
          <div className="flex gap-8 font-bold text-lg tracking-wide uppercase">
            <a href="#projects" className="hover:text-zinc-400 transition-colors cursor-pointer">Project</a>
            <a href="#about" className="hover:text-zinc-400 transition-colors cursor-pointer">About</a>
            <a href="#contact" className="hover:text-zinc-400 transition-colors cursor-pointer">Contact Us</a>
          </div>
      </nav>

      {/* -- MAIN TEXT -- */}
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight uppercase">
            We Are NGON Studios
          </h1>
          <p className="text-xl md:text-2xl font-medium text-zinc-200">
            An aspiring team of artists that thrive to bring awe-inspiring stories to life.
          </p>
        </div>

        {/* -- SCROLL DOWN CHEVRON -- */}
        <div className="absolute bottom-10 animate-bounce">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        </section>
    </main> );
}