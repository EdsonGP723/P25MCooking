export default function SearchFilter() {
  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-8">
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-primary tracking-widest uppercase mb-2">I am craving...</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline">restaurant</span>
              <input 
                className="w-full bg-transparent border-b-2 border-surface-variant focus:border-primary outline-none py-2 pl-8 text-on-surface" 
                placeholder="Mint pesto, summer salads, or matcha cakes..." 
                type="text"
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            <button className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container text-xs font-bold whitespace-nowrap">All</button>
            <button className="px-4 py-2 rounded-full bg-surface text-on-surface-variant hover:bg-tertiary-container text-xs font-bold whitespace-nowrap transition-colors">Breakfast</button>
            <button className="px-4 py-2 rounded-full bg-surface text-on-surface-variant hover:bg-tertiary-container text-xs font-bold whitespace-nowrap transition-colors">Lunch</button>
            <button className="px-4 py-2 rounded-full bg-surface text-on-surface-variant hover:bg-tertiary-container text-xs font-bold whitespace-nowrap transition-colors">Dinner</button>
          </div>
        </div>
      </div>
    </section>
  );
}
