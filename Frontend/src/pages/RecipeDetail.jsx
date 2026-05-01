import { useParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

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
  
  // TODO: Use `id` to fetch the real recipe from Django API via Axios
  // const [recipe, setRecipe] = useState(null);
  // useEffect(() => { axios.get(`/api/recipes/${id}/`).then(res => setRecipe(res.data.data)) }, [id]);
  
  const recipe = DUMMY_DETAIL;

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
                  src={recipe.imagen}
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
                <div className="flex items-center gap-6 font-label text-sm text-on-surface-variant uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-fixed-dim">schedule</span>
                    <span>{recipe.tiempo_preparacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-fixed-dim">restaurant</span>
                    <span>{recipe.porciones} Portions</span>
                  </div>
                </div>
              </div>
              
              {/* Ingredients */}
              <div className="mb-16 bg-surface-container-low p-8 md:p-12 rounded-xl shadow-[0_20px_40px_rgba(25,28,27,0.06)]">
                <h2 className="serif-display text-3xl font-light text-on-surface mb-8 italic">The Alchemic Ingredients</h2>
                <ul className="space-y-4 font-body text-base text-on-surface-variant">
                  {recipe.ingredientes.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="text-primary mt-1">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Instructions */}
              <div>
                <h2 className="serif-display text-3xl font-light text-on-surface mb-8 italic">The Preparation</h2>
                <div className="space-y-8 font-body text-base text-on-surface-variant">
                  {recipe.instrucciones.map((inst, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="serif-display text-2xl text-primary-fixed-dim font-light italic">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface mb-2 font-label text-sm uppercase tracking-wide">{inst.title}</h3>
                        <p>{inst.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
