export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="text-primary font-medium tracking-widest text-xs uppercase mb-4 block">WELCOME HOME, MUSE</span>
          <h1 className="serif-display text-7xl md:text-8xl lg:text-9xl text-on-surface leading-tight -tracking-widest italic mb-6">
            Te amo preciosa
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-md leading-relaxed mb-8">
            A curated sanctuary of botanical flavors, designed for the modern home cook who finds poetry in every fresh ingredient.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl"></div>
          <div className="rounded-lg overflow-hidden shadow-2xl asymmetric-bleed transform rotate-2 hover:rotate-0 transition-transform duration-700">
            <img 
              alt="Green Modern Kitchen" 
              className="w-full h-[500px] object-cover rounded-lg" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABNKNTl2Tz2VvVcqAVvhfeknDBwgNTE9uYp4YcSIShTozyBa43lee4MDMk5fcO3jaeCcIR9MCVoRgE99KLHAI1_uDR-V4il-utJmAlf_-l3W7oePzOeb3k0t44NG2w45YTJAJjnuMC01uxmLD7d7-6n9-fZUSiqsi5nmg-3w-3g06oSiIFWVxLOVdthmKrh95ajTT75j3OVeHIF29pQr54GF4Tf6YyqN7C_Emes5el2REZHne23C6csMAblOJc0N3UKN4GuIsNf8nI"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
