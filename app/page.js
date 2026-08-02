'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';

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

      // 2. Navbar Reveal Animation
      gsap.to('.global-navbar', {
        y: 0, // Slides it down into view
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '#main-content',
          start: "top 5%", // Triggers right as the dark wrapper hits the top of the screen
          once: true, // Plays once and stays visible permanently
        }
      });

      // 3. Hero Background Scrub (Smooth Overlay Fade-in)
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

      // 4. Hero Timeline
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

      // 5. Upcoming Projects Title Animation
      gsap.from('.upcoming-title-fade', {
        opacity: 0,
        y: 80, // Increase visual travel distance (up from 20)
        scale: 0.7, // Add a dramatic scale-up from 70% size
        transformOrigin: "center center", // Scale from the middle
        duration: 1.8, // Slightly longer so the user sees the action
        ease: 'expo.out', // A sharp, punchy ease-out that is highly visible
        scrollTrigger: {
          trigger: '.upcoming-title-fade',
          start: 'top 85%', // Trigger as it enters the lower part of the viewport
          once: true
        }
      });

      // 6. Projects Animation
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
            transformOrigin: "bottom center"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers uniformly when the top of each card hits 85% of the viewport
              once: true // Ensures it plays exactly once and stays visible
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
    <main ref={mainRef} className="relative bg-zinc-950 text-white min-h-[200vh] snap-y snap-mandatory">
      {/* Navigation Bar */}
      <Navbar />

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
      <section className="h-screen w-full relative z-10 bg-transparent snap-start">
      </section>

      {/* Content Wrapper */}
      <div id="main-content" className="relative w-full z-20 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8)_80vh,#000_100vh,#000_100%)]">
        {/* hero section */}
        <section id="about-studio" className="hero-section relative z-20 h-screen w-full flex flex-col items-center justify-center pt-48 bg-transparent snap-start">
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
        <section className="projects-section relative z-30 bg-black w-full min-h-screen py-32 px-6 md:px-16 flex flex-col items-center snap-start">
          {/* Heading */}
          <h2 className="upcoming-title-fade mb-16 text-5xl md:text-7xl font-mono uppercase tracking-tighter text-center text-white">
            Upcoming Projects
          </h2>

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
    </main>
  );
}