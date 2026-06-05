import { useState, useEffect, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import api from '../api/axiosConfig';

// Esqueleto visual para la carga progresiva y suave (Skeleton Loader)
// Evita el parpadeo de la interfaz y mejora el Cumulative Layout Shift (CLS)
function RecipeCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6">
      <div className="w-full aspect-[4/5] bg-surface-container-low rounded-lg relative overflow-hidden">
        {/* Simula la etiqueta de categoría */}
        <div className="absolute top-4 left-4 h-6 w-20 bg-surface-container-lowest/80 rounded-full"></div>
      </div>
      
      {/* Simula las etiquetas de preparación y porciones */}
      <div className="flex gap-4 h-4 w-1/2 bg-surface-container-low rounded"></div>
      
      {/* Simula el título de la receta */}
      <div className="h-8 w-3/4 bg-surface-container-low rounded-md"></div>
      
      {/* Simula ingredientes y pasos */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-surface-container-low rounded"></div>
        <div className="h-4 w-5/6 bg-surface-container-low rounded"></div>
      </div>
    </div>
  );
}

export default function RecipeGallery({ onOpenAddModal, searchQuery = '', activeFilter = 'All', refreshTrigger }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('/api/recipes/');
        setRecipes(response.data?.data || response.data?.results || response.data || []);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Error cargando las recetas.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [refreshTrigger]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesFilter = activeFilter === 'All' || recipe.categoria === activeFilter;
      const searchLower = searchQuery.toLowerCase();
      const nameStr = recipe.nombre ? recipe.nombre.toLowerCase() : '';
      
      let ingredientsStr = '';
      if (recipe.ingredientes) {
        if (typeof recipe.ingredientes === 'string') {
          ingredientsStr = recipe.ingredientes.toLowerCase();
        } else if (Array.isArray(recipe.ingredientes)) {
          ingredientsStr = recipe.ingredientes.map(i => typeof i === 'string' ? i : JSON.stringify(i)).join(' ').toLowerCase();
        } else {
          ingredientsStr = JSON.stringify(recipe.ingredientes).toLowerCase();
        }
      }
      
      const matchesSearch = nameStr.includes(searchLower) || ingredientsStr.includes(searchLower);
      return matchesFilter && matchesSearch;
    });
  }, [recipes, searchQuery, activeFilter]);

  return (
    <>
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="serif-display text-4xl md:text-5xl text-on-surface italic">Recetas Destacadas</h2>
            <div className="h-1 w-24 bg-primary-container mt-4"></div>
          </div>
        </div>
        
        {error && <p className="text-center w-full text-error mb-8">{error}</p>}
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
          </div>
        )}
        
        {!loading && !error && filteredRecipes.length === 0 && (
          <p className="text-center w-full text-on-surface-variant">
            {recipes.length === 0 
              ? "No hay recetas todavía. ¡Anímate a agregar la primera!" 
              : "No se encontraron recetas con esos filtros."}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {!loading && !error && filteredRecipes.map((recipe, idx) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
          ))}
        </div>
      </section>

      {/* Add Recipe Button Section - Moved here to conceptually sit below Gallery */}
      <section className="py-24 bg-surface-container-low relative flex flex-col items-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-fixed-dim/10 rounded-full blur-3xl"></div>
        </div>
        <button 
          onClick={onOpenAddModal}
          className="gradient-btn text-on-primary px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 relative z-10" 
        >
          <span className="material-symbols-outlined">add_circle</span>
          Añadir Receta
        </button>
      </section>
    </>
  );
}
