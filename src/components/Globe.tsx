import { useEffect, useRef } from "react";
import Globe from "globe.gl";

type WorldPin = { city: string; country: string; note: string; lat: number; lng: number };

const worldPins: WorldPin[] = [
  { city: "San Francisco", country: "United States", note: "AI product strategy and growth teams.", lat: 37.7749, lng: -122.4194 },
  { city: "London", country: "United Kingdom", note: "Design systems and product research hub.", lat: 51.5072, lng: -0.1276 },
  { city: "Singapore", country: "Singapore", note: "Customer success and APAC operations.", lat: 1.3521, lng: 103.8198 },
  { city: "Sydney", country: "Australia", note: "Cloud infrastructure and release engineering.", lat: -33.8688, lng: 151.2093 },
];

const arcLinks = [
  { startLat: 37.7749, startLng: -122.4194, endLat: 51.5072, endLng: -0.1276 },
  { startLat: 51.5072, startLng: -0.1276, endLat: 1.3521, endLng: 103.8198 },
  { startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093 },
];

const globeTexture = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const bumpTexture = "//unpkg.com/three-globe/example/img/earth-topology.png";

export default function GlobeSection() {
  const globeHostRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeHostRef.current) return;

    const host = globeHostRef.current;
    const globe = new Globe(host)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl(globeTexture)
      .bumpImageUrl(bumpTexture)
      .atmosphereColor("#67e8f9")
      .atmosphereAltitude(0.2)
      .pointsData(worldPins)
      .pointLat("lat")
      .pointLng("lng")
      .pointAltitude(0.03)
      .pointRadius(0.4)
      .pointColor(() => "#22d3ee")
      .pointLabel((pin: object) => {
        const location = pin as WorldPin;
        return `<b>${location.city}, ${location.country}</b><br/>${location.note}`;
      })
      .arcsData(arcLinks)
      .arcStroke(0.8)
      .arcAltitude(0.15)
      .arcColor(() => ["#7dd3fc", "#a78bfa"])
      .arcDashLength(0.5)
      .arcDashGap(0.6)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(2200)
      .pointOfView({ lat: 18, lng: 22, altitude: 2.1 });

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;
    controls.minDistance = 50;
    controls.maxDistance = 310;

    const resizeGlobe = () => {
      const size = Math.min(host.clientWidth, host.clientHeight);
      globe.width(1550).height(size);
    };

    resizeGlobe();
    window.addEventListener("resize", resizeGlobe);

    return () => {
      window.removeEventListener("resize", resizeGlobe);
      globe._destructor();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !parallaxRef.current) return;

    const section = sectionRef.current;
    const parallaxTarget = parallaxRef.current;
    let rafId: number | null = null;

    const updateParallax = () => {
      rafId = null;

      const rect = section.getBoundingClientRect();
      const viewportCenterY = window.innerHeight / 2;
      const sectionCenterY = rect.top + rect.height / 2;
      const distanceFromCenter = sectionCenterY - viewportCenterY;
      const offsetY = Math.max(-40, Math.min(40, -distanceFromCenter * 0.12));

      parallaxTarget.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
    };

    const queueUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-950  text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.22),transparent_55%)]" />
      <div className="flex justify-center">
        <div className="!h-[70dvh] w-max max-w-full ">
          <div ref={parallaxRef} className="flex h-full w-full items-center justify-center will-change-transform">
            <div ref={globeHostRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
