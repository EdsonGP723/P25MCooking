import KitchenScene from "./KitchenScene";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="text-primary font-medium tracking-widest text-xs uppercase mb-4 block">BIENVENIDA A CASA, MUSA</span>
          <h1 className="serif-display text-7xl md:text-8xl lg:text-9xl text-on-surface leading-tight -tracking-widest italic mb-6">
            Te amo preciosa
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-md leading-relaxed mb-8">
            Un santuario de sabores seleccionado para ti. Encuentra inspiración en cada ingrediente fresco.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl"></div>
          <div className="rounded-lg overflow-hidden shadow-2xl asymmetric-bleed transform rotate-2 hover:rotate-0 transition-transform duration-700">
            <KitchenScene />
          </div>
        </div>
      </div>
    </section>
  );
}
