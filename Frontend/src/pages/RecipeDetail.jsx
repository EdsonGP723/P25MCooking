import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import RecipeModal from '../components/RecipeModal';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

// Dummy data fallback for the detail view
const DUMMY_DETAIL = {
  id: 2, // matches the url /recipe/2 conceptually
  nombre: "Midnight Rose Torte",
  categoria: "Dessert",
  imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6UjgIFHivC-0orx2wvrdKr9kjKRbHIupSRkeMYsfi97o_eiW_yWi-C_CJMkdDbOQsq-5jKFuCyNIUk9AdXWl8441dqVy70LZFOT5k9a1reRsDFjUGoF8oL9iZwShJN9Akk3XnAztyTJWP_CebRQaQJkBMdTU4bs7a0PPkLv1AGZISshCAwhPBZhfRlJ5GDJYVIKJ1CXrXfdQcc8hI5F3-bFnGGUDbUXmvV7ia0REg9pgEGEDqx7HMpAbPGDCpAmDvQf8rEYmti4ak",
  tiempo_preparacion: "45 Mins",
  porciones: 8,
  ingredientes: [
    "200g finest dark chocolate (70% cacao minimum), roughly chopped",
    "150g unsalted butter, cubed and softened at room temperature",
    "1 cup raw caster sugar, finely ground for a delicate crumb",
    "4 large free-range eggs, separated with care",
    "1 tsp pure vanilla bean paste",
    "A generous handful of organic, edible dried rose petals for finishing"
  ],
  instrucciones: [
    { title: "Melt & Mingle", desc: "Gently suspend a heatproof bowl over a pan of barely simmering water, ensuring the base doesn't touch the water. Add the chocolate and butter, stirring lazily until melted into a glossy pool. Set aside to cool slightly." },
    { title: "Whisking the Yolks", desc: "In a separate vessel, whisk the egg yolks with half the sugar and the vanilla bean paste until pale and slightly thickened. Gently fold this golden mixture into the cooled chocolate pool." },
    { title: "The Whites", desc: "In an immaculately clean bowl, whip the egg whites to soft peaks. Gradually shower in the remaining sugar, whisking continuously until you achieve firm, glossy peaks that hold their shape." },
    { title: "The Marriage", desc: "Sacrifice a large spoonful of the whites into the chocolate mixture to loosen it, then carefully fold in the rest, preserving as much air as possible. Pour into a lined 20cm springform tin and bake at 180°C for 35-40 minutes." }
  ]
};

export default function RecipeDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/api/recipes/${id}/`);
        setRecipe(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("No pudimos encontrar esta receta.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
        <TopNavBar />
        <main className="flex-grow w-full max-w-[1920px] mx-auto pt-12 pb-24">
          <div className="px-4 md:px-12 lg:px-24">
            <div className="animate-pulse flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              {/* Left: Hero Image Skeleton */}
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/5] rounded-xl bg-surface-container-low -ml-4 md:-ml-12 lg:-ml-24"></div>
              </div>
              
              {/* Right: Content Skeleton */}
              <div className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-16 space-y-12">
                <div className="space-y-6">
                  <div className="h-16 w-3/4 bg-surface-container-low rounded-lg"></div>
                  <div className="h-6 w-1/2 bg-surface-container-low rounded-md"></div>
                </div>
                
                <div className="h-64 w-full bg-surface-container-low rounded-xl"></div>
                
                <div className="space-y-6">
                  <div className="h-8 w-1/4 bg-surface-container-low rounded-md"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-surface-container-low rounded"></div>
                    <div className="h-4 w-5/6 bg-surface-container-low rounded"></div>
                    <div className="h-4 w-4/5 bg-surface-container-low rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-error">{error || "Receta no encontrada"}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      <TopNavBar />
      
      <main className="flex-grow w-full max-w-[1920px] mx-auto pt-12 pb-24">
        {/* Recipe Hero/Details */}
        <article className="px-4 md:px-12 lg:px-24 mb-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left: Hero Image (Asymmetrical) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(25,28,27,0.06)] -ml-4 md:-ml-12 lg:-ml-24">
                <img 
                  alt={recipe.nombre} 
                  className="w-full h-full object-cover" 
                  src={optimizeCloudinaryUrl(recipe.imagen, 1000)}
                />
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-16">
              
              {/* Title & Meta */}
              <div className="mb-16">
                <h1 className="serif-display text-5xl md:text-6xl lg:text-7xl font-light text-on-surface tracking-tight leading-tight mb-8">
                  {recipe.nombre}
                </h1>
                <div className="flex flex-wrap items-center gap-6 font-label text-sm text-on-surface-variant uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-fixed-dim">schedule</span>
                    <span>{recipe.tiempo_preparacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-fixed-dim">restaurant</span>
                    <span>{recipe.porciones} Porciones</span>
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="ml-auto border-2 border-primary text-primary px-6 py-2 rounded-full text-xs font-semibold hover:bg-primary hover:text-on-primary hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-md flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                      Editar Receta
                    </button>
                  )}
                </div>
              </div>
              
              {/* Ingredients */}
              <div className="mb-16 bg-surface-container-low p-8 md:p-12 rounded-xl shadow-[0_20px_40px_rgba(25,28,27,0.06)]">
                <h2 className="serif-display text-3xl font-light text-on-surface mb-8 italic">Ingredientes</h2>
                <ul className="space-y-4 font-body text-base text-on-surface-variant">
                  {(() => {
                    let items = recipe.ingredientes;
                    if (typeof items === 'string') {
                      try { items = JSON.parse(items); } catch(e) { /* keep as string */ }
                    }
                    return Array.isArray(items) ? items.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="text-primary mt-1">•</span>
                        <span>{ing}</span>
                      </li>
                    )) : (
                      <li className="flex items-start gap-4">
                        <span className="text-primary mt-1">•</span>
                        <span className="whitespace-pre-line">{items}</span>
                      </li>
                    );
                  })()}
                </ul>
              </div>
              
              {/* Instructions */}
              <div>
                <h2 className="serif-display text-3xl font-light text-on-surface mb-8 italic">Preparación</h2>
                <div className="space-y-8 font-body text-base text-on-surface-variant">
                  {(() => {
                    let items = recipe.instrucciones;
                    if (typeof items === 'string') {
                      try { items = JSON.parse(items); } catch(e) { /* keep as string */ }
                    }
                    return Array.isArray(items) ? items.map((inst, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="serif-display text-2xl text-primary-fixed-dim font-light italic">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div>
                          {inst.title && <h3 className="font-bold text-on-surface mb-2 font-label text-sm uppercase tracking-wide">{inst.title}</h3>}
                          <p>{inst.desc || inst}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="flex gap-6">
                        <div className="serif-display text-2xl text-primary-fixed-dim font-light italic">01</div>
                        <div className="whitespace-pre-line">
                          {items}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
            </div>
          </div>
        </article>
      </main>
      
      <Footer />

      <RecipeModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        recipeToEdit={recipe}
        onRecipeUpdated={(updatedRecipe) => setRecipe(updatedRecipe)}
      />
    </div>
  );
}
