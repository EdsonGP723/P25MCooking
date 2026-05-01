import { useState } from 'react';

export default function RecipeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Breakfast',
    ingredientes: '', // Guardamos como texto para luego splitear en JSON
    instrucciones: '',
    tiempo_preparacion: '',
    porciones: ''
  });

  const [imageFile, setImageFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Recipe:", formData, "File:", imageFile);
    // TODO: Enviar con axios mediante FormData
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-4xl p-8 md:p-12 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-outline hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        
        <div className="text-center mb-12">
          <h2 className="serif-display text-5xl text-on-surface italic mb-4">Share Your Craft</h2>
          <p className="text-on-surface-variant italic">Contribute to the botanical collective muse. Submit your original recipe below.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Recipe Title</label>
              <input 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container transition-shadow" 
                placeholder="e.g., Sundown Sorbet" 
                type="text"
                value={formData.nombre}
                onChange={e => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Category</label>
              <select 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container appearance-none"
                value={formData.categoria}
                onChange={e => setFormData({...formData, categoria: e.target.value})}
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
                <option>Drinks</option>
              </select>
            </div>
          </div>

          {/* New Input for Image / Cloudinary Integration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary tracking-widest uppercase">Recipe Image</label>
            <div className="w-full p-4 rounded-lg bg-surface border-2 border-dashed border-outline-variant hover:border-primary transition-colors flex items-center justify-center">
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-on-primary-container hover:file:bg-primary hover:file:text-white cursor-pointer w-full text-sm text-outline" 
              />
            </div>
            {imageFile && <p className="text-xs text-primary mt-1 italic">Selected: {imageFile.name}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary tracking-widest uppercase">Ingredients List</label>
            <textarea 
              className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
              placeholder="List your elements, separated by commas..." 
              rows="3"
              value={formData.ingredientes}
              onChange={e => setFormData({...formData, ingredientes: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary tracking-widest uppercase">Instructions</label>
            <textarea 
              className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
              placeholder="Describe the alchemy of your dish..." 
              rows="6"
              value={formData.instrucciones}
              onChange={e => setFormData({...formData, instrucciones: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Prep Time (Mins)</label>
              <input 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
                placeholder="20" type="number"
                value={formData.tiempo_preparacion}
                onChange={e => setFormData({...formData, tiempo_preparacion: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Portions</label>
              <input 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
                placeholder="2" type="number"
                value={formData.porciones}
                onChange={e => setFormData({...formData, porciones: e.target.value})}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-center">
            <button 
              type="submit"
              className="gradient-btn text-on-primary px-12 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
