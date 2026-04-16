---
trigger: always_on
---

## 3. Frontend: React + Vite + Javascript

- **Componentización:** Divide la interfaz en componentes pequeños y reutilizables (ej. `RecipeCard`, `IngredientList`, `Navbar`).
- **Hooks:** Usa Hooks funcionales exclusivamente. Evita componentes de clase.
- **Manejo de Estado:** Utiliza `useState` y `useEffect` de forma eficiente. Para el estado global del recetario (ej. sesión de usuario), considera el uso de Context API o una librería ligera.
- **Vite:** Aprovecha las variables de entorno de Vite (`VITE_API_URL`) para conectar con el backend de Django.
- **Consumo de API:** Manejo de peticiones asíncronas con `fetch` o `axios`, gestionando estados de carga (loading) y errores.

## 4. Estilos: Tailwind CSS

- **Utility-First:** Prioriza clases de Tailwind sobre CSS personalizado.
- **Diseño Responsivo:** Diseña pensando en móviles primero (mobile-first), asegurando que el recetario sea legible en tablets y teléfonos de cocina.
- **Configuración:** Si una combinación de colores o espaciado se repite mucho, añádela al `tailwind.config.js` en lugar de crear clases CSS manuales.
