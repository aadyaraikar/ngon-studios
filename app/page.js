'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const videoContainerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Existing pinned video
      ScrollTrigger.create({
        trigger: videoContainerRef.current,
        start: 'top top',
        end: '+=200%', //keeps it pinned
        pin: true,
        pinSpacing: false, //allows next section to slide over
      });

      // 2. Hero Background Scrub (Smooth Overlay Fade-in)
      gsap.set('.hero-section', { opacity: 0 });
      gsap.to('.hero-section', {
        opacity: 1,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        }
      });

      // 3. Hero Timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top 60%',
        }
      });

      heroTl.from('.hero-reveal', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // 4. Upcoming Projects Title Animation
      gsap.to('.upcoming-title-reveal', {
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.upcoming-title-reveal',
          start: 'top 85%',
        }
      });

      // 5. Projects Animation
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(card,
          { y: 150, opacity: 0, scale: 0.8, transformOrigin: "bottom center" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 40%",
              scrub: false,
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.location.hash === '#main-content') {
      const element = document.getElementById('main-content');
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'auto',
        });
      }
    }
  }, []);

  return (
    <main ref={mainRef} className="relative bg-zinc-950 text-white min-h-[200vh]">
      {/*bg video*/}
      <section
        ref={videoContainerRef}
        className="h-screen w-full absolute top-0 left-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className='w-full h-full object-cover'
          src="/videos/showreel (demo).mp4" />
      </section>


      {/*hero section - space to see the video*/}
      <section className="h-screen w-full relative z-10 bg-transparent">
      </section>

      {/* Content Wrapper */}
      <div id="main-content" className="relative w-full z-20 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8)_80vh,#000_100vh,#000_100%)]">
        {/* Navigation Bar */}
        <nav className="hero-reveal sticky top-0 left-0 w-full px-12 py-8 flex justify-between items-center z-[100] bg-transparent">
          {/* logo grp */}
          <div className="flex items-center gap-3">
            {/* Logo Image */}
            <Image src="/images/logo white.png" alt="NGON Studios Logo" width={32} height={32} className="object-contain w-auto h-8" />
            <span className="text-3xl md:text-4xl tracking-tighter uppercase font-mono mt-1">NGON Studios</span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-3xl md:text-4xl tracking-wide uppercase font-mono">
            <a href="/projects" className="hover:text-zinc-400 transition-colors cursor-pointer">Projects</a>
            <a href="/about" className="hover:text-zinc-400 transition-colors cursor-pointer">About</a>
            <a href="/contact" className="hover:text-zinc-400 transition-colors cursor-pointer">Contact Us</a>
          </div>
        </nav>

        {/* hero section */}
        <section className="hero-section relative z-20 h-screen w-full flex flex-col items-center justify-center pt-48 bg-transparent">
          {/* -- MAIN TEXT -- */}
          <div className="text-center px-4 -mt-24">
            <h1 className="hero-reveal text-6xl md:text-8xl mb-4 tracking-tight uppercase font-mono font-normal">
              We Are NGON Studios
            </h1>
            <p className="hero-reveal text-xl md:text-2xl font-medium text-zinc-200">
              An aspiring team of artists that thrive to bring awe-inspiring stories to life.
            </p>
          </div>

          {/* -- SCROLL DOWN CHEVRON -- */}
          <div className="hero-reveal absolute bottom-10 animate-bounce">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </section>

        {/* upcoming projects */}
        <section className="projects-section relative z-30 bg-black w-full py-32 px-6 md:px-16 flex flex-col items-center">
          {/* Heading Container */}
        <div className="overflow-hidden pb-4 mb-20">
          <h2 className="upcoming-title-reveal text-4xl md:text-5xl font-mono uppercase tracking-widest text-center text-white translate-y-[120%]">
            Upcoming Projects
          </h2>
        </div>

          <div className="project-card opacity-0 translate-y-24 w-full flex flex-col items-center">
            {/* THE IMAGE CONTAINER */}
            <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 overflow-hidden shadow-2xl">
              <img
                src="/images/f1 proj.jpg"
                alt="F1 Project Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <div className="w-[3px] h-6 bg-red-600"></div>
                <span className="text-white text-3xl font-normal font-mono tracking-widest uppercase mt-1">
                  Proj_Name
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="w-full max-w-6xl mt-12 mb-24">
              <p className="text-zinc-300 text-base md:text-lg max-w-4xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
          </div>

          <div className="project-card opacity-0 translate-y-24 w-full flex flex-col items-center">
            {/* THE IMAGE CONTAINER */}
            <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 overflow-hidden shadow-2xl">
              <img
                src="/images/f1 proj.jpg"
                alt="F1 Project Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <div className="w-[3px] h-6 bg-red-600"></div>
                <span className="text-white text-3xl font-normal font-mono tracking-widest uppercase mt-1">
                  Proj_Name
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="w-full max-w-6xl mt-12 mb-24">
              <p className="text-zinc-300 text-base md:text-lg max-w-4xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>);
}