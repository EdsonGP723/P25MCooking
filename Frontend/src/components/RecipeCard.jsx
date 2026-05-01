import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index }) {
  // Translate properties to match the Stitch design mapping
  // Real data might be slightly different depending on your API structure (like lowercase keys)
  
  return (
    <Link to={`/recipe/${recipe.id}`} className={`group block ${index % 3 === 1 ? 'lg:translate-y-12' : ''}`}>
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <img 
          alt={recipe.nombre} 
          className="w-full aspect-[4/5] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" 
          src={recipe.imagen}
        />
        <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary tracking-widest uppercase">
          {recipe.categoria}
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-3 text-[10px] font-bold text-outline uppercase tracking-tighter">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span> {recipe.tiempo_preparacion}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">group</span> {recipe.porciones} PORTIONS
        </span>
      </div>
      
      <h3 className="serif-display text-2xl text-on-surface mb-4">{recipe.nombre}</h3>
      
      <div className="space-y-4">
        {/* Usamos el ingrediente real si existe, o un dummy visual si la data real falta */}
        <p className="text-sm text-on-surface-variant font-medium">
          {Array.isArray(recipe.ingredientes) ? recipe.ingredientes.slice(0,4).join(', ') + '...' : "Ingredientes cargando..."}
        </p>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
          {recipe.instrucciones}
        </p>
      </div>
    </Link>
  );
}
