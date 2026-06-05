/**
 * Optimiza URLs de imágenes alojadas en Cloudinary.
 * Inserta parámetros de transformación (f_auto, q_auto, y redimensionado) para reducir
 * drásticamente el peso de las imágenes cargadas por el cliente.
 * 
 * @param {string} url - La URL original de la imagen.
 * @param {number} width - Ancho máximo deseado para la imagen.
 * @returns {string} - La URL optimizada o la original si no es de Cloudinary.
 */
export function optimizeCloudinaryUrl(url, width = 800) {
  if (!url || typeof url !== 'string') {
    // Si no hay imagen, devolvemos la ruta de nuestro placeholder premium local
    return '/placeholder_recipe.png';
  }

  // Solo optimizamos si la imagen proviene del dominio de Cloudinary
  if (url.includes('res.cloudinary.com')) {
    // Las URL de Cloudinary tienen la estructura: .../image/upload/v12345678/public_id.jpg
    // Insertamos los parámetros de transformación justo después de '/upload/'
    const uploadSegment = '/upload';
    const parts = url.split(uploadSegment);

    if (parts.length === 2) {
      // f_auto: Selecciona automáticamente el mejor formato (WebP/AVIF) soportado por el navegador.
      // q_auto: Ajusta la compresión de la imagen dinámicamente sin pérdida de calidad visible.
      // w_<ancho>: Redimensiona la imagen al ancho solicitado.
      // c_limit: Escala la imagen respetando su relación de aspecto original sin agrandarla si es menor.
      const transformations = `${uploadSegment}/f_auto,q_auto,w_${width},c_limit`;
      return `${parts[0]}${transformations}${parts[1]}`;
    }
  }

  // Si no es una URL de Cloudinary, la devolvemos intacta
  return url;
}
