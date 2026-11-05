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
    controls.minDistance = 170;
    controls.maxDistance = 310;

    const resizeGlobe = () => {
      const size = Math.min(host.clientWidth, 520);
      globe.width(size).height(size);
    };

    resizeGlobe();
    window.addEventListener("resize", resizeGlobe);

    return () => {
      window.removeEventListener("resize", resizeGlobe);
      globe._destructor();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.22),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-sm font-medium text-cyan-200">Global Coverage</p>
          <h2 className="text-balance text-4xl font-black leading-tight sm:text-5xl">
            One modern platform,
            <span className="bg-linear-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent"> connected worldwide.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Our teams collaborate across time zones to ship fast, support customers around the clock, and deliver a consistent experience globally.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {worldPins.map((pin) => (
              <article key={pin.city} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-wider text-cyan-300">{pin.country}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{pin.city}</h3>
                <p className="mt-2 text-sm text-slate-300">{pin.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-130 rounded-3xl border border-cyan-300/15 bg-slate-900/40 p-4 shadow-[0_25px_85px_rgba(8,47,73,0.45)] backdrop-blur-sm">
            <div ref={globeHostRef} className="mx-auto aspect-square w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
