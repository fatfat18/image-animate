import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function FuturisticLanding() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef(null);
  const orbitRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Title animation
      tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
        // Subtitle animation
        .from(subtitleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        // Buttons animation
        .from(buttonsRef.current?.querySelectorAll("button"), { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.6");

      // Floating animation for grid elements
      gsap.to(".grid-item", { y: -20, duration: 3, ease: "sine.inOut", stagger: 0.1, repeat: -1, yoyo: true });

      // Rotating orbit
      gsap.to(orbitRef.current, { rotation: 360, duration: 20, repeat: -1, ease: "none" });

      // Mouse follow effect
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(containerRef.current, { perspective: 1000, overwrite: "auto", duration: 0.5 });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#grad)" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Orb animations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Rotating orbit elements */}
      <div ref={orbitRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          {/* Title */}
          <h1 ref={titleRef} className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            Welcome to the Future
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl md:text-2xl text-purple-200/80 mb-12 font-light tracking-wide">
            Experience next-generation design and animation
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="grid-item p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 hover:bg-white/10">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-purple-300 font-semibold mb-2">Lightning Fast</h3>
              <p className="text-purple-200/60 text-sm">Optimized performance</p>
            </div>

            <div className="grid-item p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 hover:bg-white/10">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-blue-300 font-semibold mb-2">Beautiful Design</h3>
              <p className="text-blue-200/60 text-sm">Modern aesthetics</p>
            </div>

            <div className="grid-item p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-pink-500/20 hover:border-pink-500/60 transition-all duration-300 hover:bg-white/10">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-pink-300 font-semibold mb-2">Innovative</h3>
              <p className="text-pink-200/60 text-sm">Cutting edge tech</p>
            </div>
          </div>

          {/* Action buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-purple-500 text-purple-300 font-bold rounded-lg hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-xl">Learn More</button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Animated lines */}
      <div className="absolute top-0 left-1/4 w-1 h-40 bg-gradient-to-b from-cyan-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-1 h-40 bg-gradient-to-t from-purple-500 to-transparent opacity-50"></div>
    </div>
  );
}
