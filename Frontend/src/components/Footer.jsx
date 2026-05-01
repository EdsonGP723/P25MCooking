export default function Footer() {
  return (
    <footer className="w-full py-16 px-4 bg-emerald-50 dark:bg-stone-950 flex flex-col items-center justify-center text-center gap-6 rounded-t-[3rem] mt-12">
      <div className="text-xl font-serif text-emerald-900 dark:text-emerald-100">
        The Botanical Atelier
      </div>
      
      <div className="flex gap-8 text-emerald-700/60 dark:text-stone-500 font-serif italic text-base">
        <a className="hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-emerald-200/50 transition-all" href="#">About Us</a>
        <a className="hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-emerald-200/50 transition-all" href="#">Contact</a>
        <a className="hover:text-emerald-950 dark:hover:text-emerald-100 underline decoration-emerald-200/50 transition-all" href="#">Privacy Policy</a>
      </div>
      
      <div className="text-emerald-900 dark:text-emerald-500 font-serif italic text-base">
        Eres el amor de mi vida
      </div>
      
      <div className="text-xs text-stone-500">
        © 2024 The Botanical Atelier
      </div>
    </footer>
  );
}
