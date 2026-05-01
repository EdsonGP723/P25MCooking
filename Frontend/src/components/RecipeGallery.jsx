import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

// Datos fijos como los de Stitch para la primera versión (reales vendrán después vía Axios)
const DUMMY_RECIPES = [
  {
    id: 1,
    nombre: "Gilded Avocado Morning",
    categoria: "Breakfast",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwZFMVaqBUEa2Jfhy6Ag4ib_zkWGn82js3sd_QZw1Nz9ejR7ccp9kUtwYC2hQxqzSmJRRTxJbcGCT5Pxp3e-Va0x0H40y5HNbob19z6K3lQgXbFs9mDybbsvFwsDxHsIsHqGO64WOC-8pXVJdftM5nCAioAUt64ojE5XzDaLEsssprgNol-mxGgtT5NOKClosUNnGmxGEBddmzGf0Nt8Dd4k6yw_wgtTGICEfXvjjUPCU95C51IOspGlUklD1ro-dSkJnr7CDUddSo",
    tiempo_preparacion: "15 MINS",
    porciones: 2,
    ingredientes: ["Sourdough", "Ripe Avocado", "Chili Flakes", "Edible Pansies", "Poached Egg"],
    instrucciones: "Toast the sourdough until golden. Mash the avocado with a hint of lemon and sea salt. Layer with a perfectly soft poached egg..."
  },
  {
    id: 2,
    nombre: "Velvet Rose Hummus",
    categoria: "Lunch",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHYQjJ84Cq0etd9cm3JAmjnkI6pBBM36P3uGe5EhYPxY-Jy1vnfcz5tpDSjygh5MoVu-4hFCrjGen0mKANFdfE5efFpnqoFHfk5BdZIFzK4bY8yGGnKtVsgWkuMZjkuBES7B_FAaWLBVu3G3u3NQlKlFwzOZ-7hQ429eiw7xKILFmUcmaz4Cc9sKAZtfDmC4mw908fR7RDnWGd2FOr6YxqD50VWcX2RRUvgUrZCzzxKSymqzzem515FgbsaiRrSU320OCvnC_KOv64",
    tiempo_preparacion: "10 MINS",
    porciones: 4,
    ingredientes: ["Chickpeas", "Roasted Beets", "Tahini", "Garlic", "Pine Nuts"],
    instrucciones: "Blend roasted beets with creamy chickpeas and tahini until a vibrant fuchsia silk is formed. Garnish with toasted pine nuts..."
  },
  {
    id: 3,
    nombre: "Midnight Rose Torte",
    categoria: "Dessert",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6bLLgI7l_UjiLru-gN9KgdAA4E0XhMhJlkyVXNg6CX52Pz0VXcFxHEwfe8e1la0RuGSGVFfUMj1_ZTiToKY8nrN2oyixNz-mhZZ_qm1HrVzEfNY4JSCEURE-tI7aGYHzm8FEs7I9c07LSf-gwNTefK4Ue-g2E1pa5-JFpQyRL_y8IHlc8d9I2cwHOrR9HhC8TlEFAQzXcjdfaD58g8XdAG124HWOHeQxYrRAb-woND0QczuT8kbplCD1ese4gc9LRvmrTHit3Ok4l",
    tiempo_preparacion: "45 MINS",
    porciones: 8,
    ingredientes: ["Dark Cacao", "Rose Water", "Pistachios", "Whipped Cream"],
    instrucciones: "A decadent dark chocolate foundation infused with the essence of fresh roses, layered with a cloud-like cream frosting..."
  }
];

export default function RecipeGallery({ onOpenAddModal }) {
  const [recipes, setRecipes] = useState(DUMMY_RECIPES);

  // Todo(Backend): useEffect con axios.get() a api/recipes aquí mismo más adelante

  return (
    <>
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="serif-display text-4xl md:text-5xl text-on-surface italic">Seasonal Curations</h2>
            <div className="h-1 w-24 bg-primary-container mt-4"></div>
          </div>
          <a className="text-primary text-sm font-bold border-b-2 border-primary-fixed-dim pb-1 hover:opacity-70 transition-opacity" href="#recipes">View All Recipes</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {recipes.map((recipe, idx) => (
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
          Add Recipe
        </button>
      </section>
    </>
  );
}
