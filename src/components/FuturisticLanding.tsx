export default function FuturisticLanding() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,14,22,0.45),rgba(0,0,0,0.95)_70%)]" />

      <div className="pointer-events-none absolute -left-32 top-6 h-[28rem] w-[42rem] rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_25%_35%,rgba(58,120,255,0.45),rgba(24,49,110,0.05)_60%,transparent_82%)] blur-sm" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[34rem] rounded-full border border-orange-400/20 bg-[radial-gradient(circle_at_55%_30%,rgba(255,117,24,0.46),rgba(118,42,5,0.05)_58%,transparent_80%)] blur-sm" />
      <div className="pointer-events-none absolute bottom-8 left-1/2 h-24 w-[34rem] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6 pb-10 pt-8 text-center sm:px-8">
        <header className="mb-14 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-blue-500 to-violet-500 text-[11px] shadow-[0_0_20px_rgba(78,130,255,0.7)]">🎬</div>
          <span className="font-medium tracking-wide">Screen Movie</span>
          <span className="text-base text-white/70">☰</span>
        </header>

        <div className="mb-7 grid h-24 w-24 place-items-center rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/80 via-slate-950/95 to-orange-500/25 shadow-[0_0_30px_rgba(68,116,255,0.45),0_0_55px_rgba(255,102,0,0.35)]">
          <div className="space-y-2">
            <span className="block h-1.5 w-10 rounded-full bg-white" />
            <span className="block h-1.5 w-10 rounded-full bg-white/80" />
            <span className="block h-1.5 w-10 rounded-full bg-white/60" />
          </div>
        </div>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-md">
          <span>Latest version</span>
          <span className="font-semibold text-white">1.3</span>
          <span>updated</span>
          <span className="font-semibold text-white">7 days ago</span>
          <span aria-hidden>→</span>
        </div>

        <p className="mb-5 text-sm font-medium text-white/80 sm:text-base"> Screen Recorder &amp; Video Editor for macOS</p>

        <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
          Create beautiful movies
          <br />
          from your screen.
        </h1>

        <p className="mt-6 max-w-3xl text-balance text-xl leading-tight text-white/35 sm:text-2xl">
          Record your screen capture screenshots edit multiple scenes animate text images and captions add music and export stunning product videos in minutes.
        </p>

        <p className="mt-8 text-lg font-semibold text-white/90">
          ★★★★★ <span className="ml-2 text-white/75">Used by 150+ makers</span>
        </p>

        <button className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-black/20 bg-white px-7 py-3 text-lg font-semibold text-black shadow-[0_8px_40px_rgba(255,255,255,0.25)] transition hover:scale-[1.02]">
          <span className="text-2xl leading-none"></span>
          Get Screen Movie - $39
        </button>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/30">
          <span>One-time purchase</span>
          <span>Screen record</span>
          <span>Screenshot</span>
          <span>Cloud storage</span>
          <span>Sharable</span>
          <span>Video edit</span>
          <span>Motion design</span>
          <span>4K export</span>
          <span>macOS 15+</span>
        </div>
      </div>
    </section>
  );
}
