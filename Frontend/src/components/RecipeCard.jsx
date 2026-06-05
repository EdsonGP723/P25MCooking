import { Link } from 'react-router-dom';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

export default function RecipeCard({ recipe, index }) {
  // Translate properties to match the Stitch design mapping
  // Real data might be slightly different depending on your API structure (like lowercase keys)
  
  return (
    <Link to={`/recipe/${recipe.id}`} className={`group block ${index % 3 === 1 ? 'lg:translate-y-12' : ''}`}>
      <div className="relative mb-6 rounded-lg overflow-hidden bg-surface-container-low">
        <img 
          alt={recipe.nombre} 
          className="w-full aspect-[4/5] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" 
          src={optimizeCloudinaryUrl(recipe.imagen, 500)}
          loading="lazy"
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
          {(() => {
            let items = recipe.ingredientes;
            if (typeof items === 'string') {
              try { items = JSON.parse(items); } catch(e) { /* keep as string */ }
            }
            return Array.isArray(items) ? items.slice(0,3).join(', ') + '...' : (items || "Ingredientes cargando...");
          })()}
        </p>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
          {(() => {
            let inst = recipe.instrucciones;
            if (typeof inst === 'string') {
              try { inst = JSON.parse(inst); } catch(e) { /* keep as string */ }
            }
            return Array.isArray(inst) ? (inst[0]?.desc || inst[0] || "") : inst;
          })()}
        </p>
      </div>
    </Link>
  );
}
