import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all boy-wave frames using Vite's glob
const frameModules = import.meta.glob<{ default: string }>("../assets/boy-wave/boy-wave-*.png", { eager: true });

// Sort and extract frame URLs - sorts numerically by filename
const frames = Object.keys(frameModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || "0");
    const numB = parseInt(b.match(/\d+/)?.[0] || "0");
    return numA - numB;
  })
  .map((path) => frameModules[path].default);

export default function AnimatedBoyWave() {
  const containerRef = useRef(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const characterRef = useRef(null);

  useGSAP(
    () => {
      if (!imageRef.current || frames.length === 0) return;

      // Frame animation - waving
      gsap.to(imageRef.current, {
        attr: { "data-frame": frames.length - 1 },
        snap: { "data-frame": 1 },
        scrollTrigger: { trigger: containerRef.current, start: "top center", end: "bottom center", scrub: 0.5, markers: false },
        onUpdate: function () {
          const frame = Math.round(gsap.getProperty(imageRef.current, "data-frame") as number);
          if (imageRef.current && frames[frame]) {
            imageRef.current.src = frames[frame];
          }
        },
      });

      // Horizontal movement animation - left to right
      // ⬇️ ADJUST HERE: Change x value to control FINAL POSITION
      // x: 300 = moves 300px to the right
      // x: -300 = moves 300px to the left
      // x: 500 = moves 500px to the right (further)
      // gsap.to(characterRef.current, {
      //   x: -700,
      //   duration: 5,
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     // ⬇️ ADJUST SCROLL TRIGGER START/END
      //     // "top center" = animation starts when top of container hits center of viewport
      //     // "top bottom" = animation starts when top of container hits bottom of viewport
      //     // "center center" = animation starts when center of container hits center of viewport
      //     start: "top center",
      //     // "bottom center" = animation ends when bottom of container hits center of viewport
      //     // "bottom top" = animation ends when bottom of container hits top of viewport
      //     end: "bottom center",
      //     scrub: 0.5,
      //     markers: false,
      //   },
      // });
    },
    { scope: containerRef },
  );

  if (frames.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <p className="text-red-500">No animation frames found in assets/boy-wave/</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold text-gray-800">Scroll to animate the wave!</h2>
        {/* ⬇️ ADJUST INITIAL POSITION HERE with Tailwind transform classes */}
        {/* Examples: */}
        {/* "translate-x-0" = starts at normal position (center) */}
        {/* "-translate-x-96" = starts 384px to the LEFT */}
        {/* "translate-x-96" = starts 384px to the RIGHT */}
        {/* "translate-x-full" = starts completely off screen to the RIGHT */}
        {/* "-translate-x-full" = starts completely off screen to the LEFT */}
        <div ref={characterRef} className="">
          <img ref={imageRef} src={frames[0]} alt="Boy waving animation" className="w-64 h-auto drop-shadow-lg" data-frame="0" />
        </div>
        <p className="text-lg text-gray-600 text-center max-w-md">Scroll down to see the boy wave at you with smooth frame-by-frame animation</p>
      </div>
    </div>
  );
}
