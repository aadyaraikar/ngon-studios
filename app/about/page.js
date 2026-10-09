'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.about-reveal-item');
      
      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Navigation spacer */}
      <div className="h-16 md:h-20 w-full"></div>
      
      <section ref={sectionRef} className="w-full py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="about-reveal-item text-5xl md:text-7xl font-teko text-white tracking-wide uppercase mb-4 font-normal">
            About Us
          </h2>
          <div className="space-y-3">
            <p className="about-reveal-item text-zinc-400 leading-relaxed text-lg md:text-xl font-sans">
              NGON Studios is a multidisciplinary creative studio bringing together art, technology and storytelling to create bold visual experiences.
            </p>
            <p className="about-reveal-item text-zinc-400 leading-relaxed text-lg md:text-xl font-sans">
              Working across 3D, VFX, animation, design and filmmaking, we turn ideas into worlds, stories and visuals that leave an impression. We&apos;re a collective of creators who believe in experimenting, pushing boundaries and constantly learning along the way.
            </p>
            <p className="about-reveal-item text-zinc-400 leading-relaxed text-lg md:text-xl font-sans">
              From the first idea to the final frame, we&apos;re here to create what&apos;s next.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <h2 className="about-reveal-item text-5xl md:text-7xl font-teko text-white tracking-wide uppercase mb-4 font-normal">
            Find Us
          </h2>

          <div className="space-y-3">
            <p className="about-reveal-item text-zinc-400 leading-relaxed text-lg md:text-xl font-sans">
              Stay connected and see what we&apos;re creating.
            </p>
            <div className="about-reveal-item flex flex-wrap gap-x-8 gap-y-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 leading-relaxed text-lg md:text-xl font-sans transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 leading-relaxed text-lg md:text-xl font-sans transition-colors hover:text-white"
              >
                YouTube
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 leading-relaxed text-lg md:text-xl font-sans transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://artstation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 leading-relaxed text-lg md:text-xl font-sans transition-colors hover:text-white"
              >
                ArtStation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
