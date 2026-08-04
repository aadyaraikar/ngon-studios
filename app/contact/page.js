'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate contact details items
      const items = gsap.utils.toArray('.contact-reveal-item');
      gsap.fromTo(items, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Animate form container
      gsap.fromTo(formContainerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        alert(data.error || "Failed to send message. Please check your API key.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Navigation spacer */}
      <div className="h-20 md:h-28 w-full"></div>
      
      <section ref={sectionRef} className="w-full py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Title */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="contact-reveal-item text-4xl md:text-6xl text-white font-mono tracking-tight font-normal">
              We would like to hear from you.
            </h1>
          </div>

          {/* 2-Column Section: Socials (Left) & Send US a message (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Column: Socials */}
            <div className="md:col-span-5 flex flex-col space-y-8 pt-2">
              <h2 className="contact-reveal-item text-3xl md:text-4xl text-white font-mono tracking-tight font-normal">
                Socials
              </h2>
              <ul className="flex flex-col space-y-4">
                <li className="contact-reveal-item">
                  <a href="#" className="text-zinc-400 italic text-xl md:text-2xl font-sans hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li className="contact-reveal-item">
                  <a href="#" className="text-zinc-400 italic text-xl md:text-2xl font-sans hover:text-white transition-colors">
                    Twitter/X
                  </a>
                </li>
                <li className="contact-reveal-item">
                  <a href="#" className="text-zinc-400 italic text-xl md:text-2xl font-sans hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li className="contact-reveal-item">
                  <a href="#" className="text-zinc-400 italic text-xl md:text-2xl font-sans hover:text-white transition-colors">
                    Behance
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Send US a message + Form */}
            <div ref={formContainerRef} className="md:col-span-7 flex flex-col space-y-6">
              <h2 className="text-3xl md:text-4xl text-white font-mono tracking-tight font-normal">
                Send US a message
              </h2>

              <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/80 shadow-2xl">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <h3 className="text-3xl font-mono uppercase tracking-widest text-white mb-4">
                      Thank You
                    </h3>
                    <p className="text-zinc-400 text-lg font-sans">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: First name & Last name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="text-sm text-zinc-400 mb-1 block font-sans">
                          First name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="text-sm text-zinc-400 mb-1 block font-sans">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors font-sans"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div>
                      <label htmlFor="email" className="text-sm text-zinc-400 mb-1 block font-sans">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    {/* Row 3: Message */}
                    <div>
                      <label htmlFor="message" className="text-sm text-zinc-400 mb-1 block font-sans">
                        What can we help you with?*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors resize-none font-sans"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-start pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors font-sans"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
