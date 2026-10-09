'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
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
      <div className="h-16 md:h-20 w-full"></div>
      
      <section ref={sectionRef} className="w-full py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Title */}
          <div className="text-left mb-8 md:mb-10">
            <h2 className="about-reveal-item text-5xl md:text-7xl font-teko text-white tracking-wide uppercase mb-4 font-normal">
            LET&apos;S CREATE SOMETHING.
            </h2>
            <p className="about-reveal-item text-zinc-400 leading-relaxed text-lg md:text-xl font-sans">
              Have an idea, a project, or just something you want to explore?
            </p>
            <p className="about-reveal-item text-zinc-400 leading-relaxed text-lg md:text-xl font-sans">
              We&apos;d love to hear about it. Tell us what you&apos;re working on, what you have in mind, and let&apos;s see where we can take it.
            </p>
          </div>

          {/* Send US a message + Form */}
          <div ref={formContainerRef} className="w-full md:w-1/2 flex flex-col space-y-6">
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full name */}
                    <div>
                      <label htmlFor="firstName" className="text-lg text-zinc-300 mb-2 block italic font-sans">
                        Full name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors font-sans"
                      />
                    </div>

                    {/* Row 2: Email */}
                    <div>
                      <label htmlFor="email" className="text-lg text-zinc-300 mb-2 block italic font-sans">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors font-sans"
                      />
                    </div>

                    {/* Row 3: Message */}
                    <div className="relative">
                      <label htmlFor="message" className="text-lg text-zinc-300 mb-2 block italic font-sans">
                        What can we help you with?*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full min-h-20 bg-transparent border border-zinc-800/80 rounded-lg p-3 pr-14 text-white focus:outline-none focus:border-zinc-500 transition-colors resize-none font-sans"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? 'Sending message' : 'Send message'}
                        className="no-glow absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-400 text-zinc-300 hover:border-white hover:text-white disabled:opacity-50 transition-colors"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z" />
                          <path d="m10 14 5-5" />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
