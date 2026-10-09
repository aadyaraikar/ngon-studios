'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const projectsData = [
  {
    id: 1,
    title: "F 1",
    shortDesc: "High-octane racing cinematic",
    longDesc: "A deep dive into the fast-paced world of Formula 1. We aimed to capture the raw speed, precision engineering, and intense emotion of the sport. Every frame was crafted to make the viewer feel the ground rumble.",
    imagePath: "/projects/F1/F1_thumnail.jpg",
    summaryVideoPath: "/projects/F1/F1_thumbnail video.mp4",
    mainVideoPath: "/projects/F1/F1_main video.mp4",
  },
  {
    id: 2,
    title: "INFECTED",
    shortDesc: "Post-apocalyptic survival",
    longDesc: "Exploring a world reclaimed by nature and the infected. Dark, gritty, and atmospheric storytelling at its core. We utilized advanced environment scattered assets to showcase a dead world.",
    imagePath: "/projects/Infected/Infected_thumbnail.png",
    summaryVideoPath: "/projects/Infected/Infected_main video.mp4",
    mainVideoPath: "/projects/Infected/Infected_main video.mp4",
  },
  {
    id: 3,
    title: "HULK",
    shortDesc: "Cyberpunk action sequence",
    longDesc: "A bustling metropolis where technology and humanity collide. Showcasing advanced rendering techniques, volumetric volumetric lighting, and a dense, dirty neon aesthetic.",
    imagePath: "/projects/Hulk/Hulk_thumbnail.jpg",
    summaryVideoPath: "/projects/Hulk/Hulk_thumbnail video.mov",
    mainVideoPath: "/projects/Hulk/Hulk_main video.mov",
  },
  {
    id: 4,
    title: "STAR WARS",
    shortDesc: "Epic space saga",
    longDesc: "A journey through a galaxy far, far away. Showcasing epic battles, iconic characters, and stunning visual effects.",
    imagePath: "/projects/Star Wars/StarWars_thumbnail.jpg",
    summaryVideoPath: "/projects/Star Wars/StarWars_thumbnail video.mp4",
    mainVideoPath: "/projects/Star Wars/StarWars_main video.mov",
  },
  {
    id: 5,
    title: "WALL E",
    shortDesc: "Animated sci-fi adventure",
    longDesc: "A heartwarming tale of a small waste-collecting robot. Showcasing advanced animation techniques, emotional storytelling, and a futuristic yet relatable world.",
    imagePath: "/projects/WALL E/WALLE_thumbnail.jpg",
    summaryVideoPath: "/projects/WALL E/WALL E_main video.mp4",
    mainVideoPath: "/projects/WALL E/WALL E_main video.mp4",
  },
  {
    id: 6,
    title: "TAXI DRIVER",
    shortDesc: "Neo-noir psychological thriller",
    longDesc: "A deep dive into the mind of a troubled taxi driver. Showcasing intense character study, gritty urban environments, and a haunting narrative.",
    imagePath: "/projects/Taxi Driver/Taxi Driver_thumbnail.jpg",
    summaryVideoPath: "/projects/Taxi Driver/Taxi Driver_thumbnail video.mp4",
    mainVideoPath: "/projects/Taxi Driver/Taxi Driver_main video.mp4",
  },
  {
    id: 7,
    title: "TWS",
    shortDesc: "Sleek product showcase",
    longDesc: "A modern and stylish product animation. Showcasing the product's features, design, and functionality in a visually appealing manner.",
    imagePath: "/projects/TWS/TWS_thumbnail.jpg",
    summaryVideoPath: "/projects/TWS/TWS_thumbnail video.mp4",
    mainVideoPath: "/projects/TWS/TWS_main video.mov",
  }
];

function ProjectCard({ project, onSelect }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  return (
    <div
      onClick={() => onSelect(project.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-lg border border-zinc-800 group cursor-pointer aspect-video"
    >
      <img
        src={project.imagePath}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <video
        ref={videoRef}
        src={project.summaryVideoPath}
        poster={project.imagePath}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
  );
}

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef(null);
  const selectedProject = projectsData.find(item => item.id === selectedId);

  const toggleModalPlayback = () => {
    const video = modalVideoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = (event) => {
    event.stopPropagation();
    const video = modalVideoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (event) => {
    event.stopPropagation();
    const video = modalVideoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      video.requestFullscreen().catch(() => {});
    }
  };

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
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-5">
        <h1 className="text-5xl md:text-7xl mb-4 tracking-tighter uppercase font-mono font-normal">
          Our Works
        </h1>
      </div>

      {/* Grid section */}
      <div className="max-w-7xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={setSelectedId}
          >
          </ProjectCard>
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

              {/* Main Project Video */}
              <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 aspect-video md:aspect-[21/9]">
                <video
                  ref={modalVideoRef}
                  src={selectedProject.mainVideoPath}
                  poster={selectedProject.imagePath}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onClick={toggleModalPlayback}
                  onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute bottom-8 right-8 flex gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    aria-pressed={isMuted}
                    className="no-glow flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      {isMuted ? (
                        <>
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="m17 9 4 6m0-6-4 6" />
                        </>
                      ) : (
                        <>
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
                        </>
                      )}
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Enter fullscreen"
                    className="no-glow flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 text-left">
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-zinc-300 leading-relaxed font-sans"
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
