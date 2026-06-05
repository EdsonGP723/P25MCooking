import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Usamos lazy() de React para importar dinámicamente las páginas. 
// Esto significa que los componentes solo se descargarán cuando el usuario navegue a la respectiva ruta.
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'));

// Un loader visual elegante para mostrar mientras se cargan los fragmentos (chunks) de JavaScript de cada página.
function PageLoader() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="font-serif italic text-lg text-primary animate-pulse">Preparando tu cocina...</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Suspense atrapa los componentes que están cargando de forma asíncrona y renderiza el fallback temporalmente */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/recipe/:id" element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
