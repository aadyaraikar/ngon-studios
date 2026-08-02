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
      <div className="h-24 md:h-32 w-full"></div>
      
      <section ref={sectionRef} className="w-full py-32">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-24">
          
          {/* Socials Group */}
          <div className="flex flex-col space-y-6">
            <h2 className="contact-reveal-item text-3xl md:text-4xl text-white font-mono tracking-tight uppercase font-normal">
              Socials
            </h2>
            <ul className="flex flex-col space-y-4">
              <li className="contact-reveal-item">
                <a href="#" className="text-zinc-400 italic text-lg font-sans hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li className="contact-reveal-item">
                <a href="#" className="text-zinc-400 italic text-lg font-sans hover:text-white transition-colors">
                  Twitter/X
                </a>
              </li>
              <li className="contact-reveal-item">
                <a href="#" className="text-zinc-400 italic text-lg font-sans hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li className="contact-reveal-item">
                <a href="#" className="text-zinc-400 italic text-lg font-sans hover:text-white transition-colors">
                  Behance
                </a>
              </li>
            </ul>
          </div>

          {/* Reach out to Us Group */}
          <div className="flex flex-col space-y-6">
            <h2 className="contact-reveal-item text-3xl md:text-4xl text-white font-mono tracking-tight uppercase font-normal">
              Reach out to Us
            </h2>
            <ul className="flex flex-col space-y-4">
              <li className="contact-reveal-item">
                <a href="mailto:hello@ngonstudios.com" className="text-zinc-400 italic text-lg font-sans hover:text-white transition-colors">
                  hello@ngonstudios.com
                </a>
              </li>
              <li className="contact-reveal-item">
                <a href="tel:+1234567890" className="text-zinc-400 italic text-lg font-sans hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="contact-reveal-item">
                <p className="text-zinc-400 italic text-lg font-sans">
                  Los Angeles, CA
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form Container Div */}
        <div ref={formContainerRef} className="max-w-2xl mx-auto px-6">
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
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
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors font-sans"
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
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors font-sans"
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
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors font-sans"
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
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors resize-none font-sans"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors font-sans"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
