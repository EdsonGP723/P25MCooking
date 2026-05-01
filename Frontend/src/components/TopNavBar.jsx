import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function TopNavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl transition">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-serif italic font-semibold text-emerald-900 dark:text-emerald-100">
          The Botanical Atelier
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 font-serif text-lg tracking-tight">
          <a className="text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-700/30 pb-1" href="#">Breakfast</a>
          <a className="text-stone-600 dark:text-stone-400 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors duration-300" href="#">Lunch</a>
          <a className="text-stone-600 dark:text-stone-400 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors duration-300" href="#">Dinner</a>
          <a className="text-stone-600 dark:text-stone-400 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors duration-300" href="#">Dessert</a>
          <a className="text-stone-600 dark:text-stone-400 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors duration-300" href="#">Drinks</a>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input 
              className="pl-10 pr-4 py-2 rounded-full border-none bg-stone-100/50 dark:bg-stone-800/50 text-sm focus:ring-1 focus:ring-primary/20 w-48 lg:w-64" 
              placeholder="Search curated tastes..." 
              type="text" 
            />
          </div>
          
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="border-2 border-primary text-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="gradient-btn text-on-primary px-6 py-2 rounded-full text-sm font-semibold scale-95 active:scale-90 transition-transform"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
