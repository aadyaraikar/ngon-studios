'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const projectsData = [
  {
    id: 1,
    title: "F1 PROJECT",
    shortDesc: "High-octane racing cinematic",
    longDesc: "A deep dive into the fast-paced world of Formula 1. We aimed to capture the raw speed, precision engineering, and intense emotion of the sport. Every frame was crafted to make the viewer feel the ground rumble.",
    imagePath: "/images/f1 proj.jpg",
  },
  {
    id: 2,
    title: "INFECTED",
    shortDesc: "Post-apocalyptic survival",
    longDesc: "Exploring a world reclaimed by nature and the infected. Dark, gritty, and atmospheric storytelling at its core. We utilized advanced environment scattered assets to showcase a dead world.",
    imagePath: "/images/f1 proj.jpg", 
  },
  {
    id: 3,
    title: "NEON HEIST",
    shortDesc: "Cyberpunk action sequence",
    longDesc: "A bustling metropolis where technology and humanity collide. Showcasing advanced rendering techniques, volumetric volumetric lighting, and a dense, dirty neon aesthetic.",
    imagePath: "/images/f1 proj.jpg", 
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = projectsData.find(item => item.id === selectedId);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  return (
    <main className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 relative no-scrollbar">
      
      {/* Header section */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
        <h1 className="text-5xl md:text-7xl mb-4 tracking-tighter uppercase font-mono font-normal">
          Our Works
        </h1>
        <p className="text-lg md:text-xl font-medium text-zinc-300">
          Check out some of our recent work.
        </p>
      </div>

      {/* Grid section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className="relative overflow-hidden rounded-xl border border-zinc-800 group cursor-pointer aspect-[4/3]"
          >
            <img 
              src={project.imagePath} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Text Overlay Layout */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end z-10">
              <h2 className="text-3xl font-bold text-white tracking-wide uppercase">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-300 italic mt-1">
                {project.shortDesc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[200] bg-black overflow-y-auto no-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedId(null)}
              className="no-glow fixed top-8 right-8 z-[210] w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="w-full min-h-screen pb-24">
              {/* Modal Header */}
              <div className="pt-24 pb-12 flex justify-center text-center">
                <h1 className="text-5xl md:text-8xl tracking-tighter uppercase font-mono font-normal">
                  {selectedProject.title}
                </h1>
              </div>

              {/* Huge Hero Image */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 aspect-video md:aspect-[21/9]">
                <img 
                  src={selectedProject.imagePath} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>

              {/* Description */}
              <div className="w-full max-w-4xl mx-auto px-6 md:px-12 mt-16 text-center">
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-sans"
                >
                  {selectedProject.longDesc}
                </motion.p>
              </div>

              {/* Mini-grid - Alternating Image / Text */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-32 space-y-24"
              >
                {/* Visual Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="aspect-video bg-zinc-900 overflow-hidden shadow-2xl relative">
                     <img src={selectedProject.imagePath} className="w-full h-full object-cover opacity-60 saturate-50 contrast-125" alt="Process 1" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-mono tracking-widest uppercase mb-4 text-white">The Vision</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed font-sans">
                      Building this project required extensive use of advanced 3D modeling and texturing techniques to achieve a photorealistic look, while maintaining our stylized, premium cinematic grading.
                    </p>
                  </div>
                </div>
                
                {/* Visual Row 2 - Reversed */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-3xl font-mono tracking-widest uppercase mb-4 text-white">Lighting & Render</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed font-sans">
                      We utilized dynamic ray tracing and global illumination setups to ensure the environmental reflections correctly captured the mood and scale of the world without feeling fake.
                    </p>
                  </div>
                  <div className="aspect-video bg-zinc-900 overflow-hidden shadow-2xl relative order-1 md:order-2">
                     <img src={selectedProject.imagePath} className="w-full h-full object-cover opacity-60 contrast-125 grayscale" alt="Process 2" />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
