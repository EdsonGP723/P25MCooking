import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export default function RecipeModal({ isOpen, onClose, recipeToEdit, onRecipeUpdated }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Desayuno',
    ingredientes: ['', '', ''],
    instrucciones: ['', '', ''],
    tiempo_preparacion: '',
    porciones: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hook useEffect: Sincroniza el estado del formulario con la receta seleccionada
  // para editar o limpia el formulario si se va a crear una nueva receta.
  useEffect(() => {
    if (recipeToEdit && isOpen) {
      // 1. Procesar Ingredientes:
      // Si vienen serializados en JSON string, se parsean de vuelta a un arreglo.
      let ing = recipeToEdit.ingredientes;
      if (typeof ing === 'string') {
        try {
          ing = JSON.parse(ing);
        } catch (e) {
          ing = [ing];
        }
      }
      if (!Array.isArray(ing)) {
        ing = [ing];
      }
      // Aseguramos que siempre haya al menos 3 campos en el formulario para rellenar
      const cleanIng = [...ing];
      while (cleanIng.length < 3) {
        cleanIng.push('');
      }

      // 2. Procesar Instrucciones:
      // En la base de datos se guarda en un TextField. Si es un JSON string, se parsea.
      // Si son objetos del tipo { title, desc } o strings directos, los mapeamos a strings planos para el textarea.
      let inst = recipeToEdit.instrucciones;
      if (typeof inst === 'string') {
        try {
          inst = JSON.parse(inst);
        } catch (e) {
          inst = [inst];
        }
      }
      if (!Array.isArray(inst)) {
        inst = [inst];
      }
      const parsedInst = inst.map(item => {
        if (typeof item === 'object' && item !== null) {
          return item.desc || item.title || '';
        }
        return item;
      });
      while (parsedInst.length < 3) {
        parsedInst.push('');
      }

      // 3. Procesar Tiempo de preparación:
      // Si viene con el sufijo " MINS" o " min", extraemos solo el número para el input numérico.
      let prepTime = recipeToEdit.tiempo_preparacion || '';
      const match = String(prepTime).match(/^(\d+)/);
      if (match) {
        prepTime = match[1];
      }

      // 4. Actualizamos el estado con los valores de la receta
      setFormData({
        nombre: recipeToEdit.nombre || '',
        categoria: recipeToEdit.categoria || 'Desayuno',
        ingredientes: cleanIng,
        instrucciones: parsedInst,
        tiempo_preparacion: prepTime,
        porciones: recipeToEdit.porciones || ''
      });
      setImageFile(null); // Reset del input de imagen
    } else if (isOpen) {
      // Si se abre el modal para crear, reiniciamos el formulario con valores vacíos
      setFormData({
        nombre: '',
        categoria: 'Desayuno',
        ingredientes: ['', '', ''],
        instrucciones: ['', '', ''],
        tiempo_preparacion: '',
        porciones: ''
      });
      setImageFile(null);
    }
  }, [recipeToEdit, isOpen]);

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('categoria', formData.categoria);
      
      const ingredientesArray = formData.ingredientes.filter(i => i.trim() !== '');
      data.append('ingredientes', JSON.stringify(ingredientesArray));
      
      const instruccionesArray = formData.instrucciones.filter(i => i.trim() !== '');
      data.append('instrucciones', JSON.stringify(instruccionesArray));
      
      data.append('tiempo_preparacion', `${formData.tiempo_preparacion} MINS`);
      data.append('porciones', formData.porciones);
      
      // En una petición PATCH, si el usuario no seleccionó un archivo nuevo de imagen,
      // no agregamos el campo 'imagen' a FormData. DRF respetará la imagen existente en el backend.
      if (imageFile) {
        data.append('imagen', imageFile);
      }

      let response;
      if (recipeToEdit) {
        // Enviar PATCH para actualización parcial en Django REST Framework
        response = await api.patch(`/api/recipes/${recipeToEdit.id}/`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Enviar POST si se trata de una nueva creación
        response = await api.post('/api/recipes/', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log("Recipe saved successfully:", response.data);
      if (onRecipeUpdated) {
        // Notificar al componente padre de la actualización
        onRecipeUpdated(response.data.data || response.data);
      }
      onClose();
    } catch (err) {
      console.error("Error submitting recipe:", err);
      setErrorMsg("Ocurrió un error al guardar la receta. Asegúrate de estar autenticado y de completar todos los campos.");
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="serif-display text-5xl text-on-surface italic mb-4">
            {recipeToEdit ? 'Editar Receta' : 'Comparte tu Creación'}
          </h2>
          <p className="text-on-surface-variant italic">
            {recipeToEdit ? 'Modifica los detalles de tu receta a continuación.' : 'Contribuye al recetario colectivo. Envía tu receta original abajo.'}
          </p>
        </div>
        
        {errorMsg && (
          <div className="bg-error-container text-on-error-container text-sm font-medium px-4 py-3 rounded-lg text-center mb-6">
            {errorMsg}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Título de la Receta</label>
              <input 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container transition-shadow" 
                placeholder="ej., Sorbete de Atardecer" 
                type="text"
                value={formData.nombre}
                onChange={e => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Categoría</label>
              <select 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container appearance-none"
                value={formData.categoria}
                onChange={e => setFormData({...formData, categoria: e.target.value})}
              >
                <option value="Desayuno">Desayuno</option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
                <option value="Postre">Postre</option>
                <option value="Bebida">Bebidas</option>
              </select>
            </div>
          </div>

          {/* New Input for Image / Cloudinary Integration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary tracking-widest uppercase">Imagen de la Receta</label>
            <div className="w-full p-4 rounded-lg bg-surface border-2 border-dashed border-outline-variant hover:border-primary transition-colors flex items-center justify-center">
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-on-primary-container hover:file:bg-primary hover:file:text-white cursor-pointer w-full text-sm text-outline" 
              />
            </div>
            {imageFile && <p className="text-xs text-primary mt-1 italic">Seleccionado: {imageFile.name}</p>}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Lista de Ingredientes</label>
              <button type="button" onClick={() => addArrayItem('ingredientes')} className="text-xs font-bold text-primary hover:text-primary-fixed transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Agregar
              </button>
            </div>
            {formData.ingredientes.map((ing, idx) => (
              <div key={`ing-${idx}`} className="flex gap-2">
                <input 
                  className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
                  placeholder="Ej: 2 tazas de harina..." 
                  value={ing}
                  onChange={e => handleArrayChange('ingredientes', idx, e.target.value)}
                />
                <button type="button" onClick={() => removeArrayItem('ingredientes', idx)} className="text-error/70 hover:text-error p-2 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Instrucciones</label>
              <button type="button" onClick={() => addArrayItem('instrucciones')} className="text-xs font-bold text-primary hover:text-primary-fixed transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Agregar
              </button>
            </div>
            {formData.instrucciones.map((inst, idx) => (
              <div key={`inst-${idx}`} className="flex gap-2">
                <div className="bg-surface text-primary font-bold flex items-center justify-center px-4 rounded-lg">
                  {idx + 1}
                </div>
                <textarea 
                  className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
                  placeholder={`Paso ${idx + 1}...`}
                  rows="2"
                  value={inst}
                  onChange={e => handleArrayChange('instrucciones', idx, e.target.value)}
                />
                <button type="button" onClick={() => removeArrayItem('instrucciones', idx)} className="text-error/70 hover:text-error p-2 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Tiempo (Mins)</label>
              <input 
                className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary-container" 
                placeholder="20" type="number"
                value={formData.tiempo_preparacion}
                onChange={e => setFormData({...formData, tiempo_preparacion: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase">Porciones</label>
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
              disabled={isSubmitting}
              className={`gradient-btn text-on-primary px-12 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
            >
              {isSubmitting ? 'Enviando...' : 'Guardar Receta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
