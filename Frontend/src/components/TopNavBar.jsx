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
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="border-2 border-primary text-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-on-primary hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-md"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="gradient-btn text-on-primary px-6 py-2 rounded-full text-sm font-semibold scale-95 active:scale-90 transition-transform"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
