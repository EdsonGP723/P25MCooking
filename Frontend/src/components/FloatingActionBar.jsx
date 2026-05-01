export default function FloatingActionBar() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-nav px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 z-40 border border-emerald-100/20">
      <button className="flex flex-col items-center gap-1 group">
        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">restaurant_menu</span>
        <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">Recipes</span>
      </button>
      
      <div className="h-8 w-px bg-outline-variant/30"></div>
      
      <button className="flex flex-col items-center gap-1 group">
        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">favorite</span>
        <span className="text-[10px] font-bold text-outline uppercase tracking-tighter">Favorites</span>
      </button>
    </div>
  );
}
